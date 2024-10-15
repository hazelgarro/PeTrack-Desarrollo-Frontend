import { useState, useEffect } from "react";
import TextInput from "../../atoms/TextInput";
import SelectInput from "../../molecules/SelectInput";
import AccountForm from "../../templates/AccountForm";
import Form from "../../organisms/Form";
import Button from "../../atoms/Button";
import { CSSTransition } from "react-transition-group";
import './styles.css';
import { useNavigate } from 'react-router-dom';
import Loader from "../../atoms/Loader/index.jsx";
import LoadImage from "../../organisms/LoadImage/index.jsx";
import { useSession } from '../../../context/SessionContext';
import { uploadImage } from '../../../utils/imageManager.js'
import { getData } from "../../../utils/apiConnector.js";

export default function PetRegister() {
    const { userData, isAuthenticated, updateSessionState } = useSession();

    const navigate = useNavigate(); // Llama a useNavigate

    useEffect(() => {
        if (!isAuthenticated) {
            alert("The session was closed or the user is not logged in");
            navigate("/Login");
        }
    }, [isAuthenticated, userData]);//Se ejecuta en cada actualización de isAuthenticated


    const [isLoading, setIsLoading] = useState(false);//maneja la visibilidad de la animación
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    let isSkipping = false;

    const speciesOptions = [
        { value: "Dog", label: "Dog" },
        { value: "Cat", label: "Cat" },
    ];

    const genderOptions = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
    ];

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

    const [petPictureTemp, setPetPictureTemp] = useState("");

    const handleInputChange = ({ name, value }) => {
        if ((name != "petPictureTemp")) {
            setPetData((prevData) => {
                const newData = {
                    ...prevData,
                    [name]: value
                };
                return newData;
            });
        } else {
            setPetPictureTemp(value);
        }
    };

    const handleFirstSubmit = (e) => {
        e.preventDefault();
        setIsFormSubmitted(true);
    };

    const handleFinalSubmit = async (e) => {
        e.preventDefault();

        if (!isSkipping) {
            // Verifica si al menos un campo o la imagen han sido completados
            if (!petPictureTemp && !petData.location && !petData.weight && !petData.healthIssues) {
                setErrorMessage("Please fill at least one field or select a picture.");
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
                return; // Detiene la ejecución si no hay datos válidos
            }
        }

        await updateSessionState();

        if (userData) {
            setIsLoading(true);

            try {
                let imageUploadResult = null;

                try {
                    if (petPictureTemp) {
                        imageUploadResult = await uploadImage(petPictureTemp);
                    }
                } catch (error) {
                    console.error("Error uploading pet picture:", error);
                    setErrorMessage("There was an issue uploading the image. Please try again.");
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 5000);

                    throw new Error("There was an issue uploading the image. Please try again.");
                }

                const petPicture = imageUploadResult ? imageUploadResult.imageUrl : petData.petPicture;
                const imagePublicId = imageUploadResult ? imageUploadResult.publicId : petData.imagePublicId;

                const newPetData = {
                    ...petData,
                    ownerId: userData.id,
                    ownerType: userData.userTypeId,
                    petPicture: petPicture,
                    imagePublicId: imagePublicId,
                };

                try {
                    const apiUrl = "https://www.APIPetrack.somee.com/Pet/RegisterPet";
                    const registerResult = await getData(apiUrl, newPetData, true, "POST");

                    alert(registerResult.message);

                    if(registerResult.result){
                        navigate(`/PetProfile/${registerResult.data.petId}`);
                    }else{
                        window.location.reload();
                    }
                } catch (error) {
                    alert("Error during pet registration:", error);
                    setIsFormSubmitted(false);
                }

            } catch (error) {
                console.error("Error during pet registration:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleSkip = (e) => {
        e.preventDefault();
        const userResponse = confirm("Additional information will not be saved, are you sure you want to continue?");

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

    return (
        <AccountForm className="relative flex justify-center items-center min-h-screen">
            {isLoading && <Loader />} {/* Muestra el loader mientras se carga */}

            <CSSTransition in={!isFormSubmitted} timeout={500} classNames="form-slide" unmountOnExit>
                <Form title="Register your pet" subTitle="What type of account do you want to register?" onSubmit={handleFirstSubmit}>
                    <TextInput
                        size="medium"
                        placeholder="Name" // Placeholder dinámico
                        name="name"
                        value={petData.name}
                        onChange={handleInputChange}
                    />
                    <SelectInput
                        size="medium"
                        placeholder="Species"
                        options={speciesOptions}
                        name="species"
                        value={petData.species}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        size="medium"
                        placeholder="Breed"
                        name="breed"
                        value={petData.breed}
                        onChange={handleInputChange}
                    />
                    <SelectInput
                        size="medium"
                        placeholder="Gender"
                        options={genderOptions}
                        name="gender"
                        value={petData.gender}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        type="date"
                        size="medium"
                        placeholder="Date of Birth"
                        name="dateOfBirth"
                        value={petData.dateOfBirth}
                        onChange={handleInputChange}
                    />
                    <Button type="submit" size="small" variant="solid-green">
                        Register
                    </Button>
                    <Button size="small">
                        Cancel
                    </Button>
                </Form>
            </CSSTransition>

            <CSSTransition in={isFormSubmitted} timeout={500} classNames="images-slide" unmountOnExit>
                <Form title="Add additional info" subTitle="We're almost done" onSubmit={handleFinalSubmit}>
                    <div className="relative flex flex-col items-center">
                        <div className="w-full mb-5">
                            <LoadImage name="petPictureTemp" image={petPictureTemp} imageType="rectangular" onChange={handleInputChange} />
                        </div>
                        <TextInput
                            size="medium"
                            placeholder="Location"
                            name="location"
                            value={petData.location}
                            isRequired={false}
                            onChange={handleInputChange}
                        />
                        <TextInput
                            size="medium"
                            placeholder="Weight"
                            name="weight"
                            value={petData.weight}
                            isRequired={false}
                            onChange={handleInputChange}
                        />
                        <TextInput
                            size="medium"
                            placeholder="Health issues"
                            name="healthIssues"
                            value={petData.healthIssues}
                            isRequired={false}
                            onChange={handleInputChange}
                        />

                        {errorMessage && <p className="m-1 text-red-500">{errorMessage}</p>}

                        <div className="flex flex-col w-full justify-end mt-4 gap-2">
                            <Button size="small" variant="solid-green" type="submit">Continue</Button>
                            <Button onClick={handleSkip} size="small">Skip</Button>
                        </div>
                    </div>
                </Form>
            </CSSTransition>

        </AccountForm>
    );
}