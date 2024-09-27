import { useState } from "react";

import TextInput from "../../atoms/TextInput";
import PasswordInput from "../../molecules/PasswordInput";
import Button from "../../atoms/Button";
import Form from "../../organisms/Form";
import AccountForm from "../../templates/AccountForm";
import loginUser from "../../../utils/authentication";
import Loader from "../../atoms/Loader";

export default function Login() {
    
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

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const apiData = await loginUser(
                accountData.email,
                accountData.password
            );

            setIsLoading(false);

            if(apiData.result){
                let message;
                if(apiData.userTypeId === "O"){
                    message= "Bienvenido "+ apiData.details.CompleteName;
                }else{
                    message= "Bienvenidos "+ apiData.details.Name;
                }
                alert(JSON.stringify(message));
            }else{
                alert(JSON.stringify(apiData.message));
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