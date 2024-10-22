import PropTypes from 'prop-types';
import "../styles.css";

export default function Clock({ variant = "outline", size = "medium", color = "primary", thickness = "2", ...props }) {
	const fillColor = variant === "outline" ? "none" : "currentColor";
	return (
		<svg
			className={`svg-icon svg-icon--${size} svg-icon--${color}`}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={24}
			height={24}
			color="currentColor"
			fill={fillColor}
			{...props}
		>
			<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={thickness} />
			<path
				d="M12 8V12L14 14"
				stroke="currentColor"
				strokeWidth={thickness}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

Clock.propTypes = {
	size: PropTypes.oneOf(["extra-small", "small", "medium", "large", "extra-large"]),
	color: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
	thickness: PropTypes.string, // Ancho del trazo del ícono
	variant: PropTypes.oneOf(["outline", "solid"]),
};
