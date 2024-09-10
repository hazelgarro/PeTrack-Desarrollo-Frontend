import Image from "../../atoms/Image";
import Gender from "../../atoms/Icons/Gender"
import Location from "../../atoms/Icons/Location";

export default function Card({ link, children, imgSrc, imgAlt }) {
    return (
        <a href={link} className="block">
            <div className="relative bg-white rounded-xl overflow-hidden transform hover:scale-105 hover:shadow-xl transition-transform duration-300">
                <Image imgSrc={imgSrc} imgAlt={imgAlt}></Image>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex items-end justify-center p-5">
                    <h2 className="text-white text-2xl font-bold">{children}</h2>
                </div>
            </div>

            <div className="flex justify-between p-4">
                <div>
                    <h2 className="text-xl font-bold">Clifford</h2>
                    <p>Dog breed</p>
                    <div className="flex items-center">
                        <Location></Location>
                        <p className="ml-2 text-gray-600">Esparza, Puntarenas</p>
                    </div>
                </div>

                <div className="flex flex-col justify-between items-end">
                    <Gender></Gender>
                    <p className="text-gray-600">3 years</p>
                </div>
            </div>
        </a>
    );
}