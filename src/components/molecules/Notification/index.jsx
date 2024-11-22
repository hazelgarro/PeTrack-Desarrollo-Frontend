import React from "react";
import PropTypes from "prop-types";
import { getData } from "../../../utils/apiConnector.js";
import defaultImage from "../../../assets/img/LogoDefault.png"; // Ruta a la imagen predeterminada

export default function CardNotification({
    imgSrc,
    imgAlt,
    name,
    requesterEmail,
    status,
    requestDate,
    onAccept,
    onDeny,
    requestId,
}) {
    // Imagen predeterminada si imgSrc no está definido o está vacío
    const validImgSrc = imgSrc && imgSrc.trim() !== "" ? imgSrc : defaultImage;

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
                // Aquí puedes hacer algo si se marca como leída correctamente
                console.log("Notificación marcada como leída");
            } else {
                console.error(response.message);
            }
        } catch (err) {
            console.error("Error marcando la notificación como leída.");
        }
    };

    return (
        <div className="flex flex-col md:flex-row md:items-center p-6 bg-white shadow-lg rounded-lg mb-6 items-center">
            {/* Pet Image */}
            <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                <img
                    src={validImgSrc}
                    alt={imgAlt}
                    className="w-full h-full object-cover rounded-full border-2 border-petrack-green"
                />
            </div>

            {/* Details */}
            <div className="flex flex-col md:ml-6 mt-4 md:mt-0 w-full">
                <p className="text-xl font-bold text-petrack-green">{name}</p>
                <p className="text-sm text-gray-600">{requesterEmail}</p>
                <p
                    className={`text-sm font-extrabold mt-2 ${
                        status === "Aceptada"
                            ? "text-petrack-green-600"
                            : status === "Denegada"
                            ? "text-petrack-red"
                            : "text-yellow-500"
                    }`}
                >
                    {status}
                </p>

                <p className="text-xs text-gray-400 mt-1">Fecha: {requestDate}</p>
            </div>

            {/* Action Button to Mark as Read */}
            <div className="flex flex-col gap-8 ml-auto items-center mt-6 sm:mt-0">
                <button
                    onClick={() => markAsRead(requestId)}
                    className="px-4 py-2 bg-petrack-green text-white rounded hover:bg-green-600"
                >
                    Marcar como leída
                </button>
            </div>
        </div>
    );
}

CardNotification.propTypes = {
    imgSrc: PropTypes.string,
    imgAlt: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    requesterEmail: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["Aceptada", "Pendiente", "Denegada"]).isRequired,
    requestDate: PropTypes.string.isRequired,
    requestId: PropTypes.string.isRequired,
};

CardNotification.defaultProps = {
    imgSrc: "", // Valor por defecto si no se pasa `imgSrc`
};
