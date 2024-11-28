import PropTypes from "prop-types";
import "./styles.css";

export default function TextInput({ size, placeholder, name, value, onChange, isRequired = true, type = "text" }) {
    // Si el tipo es "date", establece la fecha máxima como la fecha actual
    const maxDate = type === "date" ? new Date().toISOString().split("T")[0] : undefined;

    return (
        <div
            className={`input-container ${size ? `input--${size}` : ""} flex items-center border rounded-full px-4 transition-all duration-300 border-gray-300 focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-500`}
        >
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={(e) => onChange({ name, value: e.target.value })}
                required={isRequired}
                autoComplete={name}
                max={maxDate} // Agrega el atributo max dinámicamente
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
