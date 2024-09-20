import PropTypes from "prop-types";
import "./styles.css";

export default function Button({ onClick, variant, size, children }) {
  return (
    <button onClick={onClick} className={`button ${variant ? `button--${variant}` : ""} ${size ? `button--${size}` : ""}`.trim()}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  variant: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]).isRequired, // Define the possible sizes
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  onClick: undefined,
};