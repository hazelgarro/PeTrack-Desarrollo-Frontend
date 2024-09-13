import PropTypes from "prop-types";
import ButtonSignUp from "../../atoms/Button";
import ButtonLogin from "../../atoms/Button";
import Profile from "../../atoms/Profile";
import Link from "../../atoms/Link";

export default function NavBar({ isAuthenticated }) {
    return (
        <div className="w-full bg-white">
            <nav className="flex justify-between items-center px-8 py-4">
                {/* Logo */}
                <a href="/homepage-fake-link">
                    <img 
                        src="/src/assets/img/PetrackTextWithLogo.svg" 
                        alt="Petrack Logo"
                        className="w-36" 
                    />
                </a>

                <div className="flex space-x-4 items-center">
                    {/* Common Links */}
                    <div className="p-2">
                        <Link href="/home" variant="green" size="small">Inicio</Link>
                        <Link href="/about" variant="green" size="small">Veterinarias</Link>
                        <Link href="/contact" variant="green" size="small">Adopción</Link>
                    </div>

                    {isAuthenticated ? (
                        <Profile 
                            imageSrc="/src/assets/img/veterinary.webp" /* NEEDS Method to get actual profile image */
                            profileLink="/user-profile-fake-link" /* NEEDS Method to get profile link */
                        />
                    ) : (
                        <>
                            <a href="/login-fake-link">
                                <ButtonLogin variant="border-green" size="extra-small">Login</ButtonLogin>
                            </a>
                            <a href="/signup-fake-link">
                                <ButtonSignUp variant="solid-green" size="extra-small">Sign Up</ButtonSignUp>
                            </a>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
}


NavBar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};