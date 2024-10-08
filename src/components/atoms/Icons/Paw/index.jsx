import PropTypes from 'prop-types';
import "../styles.css";

export default function Paw({ variant = "outline", size = "medium", color = "primary", thickness = "2", ...props }) {
	const fillColor = variant === "outline" ? "none" : "currentColor";
	return (
        <svg className={`svg-icon svg-icon--${size} svg-icon--${color}`}
        xmlns="http://www.w3.org/2000/svg"
        width={120}
        height={128}
        viewBox="0 0 120 121"
        fill="primary"
        color="currentColor" // Cambiado para que use currentColor
        {...props}
        >

        
        <path d={`M76.4444 46.8468C88 46.8468 95.1111 30.4739 95.1111 20.1331C95.1111 11.5158 90.6667 1.17496 81.7778 1.17496C70.2222 1.17496 63.1111 17.5479 63.1111 27.8887C63.1111 36.506 67.5556 46.8468 76.4444 46.8468ZM42.6667 46.8468C51.5556 46.8468 56 36.506 56 27.8887C56 16.6862 48.8889 0.313232 37.3333 0.313232C28.4444 0.313232 24 10.654 24 19.2714C23.1111 30.4739 30.2222 46.8468 42.6667 46.8468ZM108.444 38.2295C96.8889 38.2295 88.8889 53.7407 88.8889 64.9432C88.8889 72.6988 92.4445 80.4544 100.444 80.4544C112 80.4544 120 64.9432 120 53.7407C120 45.9851 115.556 38.2295 108.444 38.2295ZM31.1111 64.9432C31.1111 53.7407 22.2222 38.2295 11.5556 38.2295C3.55556 38.2295 0 45.9851 0 53.7407C0 64.9432 8.88889 80.4544 19.5556 80.4544C27.5556 80.4544 31.1111 72.6988 31.1111 64.9432ZM59.5556 63.2197C41.7778 63.2197 17.7778 90.7952 17.7778 109.753C17.7778 118.371 24 120.956 31.1111 120.956C41.7778 120.956 49.7778 114.062 59.5556 114.062C68.4444 114.062 76.4444 120.956 86.2222 120.956C93.3333 120.956 101.333 119.232 101.333 109.753C101.333 90.7952 77.3333 63.2197 59.5556 63.2197Z`}
         fill={fillColor}/>
        </svg>


	);
}

Paw.propTypes = {
	size: PropTypes.oneOf(["extra-small", "small", "medium", "large"]),
	color: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
	thickness: PropTypes.string, // Ancho del trazo del ícono
	variant: PropTypes.oneOf(["outline", "solid"]),
};