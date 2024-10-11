import Nav from "../../organisms/Nav";
import Pet from "../../../assets/img/pet_picture.webp";

import Welcome from "../../organisms/WelcomeContainer";
import ServicesContainer from "../../organisms/ServicesContainer";
import CardsContainer from "../../organisms/cardsContainer";
import Card from "../../molecules/Card";
import Button from "../../atoms/Button";

export default function HomePage() {
    return ( 
        <div className="w-full bg-white">
            <Nav></Nav>
            <Welcome></Welcome>
            <div className="flex justify-center items-center pt-16">
                <p className="text-5xl ml-14 font-medium text-petrack-green">Mis Mascotas</p>
            </div>
            <div className="mx-44 my-20">
                <CardsContainer>
                    <Card typeCard="pet" imgSrc={Pet} imgAlt="MedicalRecord" ></Card>
                    <Card typeCard="pet" imgSrc={Pet} imgAlt="MedicalRecord" ></Card>
                    <Card typeCard="pet" imgSrc={Pet} imgAlt="MedicalRecord" ></Card>
                </CardsContainer>
            </div>
            <ServicesContainer></ServicesContainer>
            <div className="grid gap-10 py-24">
                <h2 className="text-8xl font-bold text-petrack-green text-center">Cambia una vida</h2>
                <p className="text-4xl font-semibold text-center">Adopta una mascota</p>
                <div className=" flex justify-center items-center gap-8">
                    <Button type="button" size="small" variant="solid-green">Todos</Button>
                    <Button type="button" size="small" variant="border-green">Perros</Button>
                    <Button type="button" size="small" variant="border-green">Gatos</Button>
                </div>
            </div>
            <div className="mx-44 mb-10">
                <CardsContainer>
                    <Card typeCard="adoption_pet" imgSrc={Pet} imgAlt="MedicalRecord" ></Card>
                    <Card typeCard="adoption_pet" imgSrc={Pet} imgAlt="MedicalRecord" ></Card>
                    <Card typeCard="adoption_pet" imgSrc={Pet} imgAlt="MedicalRecord" ></Card>
                    <Card typeCard="adoption_pet" imgSrc={Pet} imgAlt="MedicalRecord" ></Card>
                    <Card typeCard="adoption_pet" imgSrc={Pet} imgAlt="MedicalRecord" ></Card>
                    <Card typeCard="adoption_pet" imgSrc={Pet} imgAlt="MedicalRecord" ></Card>
                </CardsContainer>
            </div>
            <div className="flex justify-center items-center mb-16">
                <Button type="button" size="small" variant="border-green">Ver más</Button>
            </div>

        </div>
    );
}