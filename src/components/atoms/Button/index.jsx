import PropTypes from "prop-types";
import "./styles.css";

export default function Button({type="button", onClick, variant, variant2, size, children}) {
  return (
    <button type={type} onClick={onClick} className={`button ${variant ? `button--${variant}` : ""} ${variant2 ? `button--${variant2}` : ""}  ${size ? `button--${size}` : ""}`.trim()}>
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(["submit", "reset", "button"]),
  onClick: PropTypes.func,
  variant: PropTypes.string,
  variant2: PropTypes.string,
  size: PropTypes.oneOf(["extra-small", "small", "medium", "large"]).isRequired, // Define the possible sizes
  children: PropTypes.node.isRequired,
};