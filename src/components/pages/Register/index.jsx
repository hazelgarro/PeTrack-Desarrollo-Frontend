import { useState } from "react"; 
import TextInput from "../../atoms/TextInput";
import SelectInput from "../../molecules/SelectInput";
import PasswordInput from "../../molecules/PasswordInput";
import AccountForm from "../../templates/AccountForm";
import Form from "../../organisms/Form";
import Button from "../../atoms/Button";
import RegisterImagesNoBanner from "../../organisms/RegisterImages/RegisterImagesNoBanner";
import { CSSTransition } from "react-transition-group";
import './styles.css'; // Archivo CSS para manejar las animaciones

import createAccount from "../../../utils/register.js";

export default function Register() {
    const options = [
        { value: "1", label: "Personal" },
        { value: "2", label: "Servicio Veterinario" },
        { value: "3", label: "Servicio de Adopción/Refugio" },
    ];

    const [userData, setUserData] = useState({
        completeName: "",
        email: "",
        password: "",
        userTypeId: "",
        profilePicture: "name-picture.png",
        phoneNumber: "",
        confirmPassword: "",
    });

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = ({ name, value }) => {
        setUserData((prevData) => {
            const newData = {
                ...prevData,
                [name]: value
            };
            // Verifica si las contraseñas coinciden después de cada cambio
            if (newData.password === newData.confirmPassword) {
                setErrorMessage(""); // Limpia el mensaje si coinciden
            } else {
                setErrorMessage("Passwords do not match"); // Muestra el mensaje si no coinciden
            }
            return newData;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verifica las contraseñas al enviar el formulario
        if (userData.password !== userData.confirmPassword) {
            setErrorMessage("Passwords do not match");
            setIsFormSubmitted(false);
            return;
        }
        
        const userTypesId={
            1: "O",
            2: "V",
            3: "S"
        }
        
        setIsFormSubmitted(true);

        // Aquí puedes enviar los datos del formulario (por ejemplo, a una API)
        alert(JSON.stringify(createAccount(userData.email, userData.password, userTypesId[userData.userTypeId], userData.profilePicture, userData.phoneNumber, {CompleteName: userData.completeName})));
    };

    return (
        <AccountForm className="relative flex justify-center items-center min-h-screen">
            <CSSTransition in={!isFormSubmitted} timeout={500} classNames="form-slide" unmountOnExit>
                <div className="absolute inset-0 flex justify-center items-center">
                    <Form title="Create account" onSubmit={handleSubmit}>
                        <SelectInput size="medium" placeholder="Tipo de Usuario" options={options} name="userTypeId" value={userData.userTypeId} onChange={handleInputChange} />
                        <TextInput size="medium" placeholder="Full name" name="completeName" value={userData.fullName} onChange={handleInputChange} />
                        <TextInput size="medium" placeholder="Email" name="email" type="email" value={userData.email} onChange={handleInputChange} />
                        <TextInput size="medium" placeholder="Phone number" name="phoneNumber" type="tel" isRequired={false} value={userData.phoneNumber} onChange={handleInputChange} />
                        <PasswordInput size="medium" placeholder="Password" name="password" value={userData.password} onChange={handleInputChange} />
                        <PasswordInput size="medium" placeholder="Confirm password" name="confirmPassword" value={userData.confirmPassword} onChange={handleInputChange} />

                        {errorMessage && <p className="m-1 text-red-500">{errorMessage}</p>}

                        <Button type="submit" size="small" variant="solid-green">Sign Up</Button>
                        <h3 className="text-center pt-5">Don't have an account? <a className="font-bold text-petrack-green" href="/">Sign In</a></h3>
                    </Form>
                </div>
            </CSSTransition>
            <CSSTransition in={isFormSubmitted} timeout={500} classNames="images-slide" unmountOnExit>
                <div className="absolute inset-0 flex justify-center items-center">
                    <RegisterImagesNoBanner />
                </div>
            </CSSTransition>
        </AccountForm>
    );
}
