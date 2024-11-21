import PropTypes from "prop-types";
import "./styles.css";



export default function Button({type="button", onClick, variant, variant2, size, children, disabled = false}) {
  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick} // Desactiva `onClick` si está deshabilitado
      disabled={disabled} // Agrega el atributo HTML
      className={`button 
        ${variant ? `button--${variant}` : ""} 
        ${variant2 ? `button--${variant2}` : ""}  
        ${size ? `button--${size}` : ""} 
        ${disabled ? "button--disabled" : ""}`.trim()} // Aplica la clase de deshabilitado
      >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(["submit", "reset", "button"]),
  onClick: PropTypes.func,
  variant: PropTypes.string,
  variant2: PropTypes.string,
  size: PropTypes.oneOf(["extra-small", "small", "medium", "large"]).isRequired,
  disabled: PropTypes.bool, // Nueva prop para manejar el estado deshabilitado
  children: PropTypes.node.isRequired,
};