import Proptypes from "prop-types";
import Image from "../../atoms/Image";
import Gender from "../../atoms/Icons/Gender";
import Location from "../../atoms/Icons/Location";

import { getFormattedDate } from "../../../utils/dateFormater";

//hover:scale-100 hover:shadow-xl transition-transform duration-300

export default function Card({ typeCard="pet", link="#", title, imgSrc, imgAlt="pet photo", name, species, breed, gender, location, dateOfBirth}) {
    return (
        <a href={link} className="block transform">
            <div className="relative rounded-2xl overflow-hidden">
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

            {typeCard !== "service" ? (
                <>
                    <div className="p-4">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-xl font-bold">{name}</h2>
                                <p>{species} | {breed}</p>
                            </div>
                            <Gender gender={gender} color="secondary" size="large"></Gender>
                        </div>

                        {typeCard === "adoption_pet" ? (
                            <>
                                <div className="flex justify-between">
                                    <div className="flex">
                                        <Location variant="solid" color="tertiary"></Location>
                                        <p className="ml-2 text-gray-600">{location || "ND"}</p>
                                    </div>
                                    <p className="text-gray-600">{dateOfBirth ? getFormattedDate(dateOfBirth) : "ND"}</p>
                                </div>
                            </>
                        ) : null}

                    </div>
                </>
            ) : null}
        </a>
    );
}

Card.propTypes = {
    typeCard: Proptypes.oneOf(["service", "pet", "adoption_pet"]),
    link: Proptypes.string, 
    title: Proptypes.string,
    imgSrc: Proptypes.string.isRequired,
    imgAlt: Proptypes.string,
    name: Proptypes.string,
    species: Proptypes.string,
    breed: Proptypes.string,
    gender: Proptypes.string,
    location: Proptypes.string,
    dateOfBirth: Proptypes.string,
};