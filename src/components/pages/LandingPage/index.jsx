import Nav from "../../organisms/Nav";
import Logo from "../../atoms/Logo";
import MedicalRecord from "../../atoms/Icons/MedicalRecord";
import FeatureCard from "../../molecules/FeatureCard";
import Location from "../../atoms/Icons/Location";
import Paw from "../../atoms/Icons/Paw";
import WelcomeContainer from "../../organisms/WelcomeContainer";
import ServicesContainer from "../../organisms/ServicesContainer";
import Button from "../../atoms/Button";
import Smartphone from "../../../assets/img/Smartphone.png";
import { useSession } from "../../../context/SessionContext";

export default function LandingPage() {
    const { isAuthenticated } = useSession();
    return (
        <div className="w-full bg-white">
            <Nav isAuthenticated={isAuthenticated} variant="green"></Nav>

            <WelcomeContainer></WelcomeContainer>
            <div className=" items-center mx-6 md:mx-24 lg:mx-72 my-10 md:my-20 flex flex-col gap-6 md:gap-8">
                <div className="flex justify-center my-4 md:my-12 w-56 sm:w-56 lg:w-96">
                    <Logo />
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
            <ServicesContainer></ServicesContainer>
            <div className="flex justify-center">
                <div className="flex flex-col justify-center items-center gap-8">
                    <p className="text-3xl md:text-5xl font-bold">Únete a Nuestra Comunidad</p>
                    <a href="/Signup"><Button type="button" variant="solid-green" size="large">Registrarse</Button></a>
                </div>
                <div>
                    <img src={Smartphone} alt="" />
                </div>
            </div>
        </div>
    );
}
