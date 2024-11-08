import { useParams } from 'react-router-dom';
import IconText from "../../molecules/IconText";
import LocationIcon from "../../atoms/Icons/Location/index.jsx";
import ProfileInfoContainer from "../../organisms/ProfileInfoContainer";
import ButtonAdopt from "../../atoms/Button";
import petPicture from '../../../assets/img/pet_picture.webp';
import NavBar from "../../organisms/Nav";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData } from "../../../utils/apiConnector.js";
import EmailIcon from "../../atoms/Icons/Email/index.jsx";
import PhoneIcon from "../../atoms/Icons/Phone/index.jsx";
import Clock from "../../atoms/Icons/Clock";
import { useSession } from '../../../context/SessionContext';
import catImage from '../../../assets/img/Cat.png'
import CardsContainer from '../../organisms/cardsContainer/index.jsx';
import Card from '../../molecules/Card/index.jsx';
import EditUser from '../../organisms/EditUser/index.jsx';
import EditPicture from '../../organisms/EditPicture/index.jsx';
import Banner from '../../atoms/Banner/index.jsx';
import Loader from '../../atoms/Loader/index.jsx';

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
        workingHours: "",
        pets: [],
    });
    
    const [isLoading, setIsLoading] = useState(true); // Estado para manejar el loader

    const fetchPetData = async (shelterId) => {
        setIsLoading(true);
        const respond = await getData(`https://www.APIPetrack.somee.com/Pet/GetPetsByShelter/${shelterId}`, null, true, "GET");
        if (respond.result) {
            setShelterData(prevState => ({
                ...prevState,
                pets: respond.data
            }));
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (id) {
            fetchShelter();
        } else if (!isAuthenticated) {
            alert('No se encontró el ID del refugio');
            navigate("/");
        } else {
            setShelterData(userData);
            fetchPetData(userData.id);
        }
    }, [id, userData, isAuthenticated]);

    async function fetchShelter() {
        // Activamos el loader antes de comenzar la carga
        try {
            setIsLoading(true);
            const apiUrl = `https://www.APIPetrack.somee.com/User/DetailsUser/${id}`;
            const apiRespond = await getData(apiUrl, null, false, 'GET');

            if (apiRespond && apiRespond.result) {
                setShelterData(apiRespond.data);
                fetchPetData(apiRespond.data.id); // Llama a fetchPetData con el ID correcto
            } else if (apiRespond) {
                alert(apiRespond.message);
                navigate("/");
            } else {
                alert("Unexpected error");
                navigate("/");
            }
        } catch (error) {
            console.error('Error al obtener los datos del refugio:', error);
        } finally {
            setIsLoading(false); // Desactivamos el loader después de completar la carga
        }
    }

    return (
        <div>
            <NavBar variant="menuHamburgerIcon"></NavBar>
            {isLoading && <Loader />} {/* Muestra el loader mientras se carga */}
            <div className="relative 2xl:mx-80 xl:mx-60 lg:mx-40 md:mx-24 mx-4 my-5">
                <section className="relative">
                    {id ? <Banner imageSrc={shelterData.coverPicture}></Banner> : <EditPicture type="cover" imageSrc={shelterData.coverPicture}></EditPicture>}
                </section>
                <section >
                    <div className="flex gap-6 justify-start my-4 items-center ">
                        <h2 className="justify-center text-6xl font-bold text-petrack-green mt-6 mb-6">{shelterData.name}</h2>
                        {!id && <div className="flex justify-center md:justify-start mt-4">
                            <EditUser accountData={shelterData}></EditUser>
                        </div>}
                    </div>
                    <ProfileInfoContainer>
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
                    </ProfileInfoContainer>
                </section>
                {/* <div className='grid grid-cols-2 mt-24'>
                    <div className='bg-petrack-yellow rounded-3xl'>
                        <img className='rounded-3xl' src={catImage} alt="Cat" />
                    </div>
                    <div className=' flex flex-col  justify-center gap-12 p-6'>
                        <h2 className='text-petrack-green text-3xl font-extrabold'>Dale una segunda oportunidad a un amigo fiel. Adopta y cambia una vida hoy mismo.</h2>
                        <ButtonAdopt variant={`solid-green`} size="small">Adoptar</ButtonAdopt>
                    </div>
                </div> */}

                <div>
                    <p className="flex font-outfit text-petrack-green text-2xl md:text-3xl font-bold mt-12 md:mt-24 mb-6 text-center">Mascotas en adopción</p>
                </div>
                <div>
                    <CardsContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {shelterData.pets && shelterData.pets.length > 0 ? (
                            shelterData.pets.map((pet) => (
                                <Card key={pet.id} link={`/PetProfile/${pet.id}`} imgSrc={pet.petPicture || petPicture} name={pet.name} species={pet.species} breed={pet.breed} gender={pet.gender}></Card>
                            ))
                        ) : (
                            <p>No pets found.</p>
                        )}
                    </CardsContainer>
                </div>
            </div>
        </div>
    );
}