import PropTypes from "prop-types";
import { useState } from "react";
import ArrowDownIcon from "../../atoms/Icons/ArrowDown"; // Import the ArrowDownIcon
import "./styles.css";

export default function SelectInput({ size, placeholder, options }) {
    const [selectedValue, setSelectedValue] = useState("");
    const [isOpen, setIsOpen] = useState(false); // Track if the select is open or closed

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const toggleOpen = () => {
        setIsOpen(!isOpen); // Toggle open state
    };

    return (
        <div
            className={`input-container ${
                size ? `input--${size}` : ""
            } flex items-center border rounded-full px-4 transition-all duration-300 border-gray-300 focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-500`}
        >
            <select
                value={selectedValue}
                onChange={handleChange}
                onClick={toggleOpen}
                onBlur={() => setIsOpen(false)} // Close when losing focus
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
            <span
                className={`input-icon ml-2 text-gray-500 ${
                    isOpen ? "rotate-180" : ""
                }`}
            >
                <ArrowDownIcon size="small" color="secondary" thickness="18" />
            </span>
        </div>
    );
}

SelectInput.propTypes = {
    size: PropTypes.oneOf([
        "small",
        "medium",
        "large",
        "extra-large",
        "extra-small",
    ]).isRequired,
    placeholder: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
};
