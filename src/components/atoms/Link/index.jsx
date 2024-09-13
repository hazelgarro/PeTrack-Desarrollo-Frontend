import PropTypes from "prop-types";
import "./styles.css"; // Import the CSS file for the variants

export default function Link({ href, variant, size, children }) {
    return (
        <a
            href={href}
            className={`link ${variant ? `link--${variant}` : ""} ${size ? `link--${size}` : ""}`}
        >
            {children}
        </a>
    );
}

Link.propTypes = {
    href: PropTypes.string.isRequired, // URL to link
    variant: PropTypes.string.isRequired, // Color variant (e.g., "green")
    size: PropTypes.oneOf(["small", "medium", "large"]).isRequired, // Size variant
    children: PropTypes.node.isRequired, // Link text or content
};
