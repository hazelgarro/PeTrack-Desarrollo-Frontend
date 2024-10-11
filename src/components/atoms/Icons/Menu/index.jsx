import PropTypes from 'prop-types';
import "../styles.css";

export default function Menu({ size = 'medium', color = 'primary', ...props }) {
  return (
    <svg className={`svg-icon svg-icon--${size} svg-icon--${color}`} xmlns="http://www.w3.org/2000/svg"
      width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      {/* Círculo blanco de fondo */}
      <circle cx="12" cy="12" r="9" fill="#FFFFFF" />
      {/* Icono original */}
      <path fill="currentColor" fillRule="evenodd"
        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m8.5-4.5A1.5 1.5 0 0 1 12 6h.01a1.5 1.5 0 0 1 1.5 1.5v.01a1.5 1.5 0 0 1-1.5 1.5H12a1.5 1.5 0 0 1-1.5-1.5zm1.5 3a1.5 1.5 0 0 0-1.5 1.5v.01a1.5 1.5 0 0 0 1.5 1.5h.01a1.5 1.5 0 0 0 1.5-1.5V12a1.5 1.5 0 0 0-1.5-1.5zm0 4.5a1.5 1.5 0 0 0-1.5 1.5v.01a1.5 1.5 0 0 0 1.5 1.5h.01a1.5 1.5 0 0 0 1.5-1.5v-.01a1.5 1.5 0 0 0-1.5-1.5z"
        clipRule="evenodd"></path>
    </svg>
  );
}

Menu.propTypes = {
	size: PropTypes.oneOf(["extra-small", "small", "medium", "large", "extra-large"]),
	color: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
};
