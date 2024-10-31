import PetPhotoQr from "../../organisms/PetPhotoQR";
import { useParams } from 'react-router-dom';
import IconText from "../../molecules/IconText";
import MenuIcon from "../../atoms/Icons/Menu";
import LocationIcon from "../../atoms/Icons/Location/index.jsx";
import DeleteIcon from "../../atoms/Icons/Delete";
import TransferIcon from "../../atoms/Icons/Transfer";
import HistoryIcon from "../../atoms/Icons/History";
import ProfileInfoContainer from "../../organisms/ProfileInfoContainer";
import Modal from "../../molecules/Modal";
import { useOpenClose } from "../../../hooks/useOpenClose.js";
import Button from "../../atoms/Button";
import TextBlock from "../../molecules/TextBlock";
import MedicalInfoCard from "../../molecules/MedicalInfoCard";
import MedicalInfoToggle from "../../organisms/MedicalInfoToggle";
import NavBar from "../../organisms/Nav";
import GenderIcon from "../../atoms/Icons/Gender";
import WeightIcon from "../../atoms/Icons/Weight";
import PetIcon from "../../atoms/Icons/Pet";
import AgeIcon from "../../atoms/Icons/Age";
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getData } from "../../../utils/apiConnector.js";
import { getFormattedDate } from "../../../utils/dateFormater.js";
import Missed from "../../atoms/Icons/Missed/";
import { useSession } from '../../../context/SessionContext';
import EditPet from "../../organisms/EditPet/index.jsx";
import Banner from "../../atoms/Banner/index.jsx";

export default function PetProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const hookMenuBotones = useOpenClose();
    const { userData, isAuthenticated } = useSession();

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

    useEffect(() => {
        if (!id) {
            console.error('No se encontró el ID de la mascota');
            navigate("/");
        } else {
            fetchPet();
        }
    }, [id]); // Agregado shouldRefresh para re-ejecutar el efecto

    async function fetchPet() {
        try {
            const apiUrl = `https://www.APIPetrack.somee.com/Pet/SearchById/${id}`;
            const apiRespond = await getData(apiUrl, null, false, 'GET');

            if (apiRespond && apiRespond.result) {
                setPetData(apiRespond.data);
            } else if (apiRespond) {
                alert(apiRespond.message);
                navigate("/"); // Redirige en caso de error conocido
            } else {
                alert("Unexpected error");
                navigate("/");
            }
        } catch (error) {
            console.error('Error al obtener los datos de la mascota:', error);
            alert('Error al obtener los datos de la mascota. Intente más tarde.');
        }
    }

    async function handleDeletePet() {
        const isConfirmed = window.confirm(`Are you sure you want to eliminate ${petData.name}?`);
    
        if (isConfirmed) {
            const apiUrl = `https://www.APIPetrack.somee.com/Pet/DeletePet/${id}`;
    
            try {
                const apiRespond = await getData(apiUrl, null, true, "DELETE");

                alert(apiRespond.message);
                if(apiRespond.result){
                    navigate("/Homepage");
                }

            } catch (error) {
                alert("Error deleting pet");
            }
        }
    }
    
    const updatePetData = (updatedData) => {
        setPetData(updatedData);
        if(hookMenuBotones.isOpen){
            hookMenuBotones.toggleModal();
        }
    };

    const buttons = (
        <>
            <Button variant="border-green" variant2="content-fit" size="extra-small" onClick={handleDeletePet}>
                <div className="flex items-center gap-1">
                    <DeleteIcon size="medium"></DeleteIcon> <span>Delete</span>
                </div>
            </Button>
            <Button variant="border-green" variant2="content-fit" size="extra-small">
                <div className="flex items-center gap-1">
                    <TransferIcon size="medium"></TransferIcon> <span>Transfer</span>
                </div>
            </Button>
            <EditPet petAccountData={petData} updatePetData={updatePetData} />
        </>
    );

    return (
        <div>
            <NavBar />
            <main className="relative 2xl:mx-80 xl:mx-60 lg:mx-40 md:mx-24 mx-4 my-5">
                <section className="relative">
                    <PetPhotoQr petAccountData={petData}/>
                    
                    {isAuthenticated && userData.id === petData.ownerId ? (
                        <div className="lg:hidden">
                            <button className="absolute bottom-4 right-4" label="Drop menu" onClick={hookMenuBotones.toggleModal}>
                                <MenuIcon size="extra-large" />
                            </button>
                            <Modal type="buttons" isOpen={hookMenuBotones.isOpen} toggleModal={hookMenuBotones.toggleModal}>
                                <div className="flex flex-wrap justify-start gap-4">
                                    {buttons}
                                </div>
                            </Modal>
                        </div>
                    ) : null }
                </section>
                <section>
                    <div className="flex w-full justify-between my-4 items-center">
                        <h2 className="justify-center text-petrack-green text-6xl font-bold">{petData.name}</h2>
                        {isAuthenticated && userData.id === petData.ownerId ? (
                            <div className="hidden lg:flex flex-wrap space-x-4">{buttons}</div>
                        ) : (
                            <Link to={`/PetOwnerProfile/${petData.ownerId}`}>
                                <Button variant="solid-green" size="extra-small" className="ml-4">
                                    <div className="flex items-center gap-2">
                                        <Missed color="white" />
                                        <span>Am I lost?</span>
                                    </div>
                                </Button>
                            </Link>
                        )}
                    </div>
                    <ProfileInfoContainer>
                        <IconText text={petData.breed}>
                            <PetIcon petType={petData.species ? petData.species.toLowerCase() : ""} size="medium" />
                        </IconText>
                        <IconText text={petData.gender}>
                            <GenderIcon gender={petData.gender} size="large" />
                        </IconText>
                        <IconText text={getFormattedDate(petData.dateOfBirth)}>
                            <AgeIcon />
                        </IconText>
                        <IconText iconName="weight" text={petData.weight ? petData.weight : "No Data"}>
                            <WeightIcon />
                        </IconText>
                        <IconText text={petData.location ? petData.location : "No Data"} >
                            <LocationIcon />
                        </IconText>
                    </ProfileInfoContainer>
                </section>
                <section className="my-6">
                    <TextBlock title="Health Issues">
                        <p className="text-petrack-black mt-2 mb-4">{petData.healthIssues ? petData.healthIssues : "No Data"}</p>
                    </TextBlock>
                </section>
            </main>
        </div>
    );
}