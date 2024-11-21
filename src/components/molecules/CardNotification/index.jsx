import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../atoms/Button";
import BorderContainer from "../../atoms/BorderContainer";

export default function CardNotification({
    typeCard = "adoption_request",
    imgSrc,
    imgAlt,
    name,
    requesterEmail,
    status,
    requestDate,
    onAccept,
    onDeny,
    onDelivery,
    requestId,
}) {
    const [isFading, setIsFading] = useState(false); // Controla la animación de desvanecimiento

    const handleAction = (action) => {
        setIsFading(true);
        setTimeout(() => {
            if (action === "accept") {
                onAccept();
            } else if (action === "deny") {
                onDeny();
            } else if (action === "delivery") {
                onDelivery();
            }
        }, 300); // Espera a que termine la animación
    };

    return (
        <div
            className={`transition-opacity duration-150 ${
                isFading ? "opacity-0" : "opacity-100"
            } mb-6`}
        >
            <BorderContainer>
                <div className="flex flex-col md:flex-row md:items-center p-6 items-center">
                    {/* Pet Image */}
                    <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                        <img
                            src={imgSrc}
                            alt={imgAlt}
                            className="w-full h-full object-cover rounded-full border-2 border-petrack-green"
                        />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col md:ml-6 mt-4 md:mt-0 w-full">
                        <p className="text-xl font-bold text-petrack-green">
                            {name}
                        </p>
                        <p className="text-sm text-gray-600">{requesterEmail}</p>
                        <p
                            className={`text-sm font-extrabold mt-2 ${
                                status === "Aceptada"
                                    ? "text-green-600"
                                    : status === "Denegada"
                                    ? "text-petrack-red"
                                    : "text-yellow-500"
                            }`}
                        >
                            {status}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            Fecha: {requestDate}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-8 ml-auto items-center">
                        {status !== "Aceptada" ? (
                            <Button
                                variant="solid-green"
                                size="extra-small"
                                onClick={() =>
                                    typeCard === "transfer_received"
                                        ? handleAction("accept")
                                        : onAccept()
                                }
                            >
                                Aceptar
                            </Button>
                        ) : (
                            <Button
                                variant="solid-green"
                                size="extra-small"
                                onClick={() =>
                                    typeCard === "adoption_request"
                                        ? handleAction("delivery")
                                        : onDelivery()
                                }
                            >
                                Confirmar entrega
                            </Button>
                        )}

                        <Button
                            variant="solid-red"
                            size="extra-small"
                            onClick={() =>
                                typeCard === "transfer_received"
                                    ? handleAction("deny")
                                    : onDeny()
                            }
                        >
                            Denegar
                        </Button>
                    </div>
                </div>
            </BorderContainer>
        </div>
    );
}

CardNotification.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    requesterEmail: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["Aceptada", "Pendiente", "Denegada"]).isRequired,
    requestDate: PropTypes.string.isRequired,
    onAccept: PropTypes.func.isRequired,
    onDeny: PropTypes.func.isRequired,
    onDelivery: PropTypes.func.isRequired,
    requestId: PropTypes.number.isRequired,
    typeCard: PropTypes.oneOf(["transfer_received", "adoption_request"])
        .isRequired,
};