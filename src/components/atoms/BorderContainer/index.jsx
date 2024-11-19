import PropTypes from "prop-types"

export default function BorderContainer({ color, children }) {
    return (
        <div className={`bg-white border-2 ${color || "border-petrack-green"} rounded-lg`}>
            {children}
        </div>
    );
}

BorderContainer.PropTypes = {
    color: PropTypes.string
};