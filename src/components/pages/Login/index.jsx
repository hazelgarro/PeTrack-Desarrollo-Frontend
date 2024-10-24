import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import TextInput from "../../atoms/TextInput";
import PasswordInput from "../../molecules/PasswordInput";
import Button from "../../atoms/Button";
import Form from "../../organisms/Form";
import AccountForm from "../../templates/AccountForm";
import Loader from "../../atoms/Loader";
import {loginUser, getSessionToken} from "../../../utils/sessionManager";
import { useSession } from '../../../context/SessionContext';

export default function Login() {
    const { userData, isAuthenticated, updateSessionState } = useSession();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [accountData, setAdditionalData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = ({ name, value }) => {
        setAdditionalData({
            ...accountData,
            [name]: value  // Actualiza solo el campo que cambió
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const apiResponse = await loginUser(
                accountData.email,
                accountData.password
            );

            setIsLoading(false);

            if (apiResponse.result) {
                let message;
                if (apiResponse.data.userTypeId === "O") {
                    message = "Bienvenid@ " + apiResponse.data.details.completeName;
                } else {
                    message = "Bienvenidos " + apiResponse.data.details.name;
                }
                updateSessionState();
                alert(JSON.stringify(message));
                navigate("/Homepage");
            } else {
                setErrorMessage(apiResponse.message);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 4000);
            }

        } catch (error) {
            alert("Login error: " + error.message);
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AccountForm>
            {isLoading && <Loader />} {/* Muestra el loader mientras se carga */}
            <Form title="Welcome back!" subTitle="Please enter your details" onSubmit={handleSubmit}>
                <TextInput
                    size="medium"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={accountData.email}
                    onChange={handleInputChange}
                />
                <PasswordInput
                    size="medium"
                    placeholder="Password"
                    name="password"
                    value={accountData.password}
                    onChange={handleInputChange}
                />
                {errorMessage && <p className="m-1 text-red-500">{errorMessage}</p>}

                <h2 className="text-right text-sm text-gray-500 mb-2">Forgot your password?</h2>
                <Button type="submit" size="small" variant="solid-green">Log In</Button>
                <h3 className="text-center pt-5">Don't have an account? <a className="font-bold text-petrack-green" href="/SignUp">Sign Up</a></h3>
            </Form>
        </AccountForm>
    );
}