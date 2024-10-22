import PetPhotoQr from "../../organisms/PetPhotoQR";

import { useParams } from 'react-router-dom';
import IconText from "../../molecules/IconText";
import MenuIcon from "../../atoms/Icons/Menu";
import LocationIcon from "../../atoms/Icons/Location/index.jsx";
import DeleteIcon from "../../atoms/Icons/Delete";
import TransferIcon from "../../atoms/Icons/Transfer";
import HistoryIcon from "../../atoms/Icons/History";
import EditIcon from "../../atoms/Icons/Edit";
import IconClock from "../../atoms/Icons/Clock";

import ProfileInfoContainer from "../../organisms/ProfileInfoContainer";
import Modal from "../../molecules/Modal";
import { useOpenClose } from "../../../hooks/useOpenClose.js";

import Button from "../../atoms/Button";
import TextBlock from "../../molecules/TextBlock";
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
import Clock from "../../atoms/Icons/Clock";
import EmailIcon from "../../atoms/Icons/Email/index.jsx";
import PhoneIcon from "../../atoms/Icons/Phone/index.jsx";

export default function PetProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
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
    }, [id]);

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
                const apiRespond = await getData(apiUrl, null, true, "GET");

                alert(apiRespond.message);
                if(apiRespond.result){
                    navigate("/Homepage");
                }

            } catch (error) {
                alert("Error deleting pet");
            }
        }
    }
    

    const buttons = <>
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
        <Button variant="border-green" size="extra-small">
            <div className="flex items-center gap-1">
                <HistoryIcon size="medium"></HistoryIcon> <span>History of owners</span>
            </div>
        </Button>
        <Button variant="border-green" variant2="content-fit" size="extra-small">
            <div className="flex items-center gap-1">
                <EditIcon size="medium"></EditIcon> <span>Edit</span>
            </div>
        </Button>
    </>;

    const hookMenuBotones = useOpenClose();

    return (
        <div>
            <NavBar isAuthenticated={isAuthenticated}></NavBar>

            <main className="relative 2xl:mx-80 xl:mx-60 lg:mx-40 md:mx-24 mx-4 my-5">
                <section className="relative">
                    <PetPhotoQr petPicture={petData.petPicture} petName={petData.name}></PetPhotoQr>


                    {isAuthenticated && userData.Id === petData.ownerId ? (
                        <div className="lg:hidden">
                            {/* Hay que cambiar este botón por un componente button, pero hay que crear otra variante*/}
                            <button className="absolute bottom-4 right-4" label="Drop menu" onClick={hookMenuBotones.toggleModal}>
                                <MenuIcon size="extra-large" />
                            </button>

                            <Modal isOpen={hookMenuBotones.isOpen} toggleModal={hookMenuBotones.toggleModal}>
                                <div className="flex flex-wrap justify-start gap-4">
                                    {buttons}
                                </div>
                            </Modal>
                        </div>
                    ) : null }
                </section>
                <section>
                    <div className="flex w-full justify-between my-4 items-center">
                        <h2 className="justify-center text-petrack-black text-4xl font-bold">{petData.name}</h2>
                    </div>
                    <ProfileInfoContainer>
                        <IconText text={getFormattedDate(petData.dateOfBirth)}>
                            <AgeIcon />
                        </IconText>
                        <IconText text={petData.gender}>
                            <Clock gender={petData.gender} size="medium" />
                        </IconText>
                        <IconText text={petData.location ? petData.location : "No Data"} >
                            <LocationIcon />
                        </IconText>
                    
                        <IconText iconName="weight" text={petData.weight ? petData.weight : "No Data"}>
                            <EmailIcon />
                        </IconText>
                        <IconText iconName="weight" text={petData.weight ? petData.weight : "No Data"}>
                            <PhoneIcon />
                        </IconText>
                    </ProfileInfoContainer>
                </section>
                
                
            </main>
        </div>
    )
}