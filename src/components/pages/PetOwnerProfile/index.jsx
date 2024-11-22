import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../../../utils/apiConnector.js';

import NavBar from "../../organisms/NavMenu";
import ProfileImage from "../../atoms/ProfileImage/index.jsx";
import CardsContainer from "../../organisms/cardsContainer";
import Card from "../../molecules/Card/index.jsx";
import IconEmail from "../../atoms/Icons/Email";
import IconUser from "../../atoms/Icons/User";
import IconPhone from "../../atoms/Icons/Phone";
import imageUserDefault from '../../../assets/img/UserDefault.svg';
import { useSession } from '../../../context/SessionContext';
import { useNavigate } from 'react-router-dom';
import EditUser from '../../organisms/EditUser';
import Loader from "../../atoms/Loader";
import EditPicture from '../../organisms/EditPicture';
import { showMessageDialog } from '../../../utils/customAlerts.jsx';

export default function PagePetOwner() {
    const { id } = useParams();
    const [ownerData, setOwnerData] = useState({});
    const navigate = useNavigate();

    const { userData, isAuthenticated } = useSession();//Maneja el estado de la sesión

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Llamar a la API para obtener los datos del perfil del dueño
        if (id) {
            if (userData?.id == id) {
                setOwnerData(userData); // Usa los datos del usuario logueado
                fetchPetData();  // Carga las mascotas del usuario
                setLoading(false);
                return;
            }

            const fetchUserData = async () => {
                const respond = await getData(`https://www.APIPetrack.somee.com/User/DetailsUser/${id}`, null, false, "GET");
                if (respond.result) {
                    setOwnerData(respond.data);
                } else {
                    showMessageDialog(respond.message, "warning", "top");
                    navigate("/");
                }

                setLoading(false);
            };

            fetchUserData();
        } else if (!isAuthenticated) {
            showMessageDialog("Debe loguearse para acceder a esta página", "warning", "top");
            navigate("/");
        } else if (userData) {
            setOwnerData(userData);
            fetchPetData();
            setLoading(false);
        }
    }, [id, userData, isAuthenticated]);

    const fetchPetData = async () => {
        const respond = await getData(`https://www.APIPetrack.somee.com/Pet/GetPetsByOwner`, null, true, "GET");
        if (respond.result) {
            setOwnerData(prevState => ({
                ...prevState,       // Mantiene los campos existentes (name, age, address, etc.)
                pets: respond.data      // Agrega o actualiza el campo pets
            }));
        }
    };

    if (!ownerData) {
        return <div>No profile data found</div>;
    }

    return (
        <>
            {loading && <Loader />} {/* Muestra el loader mientras se carga */}
            <NavBar variant={"menuHamburgerIcon"}></NavBar>

            <div className="relative mb-12 2xl:mx-80 xl:mx-60 lg:mx-40 md:mx-24 mx-4 my-5">
                <div className="flex flex-col md:flex-row gap-8 mb-10">
                    <div className="self-center">
                        {id && (id != userData?.id) ? <ProfileImage imageSrc={ownerData.profilePicture} defaultImage={imageUserDefault} size="extra-large"></ProfileImage> :
                            <EditPicture imageSrc={ownerData.profilePicture} type='profile'></EditPicture>}
                    </div>
                    <div className="flex flex-col justify-center text-center md:text-left">
                        <h1 className="text-petrack-green text-4xl md:text-6xl font-bold mb-2 font-outfit">{ownerData.completeName || "User name"}</h1>

                        {(!id || (id == userData?.id))  && <div className="flex justify-center md:justify-start gap-2">
                            <EditUser accountData={ownerData}></EditUser>
                        </div>}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-4">
                    <div>
                        <p className="text-center mb-2 sm:text-left">Tipo de Usuario</p>
                        <div className="flex justify-center sm:justify-start gap-2 items-center">
                            <IconUser size="large"></IconUser>
                            <h4 className="text-xl">{ownerData.userTypeId === "O" ? 'Dueño/a de Mascota' : 'Refugio'}</h4>
                        </div>
                    </div>
                    <div>
                        <p className="text-center mb-2 sm:text-left">Email</p>
                        <div className="flex justify-center sm:justify-start gap-2 items-center">
                            <IconEmail size="large"></IconEmail>
                            <h4 className="text-xl">{ownerData.email}</h4>
                        </div>
                    </div>
                    <div>
                        <p className="text-center mb-2 sm:text-left">Numero de Teléfono</p>
                        <div className="flex justify-center sm:justify-start gap-2 items-center">
                            <IconPhone size="large"></IconPhone>
                            <h4 className="text-xl">{ownerData.phoneNumber || 'Sin datos'}</h4>
                        </div>
                    </div>
                </div>

                {(!id || (id == userData?.id)) &&
                    <div>
                        <div>
                            <p className="flex font-outfit text-petrack-green text-2xl md:text-3xl font-bold mt-12 md:mt-24 mb-6 text-center">Mis Mascotas</p>
                        </div>
                        <CardsContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {ownerData.pets && ownerData.pets.length > 0 ? (
                                ownerData.pets.map((pet) => (
                                    <Card link={`/PetProfile/${pet.id}`} key={pet.id} imgSrc={pet.petPicture} name={pet.name} species={pet.species} breed={pet.breed} gender={pet.gender}></Card>
                                ))
                            ) : (
                                <p>Sin mascotas.</p>
                            )}
                        </CardsContainer>
                    </div>
                }
            </div>
        </>
    );
}