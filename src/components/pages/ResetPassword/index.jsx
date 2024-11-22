import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import PasswordInput from "../../molecules/PasswordInput";
import Button from "../../atoms/Button";
import Form from "../../organisms/Form";
import AccountForm from "../../templates/AccountForm";
import Loader from "../../atoms/Loader";
import { getData } from "../../../utils/apiConnector.js";
import { showMessageDialog } from "../../../utils/customAlerts.jsx";

export default function ResetPassword() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [passwords, setPasswords] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    const handleInputChange = ({ name, value }) => {
        setPasswords((prevData) => {
            const newData = {
                ...prevData,
                [name]: value
            };

            if (newData.newPassword === newData.confirmPassword) {
                setErrorMessage("");
            } else {
                setErrorMessage("Las contraseñas no coinciden");
            }

            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(token);

        if (passwords.newPassword !== passwords.confirmPassword) {
            return;
        } else if (passwords.newPassword.length < 8) {
            setErrorMessage("La contraseña debe de tener mínimo 8 caracteres");
            return;
        }

        setIsLoading(true);

        try {
            const apiUrl = "https://www.APIPetrack.somee.com/User/ResetPassword";
            const body = {newPassword : passwords.newPassword, confirmPassword : passwords.confirmPassword, token: token};
            const apiResponse = await getData(apiUrl, body, false, "POST");

            setIsLoading(false);

            if(apiResponse.result){
                await showMessageDialog("La contreseña ha sido cambiada exitosamente", "success", "center");
                navigate("/Login")
            }else {
                showMessageDialog(apiResponse.message, "warning", "center");
            }

        } catch (error) {
            showMessageDialog("Error inesperado, intenta denuevo", "warning", "top");
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AccountForm>
            {isLoading && <Loader />} {/* Muestra el loader mientras se carga */}
            <Form title="Cambiar contraseña" subTitle="Por favor ingresa una nueva contraseña." onSubmit={handleSubmit}>
                <PasswordInput
                    size="medium"
                    placeholder="New password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handleInputChange}
                />
                <PasswordInput
                    size="medium"
                    placeholder="Confirm"
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handleInputChange}
                />
                {errorMessage && <p className="m-1 w-full text-red-500 text-petrack-yellow">{errorMessage}</p>}

                <a href="/AccountRecovery" className="text-right text-sm text-gray-500 mb-2">¿Tu token ha expirado?</a>
                <Button type="submit" size="small" variant="solid-green">Cambiar contraseña</Button>
            </Form>
        </AccountForm>
    );
}