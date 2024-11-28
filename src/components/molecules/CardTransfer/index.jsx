import React from "react";
import PropTypes from "prop-types";
import Button from "../../atoms/Button";
import BorderContainer from "../../atoms/BorderContainer";
import dog_default from "../../../assets/img/dog_default.webp";
import cat_default from "../../../assets/img/cat_default.webp";
import ProfileImage from "../../atoms/ProfileImage";

export default function CardTransfer({
    imgSrc,
    imgAlt = "Tarjeta de transferencia de mascota",
    name,
    userEmail,
    ownerEmail,
    newOwnerEmail,
    status,
    requestDate,
    onAccept,
    onDeny,
    onCancel,
    species,
}) {
    // Determinar la imagen predeterminada según la especie
    const getDefaultImage = () => {
        return species === "Cat" ? cat_default: dog_default;
    };

    // Usar la imagen proporcionada o la predeterminada
    const imageSrc = imgSrc || getDefaultImage();

    const handleAction = (action) => {
        if (action === "accept") {
            onAccept();
        } else if (action === "deny") {
            onDeny();
        } else if (action === "cancel") {
            onCancel();
        }
    };

    return (
        <div className="mb-6">
            <BorderContainer>
                <div className="flex flex-col md:flex-row md:items-center p-6 items-center">
                    {/* Pet Image */}
                    <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                        <img
                            src={imageSrc}
                            alt={imgAlt}
                            className="w-full h-full object-cover rounded-full border-2 border-petrack-green"
                        />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col md:ml-6 mt-4 md:mt-0 w-full">
                        <p className="text-xl font-bold text-petrack-green">
                            {name}
                        </p>
                        <p className="text-sm text-gray-600"><span>Dueño original: </span>{ownerEmail}</p>
                        <p className="text-sm text-gray-600"><span>Destinatario: </span>{newOwnerEmail}</p>
                        <p
                            className={`text-sm font-extrabold mt-2 ${status === "Aceptada"
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
                    {status === "Pendiente" && (
                        <div className="flex flex-col gap-8 ml-auto items-center">
                            {userEmail !== ownerEmail ? (
                                <>
                                    {/* Botón para aceptar */}
                                    <Button
                                        variant="solid-green"
                                        size="extra-small"
                                        onClick={() => handleAction("accept")}
                                    >
                                        Aceptar
                                    </Button>
                                    {/* Botón para denegar */}
                                    <Button
                                        variant="solid-red"
                                        size="extra-small"
                                        onClick={() => handleAction("deny")}
                                    >
                                        Denegar
                                    </Button>
                                </>
                            ) : (
                                /* Botón para cancelar */
                                <Button
                                    variant="solid-red"
                                    size="extra-small"
                                    onClick={() => handleAction("cancel")}
                                >
                                    Cancelar
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </BorderContainer>
        </div>
    );
}

CardTransfer.propTypes = {
    imgSrc: PropTypes.string,
    imgAlt: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    ownerEmail: PropTypes.string.isRequired,
    newOwnerEmail: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    requestDate: PropTypes.string.isRequired,
    onAccept: PropTypes.func.isRequired,
    onDeny: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    species: PropTypes.string.isRequired, // Especificamos que 'species' es requerido
};