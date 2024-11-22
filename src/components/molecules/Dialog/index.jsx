import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import BorderContainer from "../../atoms/BorderContainer";
import ExitIcon from "../../atoms/Icons/Exit";
import WarningIcon from "../../atoms/Icons/Warning";
import InfoIcon from "../../atoms/Icons/Info";
import Button from "../../atoms/Button";

const Dialog = ({ message, type, onClose, position, withBackdrop=false }) => {
  const [visible, setVisible] = useState(false);

  // Controla la visibilidad inicial del diálogo
  useEffect(() => {
    setVisible(true);

    if (position === "top") {
      const timer = setTimeout(() => handleClose(), 3700);
      return () => clearTimeout(timer);
    }
  }, [position]);

  // Maneja el cierre del diálogo con animación
  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(false), 300); // Tiempo coincidente con la animación
  };

  const dialogStyle = ["info", "confirm"].includes(type)
    ? "text-petrack-green"
    : "text-petrack-red";

  const icon = {
    info: <InfoIcon />,
    warning: <WarningIcon />,
    confirm: <InfoIcon />,
    warning_confirm: <WarningIcon />,
  };

  const title = {
    info: "Mensaje",
    warning: "Error",
    confirm: "Elige una opción",
    warning_confirm: "Cuidado",
  };

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${withBackdrop ? "bg-black bg-opacity-50" : ""
        } ${visible ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-300`}
    >
      <div
        className={`${position === "top"
            ? "top-4 fixed left-1/2 transform -translate-x-1/2"
            : "my-10 mx-4 max-h-screen overflow-y-auto"
          } ${visible ? "scale-100 opacity-100" : "scale-90 opacity-0"} 
        transition-all duration-300 transform`}
      >
        <BorderContainer
          color={["info", "confirm"].includes(type) ? "" : `border-petrack-red`}
        >
          <div className={`${dialogStyle} relative m-4`}>
            {position !== "top" && (
              <button
                className="absolute top-0 right-0 ml-4"
                label="Exit"
                onClick={handleClose}
              >
                <ExitIcon
                  size="large"
                  color={["info", "confirm"].includes(type) ? "primary" : "danger"}
                />
              </button>
            )}
            <div className="flex flex-col items-center">
              {position !== "top" && (
                <div className="flex items-center mb-3">
                  <span className="mr-1">{icon[type]}</span>
                  <p className="text-xl font-semibold">{title[type]}</p>
                </div>
              )}
              <div className="flex items-center">
                {position === "top" && <span className="mr-1">{icon[type]}</span>}
                <p>{message}</p>
                {position === "top" && (
                  <div className="relative ml-4">
                    {/* Contenedor del botón con contorno animado */}
                    <button
                      className="flex items-center justify-center"
                      label="Exit"
                      onClick={handleClose}
                    >
                      <ExitIcon
                        size="large"
                        color={["info", "confirm"].includes(type) ? "primary" : "danger"}
                        animate={visible} // Controla si la animación está activa
                        animationDuration={3700} // Sincronizado con la duración del alert
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
            {["confirm", "warning_confirm"].includes(type) ? (
              <div className={`flex justify-center gap-4 mt-4`}>
                <Button
                  onClick={() => onClose(false)}
                  variant={type === "confirm" ? "border-red" : "solid-green"}
                  size="extra-small"
                >
                  No
                </Button>
                <Button
                  onClick={() => onClose(true)}
                  variant={type === "confirm" ? "solid-green" : "border-red"}
                  size="extra-small"
                >
                  Si
                </Button>
              </div>
            ) : (
              position === "center" && (
                <div className="mt-4 flex justify-center">
                  <Button
                    onClick={() => onClose(true)}
                    variant={"solid-green"}
                    size="extra-small"
                  >
                    Aceptar
                  </Button>
                </div>
              )
            )}
          </div>
        </BorderContainer>
      </div>
    </div>,
    document.body
  );
};

Dialog.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["info", "warning", "confirm", "warning_confirm"])
    .isRequired,
  onClose: PropTypes.func.isRequired,
  position: PropTypes.oneOf(["top", "center"]).isRequired,
  withBackdrop: PropTypes.bool,
};

export default Dialog;

