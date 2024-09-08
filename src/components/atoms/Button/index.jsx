import PropTypes from "prop-types";
import "./styles.css";

export default function Button({ variant, children }) {
  return (
    <div>
      <button
        className={`button ${
          variant ? `button--${variant}` : ""
        }`.trim()}
      >
        {children}
      </button>
    </div>
  );
}

Button.propTypes = {
  variant: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
