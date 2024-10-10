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

export default function Register() {
    const { userData, isAuthenticated, updateSessionState } = useSession();

    

    const [isLoading, setIsLoading] = useState(false);//maneja la visibilidad de la animación
    const [isFormSubmitted, setIsFormSubmitted] = useState(true);

    const speciesOptions = [
        { value: "1", label: "Dog" },
        { value: "2", label: "Cat" },
    ];

    const genderOptions = [
        { value: "1", label: "Male" },
        { value: "2", label: "Female" },
    ];

    const [petData, setPetData] = useState({
        name: "Copito",
        dateOfBirth: "",
        species: "Dog",
        breed: "Zaguate",
        gender: "male",
        weight: "1kg",
        location: "Esparza",
        ownerId: "",
        ownerType: "O",
        healthIssues: "",
        petPicture: "",
        imagePublicId: "",
    });

    const [petPictureTemp, setPetPictureTemp] = useState ("");

    const handleInputChange = ({ name, value }) => {
        if((name != "petPictureTemp")){
            setPetData((prevData) => {
                const newData = {
                    ...prevData,
                    [name]: value
                };
                return newData;
            });
        }else{
            setPetPictureTemp(value);
        }
    };

    const handleFirstSubmit = (e) => {
        e.preventDefault();
        setIsFormSubmitted(true);
    };

    const handleFinalSubmit = async (e) => {
        e.preventDefault();
        console.log("Codigo para guardar perrito");
    }

    const handleSkip = (e) => {
        const userResponse = confirm("Additional information will not be saved, are you sure you want to continue?");
        if(userResponse){
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