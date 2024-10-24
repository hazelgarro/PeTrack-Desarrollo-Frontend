import PropTypes from 'prop-types';
import "../styles.css";

export default function Location({ variant = "outline", size = "medium", color = "primary", thickness = "2", ...props }) {
	const fillColor = variant === "outline" ? "none" : "currentColor";
	return (
		<svg
			className={`svg-icon svg-icon--${size} svg-icon--${color}`}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={24}
			height={24}
			color="currentColor" // Cambiado para que use currentColor
			fill="none"
			{...props}
		>
			<path
				d={`M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z
      M12 7.5C10.067 7.5 8.5 9.067 8.5 11C8.5 12.933 10.067 14.5 12 14.5C13.933 14.5 15.5 12.933 15.5 11C15.5 9.067 13.933 7.5 12 7.5Z`}
				stroke="currentColor"
				strokeWidth={thickness}
				fill={fillColor}
			/>
		</svg>
	);
}

Location.propTypes = {
	size: PropTypes.oneOf(["extra-small", "small", "medium", "large", "extra-large"]),
	color: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
	thickness: PropTypes.string, // Ancho del trazo del ícono
	variant: PropTypes.oneOf(["outline", "solid"]),
};