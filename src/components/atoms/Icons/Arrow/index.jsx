import PropTypes from 'prop-types';
import '../styles.css';

export default function ArrowDownIcon({
  size = 'medium',
  color = 'primary',
  initialDirection = 'down',
  isRotated = false,
  thickness = '2',
  ...props
}) {
  // Determina la clase de rotación en función de la dirección inicial y el estado de rotación
  const rotationClass = () => {
    if (initialDirection === 'right') {
      return isRotated ? 'rotate-0' : '-rotate-90'; // De "right" a "down"
    } else if (initialDirection === 'down') {
      return isRotated ? 'rotate-180' : 'rotate-0'; // De "down" a "up"
    }
    return 'rotate-0'; // Por defecto, sin rotación
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 330 330"
      className={`svg-icon svg-icon--${size} svg-icon--${color} transition-transform duration-300 ${rotationClass()}`}
      fill="none"
      {...props}
    >
      <path
        d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
          c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150
          c2.813,2.813,6.628,4.393,10.606,4.393s7.794-1.581,10.606-4.394l149.996-150
          C331.465,94.749,331.465,85.251,325.607,79.393z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={thickness}
      />
    </svg>
  );
}

ArrowDownIcon.propTypes = {
  size: PropTypes.oneOf(["extra-small", "small", "medium", "large"]),
  color: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  initialDirection: PropTypes.oneOf(["down", "right"]), // Puede ser "down" o "right"
  isRotated: PropTypes.bool, // Controla si el ícono debe estar rotado o no
  thickness: PropTypes.string, // Ancho del trazo del ícono
};
