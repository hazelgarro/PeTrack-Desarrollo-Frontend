import PropTypes from "prop-types";
import "./styles.css";

export default function Button({ onClick = undefined, variant, variant2, size, children }) {
  return (
    <button onClick={onClick} className={`button ${variant ? `button--${variant}` : ""} ${variant2 ? `button--${variant2}` : ""}  ${size ? `button--${size}` : ""}`.trim()}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  variant: PropTypes.string.isRequired,
  variant2: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]).isRequired, // Define the possible sizes
  children: PropTypes.node.isRequired,
};