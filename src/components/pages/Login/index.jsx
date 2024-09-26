import { useState } from "react";

import TextInput from "../../atoms/TextInput";
import SelectInput from "../../molecules/SelectInput";
import PasswordInput from "../../molecules/PasswordInput";
import ButtonLogin from "../../atoms/Button";
import Form from "../../templates/Form";

import createAccount from "../../../utils/register";

export default function CreateAccount() {
    const options = [
        { value: "1", label: "Personal" },
        { value: "2", label: "Servicio Veterinario" },
        { value: "3", label: "Servicio de Adopción/Refugio" },
    ];

    const [inputValue, setInputValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() === "") {
            setErrorMessage("Este campo es obligatorio.");
        } else {
            setErrorMessage("");
            console.log("Formulario enviado con valor:", inputValue);
        }
    };

    return (
        <Form title="Welcome back! ">
            <TextInput size="medium" placeholder="Email" />
            <PasswordInput size="medium" placeholder="Password" />
            <h2 className="text-right text-sm text-gray-500 mb-2">Forgot your password?</h2>
            <ButtonLogin size="small" variant="solid-green">Log In</ButtonLogin>
            <h3 className="text-center pt-5">Don't have an account? <a className="font-bold text-petrack-green" href="/SignUp">Sign Up</a></h3>
        </Form>
    );
}