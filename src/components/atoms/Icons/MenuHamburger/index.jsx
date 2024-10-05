import PropTypes from 'prop-types';
import "../styles.css";

export default function MenuHamburgerIcon({ size = 'medium', color = 'primary', thickness = '1.5', ...props }) {
    return (
        <svg className={`svg-icon svg-icon--${size} svg-icon--${color}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="none" {...props}>
            <path d="M4 5L20 5" stroke="currentColor" strokeWidth={thickness} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 12L20 12" stroke="currentColor" strokeWidth={thickness} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 19L20 19" stroke="currentColor" strokeWidth={thickness} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

MenuHamburgerIcon.propTypes = {
    size: PropTypes.oneOf(["extra-small", "small", "medium", "large"]),
    color: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
    thickness: PropTypes.string, // Width of the icon's stroke
};
