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
            <Nav></Nav>
            <div className="bg-petrack-green flex justify-center items-center  px-24">
                <img src={Welcomebg} alt="Welcome Background" />
                <div className="flex flex-col gap-8">
                    <h1 className="text-7xl font-medium text-white">Bienvenida (o) a Petrack</h1>
                    <p className="text-4xl text-white">La plataforma integral para el cuidado y bienestar de tu mascota.</p>
                </div>  
            </div>
            <div className="mx-72 my-20 flex flex-col gap-8">
                <Logo size="extra-large"></Logo>
                <p className="text-4xl ml-14">Conecta a propietarios de mascotas, veterinarios, y tiendas en un solo lugar. Gestiona la salud de tu mascota, localízala en caso de pérdida, y facilita el proceso de adopción de manera segura y eficiente.</p>
                <div className="flex justify-center mt-10">
                    <h2 className="text-5xl ml-14 font-bold ">Principales características</h2>
                </div>
                <ThreeColContainer>
                    <FeatureCard>
                        <MedicalRecord size="extra-extra-large" thickness="8"></MedicalRecord>
                        <p className="text-4xl font-bold text-center">Información de <br/> tu mascota</p>
                    </FeatureCard>
                    <FeatureCard>
                        <Location size="extra-extra-large" thickness="1.5"></Location>
                        <p className="text-4xl font-bold text-center">Localiza a tu <br/> mascota</p>
                    </FeatureCard>
                    <FeatureCard>
                        <Paw size="extra-extra-large" color="primary" variant="solid"></Paw>
                        <p className="text-4xl font-bold text-center">Adopta una <br/> mascota</p>
                    </FeatureCard>
                </ThreeColContainer>
            </div>
            <div className="bg-petrack-yellow w-full flex justify-end gap-72 items-center ">
                    <p className="text-6xl font-bold text-white">Servicios y <br/> Herramientas para <br/> Tu Mascota</p>
                    <img src={Servicesbg} alt=""/>
            </div>
            <div className="-mt-44 mx-72">
                <ThreeColContainer>
                    <ServiceCard image={Vet} text="Veterinarias"></ServiceCard>
                    <ServiceCard image={Tag} text="Consigue placa"></ServiceCard>
                    <ServiceCard image={Shelter} text="Refugios"></ServiceCard>
                </ThreeColContainer>
            </div>

        </div>
    );
}