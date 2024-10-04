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
import Banner from "../../atoms/Banner/index.jsx";
import ProfileImage from "../../atoms/ProfileImage/index.jsx";
import LoadImage from "../../organisms/LoadImage/index.jsx";

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);//maneja la visibilidad de la animación

    const speciesOptions = [
        { value: "1", label: "Dog" },
        { value: "2", label: "Cat" },
    ];

    const genderOptions = [
        { value: "1", label: "Male" },
        { value: "2", label: "Female" },
    ];

    const [petData, setPetData] = useState({
        name: "",
        dateOfBirth: "",
        species: "",
        gender: "",
        breed: "",
        ownerId: "",
        ownerType: "",
        location: "",
        healthIssues: "",
        petPicture: "",
        petPictureTemp: ""
    });

    const [isFormSubmitted, setIsFormSubmitted] = useState(true);

    const navigate = useNavigate();

    const handleInputChange = ({ name, value }) => {
        setPetData((prevData) => {
            const newData = {
                ...prevData,
                [name]: value
            };
            return newData;
        });
    };

    const handleFirstSubmit = (e) => {
        e.preventDefault();

        //pasa de formulario al formulario de las imagenes
        setIsFormSubmitted(true);
    };

    const handleRegisterImageSubmit = async () => {
        e.preventDefault();
    }

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
                <Form title="Add additional info" subTitle="We're almost done" onSubmit={handleRegisterImageSubmit}>
                    <div className="relative flex flex-col items-center">
                        <div className="w-full mb-5">
                            <LoadImage name="petPictureTemp" image={petData.petPictureTemp} imageType="rectangular" onChange={handleInputChange} />
                        </div>
                        <TextInput
                            size="medium"
                            placeholder="Location" // Placeholder dinámico
                            name="name"
                            value={petData.name}
                            isRequired={false}
                            onChange={handleInputChange}
                        />
                        <TextInput
                            size="medium"
                            placeholder="Health issues" // Placeholder dinámico
                            name="healthIssues"
                            value={petData.healthIssues}
                            isRequired={false}
                            onChange={handleInputChange}
                        />
                        <div className="flex flex-col w-full justify-end mt-4 gap-2">
                            <Button size="small" variant="solid-green" type="submit">Continue</Button>
                            <Button size="small">Skip</Button>
                        </div>
                    </div>
                </Form>
            </CSSTransition>

        </AccountForm>
    );
}