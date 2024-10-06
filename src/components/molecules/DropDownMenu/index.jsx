import './styles.css'; // Import the styles
import PropTypes from "prop-types";

export default function DropdownMenu({ isMenuOpen, size, children }) {
    return (
        isMenuOpen && (
            <div className={`dropdown-menu ${size}`}>
                {children}
            </div>
        )
    );
}

DropdownMenu.propTypes = {
    isMenuOpen: PropTypes.bool.isRequired,
    size: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};
