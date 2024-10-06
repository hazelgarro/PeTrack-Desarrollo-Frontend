import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ButtonSignUp from "../../atoms/Button";
import ButtonLogin from "../../atoms/Button";
import ProfileImage from "../../atoms/ProfileImage";
import Link from "../../atoms/Link";
import Logo from "../../atoms/Logo";
import userImage from "../../../assets/img/veterinary.webp";
import MenuHamburgerIcon from "../../atoms/Icons/MenuHamburger";

export default function NavBar({ isAuthenticated, variant = "" }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentVariant, setCurrentVariant] = useState(variant);

    useEffect(() => {
        setCurrentVariant(variant);
    }, [variant]);

    const toggleMenu = () => {
        if (currentVariant === "menuHamburgerIcon") {
            setIsMenuOpen(!isMenuOpen);
        }
    };

    return (
        <div className="w-full bg-white">
            <nav className="flex justify-between items-center px-8 py-4">
                <a href="/homepage-fake-link">
                    <Logo size="extra-small" />
                </a>

                <div className="flex space-x-4 items-center">
                    <div className="p-2">
                        <Link href="/home" variant={variant} size="small">Inicio</Link>
                        <Link href="/about" variant={variant} size="small">Veterinarias</Link>
                        <Link href="/contact" variant={variant} size="small">Adopción</Link>
                    </div>

                    {isAuthenticated ? (
                        currentVariant === "menuHamburgerIcon" ? (
                            <div className="relative">
                                <button onClick={toggleMenu}>
                                    <MenuHamburgerIcon size="small" />
                                </button>
                                {isMenuOpen && (
                                    <div className="flex flex-col absolute right-0 mt-2 w-48 bg-white shadow-lg z-50 rounded-md border">
                                        <Link href="/settings" variant={variant} size="small" className="block px-4 py-2">Configuración</Link>
                                        <Link href="/logout" variant={variant} size="small" className="block px-4 py-2">Cerrar Sesión</Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <a href="/user-profile-fake-link">
                                <ProfileImage imageSrc={userImage} size="small" />
                            </a>
                        )
                    ) : (
                        <>
                            <a href="/login-fake-link">
                                <ButtonLogin variant={`border-${variant}`} size="extra-small">Login</ButtonLogin>
                            </a>
                            <a href="/signup-fake-link">
                                <ButtonSignUp variant={`solid-${variant}`} size="extra-small">Sign Up</ButtonSignUp>
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
    variant: PropTypes.string,
};
