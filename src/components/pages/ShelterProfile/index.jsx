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
import Button from "../../atoms/Button";
import NavBar from "../../organisms/Nav";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData } from "../../../utils/apiConnector.js";
import EmailIcon from "../../atoms/Icons/Email/index.jsx";
import PhoneIcon from "../../atoms/Icons/Phone/index.jsx";
import Clock from "../../atoms/Icons/Clock";
import PetPhotoQr from "../../organisms/PetPhotoQR";
import { useSession } from '../../../context/SessionContext';

export default function ShelterProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { userData, isAuthenticated} = useSession();
    
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

    useEffect(() => {
        if (id) {
            fetchShelter();
        } else if(!isAuthenticated){
            alert('No se encontró el ID del refugio');
            navigate("/");
        } else{
            setShelterData(userData);
        }

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
            <NavBar isAuthenticated={isAuthenticated} variant="menuHamburgerIcon"></NavBar>
            <main className="relative 2xl:mx-80 xl:mx-60 lg:mx-40 md:mx-24 mx-4 my-5">
                <section className="relative">
                    <PetPhotoQr petPicture={shelterData.coverPicture} petName={shelterData.name}></PetPhotoQr>
                </section>
                <section>
                    <div className="flex w-full justify-between my-4 items-center">
                        <h2 className="justify-center text-petrack-black text-4xl font-bold text-petrack-green">{shelterData.name}</h2>
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
            </main>
        </div>
    );
}
