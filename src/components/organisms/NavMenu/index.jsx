
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ButtonSignUp from "../../atoms/Button";
import ButtonLogin from "../../atoms/Button";
import Link from "../../atoms/Link";
import Logo from "../../atoms/Logo";
import { useOpenClose } from "../../../hooks/useOpenClose";
import MenuHamburgerIcon from "../../atoms/Icons/MenuHamburger";
import DropdownMenu from "../../molecules/DropDownMenu"; // Ensure the path is correct
import { logoutUser } from "../../../utils/sessionManager.js";
import { useSession } from '../../../context/SessionContext';
import { useNavigate } from "react-router-dom";
import { getData } from "../../../utils/apiConnector.js";
import ChangePassword from "../ChangePassword/index.jsx";


export default function NavMenu({ variant = "" }) {
    const { isOpen, toggleModal } = useOpenClose();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentVariant, setCurrentVariant] = useState(variant);
    const { userData, updateSessionState, isAuthenticated } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentVariant(variant);
    }, [variant, isAuthenticated]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const logout = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to log out?")) {
            logoutUser();
            updateSessionState();
            navigate("/");
        }
    };

    const deleteAccount = async (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete your account?\nThis action is irreversible.")) {
            try {
                const apiUrl = `https://www.APIPetrack.somee.com/User/DeleteAccount/${userData.id}`;
                const apiResponse = await getData(apiUrl, null, true, "DELETE");
                if (apiResponse.result) {
                    alert("The user has been successfully deleted");
                    logoutUser();
                    updateSessionState();
                    navigate("/");
                } else {
                    alert(apiResponse.message);
                }
            } catch (error) {
                console.log("Error deleting account", error);
                alert("Error deleting account");
            }
        }
    };

    const onClickPasswordChange = () => {
        toggleMenu();
        toggleModal();
    };

    return (
        <div className="w-full bg-white">
            <nav className="flex justify-between items-center px-5 py-4">
                <div>
                    <a href="/Homepage">
                        <Logo size="extra-small" />
                    </a>
                </div>
                <div className="flex gap-4">

                

                <ChangePassword userId={userData.id} isOpen={isOpen} toggleModal={toggleModal} />

                <div className="relative">
                    {/* Menu icon that toggles dropdown */}
                    <button onClick={toggleMenu} className="p-2">
                        <MenuHamburgerIcon size="small" />
                    </button>

                    {/* Dropdown menu content */}
                    {isMenuOpen && (

                        <DropdownMenu isMenuOpen={isMenuOpen} size={"size-extra-small"}>
                            <Link href="/Homepage" variant={variant} size="small">Inicio</Link>
                            <Link href="/ShelterListPage" variant={variant} size="small">Adopción</Link>
                            <Link href="/PetRegister" variant={variant} size="small">Registrar mascota</Link>

                            {isAuthenticated ? (

                                <>
                                    <Link onClick={onClickPasswordChange} variant={variant} className="dropdown-link">Cambiar contraseña</Link>
                                    <Link onClick={deleteAccount} variant={variant} className="dropdown-link">Eliminar cuenta</Link>
                                    <Link onClick={logout} variant={variant} className="dropdown-link">Cerrar sesión</Link>

                                </>
                            ) : (
                                <>
                                <div className="flex flex-col gap-6 ml-3 mb-6">

                                    <a href="/Login">
                                        <ButtonLogin variant="border-green" size="extra-small">Iniciar sesión</ButtonLogin>
                                    </a>
                                    <a href="/Signup">
                                        <ButtonSignUp variant="solid-green" size="extra-small">Registrarse</ButtonSignUp>
                                    </a>
                                </div>
                                </>
                            )}
                        </DropdownMenu>
                    )}
                </div>

                </div>
            </nav>
        </div>
    );
}

NavMenu.propTypes = {
    variant: PropTypes.string,
};