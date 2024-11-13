import PropTypes from "prop-types";
import "./styles.css";

export default function TextInput({ size, placeholder, name, value, onChange, isRequired=true, type="text"}) {
    return (
        <div className={`input-container ${size ? `input--${size}` : ""} flex items-center border rounded-full px-4 transition-all duration-300 border-gray-300 focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-500`}>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={(e) => onChange({ name, value: e.target.value })}
                required={isRequired}
                autoComplete={name}
                className="text-input w-full py-2 outline-none bg-transparent box-border"
            />
        </div>
    );
}

TextInput.propTypes = {
    size: PropTypes.oneOf(["small", "medium", "large", "extra-large", "extra-small"]).isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    isRequired: PropTypes.bool,
    type: PropTypes.string,
};