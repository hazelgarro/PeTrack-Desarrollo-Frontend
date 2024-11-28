import { useEffect, useState } from "react";
import Modal from "../../molecules/Modal";
import Form from "../Form";
import PasswordInput from "../../molecules/PasswordInput";
import Button from "../../atoms/Button";
import { getData } from "../../../utils/apiConnector";
import { showMessageDialog } from '../../../utils/customAlerts.jsx';

export default function ChangePassword({ userId, isOpen, toggleModal }) {
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    const [error, setError] = useState("");

    useEffect(() => {
        if (isOpen) { // Solo reiniciar cuando se abre el modal
            setPasswords({
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: ""
            });
            setError(""); // Limpiar el error al abrir el modal
        }
    }, [isOpen]);

    const [isTypingPassword, setIsTypingPassword] = useState(false);

    const validatePassword = (password) => {
        const lengthRegex = /^.{8,}$/;
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /\d/;
        const specialCharRegex = /[@$!%*?&#.,_-]/;

        if (!lengthRegex.test(password)) {
            return "La contraseña debe tener al menos 8 caracteres.";
        }
        if (!uppercaseRegex.test(password)) {
            return "La contraseña debe incluir al menos una letra mayúscula.";
        }
        if (!lowercaseRegex.test(password)) {
            return "La contraseña debe incluir al menos una letra minúscula.";
        }
        if (!numberRegex.test(password)) {
            return "La contraseña debe incluir al menos un número.";
        }
        if (!specialCharRegex.test(password)) {
            return "La contraseña debe incluir al menos un carácter especial (@, $, !, %, etc.).";
        }
        return ""; // Contraseña válida
    };

    const handleInputChange = ({ name, value }) => {

        setPasswords((prevData) => {
            const newData = {
                ...prevData,
                [name]: value,
            };

            if (name === "newPassword") {
                if (!isTypingPassword || value.length > 0) {
                    setIsTypingPassword(true);
                }
                if (value.length === 0) {
                    setIsTypingPassword(false);
                }
            }

            if (newData.newPassword !== newData.confirmNewPassword && (newData.newPassword.length > 0 && newData.confirmNewPassword.length > 0)) {
                setError("Las contraseñas no coinciden");
            } else {
                setError("");
            }

            return newData;
        });
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwords.newPassword !== passwords.confirmNewPassword) {
            setError("Las contraseñas no coinciden");
            return;
        } else if(passwords.newPassword.length < 8){
            setError("The password must be a minimum of 8 characters.");
            return;
        }
        const validationMessage = validatePassword(passwords.newPassword);
        if (validationMessage) {
            setErrorMessage(validationMessage);
            return;
        }

        const apiUrl = `https://www.APIPetrack.somee.com/User/ChangePassword/${userId}`;
        const body = {
            currentPassword: passwords.currentPassword,
            newPassword: passwords.newPassword
        };

        try {
            const apiResponse = await getData(apiUrl, body, true, "PUT");

            if (apiResponse.result) {
                showMessageDialog(apiResponse.message, "success", "top");
                toggleModal();
            } else {
                showMessageDialog(apiResponse.message, "warning", "top");
            }
        } catch (error) {
            console.log("Error changing password: ", error);
            await showMessageDialog("Error inesperado al cambiar la contraseña", "warning", "top");
            toggleModal();
        }
    };

    return (
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
            <Form title="Cambiar contraseña" type="edit" onSubmit={handleSubmit}>
                <p className="px-5">Contraseña actual</p>
                <PasswordInput
                    size="medium"
                    placeholder="Contraseña actual"
                    name="currentPassword"
                    value={passwords.currentPassword}
                    onChange={handleInputChange}
                />
                <hr className="my-2 border-t-2 border-gray-300" />

                <p className="px-5">Nueva contraseña</p>
                <PasswordInput
                    size="medium"
                    placeholder="Nueva contraseña"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handleInputChange}
                />
                {isTypingPassword && (
                        <ul className="text-sm text font-['Lato'] mb-3 ">
                            <li className={passwords.newPassword.length >= 8 ? "text-petrack-green" : "text-petrack-red"}>
                                Al menos 8 caracteres
                            </li>
                            <li className={/[A-Z]/.test(passwords.newPassword) ? "text-petrack-green" : "text-petrack-red"}>
                                Al menos una letra mayúscula
                            </li>
                            <li className={/[a-z]/.test(passwords.newPassword) ? "text-petrack-green" : "text-petrack-red"}>
                                Al menos una letra minúscula
                            </li>
                            <li className={/\d/.test(passwords.newPassword) ? "text-petrack-green" : "text-petrack-red"}>
                                Al menos un número
                            </li>
                            <li className={/[@$!%*?&#.,_-]/.test(passwords.newPassword) ? "text-petrack-green" : "text-petrack-red"}>
                                Al menos un carácter especial (@, $, !, etc.)
                            </li>
                        </ul>
                    )}
                <p className="px-5">Confirmar nueva contraseña</p>
                <PasswordInput
                    size="medium"
                    placeholder="Confirmar nueva contraseña"
                    name="confirmNewPassword"
                    value={passwords.confirmNewPassword}
                    onChange={handleInputChange}
                />
                {error && <p className="my-2 text-red-500">{error}</p>}
                <Button type="submit" size="small" variant="solid-green">
                    Cambiar
                </Button>
            </Form>
        </Modal>
    );
}