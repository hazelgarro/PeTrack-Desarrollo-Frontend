import { useState } from "react";
import TextInput from "../../atoms/TextInput";
import SelectInput from "../../molecules/SelectInput";
import PasswordInput from "../../molecules/PasswordInput";
import AccountForm from "../../templates/AccountForm";
import Form from "../../organisms/Form";
import Button from "../../atoms/Button";
import RegisterImages from "../../organisms/RegisterImages";
import { CSSTransition } from "react-transition-group";
import './styles.css';
import createAccount from "../../../utils/register.js";
import { useNavigate } from 'react-router-dom';
import Loader from "../../atoms/Loader/index.jsx";

export default function SignUp() {
    const options = [
        { value: "1", label: "Personal" },
        { value: "2", label: "Veterinary Service" },
        { value: "3", label: "Adoption/Shelter Service" },
    ];
    const [isLoading, setIsLoading] = useState(false);//maneja la visibilidad de la animación

    const [accountData, setAccountData] = useState({
        name: "",
        email: "",
        password: "",
        userTypeId: "",
        profilePicture: "name-picture.png",
        phoneNumber: "",
        confirmPassword: "",
        profileImageUrl: "",
        bannerImageUrl: ""
    });

    //cambia el placeholdel del name según el tipo de usuario
    const [namePlaceholder, setNamePlaceholder] = useState("Full name");
    const [isFormSubmitted, setIsFormSubmitted] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleInputChange = ({ name, value }) => {
        setAccountData((prevData) => {
            const newData = {
                ...prevData,
                [name]: value
            };
    
            if (newData.password === newData.confirmPassword) {
                setErrorMessage("");
            } else {
                setErrorMessage("Passwords do not match");
            }
    
            // Cambia el placeholder si el tipo de usuario es "2" o "3"
            if (name === "userTypeId" && (value === "2" || value === "3")) {
                setNamePlaceholder("Organization name");
            } else if (name === "userTypeId") {
                setNamePlaceholder("Full name");
            }
    
            return newData;
        });
    };    

    const handleSubmit = (e) => {
        e.preventDefault();

        if (accountData.password !== accountData.confirmPassword) {
            setErrorMessage("Passwords do not match");
            setIsFormSubmitted(false);
            return;
        }

        //pasa de formulario al formulario de las imagenes
        setIsFormSubmitted(true);
    };

    const handleRegisterImageSubmit = async () => {
        setIsLoading(true); // Comienza la carga

        let additionalData;

        if (accountData.userTypeId === "1") {
            additionalData = { CompleteName: accountData.name };
        } else {
            additionalData = {
                Name: accountData.name,
                Address: "",
                CoverPicture: accountData.bannerImageUrl,
                WorkingDays: "",
                WorkingHours: "",
            };
        }

        const userTypesId = {
            1: "O",
            2: "V",
            3: "S",
        };

        try {
            const apiUserData = await createAccount(
                accountData.email,
                accountData.password,
                userTypesId[accountData.userTypeId],
                accountData.profilePicture,
                accountData.phoneNumber,
                additionalData,
            );
            setIsLoading(false);
            alert(JSON.stringify(apiUserData.message));

            if (apiUserData.result) {
                navigate('/');
            }else{
                setIsFormSubmitted(false);
            }
        } catch (error) {
            alert("Error al crear la cuenta: " + error.message);
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AccountForm className="relative flex justify-center items-center min-h-screen">
            {isLoading && <Loader />} {/* Muestra el loader mientras se carga */}

            <CSSTransition in={!isFormSubmitted} timeout={500} classNames="form-slide" unmountOnExit>
                <Form title="Create account" subTitle="What type of account do you want to register?" onSubmit={handleSubmit}>
                    <SelectInput
                        size="medium"
                        placeholder="Tipo de Usuario"
                        options={options}
                        name="userTypeId"
                        value={accountData.userTypeId}
                        onChange={handleInputChange} // Usa la nueva función para manejar el cambio de tipo de usuario
                    />
                    <TextInput
                        size="medium"
                        placeholder={namePlaceholder} // Placeholder dinámico
                        name="name"
                        value={accountData.name}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        size="medium"
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={accountData.email}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        size="medium"
                        placeholder="Phone number"
                        name="phoneNumber"
                        type="tel"
                        isRequired={false}
                        value={accountData.phoneNumber}
                        onChange={handleInputChange}
                    />
                    <PasswordInput
                        size="medium"
                        placeholder="Password"
                        name="password"
                        value={accountData.password}
                        onChange={handleInputChange}
                    />
                    <PasswordInput
                        size="medium"
                        placeholder="Confirm password"
                        name="confirmPassword"
                        value={accountData.confirmPassword}
                        onChange={handleInputChange}
                    />

                    {errorMessage && <p className="m-1 text-red-500">{errorMessage}</p>}

                    <Button type="submit" size="small" variant="solid-green">
                        Sign Up
                    </Button>
                    <h3 className="text-center pt-5">
                        Don't have an account?{" "}
                        <a className="font-bold text-petrack-green" href="/">
                            Sign In
                        </a>
                    </h3>
                </Form>
            </CSSTransition>
            <CSSTransition in={isFormSubmitted} timeout={500} classNames="images-slide" unmountOnExit>

                <RegisterImages userTypeId={accountData.userTypeId} profileImageUrl={accountData.profileImageUrl} bannerImageUrl={accountData.bannerImageUrl} onSubmit={handleRegisterImageSubmit} />
            </CSSTransition>
        </AccountForm>
    );
}
