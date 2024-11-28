import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import ExitIcon from '../../atoms/Icons/Exit';
import BorderContainer from '../../atoms/BorderContainer';

export default function Modal({ isOpen, toggleModal, children, type = "default" }) {
    useEffect(() => {
        if (isOpen) {
            // Deshabilita el scroll del body cuando el modal está abierto
            document.body.style.overflow = "hidden";
        } else {
            // Habilita el scroll del body cuando el modal está cerrado
            document.body.style.overflow = "auto";
        }

        // Limpia el estilo cuando el componente se desmonta
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={toggleModal}
            aria-modal="true"
            role="dialog"
        >
            <div
                        className="w-full max-w-lg max-h-screen overflow-y-auto bg-white rounded-lg relative"
                        onClick={(e) => e.stopPropagation()} // Detiene la propagación para evitar que se cierre
                    >
                        <BorderContainer>
                            <div className={`relative p-7 ${type === "buttons" ? "md:pr-10 pr-9" : ""}`}>
                                {/* Botón de cerrar */}
                                <div className="absolute top-2 right-2">
                                    <button label="Exit" onClick={toggleModal}>
                                        <ExitIcon size="large" />
                                    </button>
                                </div>
                                {/* Contenido del modal */}
                                {children}
                            </div>
                        </BorderContainer>
                    </div>
        </div>,
        document.body // Asegúrate de que el portal se renderice en el body
    );
};

Modal.propTypes = {
    type: PropTypes.oneOf(["default", "buttons"]),
    toggleModal: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
};
