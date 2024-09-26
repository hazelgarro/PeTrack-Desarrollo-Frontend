import PropTypes from "prop-types";
import "./styles.css";

export default function TextInput({ size, placeholder, value, onChange, required=true}) {
    const handleChange = (e) => {
        const newValue = e.target.value;
        console.log("Nuevo valor:", newValue); // Imprime el valor en la consola cada vez que cambie
        onChange(newValue);  // Llama al onChange con el nuevo valor
    };

    return (
        <div className={`input-container ${size ? `input--${size}` : ""} flex items-center border rounded-full px-4 transition-all duration-300 border-gray-300 focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-500`}>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(handleChange)}
                required={required}
                className="text-input w-full py-2 outline-none bg-transparent box-border"
            />
        </div>
    );
}

TextInput.propTypes = {
    size: PropTypes.oneOf(["small", "medium", "large", "extra-large", "extra-small"]).isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
};