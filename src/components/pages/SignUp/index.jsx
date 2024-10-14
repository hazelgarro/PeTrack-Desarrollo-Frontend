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
import LoadImage from "../../organisms/LoadImage/index.jsx";

export default function SignUp() {
    const options = [
        { value: "O", label: "Personal" },
        { value: "S", label: "Adoption/Shelter Service" },
    ];
    const [isLoading, setIsLoading] = useState(false);//maneja la visibilidad de la animación

    const [accountData, setAccountData] = useState({
        name: "",
        email: "",
        password: "",
        userTypeId: "S",
        profilePicture: "name-picture.png",
        phoneNumber: "",
        confirmPassword: "",
        profileImageUrl: "",
        bannerImageUrl: ""
    });

    const [tempImages, setTempImagenes] = useState({ tempProfile: "", tempBanner: "" });
    const [error, setError] = useState("");

    //cambia el placeholdel del name según el tipo de usuario
    const [namePlaceholder, setNamePlaceholder] = useState("Full name");
    const [isFormSubmitted, setIsFormSubmitted] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();


    const handleInputChange = ({ name, value }) => {
        if (name !== "tempProfile" && name !== "tempBanner") {
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
        }else{
            setTempImagenes((prevData) => {
                const newData = {
                    ...prevData,
                    [name]: value
                };

                return newData;
            });
        }

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

        try {
            const apiUserData = await createAccount(
                accountData.email,
                accountData.password,
                accountData.userTypeId,
                accountData.profilePicture,
                accountData.phoneNumber,
                additionalData,
            );
            setIsLoading(false);
            alert(JSON.stringify(apiUserData.message));

            if (apiUserData.result) {
                navigate('/');
            } else {
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
                        <a className="font-bold text-petrack-green" href="/Login">
                            Sign In
                        </a>
                    </h3>
                </Form>
            </CSSTransition>
            <CSSTransition in={isFormSubmitted} timeout={500} classNames="images-slide" unmountOnExit>
                <Form title="Perfil" subTitle={`Select an image for your profile${accountData.userTypeId === "O" ? '' : ' and cover'}`} onSubmit={handleSubmit}>
                    <div className="relative w-full flex flex-col items-center px-4">

                        {accountData.userTypeId === "S" && (
                            <div className="absolute w-full -top-2 flex justify-center z-0">
                                <LoadImage name="tempBanner" image={tempImages.tempBanner} imageType="rectangular" onChange={handleInputChange} />
                            </div>
                        )}

                        <div className={`relative z-10 mt-${accountData.userTypeId === "O" ? '' : '16'}`}>
                            <LoadImage name="tempProfile" image={tempImages.tempProfile} imageType="rounded" onChange={handleInputChange} />
                        </div>

                        {error && <p className="text-red-500">{error}</p>}

                        <div className="flex flex-col w-full max-w-xs justify-end pt-8 gap-2">
                            <Button size="small" variant="solid-green" type="submit">Continue</Button>
                            <Button onClick={handleRegisterImageSubmit} size="small">Skip</Button>
                        </div>
                    </div>
                </Form>
            </CSSTransition>
        </AccountForm>
    );
}