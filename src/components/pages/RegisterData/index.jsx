import { useState } from "react";

import TextInput from "../../atoms/TextInput";
import SelectInput from "../../molecules/SelectInput";
import PasswordInput from "../../molecules/PasswordInput";
import ButtonLogin from "../../atoms/Button";
import FormTemplate from "../../templates/Form";

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
        <FormTemplate title="Create account">
            <SelectInput
                size="medium"
                placeholder="Tipo de Usuario"
                options={options}
            />
            <TextInput size="medium" placeholder="Full name" />
            <TextInput size="medium" placeholder="Email" />
            <PasswordInput size="medium" placeholder="Password" />
            <PasswordInput size="medium" placeholder="Confirm password" />
            <ButtonLogin size="small" variant="solid-green">Registrarme</ButtonLogin>
        </FormTemplate>
    );
}