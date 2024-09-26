import PropTypes from "prop-types";
import { useState } from "react";
import ArrowDownIcon from "../../atoms/Icons/Arrow"; // Import the ArrowDownIcon
import "./styles.css";

export default function SelectInput({
    size,
    placeholder,
    options,
    name,
    value,
    onChange,
    isRequired = true
}) {
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (event) => {
        const newValue = event.target.value;
        onChange({ name, value: newValue });
    };

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className={`input-container ${
                size ? `input--${size}` : ""
            } flex items-center border rounded-full px-4 transition-all duration-300 border-gray-300 focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-500`}
        >
            <select
                name={name}
                value={value}
                required={isRequired}
                onChange={handleChange} // Maneja el cambio correctamente
                onClick={toggleOpen}
                onBlur={() => setIsOpen(false)} // Cerrar el select al perder el foco
                className="select-input w-full py-2 outline-none bg-transparent box-border"
            >
                <option value="" disabled hidden>
                    {placeholder}
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ArrowDownIcon isRotated={isOpen} size="small" color="secondary" thickness="18" />
        </div>
    );
}

SelectInput.propTypes = {
    size: PropTypes.oneOf(["small", "medium", "large", "extra-large", "extra-small"]).isRequired,
    placeholder: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    isRequired: PropTypes.bool,
};