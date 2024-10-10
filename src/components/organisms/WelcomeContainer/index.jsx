import Welcomebg from "../../../assets/img/Welcome_bg.png";
export default function WelcomeContainer({ }) {
    return (
        <div className="bg-petrack-green flex justify-center items-center  px-24">
            <img src={Welcomebg} alt="Welcome Background" />
            <div className="flex flex-col gap-8">
                <h1 className="text-7xl font-medium text-white">Bienvenida (o) a Petrack</h1>
                <p className="text-4xl text-white">La plataforma integral para el cuidado y bienestar de tu mascota.</p>
            </div>  
        </div>
    );
  }
