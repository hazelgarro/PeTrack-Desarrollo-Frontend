import { useEffect, useState } from 'react';
import NavMenu from "../../organisms/NavMenu";
import Nav from "../../organisms/Nav";
import NavLanding from "../../organisms/NavLoged/index.jsx";
import Welcome from "../../organisms/WelcomeContainer";
import CardsContainer from "../../organisms/cardsContainer";
import MedicalRecord from "../../atoms/Icons/MedicalRecord";
import FeatureCard from "../../molecules/FeatureCard";
import Location from "../../atoms/Icons/Location";
import Paw from "../../atoms/Icons/Paw";
import Card from "../../molecules/Card";
import Button from "../../atoms/Button";
import ServicesContainer from "../../organisms/ServicesContainer";
import { useSession } from "../../../context/SessionContext";
import { getData } from '../../../utils/apiConnector.js';
import Pet from "../../../assets/img/pet_picture.webp";
import Smartphone from "../../../assets/img/Smartphone.png";
import Logo from "../../atoms/Logo";
import CardNotification from "../../molecules/CardNotification";
import Footer from "../../organisms/Footer";
import Loader from '../../atoms/Loader';

export default function HomePage() {
    const { userData, isAuthenticated } = useSession();
    const [pets, setPets] = useState([]);
    const [adoptionRequests, setAdoptionRequests] = useState([]);
    const [transfers, setTransfers] = useState([]);
    const [adoptionPets, setAdoptionPets] = useState([]);
    const [visiblePets, setVisiblePets] = useState(6);
    const [filter, setFilter] = useState("Todos");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (isAuthenticated && userData) {
                try {
                    const [petResponse, adoptionPetsResponse, transfersResponse] = await Promise.all([
                        getData(`https://www.APIPetrack.somee.com/Pet/GetPetsByOwner`, null, true, "GET"),
                        getData(`https://www.APIPetrack.somee.com/Adoption/GetAllAdoptionPets`, null, false, "GET"),
                        getData(`https://www.APIPetrack.somee.com/Transfer/GetTransferRequestsByUserId/${userData.id}`, null, true, "GET")
                    ]);

                    if (petResponse.result) {
                        setPets(petResponse.data);
                        if (userData.userTypeId === "S") {
                            const adoptionRequestsData = await fetchAdoptionRequests(petResponse.data);
                            setAdoptionRequests(adoptionRequestsData);
                        }
                    }

                    if (adoptionPetsResponse.result) setAdoptionPets(adoptionPetsResponse.data);
                    if (transfersResponse.result) setTransfers(transfersResponse.data);

                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
            setLoading(false);
        };

        const fetchAdoptionRequests = async (pets) => {
            let allRequests = [];
            for (const pet of pets) {
                const response = await getData(
                    `https://www.APIPetrack.somee.com/Adoption/ListAdoptionRequestsForPet/${pet.id}`,
                    null,
                    true,
                    "GET"
                );
                if (response.result) {
                    response.data.forEach((request) => {
                        allRequests.push({ ...request, petName: pet.name, petPicture: pet.petPicture });
                    });
                }
            }
            return allRequests;
        };

        if (isAuthenticated && userData) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, userData]);

    const loadMorePets = () => setVisiblePets((prev) => prev + 6);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setVisiblePets(6);
    };

    const filteredPets = adoptionPets.filter((pet) =>
        filter === "Todos" ? true : pet.species.toLowerCase() === filter.toLowerCase()
    );

    const handleRequestAction = async (requestId, action) => {
        try {
            const endpoint = getRequestEndpoint(action, requestId);
            const response = await getData(endpoint, null, true, "PUT");

            if (response.result) {
                if (action === "DeliveryRequest") {
                    // Filtrar la mascota que fue entregada y actualizar el estado
                    setAdoptionRequests((prevRequests) =>
                        prevRequests.filter((req) => req.id !== requestId)
                    );
                    alert("La mascota ha sido transferida exitosamente al perfil del usuario.");
                } else {
                    // Actualizar el estado de la solicitud en la lista
                    setAdoptionRequests((prevRequests) =>
                        prevRequests.map((req) =>
                            req.id === requestId
                                ? { ...req, isAccepted: getActionStatus(action) }
                                : req
                        )
                    );
                }
            }
        } catch (error) {
            console.error(`Error en la acción ${action}:`, error);
            alert("Ocurrió un error al procesar la solicitud. Inténtalo de nuevo más tarde.");
        }
    };


    const getRequestEndpoint = (action, requestId) => {
        switch (action) {
            case "AcceptRequest":
                return `https://www.APIPetrack.somee.com/Adoption/AcceptAdoptionRequest/${requestId}`;
            case "RejectRequest":
                return `https://www.APIPetrack.somee.com/Adoption/RejectAdoptionRequest/${requestId}`;
            case "DeliveryRequest":
                return `https://www.APIPetrack.somee.com/Adoption/ConfirmDelivery/${requestId}`;
            default:
                throw new Error("Invalid action");
        }
    };

    const getActionStatus = (action) => {
        switch (action) {
            case "AcceptRequest":
                return "Accepted";
            case "RejectRequest":
                return "Rejected";
            case "DeliveryRequest":
                return "Delivered";
            default:
                return "Pending";
        }
    };

    return (
        <div className="w-full bg-white">
            {loading && <Loader />} {/* Muestra el loader mientras se carga */}
            {isAuthenticated ? (
                <>
                    {/* Contenido para usuarios autenticados */}
                    <NavLanding isAuthenticated={isAuthenticated} variant="green" />
                    <Welcome />

                    {/* Pets Section */}
                    <div className="mx-12 sm:mx-24 md:mx-44 my-20 ">
                        {pets.length > 0 ? (
                            <>
                                <div className="flex justify-center items-center pt-16">
                                    <p className="text-3xl m-12 md:text-5xl font-medium text-petrack-green text-center">Mis Mascotas</p>
                                </div>
                                <CardsContainer>
                                    {pets.map((pet) => (
                                        <Card
                                            link={`/PetProfile/${pet.id}`}
                                            key={pet.id}
                                            typeCard="pet"
                                            imgSrc={pet.petPicture || 'default_pet_picture.jpg'}
                                            imgAlt={pet.name}
                                            name={pet.name}
                                            gender={pet.gender}
                                            species={pet.species}
                                            breed={pet.breed}
                                        />
                                    ))}
                                </CardsContainer>
                            </>
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

                    {/* Transfers Requests Section */}
                    {/* {transfers && (
                        <section>
                            <div className="flex justify-center items-center pt-16">
                                <p className="text-3xl md:text-5xl font-medium text-petrack-green text-center">
                                    Transferencias de mascotas recibidas
                                </p>
                            </div>

                            <div className="mx-12 sm:mx-24 md:mx-44 my-20">
                                <div>
                                    {transfers
                                        .filter((request) => request.currentOwner.email !== userData.email && request.status === "Pending") // Filtra las solicitudes donde el dueño tiene un correo diferente al usuario actual
                                        .map((request) => (
                                            <CardNotification
                                                key={request.id}
                                                typeCard="adoption_request"
                                                imgSrc={request.petPicture || 'default_pet_picture.jpg'}
                                                imgAlt={request.petName}
                                                name={request.petName}
                                                requesterEmail={request.currentOwner.email}
                                                status={
                                                    request.status === 'Accepted'
                                                        ? 'Aceptada'
                                                        : request.status === 'Rejected'
                                                            ? 'Denegada'
                                                            : 'Pendiente'
                                                }
                                                requestDate={new Date(request.requestDate).toLocaleDateString()}
                                                onAccept={() => handleRespondToTransfer(request.id, { accepted: true})}
                                                onDeny={() => handleRespondToTransfer(request.id, { accepted: false})}
                                            />
                                        ))}
                                </div>
                            </div>
                        </section>
                    )} */}

                    {/* Adoption Requests Section */}
                    {userData.userTypeId === "S" && <section>
                        <div className="flex justify-center items-center pt-16">
                            <p className="text-3xl md:text-5xl font-medium text-petrack-green text-center">Solicitudes de Adopción</p>
                        </div>

                        <div className="mx-12 sm:mx-24 md:mx-44 my-20">
                            {adoptionRequests.length > 0 ? (
                                <div>
                                    {adoptionRequests.map((request) => (
                                        <CardNotification
                                        key={request.id}
                                        typeCard="adoption_request"
                                        imgSrc={request.petPicture || 'default_pet_picture.jpg'}
                                        imgAlt={request.petName}
                                        name={request.petName}
                                        requesterEmail={request.requester.email}
                                        status={request.isAccepted === 'Accepted' ? 'Aceptada' : request.isAccepted === 'Rejected' ? 'Denegada' : 'Pendiente'}
                                        requestDate={new Date(request.requestDate).toLocaleDateString()}
                                        onDelivery={() => handleRequestAction(request.id, "DeliveryRequest")}
                                        onAccept={() => handleRequestAction(request.id, "AcceptRequest")}
                                        onDeny={() => handleRequestAction(request.id, "RejectRequest")}
                                    />
                                    

                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-xl text-gray-500">No hay solicitudes de adopción</div>
                            )}
                        </div>
                    </section>}

                    <div className="grid gap-5 md:gap-10 pt-24">
                        <h2 className="text-3xl md:text-8xl font-bold text-petrack-green text-center">Cambia una vida</h2>
                        <p className="text-xl md:text-4xl font-semibold text-center">Adopta una mascota</p>
                        <div className=" flex flex-col md:flex-row justify-center items-center gap-3 md:gap-8">
                            <Button type="button" size="small" variant={filter === "Todos" ? "solid-green" : "border-green"} onClick={() => handleFilterChange("Todos")}>
                                Todos
                            </Button>
                            <Button type="button" size="small" variant={filter === "Dog" ? "solid-green" : "border-green"} onClick={() => handleFilterChange("Dog")}>
                                Perros
                            </Button>
                            <Button type="button" size="small" variant={filter === "Cat" ? "solid-green" : "border-green"} onClick={() => handleFilterChange("Cat")}>
                                Gatos
                            </Button>
                        </div>
                    </div>

                    <div className="mx-12 md:mx-24 lg:mx-44 my-8 md:my-20">
                        <CardsContainer>
                            {adoptionPets.length > 0 ? (
                                filteredPets.slice(0, visiblePets).map((pet) => (
                                    <Card
                                        link={`/PetProfile/${pet.id}`}
                                        key={pet.id}
                                        typeCard="adoption_pet"
                                        imgSrc={pet.petPicture || 'default_pet_picture.jpg'}
                                        imgAlt={pet.name}
                                        name={pet.name}
                                        gender={pet.gender}
                                        species={pet.species}
                                        location={pet.location}
                                        breed={pet.breed}
                                        dateOfBirth={pet.dateOfBirth}
                                    />
                                ))
                            ) : (
                                <div>No hay mascotas disponibles para adopción en este momento.</div>
                            )}
                        </CardsContainer>
                    </div>
                    {visiblePets < adoptionPets.length && (
                        <div className="flex justify-center items-center mb-16">
                            <Button onClick={loadMorePets} type="button" size="small" variant="border-green">Ver más</Button>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {/* Contenido para usuarios no autenticados */}
                    <NavMenu isAuthenticated={false} variant="green" />
                    <Welcome />

                    <div className=" items-center mx-6 md:mx-24 lg:mx-72 my-10 md:my-20 flex flex-col gap-6 md:gap-8">
                        <div className="flex justify-center my-4 md:my-12 w-56 sm:w-56 lg:w-96">
                            <Logo size="extra-large" />
                        </div>



                        <p className="text-sm text-center md:text-2xl lg:text-4xl">
                            Conecta a propietarios de mascotas, veterinarios, y tiendas en un solo lugar.
                            <br />
                            Gestiona la salud de tu mascota, localízala en caso de pérdida, y facilita el
                            proceso de adopción de manera segura y eficiente.
                        </p>

                        <div className="flex justify-center mt-6 md:mt-10">
                            <h2 className="text-2xl text-center md:text-4xl lg:text-5xl font-bold m-6">
                                Principales características
                            </h2>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
                            <FeatureCard>
                                <MedicalRecord size="extra-large" thickness="8"></MedicalRecord>
                                <p className="text-lg md:text-3xl lg:text-4xl font-bold text-center">
                                    Información de <br /> tu mascota
                                </p>
                            </FeatureCard>
                            <FeatureCard>
                                <Location size="extra-large" thickness="1.5"></Location>
                                <p className="text-lg md:text-3xl lg:text-4xl font-bold text-center">
                                    Localiza a tu <br /> mascota
                                </p>
                            </FeatureCard>
                            <FeatureCard>
                                <Paw size="extra-large" color="primary" variant="solid"></Paw>
                                <p className="text-lg md:text-3xl lg:text-4xl font-bold text-center">
                                    Adopta una <br /> mascota
                                </p>
                            </FeatureCard>
                        </div>
                    </div>
                    <ServicesContainer />
                    <div className="flex justify-center m-24">
                        <div className="flex flex-col justify-center items-center gap-8">
                            <p className="text-3xl md:text-5xl font-bold text-center">Únete a Nuestra Comunidad</p>
                            <a href="/Signup"><Button type="button" variant="solid-green" size="large">Registrarse</Button></a>
                        </div>
                        <div className="hidden md:block">
                            <img src={Smartphone} alt="" />
                        </div>

                    </div>
                </>
            )}
            {/* Pets Section */}

            <Footer></Footer>
        </div>
    );
}
