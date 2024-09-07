import PropTypes from "prop-types";
import "./styles.css";

export default function ButtonLarge({ variant, children }) {
  return (
    <div>
      <button
        className={`buttonLarge ${
          variant ? `buttonLarge--${variant}` : ""
        }`.trim()}
      >
        {children}
      </button>
    </div>
  );
}

ButtonLarge.propTypes = {
  variant: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
