import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TextInput from "../../atoms/TextInput";
import Button from "../../atoms/Button";
import Form from "../../organisms/Form";
import AccountForm from "../../templates/AccountForm";
import Loader from "../../atoms/Loader";
import Alert from "../../molecules/Alert"; // Importa el alert personalizado
import { getData } from "../../../utils/apiConnector";

export default function AccountRecovery() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showPlane, setShowPlane] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [email, setEmail] = useState("");


    const handleInputChange = ({ name, value }) => {
        setEmail(value);
    };

    const handleAnimationEnd = () => {
        setShowPlane(false); // Oculta el avión después de la animación
    };

    const handleAccept = () => {
        // Redirige al usuario al inicio de sesión cuando se acepta el alert
        navigate("/login");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const plane = document.querySelector(".paper-plane");
    
        if (plane) {
            plane.classList.add("shake"); // Agrega la animación de temblor
        }
    
        try {
            const apiUrl = `https://www.APIPetrack.somee.com/User/RequestPasswordReset/?email=${email}`;
            const apiResponse = await getData(apiUrl, null, false, "POST");
    
            if (plane) {
                plane.classList.remove("shake"); // Quita la animación de temblor
            }
    
            if (apiResponse.result) {
                if (plane) {
                    plane.classList.add("fly"); // Inicia la animación de vuelo
                    setTimeout(() => {
                        setShowConfirmation(true);
                    }, 2000);
                }
            } else {
                alert(apiResponse.message);
            }
        } catch (error) {
            if (plane) {
                plane.classList.remove("shake"); // Quita la animación de temblor si hay error
            }
            alert("Error al enviar el correo");
        }
    };
    

    return (
        <AccountForm>
            {isLoading && <Loader />}
            {showConfirmation && (
                <Alert 
                    type="error" 
                    message="¡Correo enviado exitosamente!" 
                    onAccept={handleAccept} // Cambiamos el evento de cierre por uno de aceptación
                />
            )}
            <Form
                title="Recuperar cuenta"
                subTitle="Ingresa tu correo para establecer una nueva contraseña."
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col items-center mt-16 relative">
                    {showPlane && (
                        <div className="paper-plane-container">
                            <svg
                                className="paper-plane"
                                viewBox="0 -0.5 17 17"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                fill="#E99003"
                                onAnimationEnd={handleAnimationEnd}
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <title>924</title>
                                    <defs></defs>
                                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                        <path
                                            d="M17,1.042 L11.436,14.954 L7.958,11.477 L8.653,13.563 L7.03,14.958 L7.03,11.563 L14.984,3.375 L6.047,9.969 L1,8.694 L17,1.042 Z"
                                            fill="#E99003"
                                            className="si-glyph-fill"
                                        ></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    )}
                    <TextInput
                        size="medium"
                        placeholder="Correo electrónico"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleInputChange}
                    />
                </div>
                {errorMessage && <p className="m-1 text-red-500">{errorMessage}</p>}
                <Button type="submit" size="small" variant="solid-green">
                    Enviar
                </Button>
            </Form>
        </AccountForm>
    );
}
