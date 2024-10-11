import Welcomebg from "../../../assets/img/Welcome_bg.png";
import Nav from "../../organisms/Nav";
import Logo from "../../atoms/Logo";
import ThreeColContainer from "../../organisms/ThreeColContainer";
import MedicalRecord from "../../atoms/Icons/MedicalRecord";
import FeatureCard from "../../molecules/FeatureCard";
import Location from "../../atoms/Icons/Location";
import Paw from "../../atoms/Icons/Paw";
import Servicesbg from "../../../assets/img/LandingBanner.png";
import ServiceCard from "../../molecules/ServiceCard";
import Vet from "../../../assets/img/veterinary.webp";
import Tag from "../../../assets/img/dogTag.png";
import Shelter from "../../../assets/img/dogShelter.png";

export default function LandingPage() {
    return (
        <div className="w-full bg-white">
            <Nav variant="solid-green"></Nav>
            <div className="bg-petrack-green flex flex-col md:flex-row justify-center items-center px-6 md:px-24 py-10 md:py-0">
                <img src={Welcomebg} alt="Welcome Background" className="w-full md:w-1/2" />
                <div className="flex flex-col gap-4 md:gap-8 text-center mt-4 md:mt-0 md:text-left">
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-medium text-white">
                        Bienvenida (o) a Petrack
                    </h1>
                    <p className="text-base md:text-2xl lg:text-4xl text-white">
                        La plataforma integral para el cuidado y bienestar de tu mascota.
                    </p>
                </div>
            </div>

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

            <div className="bg-petrack-yellow w-full flex flex-col md:flex-row justify-center md:justify-end gap-6 md:gap-20 items-center px-6 md:px-24 relative">
                <p className="m-6  md:m-12 text-3xl md:text-3xl lg:text-5xl font-bold text-white text-center md:text-left break-words max-w-full md:max-w-[40%]">
                    Servicios y Herramientas para <br /> Tu Mascota
                </p>
                <img src={Servicesbg} alt="Servicios" className="w-full md:w-1/2" />
            </div>

            <div className="flex justify-center gap-12  -mt-12 mb-24 mx-6 md:mx-12 md:-mt-8 lg:mx-48 lg:-mt-12 xl:-mt-24">
                <ServiceCard image={Tag} text="Consigue placa"></ServiceCard>
                <ServiceCard image={Shelter} text="Refugios"></ServiceCard>
            </div>




        </div>
    );
}
