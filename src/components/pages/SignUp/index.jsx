import { useState } from "react";
import TextInput from "../../atoms/TextInput";
import SelectInput from "../../molecules/SelectInput";
import PasswordInput from "../../molecules/PasswordInput";
import AccountForm from "../../templates/AccountForm";
import Form from "../../organisms/Form";
import Button from "../../atoms/Button";
import { CSSTransition } from "react-transition-group";
import './styles.css';
import { useNavigate } from 'react-router-dom';
import Loader from "../../atoms/Loader/index.jsx";
import LoadImage from "../../organisms/LoadImage/index.jsx";
import { getData } from "../../../utils/apiConnector.js";
import { loginUser } from "../../../utils/sessionManager.js";
import { uploadImage } from '../../../utils/imageManager.js';
import { useSession } from '../../../context/SessionContext';
import { showMessageDialog, showOptionDialog } from '../../../utils/customAlerts.jsx';

export default function SignUp() {
    const [isLoading, setIsLoading] = useState(false);//maneja la visibilidad de la animación
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    let isSkipping = false;

    const { updateSessionState } = useSession();

    const options = [
        { value: "O", label: "Dueño de mascota" },
        { value: "S", label: "Refugio" },
    ];

    const [accountData, setAccountData] = useState({
        name: "",
        email: "",
        password: "",
        userTypeId: "",
        phoneNumber: "",
        confirmPassword: "",
        address: "",
        workingDays: "",
        workingHours: "",
    });

    const [tempImages, setTempImagenes] = useState({ tempProfile: "", tempCover: "" });

    //cambia el placeholdel del name según el tipo de usuario
    const [namePlaceholder, setNamePlaceholder] = useState("Nombre completo");

    const navigate = useNavigate();

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

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\d{4}-\d{4}$/;
        if (!phoneRegex.test(phoneNumber)) {
            return "El número de teléfono debe estar en el formato 8888-8888.";
        }
        return ""; // Número válido
    };

    const handleInputChange = ({ name, value }) => {
        if (name !== "tempProfile" && name !== "tempCover") {
            setAccountData((prevData) => {
                const newData = {
                    ...prevData,
                    [name]: value
                };

                if (name === "phoneNumber") {
                    value = value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
                    if (value.length > 4) {
                        value = value.slice(0, 4) + "-" + value.slice(4, 8); // Inserta el guion
                    }
                    if (value.length > 9) {
                        value = value.slice(0, 9); // Limita la longitud a 9 caracteres
                    }
    
                    const validationMessage = validatePhoneNumber(value);
                    setErrorMessage(validationMessage);
                }

                if (name === "password") {
                    if (!isTypingPassword || value.length > 0) {
                        setIsTypingPassword(true);
                    }
                    if (value.length === 0) {
                        setIsTypingPassword(false);
                    }
                }

                if (newData.password === newData.confirmPassword) {
                    setErrorMessage("");
                } else {
                    setErrorMessage("Las contraseñas no coinciden");
                }

                if (name === "userTypeId") {
                    value === "O" ? setNamePlaceholder("Nombre completo") : setNamePlaceholder("Nombre de la organización");
                }

                return newData;
            });
        } else {
            setTempImagenes((prevData) => {
                const newData = {
                    ...prevData,
                    [name]: value
                };

                return newData;
            });
        }
    };

    const handleFirtsSubmit = (e) => {
        e.preventDefault();
        if (accountData.password !== accountData.confirmPassword) {
            setErrorMessage("Las contraseñas no coinciden");
            setIsFormSubmitted(false);
            return;
        } else if (accountData.password.length < 8) {
            setErrorMessage("La contraseña debe tener un mínimo de 8 caracteres.");
        } 
        const phoneValidationMessage = validatePhoneNumber(accountData.phoneNumber);
        if (phoneValidationMessage) {
            setErrorMessage(phoneValidationMessage);
            return;
        }
        const validationMessage = validatePassword(accountData.password);
        if (validationMessage) {
            setErrorMessage(validationMessage);
            return;
        }
        if (accountData.password.length < 8) {
            setErrorMessage("The password must be a minimum of 8 characters.");
            return;
        }

        setIsFormSubmitted(true);
    };

    const handleSkip = async (e) => {
        e.preventDefault();
        const userResponse = await showOptionDialog("La información extra y la foto serán descartadas\n ¿Seguro que deseas continuar?", "warning");

        if (userResponse) {
            isSkipping = true;
            setAccountData((prevData) => ({
                ...prevData,
                address: "",
                workingDays: "",
                workingHours: "",
            }));
            setTempImagenes({ tempProfile: "", tempCover: "" });

            handleFinalSubmit(e);
        }
    };

    const handleFinalSubmit = async (e) => {
        e.preventDefault();

        let additionalData;
        let profileUploadResult = null;
        let coverUploadResult = null;
        let body;

        // Verifica si al menos un campo o la imagen han sido completados
        if (!isSkipping) {
            if (!tempImages.tempProfile && !tempImages.tempCover && !accountData.address && !accountData.workingDays && !accountData.workingHours) {
                const errorMessage = accountData.userTypeId === "0" ? "Por favor selecciona una imagen" : "Por favor selecciona una imagen o añade información extra";

                setErrorMessage(errorMessage);

                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
                return;
            }
        }

        setIsLoading(true);

        try {
            if (tempImages.tempProfile) {
                profileUploadResult = await uploadImage(tempImages.tempProfile);
                console.log("Profile image uploaded:", profileUploadResult);
            }

            if (tempImages.tempCover) {
                coverUploadResult = await uploadImage(tempImages.tempCover);
                console.log("Cover image uploaded:", coverUploadResult);
            }
        } catch (error) {
            setIsLoading(false);
            setErrorMessage("Hubo un problema al cargar la imagen. Inténtalo nuevamente.");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
            return;
        }

        if (accountData.userTypeId === "O") {
            additionalData = { completeName: accountData.name };
        } else {
            additionalData = {
                name: accountData.name,
                address: accountData.address,
                coverPicture: coverUploadResult ? coverUploadResult.imageUrl : "",
                imagePublicIdCover: coverUploadResult ? coverUploadResult.publicId : "",
                workingDays: accountData.workingDays,
                workingHours: accountData.workingHours,
            };
        }

        body = {
            email: accountData.email,
            password: accountData.password,
            userTypeId: accountData.userTypeId,
            profilePicture: profileUploadResult ? profileUploadResult.imageUrl : "",
            imagePublicId: profileUploadResult ? profileUploadResult.publicId : "",
            phoneNumber: accountData.phoneNumber,
            additionalData: additionalData
        }

        try {
            const apiUrl = "https://www.APIPetrack.somee.com/User/CreateAccount";
            const apiResponse = await getData(apiUrl, body, false, "POST");

            setIsLoading(false);

            if (apiResponse.result) {
                const userResponse = await showOptionDialog("El usuario ha sido creado exitosamente.\n¿Desea iniciar seción con su nuevo usuario?", "success");
                if (userResponse) {
                    try {
                        const loginResult = await loginUser(accountData.email, accountData.password);
                        if (!loginResult.result) {
                            showMessageDialog(loginResult.message, "warining", "top");
                        }
                        updateSessionState();
                    } catch (error) {
                        console.log(error);
                        showMessageDialog("Ha ocurrido un error al intentar loguearse", "warining", "top");
                    } finally {
                        navigate("/");
                    }
                } else {
                    navigate("/");
                }
            } else {
                showMessageDialog(apiResponse.message, "warning", "top");
                setIsFormSubmitted(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error during registration:", error);
            showMessageDialog("Ha ocurrido un error mientras se realizaba el registro", "warning", "top");
        }
        finally {
            isSkipping = false;
        }
    }

    return (
        <AccountForm className="relative flex justify-center items-center min-h-screen">
            {isLoading && <Loader />} {/* Muestra el loader mientras se carga */}

            <CSSTransition in={!isFormSubmitted} timeout={500} classNames="form-slide" unmountOnExit>
                <Form title="Crear cuenta" subTitle="Ingresa tus datos" onSubmit={handleFirtsSubmit}>
                    <SelectInput
                        size="medium"
                        placeholder="Tipo de Usuario"
                        options={options}
                        name="userTypeId"
                        value={accountData.userTypeId}
                        onChange={handleInputChange}
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
                        placeholder="Correo electrónico"
                        name="email"
                        type="email"
                        value={accountData.email}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        size="medium"
                        placeholder="Numero de teléfono"
                        name="phoneNumber"
                        type="tel"
                        isRequired={false}
                        value={accountData.phoneNumber}
                        onChange={handleInputChange}
                    />
                    <PasswordInput
                        size="medium"
                        placeholder="Contraseña"
                        name="password"
                        value={accountData.password}
                        onChange={handleInputChange}
                    />
                    {isTypingPassword && (
                        <ul className="text-sm text font-['Lato'] mb-3 ">
                            <li className={accountData.password.length >= 8 ? "text-petrack-green" : "text-petrack-red"}>
                                Al menos 8 caracteres
                            </li>
                            <li className={/[A-Z]/.test(accountData.password) ? "text-petrack-green" : "text-petrack-red"}>
                                Al menos una letra mayúscula
                            </li>
                            <li className={/[a-z]/.test(accountData.password) ? "text-petrack-green" : "text-petrack-red"}>
                                Al menos una letra minúscula
                            </li>
                            <li className={/\d/.test(accountData.password) ? "text-petrack-green" : "text-petrack-red"}>
                                Al menos un número
                            </li>
                            <li className={/[@$!%*?&#.,_-]/.test(accountData.password) ? "text-petrack-green" : "text-petrack-red"}>
                                Al menos un carácter especial (@, $, !, etc.)
                            </li>
                        </ul>
                    )}

                    <PasswordInput
                        size="medium"
                        placeholder="Confirma tu contraseña"
                        name="confirmPassword"
                        value={accountData.confirmPassword}
                        onChange={handleInputChange}
                    />

                    {errorMessage && <p className="m-1 text-petrack-red">{errorMessage}</p>}

                    <Button type="submit" size="small" variant="solid-green">
                        Registrarse
                    </Button>
                    <h3 className="text-center pt-5">
                        ¿Ya tiene una cuenta?{" "}
                        <a className="font-bold text-petrack-green" href="/Login">
                            Iniciar sesión
                        </a>
                    </h3>
                </Form>
            </CSSTransition>
            <CSSTransition in={isFormSubmitted} timeout={500} classNames="images-slide" unmountOnExit>
                <Form title={`${accountData.userTypeId === "O" ? 'Añade una foto de perfil' : 'Añade información extra'}`} subTitle="Este paso es opcional" onSubmit={handleFinalSubmit}>
                    <div className="relative w-full flex flex-col items-center">

                        {accountData.userTypeId === "S" && (
                            <div className="absolute w-full -top-2 flex justify-center z-0">
                                <LoadImage name="tempCover" image={tempImages.tempCover} imageType="rectangular" onChange={handleInputChange} />
                            </div>
                        )}

                        <div className={`relative mb-5 z-10 mt-${accountData.userTypeId === "O" ? '' : '16'}`}>
                            <LoadImage name="tempProfile" image={tempImages.tempProfile} imageType="rounded" onChange={handleInputChange} />
                        </div>

                        {/* información exclusiva del refugio */}
                        {accountData.userTypeId === "S" && (
                            <>
                                <TextInput
                                    size="medium"
                                    placeholder="Address"
                                    name="address"
                                    value={accountData.address}
                                    onChange={handleInputChange}
                                    isRequired={false}
                                />
                                <TextInput
                                    size="medium"
                                    placeholder="Working Days"
                                    name="workingDays"
                                    value={accountData.workingDays}
                                    onChange={handleInputChange}
                                    isRequired={false}
                                />
                                <TextInput
                                    size="medium"
                                    placeholder="Working Hours"
                                    name="workingHours"
                                    value={accountData.workingHours}
                                    onChange={handleInputChange}
                                    isRequired={false}
                                />
                            </>
                        )}

                        {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}

                        <div className="flex flex-col w-full max-w-xs justify-end pt-4 gap-2">
                            <Button size="small" variant="solid-green" type="submit">Guardar</Button>
                            <Button onClick={handleSkip} size="small">Saltar</Button>
                        </div>
                    </div>
                </Form>
            </CSSTransition>
        </AccountForm>
    );
}