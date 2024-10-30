import { useEffect, useState } from "react";
import Card from "../../molecules/Card";
import NavFooter from "../../templates/NavFooter";

export default function SheltersPage() {
    const [shelters, setShelters] = useState([]);

    useEffect(() => {
        fetch("https://www.APIPetrack.somee.com/User/ListPetStoreShelters")
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    setShelters(data.data);
                } else {
                    console.error("Shelters not found.");
                }
            })
            .catch(error => console.error("Error fetching shelters:", error));
    }, []);

    return (
        <NavFooter>

        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-petrack-green">List of Shelters</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {shelters.map((shelter) => (
                    <Card
                        key={shelter.id}
                        typeCard="service"
                        link={`shelterProfile/${shelter.id}`}
                        title={shelter.name}
                        imgSrc={`${shelter.coverPicture}`}
                        imgAlt={shelter.name}
                        name={shelter.name}
                        location={shelter.address}
                    />
                ))}
            </div>
        </div>
        </NavFooter>
    );
}
