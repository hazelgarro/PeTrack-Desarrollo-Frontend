import Welcomebg from "../../../assets/img/Welcome_bg.png";
import ActionButtons from "../../molecules/ActionButtons";
export default function WelcomeContainer({ }) {
    return (
        <div className="bg-petrack-green flex flex-col md:flex-row justify-center items-center px-6 md:px-24 py-10 md:py-0">
            <img
                src={Welcomebg}
                alt="Welcome Background"
                className="w-full md:w-1/2"
            />
            <div className="flex flex-col gap-4 md:gap-8 text-center mt-4 md:mt-0 md:text-left">
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-medium text-white">
                    Bienvenida (o) a Petrack
                </h1>
                <p className="text-base md:text-2xl lg:text-4xl text-white">
                    La plataforma integral para el cuidado y bienestar de tu mascota.
                </p>
                <ActionButtons />
            </div>
        </div>
    );
}
