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
import IconEmail from "../../atoms/Icons/Email";
import IconUser from "../../atoms/Icons/User";
import IconPhone from "../../atoms/Icons/Phone";
import NavBar from "../../organisms/NavMenu";
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
import TransferPet from "../../organisms/TransferPet/index.jsx";
import Loader from "../../atoms/Loader/index.jsx";
import ProfileImage from "../../atoms/ProfileImage/index.jsx";
import imageUserDefault from '../../../assets/img/UserDefault.svg';

export default function PetProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const hookMenuBotones = useOpenClose();
    const { userData, isAuthenticated } = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const [ownerData, setOwnerData] = useState({});

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
            fetPetOwnerData();
        }
    }, [id, petData]);

    async function fetchPet() {
        try {
            const apiUrl = `https://www.APIPetrack.somee.com/Pet/SearchById/${id}`;
            const apiRespond = await getData(apiUrl, null, false, 'GET');

            if (apiRespond && apiRespond.result) {
                setPetData(apiRespond.data);
            } else if (apiRespond) {
                console.log(apiRespond.message);
            } else {
                alert("Unexpected error");
            }
        } catch (error) {
            console.error('Error al obtener los datos de la mascota:', error);
        } finally {
            setIsLoading(false); // Desactivamos el loader al terminar de cargar los datos
        }
    }

    async function fetPetOwnerData() {
        const respond = await getData(`https://www.APIPetrack.somee.com/User/DetailsUser/${petData.ownerId}`, null, false, "GET");
        if (respond.result) {
            setOwnerData(respond.data);
        }
        setIsLoading(false);
    };

    const handleDeletePet = async () => {
        const isConfirmed = window.confirm(`Are you sure you want to eliminate ${petData.name}?`);
        if (isConfirmed) {
            const apiUrl = `https://www.APIPetrack.somee.com/Pet/DeletePet/${id}`;
            try {
                const apiRespond = await getData(apiUrl, null, true, "DELETE");
                alert(apiRespond.message);
                if (apiRespond.result) {
                    navigate("/Homepage");
                }
            } catch (error) {
                alert("Error deleting pet");
            }
        }
    };

    const updatePetData = (updatedData) => {
        setPetData(updatedData);
        if (hookMenuBotones.isOpen) {
            hookMenuBotones.toggleModal();
        }
    };

    const handleAdoption = async () => {
        if (!isAuthenticated) {
            alert("Por favor, inicie sesión para enviar una solicitud de adopción.");
            return;
        }
        const adoptionRequestData = {
            petId: petData.id,
            newOwnerId: userData.id,
        };
        try {
            const apiUrl = "https://www.APIPetrack.somee.com/Adoption/RequestAdoption";
            const response = await getData(apiUrl, adoptionRequestData, true, "POST");
            alert(response.message || "Ocurrió un error al enviar la solicitud de adopción.");
        } catch (error) {
            console.error("Error al enviar la solicitud de adopción:", error);
            alert("Error al enviar la solicitud de adopción. Intente más tarde.");
        }
    };


    const buttons = (
        <>
            <Button variant="border-green" variant2="content-fit" size="extra-small" onClick={handleDeletePet}>
                <div className="flex items-center gap-1">
                    <DeleteIcon size="medium"></DeleteIcon> <span>Eliminar</span>
                </div>
            </Button>
            <TransferPet isAuthenticated={isAuthenticated} petAccountData={petData}></TransferPet>
            <EditPet petAccountData={petData} updatePetData={updatePetData} />
        </>
    );

    return (
        <div>
            <NavBar />
            {isLoading && <Loader />} {/* Muestra el loader mientras se carga */}
            <main className="relative 2xl:mx-80 xl:mx-60 lg:mx-40 md:mx-24 mx-4 my-5">
                <section className="relative">
                    <PetPhotoQr petAccountData={petData} />

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
                    ) : null}
                </section>
                <section>
                    <div className="flex flex-col w-full justify-start my-4 md:flex-row md:justify-between">
                        <h2 className="justify-center text-petrack-green text-6xl font-bold">{petData.name}</h2>
                        {isAuthenticated && userData.id === petData.ownerId ? (
                            <div className="hidden lg:flex flex-wrap space-x-4">{buttons}</div>
                        ) : (
                            petData.ownerType === "O" ? (
                                <Link to={`/PetOwnerProfile/${petData.ownerId}`}>
                                    <Button variant="solid-green" size="extra-small" className="ml-4 !w-auto">
                                        <div className="flex items-center gap-2">
                                            <Missed color="white" />
                                            <span>Estoy perdido?</span>
                                        </div>
                                    </Button>
                                </Link>
                            ) : (
                                <div className="w-fit my-5">
                                    <Button
                                        onClick={handleAdoption}
                                        variant="solid-green"
                                        size="extra-small"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Missed color="white" />
                                            <span>Solicitar Adopción</span>
                                        </div>
                                    </Button>
                                </div>
                            )
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
                <section className="my-14">
                    <TextBlock title="Condiciones de Salud">
                        <p className="text-petrack-black mt-2 mb-4">{petData.healthIssues ? petData.healthIssues : "No Data"}</p>
                    </TextBlock>
                </section>

                <section>
                    <h2 className="my-4 text-2xl text-petrack-black font-semibold">{petData.ownerType === "PetOwner" ? "Dueño" : "Refugio"}</h2>

                    <div className="flex items-center">
                        <div className="flex items-center gap-8">
                            <a href={petData.ownerType === "PetOwner" ? `/PetOwnerProfile/${petData.ownerId}` : `/ShelterProfile/${petData.ownerId}`}>
                                <ProfileImage
                                    imageSrc={ownerData.profilePicture}
                                    defaultImage={imageUserDefault} // Reemplaza con tu imagen por defecto
                                    size="large"
                                />
                            </a>

                            <p className="text-xl font-semibold">{ownerData.completeName || ownerData.name}</p>

                            {/* Teléfono */}
                            <div className="flex items-center gap-2">
                                <IconPhone size="large" />
                                <span>{ownerData.phoneNumber || 'Not available'}</span>
                            </div>

                            {/* Correo electrónico */}
                            <div className="flex items-center gap-2">
                                <IconEmail size="large" />
                                <span>{ownerData.email || 'email@email.com'}</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div >
    );
}