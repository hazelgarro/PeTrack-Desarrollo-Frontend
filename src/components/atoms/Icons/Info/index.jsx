import PropTypes from 'prop-types';
import "../styles.css";

export default function Info({ size = 'medium', color = 'primary', thickness = '2', ...props }) {
    return (
        <svg className={`svg-icon svg-icon--${size} svg-icon--${color}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={thickness} />
            <path d="M11.992 15H12.001" stroke="currentColor" strokeWidth={thickness} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 12L12 8" stroke="currentColor" strokeWidth={thickness} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

Info.propTypes = {
    size: PropTypes.oneOf(["extra-small", "small", "medium", "large", "extra-large", "extra-extra-large"]),
    color: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
    thickness: PropTypes.string, // Ancho del trazo del ícono
    props: PropTypes.string, // define estilos extra para el svg
};