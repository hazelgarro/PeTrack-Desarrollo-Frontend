import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../../../utils/apiConnector.js';

import NavBar from "../../organisms/Nav";
import ProfileImage from "../../atoms/ProfileImage/index.jsx";
import IconLocation from "../../atoms/Icons/Location";
import CardsContainer from "../../organisms/cardsContainer";
import Card from "../../molecules/Card/index.jsx";
import petPicture from '../../../assets/img/pet_picture.webp';
import IconEmail from "../../atoms/Icons/Email";
import IconUser from "../../atoms/Icons/User";
import IconPhone from "../../atoms/Icons/Phone";
import imageUserDefault from '../../../assets/img/UserDefault.svg';
import { useSession } from '../../../context/SessionContext';
import { useNavigate } from 'react-router-dom';

export default function PagePetOwner() {
    const { id } = useParams();
    const [ownerData, setOwnerData] = useState({});
    const navigate = useNavigate();

    const { userData, isAuthenticated} = useSession();//Maneja el estado de la sesión

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Llamar a la API para obtener los datos del perfil del dueño
        if (id) {
            const fetchUserData = async () => {
                const respond = await getData(`https://www.APIPetrack.somee.com/User/DetailsUser/${id}`, null, false, "GET");
                if (respond.result) {
                    setOwnerData(respond.data);
                }else {
                    alert(respond.message);
                    navigate("/");
                }

                setLoading(false);
            };

            fetchUserData();
        } else if (!isAuthenticated) {
            alert("The session was closed or the user is not logged in");
            navigate("/Login");
        } else if (userData) {
            setOwnerData(userData);

            const fetchPetData = async () => {
                const respond = await getData(`https://www.APIPetrack.somee.com/Pet/GetPetsByOwner/${userData.id}`, null, true, "GET");
                if (respond.result) {
                    setOwnerData(prevState => ({
                        ...prevState,       // Mantiene los campos existentes (name, age, address, etc.)
                        pets: respond.data      // Agrega o actualiza el campo pets
                    }));
                }
            };

            fetchPetData();
            setLoading(false);
        }
    }, [id, userData, isAuthenticated]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!ownerData) {
        return <div>No profile data found</div>;
    }

    return (
        <>
            <NavBar isAuthenticated={isAuthenticated} variant={"menuHamburgerIcon"}></NavBar>
            <div className="relative mb-12 2xl:mx-80 xl:mx-60 lg:mx-40 md:mx-24 mx-4 my-5">
                <div className="flex flex-col md:flex-row gap-8 mb-10">
                    <div className="self-center">
                        <ProfileImage defaultImage={imageUserDefault} size="extra-large"></ProfileImage>
                    </div>
                    <div className="flex flex-col justify-center text-center md:text-left">
                        <h1 className="text-petrack-green text-4xl md:text-6xl font-bold mb-2 font-outfit">{ownerData.completeName}</h1>
                        <div className="flex justify-center md:justify-start gap-2">
                            <IconLocation size="large" color="tertiary" variant="fill"></IconLocation>
                            <h2 className="text-petrack-black text-2xl md:text-3xl font-bold">{ownerData.location || 'Not available'}</h2>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-4">
                    <div>
                        <p className="text-center mb-2 sm:text-left">User type</p>
                        <div className="flex justify-center sm:justify-start gap-2 items-center">
                            <IconUser size="large"></IconUser>
                            <h4 className="text-xl">{ownerData.userType || 'Pet Owner'}</h4>
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
                        <p className="text-center mb-2 sm:text-left">Phone number</p>
                        <div className="flex justify-center sm:justify-start gap-2 items-center">
                            <IconPhone size="large"></IconPhone>
                            <h4 className="text-xl">{ownerData.phoneNumber || 'Not available'}</h4>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="flex font-outfit text-petrack-green text-2xl md:text-3xl font-bold mt-12 md:mt-24 mb-6 text-center">My pets</p>
                </div>
                <div>
                    <CardsContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ownerData.pets && ownerData.pets.length > 0 ? (
                            ownerData.pets.map((pet) => (
                                <Card imgSrc={pet.petPicture || petPicture} name={pet.name} species={pet.species} breed={pet.breed} gender={pet.gender}></Card>
                            ))
                        ) : (
                            <p>No pets found.</p>
                        )}
                    </CardsContainer>
                </div>
            </div>
        </>
    );
}