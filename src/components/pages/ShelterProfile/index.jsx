import { useParams } from 'react-router-dom';
import IconText from "../../molecules/IconText";
import MenuIcon from "../../atoms/Icons/Menu";
import LocationIcon from "../../atoms/Icons/Location/index.jsx";
import DeleteIcon from "../../atoms/Icons/Delete";
import TransferIcon from "../../atoms/Icons/Transfer";
import HistoryIcon from "../../atoms/Icons/History";
import EditIcon from "../../atoms/Icons/Edit";
import ProfileInfoContainer from "../../organisms/ProfileInfoContainer";
import Modal from "../../molecules/Modal";
import { useOpenClose } from "../../../hooks/useOpenClose.js";
import ButtonAdopt from "../../atoms/Button";
import petPicture from '../../../assets/img/pet_picture.webp';
import NavBar from "../../organisms/Nav";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData } from "../../../utils/apiConnector.js";
import EmailIcon from "../../atoms/Icons/Email/index.jsx";
import PhoneIcon from "../../atoms/Icons/Phone/index.jsx";
import Clock from "../../atoms/Icons/Clock";
import PetPhotoQr from "../../organisms/PetPhotoQR";
import { useSession } from '../../../context/SessionContext';
import catImage from '../../../assets/img/Cat.png'
import CardsContainer from '../../organisms/cardsContainer/index.jsx';
import Card from '../../molecules/Card/index.jsx';
import EditUser from '../../organisms/EditUser/index.jsx';
import EditPicture from '../../organisms/EditPicture/index.jsx';
import Image from '../../atoms/Image/index.jsx';

export default function ShelterProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { userData, isAuthenticated } = useSession();

    const [shelterData, setShelterData] = useState({
        name: "",
        email: "",
        profilePicture: "",
        coverPicture: "",
        phoneNumber: "",
        address: "",
        workingDays: "",
        workingHours: ""
    });

    const fetchPetData = async () => {
        const respond = await getData(`https://www.APIPetrack.somee.com/Pet/GetPetsByOwner/${userData.id}`, null, true, "GET");
        if (respond.result) {
            setShelterData(prevState => ({
                ...prevState,       // Mantiene los campos existentes (name, age, address, etc.)
                pets: respond.data      // Agrega o actualiza el campo pets
            }));
        }
    };

    useEffect(() => {
        if (id) {
            fetchShelter();
        } else if (!isAuthenticated) {
            alert('No se encontró el ID del refugio');
            navigate("/");
        } else {
            setShelterData(userData);
        }

        fetchPetData();
    }, [id, userData, isAuthenticated]);

    async function fetchShelter() {
        try {
            const apiUrl = `https://www.APIPetrack.somee.com/User/DetailsUser/${id}`;
            const apiRespond = await getData(apiUrl, null, false, 'GET');

            if (apiRespond && apiRespond.result) {
                setShelterData(apiRespond.data);
            } else if (apiRespond) {
                alert(apiRespond.message);
                navigate("/"); // Redirige en caso de error conocido
            } else {
                alert("Unexpected error");
                navigate("/");
            }
        } catch (error) {
            console.error('Error al obtener los datos del refugio:', error);
            alert('Error al obtener los datos del refugio. Intente más tarde.');
        }
    }

    return (
        <div>
            <NavBar variant="menuHamburgerIcon"></NavBar>
            <div className="relative 2xl:mx-80 xl:mx-60 lg:mx-40 md:mx-24 mx-4 my-5">
                <section className="relative">

                    {/* <PetPhotoQr petPicture={shelterData.coverPicture} petName={shelterData.name} /> */}
                    <Image imgSrc={shelterData.coverPicture}></Image>

                </section>
                <section >
                    <div className="flex gap-6 justify-start my-4 items-center ">
                        <h2 className="justify-center text-6xl font-bold text-petrack-green mt-6 mb-6">{shelterData.name}</h2>
                        {!id && <div className="flex justify-center md:justify-start mt-4">
                            <EditUser accountData={shelterData}></EditUser>
                        </div>}
                    </div>
                    <div className='flex gap-12'>
                        <IconText text={shelterData.workingDays || "No Data"}>
                            <Clock size="medium" />
                        </IconText>
                        <IconText text={shelterData.address || "No Data"}>
                            <LocationIcon />
                        </IconText>
                        <IconText text={shelterData.email || "No Data"}>
                            <EmailIcon />
                        </IconText>
                        <IconText text={shelterData.phoneNumber || "No Data"}>
                            <PhoneIcon />
                        </IconText>
                    </div>
                </section>
                <div className='grid grid-cols-2 mt-24'>
                    <div className='bg-petrack-yellow rounded-3xl'>
                        <img className='rounded-3xl' src={catImage} alt="Cat" />
                    </div>
                    <div className=' flex flex-col  justify-center gap-12 p-6'>
                        <h2 className='text-petrack-green text-3xl font-extrabold'>Dale una segunda oportunidad a un amigo fiel. Adopta y cambia una vida hoy mismo.</h2>
                        <ButtonAdopt variant={`solid-green`} size="small">Adoptar</ButtonAdopt>
                    </div>

                </div>

                <div>
                    <p className="flex font-outfit text-petrack-green text-2xl md:text-3xl font-bold mt-12 md:mt-24 mb-6 text-center">Mascotas en adopción</p>
                </div>
                <div>
                    <CardsContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {shelterData.pets && shelterData.pets.length > 0 ? (
                            shelterData.pets.map((pet) => (
                                <Card link={`/PetProfile/${pet.id}`} imgSrc={pet.petPicture || petPicture} name={pet.name} species={pet.species} breed={pet.breed} gender={pet.gender}></Card>
                            ))
                        ) : (
                            <p>No pets found.</p>
                        )}
                    </CardsContainer>
                </div>
            </div>
        </div >
    );
}
