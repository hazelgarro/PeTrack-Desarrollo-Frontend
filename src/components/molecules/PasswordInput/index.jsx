import PropTypes from "prop-types";
import { CSSTransition } from 'react-transition-group';
import { useState } from "react";
import EyeOffIcon from "../../atoms/Icons/ShowHide/Hide";
import EyeShowIcon from "../../atoms/Icons/ShowHide/Show";
// import "./styles.css";

export default function PasswordInput({ size, placeholder }) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className={`password-input-container ${size ? `password-input--${size}` : ""} flex items-center border rounded-full px-4 transition-all duration-300 border-gray-300 focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-500 mb-3`}>
            <input
                type={isVisible ? "text" : "password"}
                placeholder={placeholder}
                className="password-input w-full  outline-none bg-transparent box-border "
            />
            <span onClick={toggleVisibility} className="password-toggle cursor-pointer text-gray-500 hover:text-petrack-black ml-2">
                <div className="relative">
                    <CSSTransition
                        in={isVisible}
                        timeout={300}
                        classNames="eye-icon"
                        unmountOnExit
                    >
                        <EyeOffIcon size="medium" color="secondary" className="eye-icon-transition" />
                    </CSSTransition>
                    <CSSTransition
                        in={!isVisible}
                        timeout={300}
                        classNames="eye-icon"
                        unmountOnExit
                    >
                        <EyeShowIcon size="medium" color="secondary" className="eye-icon-transition" />
                    </CSSTransition>
                </div>
            </span>
        </div>
    );
}

PasswordInput.propTypes = {
    size: PropTypes.oneOf(["small", "medium", "large", "extra-large", "extra-small"]).isRequired,
    placeholder: PropTypes.string.isRequired,
};
