import PropTypes from 'prop-types';
import "../styles.css";

export default function Transfer({ size = 'medium', color = 'primary', thickness = '2', ...props }) {
  return (
    <svg className={`svg-icon svg-icon--${size} svg-icon--${color}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
      <path d="M19 9H6.65856C5.65277 9 5.14987 9 5.02472 8.69134C4.89957 8.38268 5.25517 8.01942 5.96637 7.29289L8.21091 5" stroke="currentColor" strokeWidth={thickness} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 15H17.3414C18.3472 15 18.8501 15 18.9753 15.3087C19.1004 15.6173 18.7448 15.9806 18.0336 16.7071L15.7891 19" stroke="currentColor" strokeWidth={thickness} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

Transfer.propTypes = {
  size: PropTypes.oneOf(["extra-small", "small", "medium", "large"]),
  color: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  thickness: PropTypes.string, // Ancho del trazo del ícono
};