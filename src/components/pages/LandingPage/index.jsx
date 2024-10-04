import Welcomebg from "../../../assets/img/Welcome_bg.png";
import Nav from "../../organisms/Nav";
import WelcomeContainer from "../../organisms/WelcomeContainer";
import Logo from "../../atoms/Logo";
export default function LandingPage() {
    return ( 
        <div className="w-full bg-white">
            <Nav></Nav>
            <WelcomeContainer>
                <img src={Welcomebg} alt="Welcome Background" />
                <div className="flex flex-col gap-8">
                    <h1 className="text-7xl font-medium text-white">Bienvenida (o) a Petrack</h1>
                    <p className="text-4xl text-white">La plataforma integral para el cuidado y bienestar de tu mascota.</p>
                </div>  
            </WelcomeContainer>
            <div className="mx-72 my-20 flex flex-col gap-8">
                <Logo size="extra-large"></Logo>
                <p className="text-4xl ml-14">Conecta a propietarios de mascotas, veterinarios, y tiendas en un solo lugar. Gestiona la salud de tu mascota, localízala en caso de pérdida, y facilita el proceso de adopción de manera segura y eficiente.</p>
            </div>
            
        </div>
    );
}