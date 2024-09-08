import PropTypes from "prop-types";
import ButtonSignUp from "../../atoms/Button";
import ButtonLogin from "../../atoms/Button";

export default function NavBar() {
    return (
        <div className="w-full bg-white shadow-md">
            <nav className="flex justify-between items-center px-8 py-4">
                <img 
                    src="/src/assets/img/PetrackTextWithLogo.svg" 
                    alt="Petrack Logo"
                    className="w-32" 
                />
            </nav>
                <div className="flex space-x-4">
                    <ButtonLogin variant="border-green">Login</ButtonLogin>
                    <ButtonSignUp variant="solid-green">Sign Up</ButtonSignUp>
                </div>
        </div>
    );
}


Button.propTypes = {
    variant: PropTypes.string.isRequired,
};