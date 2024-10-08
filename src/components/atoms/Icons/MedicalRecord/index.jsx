import PropTypes from 'prop-types';
import "../styles.css";

export default function MedicalRecord({ variant = "outline", size = "medium", color = "primary", thickness = "2", ...props }) {
	const fillColor = variant === "outline" ? "none" : "currentColor";
	return (
        <svg className={`svg-icon svg-icon--${size} svg-icon--${color}`}
        xmlns="http://www.w3.org/2000/svg"
        width={120}
        height={128}
        viewBox="0 0 120 128"
        fill="none"
        color="currentColor" // Cambiado para que use currentColor
        {...props}
        >

        <path d={`M5 51.7919C5 29.4117 5 18.2186 12.1492 11.2689C19.2984 4.31917 30.7969 4.31323 53.8 4.31323H66C89.0031 4.31323 100.508 4.31323 107.651 11.2689C114.794 18.2245 114.8 29.4117 114.8 51.7919V75.5313C114.8 97.9116 114.8 109.105 107.651 116.054C100.502 123.004 89.0031 123.01 66 123.01H53.8C30.7969 123.01 19.2923 123.01 12.1492 116.054C5.0061 109.099 5 97.9116 5 75.5313V51.7919Z`}
         stroke="currentColor" stroke-width={thickness} fill={fillColor}/>
        <path d={`M59.9 28.0525V39.9222M59.9 39.9222V51.7918M59.9 39.9222H47.7M59.9 39.9222H72.1M35.5 75.5312H84.3M41.6 99.2705H78.2`} 
        stroke="currentColor" stroke-width={thickness} stroke-linecap="round"/>
        </svg>
	);
}

MedicalRecord.propTypes = {
	size: PropTypes.oneOf(["extra-small", "small", "medium", "large"]),
	color: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
	thickness: PropTypes.string, // Ancho del trazo del ícono
	variant: PropTypes.oneOf(["outline", "solid"]),
};