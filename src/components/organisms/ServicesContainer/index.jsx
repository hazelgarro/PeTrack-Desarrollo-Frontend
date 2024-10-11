import Servicesbg from "../../../assets/img/LandingBanner.png";
import Tag from "../../../assets/img/dogTag.png";
import Shelter from "../../../assets/img/dogShelter.png";
import ServiceCard from "../../molecules/ServiceCard";
export default function ServicesContainer({ }) {
    return (
        <div>
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
