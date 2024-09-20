import PropTypes from 'prop-types';
import './styles.css';

export default function ArrowDownIcon({ size = 'medium', color = 'primary', thickness = '2', ...props }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 330 330"
            className={`svg-icon svg-icon--${size} svg-icon--${color}`}
            fill="none"
            {...props}
        >
            <path
                d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
                c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150
                c2.813,2.813,6.628,4.393,10.606,4.393s7.794-1.581,10.606-4.394l149.996-150
                C331.465,94.749,331.465,85.251,325.607,79.393z"
                fill="currentColor"
                stroke="currentColor" // Add stroke color
                strokeWidth={thickness} // Add stroke width
            />
        </svg>
    );
}

ArrowDownIcon.propTypes = {
    size: PropTypes.string,
    color: PropTypes.string,
    thickness: PropTypes.string, // Add thickness prop
};
