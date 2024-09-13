import PropTypes from "prop-types";
import "./styles.css";

export default function Button({ variant, size, children }) {
  return (
    <div>
      <button
        className={`button ${
          variant ? `button--${variant}` : ""
        } ${size ? `button--${size}` : ""}`.trim()}
      >
        {children}
      </button>
    </div>
  );
}

Button.propTypes = {
  variant: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]).isRequired, // Define the possible sizes
  children: PropTypes.node.isRequired,
};
