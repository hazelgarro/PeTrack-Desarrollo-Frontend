import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import TextInput from "../../atoms/TextInput";
import PasswordInput from "../../molecules/PasswordInput";
import Button from "../../atoms/Button";
import Form from "../../organisms/Form";
import AccountForm from "../../templates/AccountForm";
import Loader from "../../atoms/Loader";
import {loginUser} from "../../../utils/sessionManager";
import { useSession } from '../../../context/SessionContext';

export default function ResetPassword() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [passwords, setPasswords] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    const handleInputChange = ({ name, value }) => {
        setPasswords({
            ...passwords,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // try {
        //     const apiResponse = await loginUser(
        //         passwords.email,
        //         passwords.password
        //     );

        //     setIsLoading(false);

        //     if (apiResponse.result) {
        //         let message;
        //         if (apiResponse.data.userTypeId === "O") {
        //             message = "Bienvenid@ " + apiResponse.data.details.completeName;
        //         } else {
        //             message = "Bienvenidos " + apiResponse.data.details.name;
        //         }
        //         updateSessionState();
        //         alert(JSON.stringify(message));
        //         navigate("/Homepage");
        //     } else {
        //         setErrorMessage(apiResponse.message);
        //         setTimeout(() => {
        //             setErrorMessage(null);
        //         }, 7000);
        //     }

        // } catch (error) {
        //     alert("Login error: " + error.message);
        //     console.error("Error:", error);
        // } finally {
        //     setIsLoading(false);
        // }

        try {
            
        } catch (error) {
            
        }
    };

    return (
        <AccountForm>
            {isLoading && <Loader />} {/* Muestra el loader mientras se carga */}
            <Form title="Cambiar contraseña" subTitle="Por favor ingresa una nueva contraseña" onSubmit={handleSubmit}>
                <PasswordInput
                    size="medium"
                    placeholder="New password"
                    name="password"
                    value={passwords.password}
                    onChange={handleInputChange}
                />
                <PasswordInput
                    size="medium"
                    placeholder="Confirm"
                    name="password"
                    value={passwords.confirmPassword}
                    onChange={handleInputChange}
                />
                {errorMessage && <p className="m-1 text-red-500 text-petrack-yellow">{errorMessage}</p>}

                <Button type="submit" size="small" variant="solid-green">Cambiar contraseña</Button>
            </Form>
        </AccountForm>
    );
}