import Proptypes from "prop-types";

import Image from "../../atoms/Image";
import Gender from "../../atoms/Icons/Gender"
import Location from "../../atoms/Icons/Location";

//hover:scale-100 hover:shadow-xl transition-transform duration-300

export default function Card({ typeCard, link, title, imgSrc, imgAlt }) {
    return (
        <a href={link} className="block transform">
            <div className="relative rounded overflow-hidden">
                <Image imgSrc={imgSrc} imgAlt={imgAlt}></Image>

                {typeCard === "service" ? (
                    <>
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="absolute inset-0 flex items-end justify-center p-5">
                            <h2 className="text-white text-2xl font-bold">{title}</h2>
                        </div>
                    </>
                ) : null}
            </div>

            {typeCard != "service" ? (
                <>
                    <div className="p-4">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-xl font-bold">Clifford</h2>
                                <p>Dog breed</p>
                            </div>
                            <Gender></Gender>
                        </div>

                        {typeCard === "adoption_pet" ? (
                            <>
                                <div className="flex justify-between">
                                    <div className="flex">
                                        <Location></Location>
                                        <p className="ml-2 text-gray-600">Esparza, Puntarenas</p>
                                    </div>
                                    <p className="text-gray-600">3 years</p>
                                </div>
                            </>
                        ) : null}

                    </div>
                </>
            ) : null}
        </a>
    )
}


Card.proptotypes = {
    typeCard: Proptypes.oneOf(["service", "pet", "adoption_pet"]).isRequired,
};