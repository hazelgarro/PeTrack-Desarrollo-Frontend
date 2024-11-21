import React, { useEffect, useState } from "react";
import CardNotification from "../../molecules/Notification";
import { getData } from "../../../utils/apiConnector.js";
import { useSession } from "../../../context/SessionContext";
import Loader from "../../atoms/Loader";
import NavMenu from "../../organisms/NavLoged/index.jsx";

export default function NotificationsPage() {
    const { userData, isAuthenticated } = useSession();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener notificaciones del usuario
    const fetchNotifications = async () => {
        if (!isAuthenticated || !userData || !userData.id) {
            setError("No estás autenticado o el id del usuario no está disponible.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await getData(
                `https://www.APIPetrack.somee.com/Notification/GetUserNotifications/${userData.id}`,
                null,
                true,
                "GET"
            );
            if (response.result) {
                setNotifications(response.data);
            } else {
                setError(response.message || "Error al cargar notificaciones.");
            }
        } catch (err) {
            setError("Error al obtener las notificaciones.");
        } finally {
            setLoading(false);
        }
    };

    // Marcar notificación como leída
    const markAsRead = async (notificationId) => {
        try {
            const response = await getData(
                `https://www.APIPetrack.somee.com/Notification/MarkNotificationAsRead/${notificationId}`,
                null,
                true,
                "PUT"
            );
            if (response.result) {
                setNotifications((prev) =>
                    prev.map((n) =>
                        n.id === notificationId ? { ...n, isRead: true } : n
                    )
                );
            } else {
                console.error(response.message);
            }
        } catch (err) {
            console.error("Error marcando la notificación como leída.");
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, [isAuthenticated, userData]);

    // Filtra las notificaciones para no mostrar las que ya han sido leídas
    const unreadNotifications = notifications.filter((notification) => !notification.isRead);

    return (
        <div>
            <NavMenu></NavMenu>
            <div className="p-8">
                <h1 className="text-2xl font-bold text-petrack-green mb-6">
                    Notificaciones
                </h1>
                {loading ? (
                    <Loader text="Cargando notificaciones..." />
                ) : unreadNotifications.length === 0 ? (
                    <p className="text-gray-500">No tienes notificaciones nuevas.</p>
                ) : (
                    <div className="space-y-6">
                        {unreadNotifications.map((notification) => (
                            <CardNotification
                                key={notification.id}
                                imgSrc={notification.petPicture || ""}
                                imgAlt={`Foto de ${notification.message || "Petrack Logo"}`}
                                name={notification.message}
                                requesterEmail={`Fecha: ${new Date(
                                    notification.notificationDate
                                ).toLocaleDateString()}`}
                                status={notification.isRead ? "Leída" : "Nueva"}
                                requestDate={new Date(
                                    notification.notificationDate
                                ).toLocaleString()}
                                onAccept={() => markAsRead(notification.id)}
                                onDeny={() => console.log("Acción denegada")}
                                onDelivery={() => console.log("Entrega confirmada")}
                                requestId={notification.id.toString()}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
