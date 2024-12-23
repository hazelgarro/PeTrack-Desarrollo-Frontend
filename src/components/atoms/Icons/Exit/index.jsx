import PropTypes from 'prop-types';
import "../styles.css";
import "./styles.css";//archivo propio de este componente para animaciones

export default function Exit({ size = 'medium', color = 'primary', thickness = '2', animate = false, animationDuration = 3000, ...props }) {
    return (
        <svg
            className={`svg-icon svg-icon--${size} svg-icon--${color}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            
            width={24}
            height={24}
            color={"#000000"}
            fill={"none"}
            {...props}
        >
            {/* La "X" */}
            <path
                d="M14.9994 15L9 9M9.00064 15L15 9"
                stroke="currentColor"
                strokeWidth={thickness}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Círculo animado */}
            <path
                d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                stroke="currentColor"
                strokeWidth={thickness}
                className={animate ? "exit-circle-animation" : ""}
                style={{
                    transform: "rotate(-90deg)", // Rotar para que empiece arriba
                    transformOrigin: "center", // Asegurar que la rotación sea desde el centro
                    animationDuration: `${animationDuration}ms`,
                }}
            />
        </svg>
    );
}

Exit.propTypes = {
    size: PropTypes.oneOf(["extra-small", "small", "medium", "large"]),
    color: PropTypes.oneOf(["primary", "secondary", "tertiary", "danger"]),
    thickness: PropTypes.string, // Ancho del trazo del ícono
};