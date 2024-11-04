import React from "react";
import PropTypes from "prop-types";
import ButtonAccept from "../../atoms/Button";
import ButtonDeny from "../../atoms/Button";

export default function CardNotification({
    imgSrc,
    imgAlt,
    name,
    requesterEmail,
    status,
    requestDate,
    onAccept,
    onDeny,
    requestId
}) {
    return (
        <div className="flex flex-col md:flex-row md:items-center p-6 bg-white shadow-lg rounded-lg mb-6 items-center">
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
                <p className="text-xl font-bold text-petrack-green">{name}</p>
                <p className="text-sm text-gray-600">{requesterEmail}</p>
                <p className={`text-sm font-medium mt-2 ${status === "Aceptada" ? "text-green-600" : "text-yellow-500"}`}>
                    {status}
                </p>
                <p className="text-xs text-gray-400 mt-1">Fecha: {requestDate}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-8 ml-auto items-center">
                <ButtonAccept variant="solid-green" size="extra-small" onClick={() => onAccept(requestId)}>
                    Aceptar
                </ButtonAccept>
                <ButtonDeny variant="solid-red" size="extra-small" onClick={() => onDeny(requestId)}>
                    Denegar
                </ButtonDeny>
            </div>

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
    onAccept: PropTypes.func.isRequired, // Add this line
    onDeny: PropTypes.func.isRequired, // Add this line
    requestId: PropTypes.string.isRequired // Add this line for request ID
};
