import { useEffect, useState } from 'react';
import Nav from "../../organisms/Nav";
import Welcome from "../../organisms/WelcomeContainer";
import CardsContainer from "../../organisms/cardsContainer";
import Card from "../../molecules/Card";
import Button from "../../atoms/Button";
import ServicesContainer from "../../organisms/ServicesContainer";
import { useSession } from "../../../context/SessionContext";
import { getData } from '../../../utils/apiConnector.js';
import Pet from "../../../assets/img/pet_picture.webp";

export default function HomePage() {
    const { userData, isAuthenticated } = useSession();
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPets = async () => {
            if (isAuthenticated && userData) {
                try {
                    const response = await getData(
                        `https://www.APIPetrack.somee.com/Pet/GetPetsByOwner`,
                        null,
                        true,
                        "GET"
                    );
                    if (response.result) {
                        setPets(response.data);
                    } else {
                        alert(response.message);
                    }
                } catch (error) {
                    console.error("Error fetching pets:", error);
                }
            }
            setLoading(false);
        };

        fetchPets();
    }, [isAuthenticated, userData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full bg-white">
            <Nav isAuthenticated={isAuthenticated} variant="green" />
            <Welcome />

            <div className="flex justify-center items-center pt-16">
                <p className="text-3xl md:text-5xl font-medium text-petrack-green text-center">Mis Mascotas</p>
            </div>

            <div className="mx-12 sm:mx-24 md:mx-44 my-20">
                {pets.length > 0 ? (
                    <CardsContainer>
                        {pets.map((pet) => (
                            <Card
                                key={pet.id}
                                typeCard="pet"
                                imgSrc={pet.petPicture || 'default_pet_picture.jpg'}
                                imgAlt={pet.name}
                                name={pet.name}
                                species={pet.species}
                            />
                        ))}
                    </CardsContainer>
                ) : (
                    <div className="flex flex-col justify-center items-center gap-10 m-20">
                        <h2 className="text-4xl md:text-6xl font-bold text-center text-petrack-green">
                            ¿Tu mascota es parte de tu familia?
                        </h2>
                        <p className="text-2xl md:text-4xl text-center">
                            ¡Asegura su bienestar! Regístrala en nuestra plataforma <br />
                            para tener acceso rápido a su historial médico y más.
                        </p>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20">
                            <Button type="button" variant="solid-green" onClick={() => window.location.href = '/PetRegister'} size="large">Registrar Mascota</Button>
                            <Button type="button" variant="solid-green" onClick={() => window.location.href = '/ShelterListPage'} size="large">Adoptar</Button>
                        </div>
                    </div>
                )}
            </div>
            <ServicesContainer></ServicesContainer>
            <div className="grid gap-5 md:gap-10 pt-24">
                <h2 className="text-3xl md:text-8xl font-bold text-petrack-green text-center">Cambia una vida</h2>
                <p className="text-xl md:text-4xl font-semibold text-center">Adopta una mascota</p>
                <div className=" flex flex-col md:flex-row justify-center items-center gap-3 md:gap-8">
                    <Button type="button" size="small" variant="solid-green">Todos</Button>
                    <Button type="button" size="small" variant="border-green">Perros</Button>
                    <Button type="button" size="small" variant="border-green">Gatos</Button>
                </div>
            </div>
            <div className="mx-12 md:mx-24 lg:mx-44 my-8 md:my-20">
                <CardsContainer>
                    <Card typeCard="adoption_pet" imgSrc={Pet} imgAlt="MedicalRecord" ></Card>
                    <Card typeCard="adoption_pet" imgSrc={Pet} imgAlt="MedicalRecord" ></Card>
                    <Card typeCard="adoption_pet" imgSrc={Pet} imgAlt="MedicalRecord" ></Card>
                    <Card typeCard="adoption_pet" imgSrc={Pet} imgAlt="MedicalRecord" ></Card>
                    <Card typeCard="adoption_pet" imgSrc={Pet} imgAlt="MedicalRecord" ></Card>
                    <Card typeCard="adoption_pet" imgSrc={Pet} imgAlt="MedicalRecord" ></Card>
                </CardsContainer>
            </div>
            <div className="flex justify-center items-center mb-16">
                <Button type="button" size="small" variant="border-green">Ver más</Button>
            </div>
        </div>
    );
}
