import PropTypes from "prop-types";
import ButtonSignUp from "../../atoms/Button";
import ButtonLogin from "../../atoms/Button";
import ProfileImage from "../../atoms/ProfileImage";
import Link from "../../atoms/Link";
import Logo from "../../atoms/Logo";
import userImage from "../../../assets/img/veterinary.webp";

export default function NavBar({ isAuthenticated }) {
    return (
        <div className="w-full bg-white">
            <nav className="flex justify-between items-center px-8 py-4">
                <a href="/homepage-fake-link">
                    <Logo size="extra-small"></Logo>
                </a>

                <div className="flex space-x-4 items-center">
                    <div className="p-2">
                        <Link href="/home" variant="green" size="small">Inicio</Link>
                        <Link href="/about" variant="green" size="small">Veterinarias</Link>
                        <Link href="/contact" variant="green" size="small">Adopción</Link>
                    </div>

                    {isAuthenticated ? (
                        <a href="/user-profile-fake-link">
                            <ProfileImage
                                imageSrc={userImage}
                                size="small"
                            />
                        </a>
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