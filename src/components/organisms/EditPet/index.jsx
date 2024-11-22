import { useEffect, useState } from "react";
import { useOpenClose } from "../../../hooks/useOpenClose";
import Modal from "../../molecules/Modal";
import Button from "../../atoms/Button";
import IconEdit from "../../atoms/Icons/Edit";
import Form from "../../organisms/Form";
import TextInput from "../../atoms/TextInput";
import { getData } from "../../../utils/apiConnector.js";
import SelectInput from "../../molecules/SelectInput/index.jsx";
import { showMessageDialog } from '../../../utils/customAlerts.jsx';

export default function EditPet({ petAccountData, updatePetData }) {
    const { isOpen, toggleModal } = useOpenClose();

    const [petData, setPetData] = useState(petAccountData);

    const genderOptions = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
    ];

    const speciesOptions = [
        { value: "Dog", label: "Dog" },
        { value: "Cat", label: "Cat" },
    ];

    useEffect(() => {
        setPetData(petAccountData);
    }, [isOpen]);

    const handleInputChange = ({ name, value }) => {
        setPetData((prevData) => {
            const newData = {
                ...prevData,
                [name]: value
            };
            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (petAccountData === petData) {
            toggleModal();
            showMessageDialog("No se realizó ningun cambio", "success", "top");
        }
        else {
            try {
                const apiUrl = `https://www.APIPetrack.somee.com/Pet/EditPet/${petData.id}`;

                const body = {
                    name: petData.name,
                    dateOfBirth: petData.dateOfBirth,
                    species: petData.species,
                    breed: petData.breed,
                    gender: petData.gender,
                    weight: petData.weight,
                    location: petData.location,
                    healthIssues: petData.healthIssues,
                    petPicture: petData.petPicture,
                    imagePublicId: petData.imagePublicId
                };

                const apiResponse = await getData(apiUrl, body, true, "PUT");

                if (apiResponse.result) {
                    showMessageDialog(apiResponse.message, "success", "top");
                    updatePetData(petData);
                    toggleModal();
                } else {
                    showMessageDialog(apiResponse.message, "warning", "top");
                }
            } catch (error) {
                toggleModal();
                console.error("Error editing pet:", error);
                showMessageDialog("Error editing pet", "warning", "top");
            }
        }
    }

    return (
        <>
            <Button onClick={toggleModal} variant="border-green" variant2="content-fit" size="extra-small">
                <div className="flex items-center gap-1">
                    <IconEdit size="medium"></IconEdit> <span>Editar</span>
                </div>
            </Button>

            <Modal isOpen={isOpen} toggleModal={toggleModal}>
                <Form title="Edit pet profile" type="edit" onSubmit={handleSubmit}>
                    <p className="text-center font-bold">Required data</p>
                    <p className="px-5">Name</p>
                    <TextInput
                        size="medium"
                        placeholder="Name" // Placeholder dinámico
                        name="name"
                        value={petData.name}
                        onChange={handleInputChange}
                    />
                    <p className="px-5">Species</p>
                    <SelectInput
                        size="medium"
                        placeholder="Species"
                        options={speciesOptions}
                        name="species"
                        value={petData.species}
                        onChange={handleInputChange}
                    />
                    <p className="px-5">Breed</p>
                    <TextInput
                        size="medium"
                        placeholder="Breed"
                        name="breed"
                        value={petData.breed}
                        onChange={handleInputChange}
                    />
                    <p className="px-5">Gender</p>
                    <SelectInput
                        size="medium"
                        placeholder="Gender"
                        options={genderOptions}
                        name="gender"
                        value={petData.gender}
                        onChange={handleInputChange}
                    />
                    <p className="px-5">Date of Birth</p>
                    <TextInput
                        type="date"
                        size="medium"
                        placeholder="Date of Birth"
                        name="dateOfBirth"
                        value={petData.dateOfBirth}
                        onChange={handleInputChange}
                    />
                    <hr className="my-2 border-t-2 border-gray-300" />
                    <p className="text-center font-bold">Optional data</p>
                    <p className="px-5">Location</p>
                    <TextInput
                        size="medium"
                        placeholder="Location"
                        name="location"
                        value={petData.location}
                        isRequired={false}
                        onChange={handleInputChange}
                    />
                    <p className="px-5">Weight</p>
                    <TextInput
                        size="medium"
                        placeholder="Weight"
                        name="weight"
                        value={petData.weight}
                        isRequired={false}
                        onChange={handleInputChange}
                    />
                    <p className="px-5">Health issues</p>
                    <TextInput
                        size="medium"
                        placeholder="Health issues"
                        name="healthIssues"
                        value={petData.healthIssues}
                        isRequired={false}
                        onChange={handleInputChange}
                    />

                    <Button type="submit" size="small" variant="solid-green">
                        Save
                    </Button>
                </Form>
            </Modal>
        </>
    );
}