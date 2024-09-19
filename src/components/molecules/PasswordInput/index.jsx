import PropTypes from "prop-types";
import { CSSTransition } from 'react-transition-group';
import { useState } from "react";
import EyeOffIcon from "../../atoms/Icons/ShowHide/Hide";
import EyeShowIcon from "../../atoms/Icons/ShowHide/Show";
import "./styles.css";

export default function PasswordInput({ size }) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className={`password-input-container ${size ? `password-input--${size}` : ""} flex items-center border border-petrack-black rounded-full px-4 transition-all duration-300 border-petrack-black focus-within:border-petrack-black focus-within:ring-2 focus-within:ring-petrack-black`}>
        <input
            type={isVisible ? "text" : "password"}
            placeholder="Password"
            className="password-input w-full py-2 outline-none bg-transparent box-border"
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
};
