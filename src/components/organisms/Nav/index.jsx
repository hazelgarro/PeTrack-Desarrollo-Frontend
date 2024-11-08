import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ButtonSignUp from "../../atoms/Button";
import ButtonLogin from "../../atoms/Button";
import ProfileImage from "../../atoms/ProfileImage";
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


export default function NavBar({ variant = "" }) {
    const { isOpen, toggleModal } = useOpenClose();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentVariant, setCurrentVariant] = useState(variant);
    const { userData, updateSessionState, isAuthenticated } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentVariant(variant);
    }, [variant, isAuthenticated]);

    const toggleMenu = () => {
        if (currentVariant === "menuHamburgerIcon") {
            setIsMenuOpen(!isMenuOpen);
        }
    };

    const logout = (e) => {
        e.preventDefault();

        const isConfirmed = window.confirm("Are you sure you want to log out?");

        if (isConfirmed) {
            logoutUser();
            updateSessionState();
            navigate("/");
        }
    }

    const deleteAccount = async (e) => {
        e.preventDefault();

        const isConfirmed = window.confirm("Are you sure you want to delete your account?\nThis action is irreversible.");

        if (isConfirmed) {
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
    }

    const onClickPasswordChange = () =>{
        toggleMenu();
        toggleModal();
    }

    return (
        <div className="w-full bg-white">
            <nav className="flex justify-between items-center px-8 py-4">
                <a href="/Homepage">
                    <Logo size="extra-small" />
                </a>

                <ChangePassword userId={userData.id} isOpen={isOpen} toggleModal={toggleModal}></ChangePassword>

                <div className="flex space-x-4 items-center">
                    <div className="p-2">
                        <Link href="/Homepage" variant={variant} size="small">Inicio</Link>
                        <Link href="/ShelterListPage" variant={variant} size="small">Adopción</Link>
                        <Link href="/PetRegister" variant={variant} size="small">Registrar mascota</Link>
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
                                    <Link onClick={onClickPasswordChange} variant={variant} className="dropdown-link">Change password</Link>
                                    <Link onClick={deleteAccount} variant={variant} className="dropdown-link">Delete account</Link>
                                    <Link onClick={logout} variant={variant} className="dropdown-link">Log out</Link>
                                    
                                </DropdownMenu>
                            </div>
                        ) : (
                            <a href={userData.userTypeId === "O" ? "/PetOwnerProfile" : "/ShelterProfile"}>
                                <ProfileImage imageSrc={userData.profilePicture} size="small" />
                            </a>
                        )
                    ) : (
                        <>
                            <a href="/Login">
                                <ButtonLogin variant={`border-green`} size="extra-small">Login</ButtonLogin>
                            </a>
                            <a href="/Signup">
                                <ButtonSignUp variant={`solid-green`} size="extra-small">Sign Up</ButtonSignUp>
                            </a>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
}

NavBar.propTypes = {
    variant: PropTypes.string,
};