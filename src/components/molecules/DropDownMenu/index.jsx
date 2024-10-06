import './styles.css'; // Import the styles
import PropTypes from "prop-types";

export default function DropdownMenu({ isMenuOpen, size, children }) {
    return (
        <div className={`dropdown-menu ${size} ${isMenuOpen ? 'open' : 'closed'}`}>
            {isMenuOpen && children}
        </div>
    );
}

DropdownMenu.propTypes = {
    isMenuOpen: PropTypes.bool.isRequired,
    size: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};
