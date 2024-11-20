import PropTypes from "prop-types";
import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from '../components/molecules/Dialog';

function showDialog({ message, type, position, withBackdrop }) {
  return new Promise((resolve) => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    function cleanup() {
      ReactDOM.unmountComponentAtNode(div);
      div.remove();
    }

    function handleClose(result) {
      cleanup();
      resolve(result);
    }

    ReactDOM.render(
      <Dialog
        message={message}
        type={type}
        position={position}
        withBackdrop={withBackdrop}
        onClose={handleClose}
      />,
      div
    );
  });
}

// Función para mostrar un diálogo de advertencia
export function showMessageDialog(message, type, position) {
  const dialogType = type === "success" ? "info" : "warning";
  return showDialog({
    message,
    type: dialogType,
    position,
    withBackdrop: position === 'center',
  });
}

// Función para mostrar un diálogo con opciones (Aceptar o Denegar)
export function showOptionDialog(message, type) {
  const dialogType = type === "success" ? "confirm" : "warning_confirm";

  return showDialog({
    message,
    type: dialogType,
    position: 'center',
    withBackdrop: true,
  });
}

showDialog.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(["success", "warning"]),
  position: PropTypes.oneOf(["top", "center"]),
  withBackdrop: PropTypes.bool
};