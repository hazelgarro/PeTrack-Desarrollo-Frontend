
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
        if (currentVariant === "menuHamburgerIcon") {
            setIsMenuOpen(!isMenuOpen);
        }
    };

    return (
        <div className="w-full bg-white">
            <nav className="flex justify-between items-center px-8 py-4">
                <a href="/Homepage">
                    <Logo size="extra-small" />
                </a>

                <div className="flex space-x-4 items-center">
                    <div className="p-2">
                        <Link href="/Homepage" variant={variant} size="small">Inicio</Link>
                        <Link href="/about" variant={variant} size="small">Veterinarias</Link>
                        <Link href="/contact" variant={variant} size="small">Adopción</Link>
                    </div>

                    {isAuthenticated ? (
                        currentVariant === "menuHamburgerIcon" ? (
                            <div className="relative">
                                <button onClick={toggleMenu}>
                                    <MenuHamburgerIcon size="small" />
                                </button>
                                <DropdownMenu 
                                    isMenuOpen={isMenuOpen} 
                                    size={"size-extra-small"}
                                >
                                    <Link href="/settings" variant={variant} className="dropdown-link">Configuración</Link>
                                    <Link href="/logout" variant={variant} className="dropdown-link">Cerrar Sesión</Link>
                                </DropdownMenu>
                            </div>
                        ) : (
                            <a href="/PetOwnerProfile">
                                <ProfileImage imageSrc={userImage} size="small" />
                            </a>
                        )
                    ) : (
                        <>
                            <a href="/Login">
                                <ButtonLogin variant={`border-${variant}`} size="extra-small">Login</ButtonLogin>
                            </a>
                            <a href="/Signup">
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
