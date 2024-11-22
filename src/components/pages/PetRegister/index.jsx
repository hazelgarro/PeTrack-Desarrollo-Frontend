import { useState, useEffect } from "react";
import TextInput from "../../atoms/TextInput";
import SelectInput from "../../molecules/SelectInput";
import AccountForm from "../../templates/AccountForm";
import Form from "../../organisms/Form";
import Button from "../../atoms/Button";
import { CSSTransition } from "react-transition-group";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import Loader from "../../atoms/Loader/index.jsx";
import LoadImage from "../../organisms/LoadImage/index.jsx";
import { useSession } from "../../../context/SessionContext";
import { uploadImage } from "../../../utils/imageManager.js";
import { getData } from "../../../utils/apiConnector.js";
import { showMessageDialog, showOptionDialog } from "../../../utils/customAlerts.jsx";

export default function PetRegister() {
    const { userData, isAuthenticated, updateSessionState } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [petPictureTemp, setPetPictureTemp] = useState("");
    const [petData, setPetData] = useState({
        name: "",
        dateOfBirth: "",
        species: "",
        breed: "",
        gender: "",
        weight: "",
        location: "",
        ownerId: "",
        ownerType: "",
        healthIssues: "",
        petPicture: "",
        imagePublicId: "",
    });

    const navigate = useNavigate();
    let isSkipping = false;

    const speciesOptions = [
        { value: "Dog", label: "Perro" },
        { value: "Cat", label: "Gato" },
    ];

    const genderOptions = [
        { value: "Male", label: "Macho" },
        { value: "Female", label: "Hembra" },
    ];

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                if (!isAuthenticated) {
                    await showMessageDialog("Debe loguearse para poder registrar una mascota", "warning", "top");
                    navigate("/Login");
                }
            } catch (error) {
                console.error("Error al analizar el estado de la sesión", error);
            }
        };
        checkAuthentication();
    }, [isAuthenticated]);

    const handleInputChange = ({ name, value }) => {
        if (name !== "petPictureTemp") {
            setPetData((prevData) => {
                // Validación para la fecha de nacimiento
                if (name === "dateOfBirth") {
                    const today = new Date();
                    const selectedDate = new Date(value);
    
                    if (selectedDate > today) {
                        setErrorMessage("La fecha de nacimiento no puede ser mayor a la fecha actual.");
                        return prevData;
                    } else {
                        setErrorMessage("");
                    }
                }
                return {
                    ...prevData,
                    [name]: value,
                };
            });
        } else {
            setPetPictureTemp(value);
        }
    };

    const handleFirstSubmit = (e) => {
        e.preventDefault();

        // Validar la fecha de nacimiento
        const today = new Date();
        const selectedDate = new Date(petData.dateOfBirth);

        if (selectedDate > today) {
            setErrorMessage("La fecha de nacimiento no puede ser mayor a la fecha actual.");
            return;
        }

        setErrorMessage("");
        setIsFormSubmitted(true);
    };

    const handleSkip = async (e) => {
        e.preventDefault();
        const userResponse = await showOptionDialog("La información adicional será descartada. ¿Seguro que deseas continuar?", "warning");
        if (userResponse) {
            isSkipping = true;
            setPetData((prevData) => ({
                ...prevData,
                location: "",
                weight: "",
                healthIssues: "",
            }));
            setPetPictureTemp("");
            handleFinalSubmit(e);
        }
    };

    const handleFinalSubmit = async (e) => {
        e.preventDefault();

        if (!isSkipping && !petPictureTemp && !petData.location && !petData.weight && !petData.healthIssues) {
            setErrorMessage("Please fill at least one field or select a picture.");
            setTimeout(() => setErrorMessage(null), 5000);
            return;
        }

        try {
            await updateSessionState();
            if (userData) {
                setIsLoading(true);

                let imageUploadResult = null;

                if (petPictureTemp) {
                    try {
                        imageUploadResult = await uploadImage(petPictureTemp);
                    } catch (error) {
                        console.error("Error uploading pet picture:", error);
                        throw new Error("There was an issue uploading the image. Please try again.");
                    }
                }

                const petPicture = imageUploadResult?.imageUrl || "";
                const imagePublicId = imageUploadResult?.publicId || "";

                const formattedWeight = petData.weight ? `${petData.weight} kg` : "";

                const newPetData = {
                    ...petData,
                    ownerId: userData.id,
                    ownerType: userData.userTypeId,
                    petPicture,
                    imagePublicId,
                };

                try {
                    const apiUrl = "https://www.APIPetrack.somee.com/Pet/RegisterPet";
                    const registerResult = await getData(apiUrl, newPetData, true, "POST");

                    if (registerResult.result) {
                        navigate(`/PetProfile/${registerResult.data.petId}`);
                    } else {
                        setErrorMessage(registerResult.message);
                    }
                } catch (error) {
                    console.error("Error during pet registration:", error);
                    setErrorMessage("Failed to register the pet. Please try again.");
                }
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
            isSkipping = false;
        }
    };

    return (
        <AccountForm className="relative flex justify-center items-center min-h-screen">
            {isLoading && <Loader />}

            <CSSTransition in={!isFormSubmitted} timeout={500} classNames="form-slide" unmountOnExit>
                <Form title="Registra tu mascota" onSubmit={handleFirstSubmit}>
                    <TextInput
                        size="medium"
                        placeholder="Nombre" // Placeholder dinámico
                        name="name"
                        value={petData.name}
                        onChange={handleInputChange}
                    />
                    <SelectInput
                        size="medium"
                        placeholder="Especie"
                        options={speciesOptions}
                        name="species"
                        value={petData.species}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        size="medium"
                        placeholder="Raza"
                        name="breed"
                        value={petData.breed}
                        onChange={handleInputChange}
                    />
                    <SelectInput
                        size="medium"
                        placeholder="Género"
                        options={genderOptions}
                        name="gender"
                        value={petData.gender}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        type="date"
                        size="medium"
                        placeholder="Fecha de Nacimiento"
                        name="dateOfBirth"
                        value={petData.dateOfBirth}
                        onChange={handleInputChange}
                    />
                    <Button type="submit" size="small" variant="solid-green">
                        Registrar
                    </Button>
                    <Button onClick={() => navigate(-1)} size="small">
                        Cancelar
                    </Button>
                </Form>
            </CSSTransition>

            <CSSTransition in={isFormSubmitted} timeout={500} classNames="images-slide" unmountOnExit>
                <Form title="Añade información extra" subTitle="Ya casi terminamos..." onSubmit={handleFinalSubmit}>
                    <div className="relative flex flex-col items-center">
                        <div className="w-full mb-5">
                            <LoadImage name="petPictureTemp" image={petPictureTemp} imageType="rectangular" onChange={handleInputChange} />
                        </div>
                        <TextInput
                            size="medium"
                            placeholder="Ubicación"
                            name="location"
                            value={petData.location}
                            isRequired={false}
                            onChange={handleInputChange}
                        />
                        <TextInput
                            size="medium"
                            placeholder="Peso en Kg"
                            name="weight"
                            value={petData.weight}
                            isRequired={false}
                            onChange={handleInputChange}
                        />
                        <TextInput
                            size="medium"
                            placeholder="Condiciones Médicas"
                            name="healthIssues"
                            value={petData.healthIssues}
                            isRequired={false}
                            onChange={handleInputChange}
                        />

                        {errorMessage && <p className="m-1 text-red-500">{errorMessage}</p>}

                        <div className="flex flex-col w-full justify-end mt-4 gap-2">
                            <Button size="small" variant="solid-green" type="submit">Continuar</Button>
                            <Button onClick={handleSkip} size="small">Omitir</Button>
                        </div>
                    </div>
                </Form>
            </CSSTransition>
        </AccountForm>
    );
}
