import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ButtonSignUp from "../../atoms/Button";
import ButtonLogin from "../../atoms/Button";
import ProfileImage from "../../atoms/ProfileImage";
import Link from "../../atoms/Link";
import Logo from "../../atoms/Logo";
import userImage from "../../../assets/img/veterinary.webp";
import MenuHamburgerIcon from "../../atoms/Icons/MenuHamburger";
import DropdownMenu from "../../molecules/DropDownMenu"; // Ensure the path is correct

export default function NavBar({ isAuthenticated, variant = "" }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentVariant, setCurrentVariant] = useState(variant);

    useEffect(() => {
        setCurrentVariant(variant);
    }, [variant]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="w-full bg-white">
            <nav className="flex justify-between items-center px-8 py-4">
                <a href="/homepage-fake-link">
                    <Logo size="extra-small" />
                </a>

                {/* Mostrar icono de menú en móvil y enlaces en desktop */}
                <div className="hidden md:flex space-x-4 items-center">
                    <div className="p-2">
                        <Link href="/home" variant={variant} size="small">Inicio</Link>
                        <Link href="/about" variant={variant} size="small">Veterinarias</Link>
                        <Link href="/contact" variant={variant} size="small">Adopción</Link>
                    </div>

                    {isAuthenticated ? (
                        <>
                            <a href="/user-profile-fake-link">
                                <ProfileImage imageSrc={userImage} size="small" />
                            </a>
                        </>
                    ) : (
                        <>
                            <a href="/login-fake-link">
                                <ButtonLogin variant={`${variant}`} size="extra-small">Login</ButtonLogin>
                            </a>
                            <a href="/signup-fake-link">
                                <ButtonSignUp variant={`${variant}`} size="extra-small">Sign Up</ButtonSignUp>
                            </a>
                        </>
                    )}
                </div>

                {/* Icono de menú hamburguesa en móvil */}
                <div className="md:hidden">
                    {isAuthenticated ? (
                        <div className="relative">
                            <button onClick={toggleMenu}>
                                <MenuHamburgerIcon size="small" />
                            </button>
                            <DropdownMenu 
                                isMenuOpen={isMenuOpen} 
                                size={"medium"}
                                onClose={() => setIsMenuOpen(false)} // Añade un método para cerrar el menú
                            >
                                <Link href="/home" variant={variant} className="dropdown-link">Inicio</Link>
                                <Link href="/about" variant={variant} className="dropdown-link">Veterinarias</Link>
                                <Link href="/contact" variant={variant} className="dropdown-link">Adopción</Link>
                                <Link href="/settings" variant={variant} className="dropdown-link">Configuración</Link>
                                <Link href="/logout" variant={variant} className="dropdown-link">Cerrar Sesión</Link>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <div className="flex space-x-2">
                            <a href="/login-fake-link">
                                <ButtonLogin variant={`${variant}`} size="extra-small">Login</ButtonLogin>
                            </a>
                            <a href="/signup-fake-link">
                                <ButtonSignUp variant={`${variant}`} size="extra-small">Sign Up</ButtonSignUp>
                            </a>
                        </div>
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
