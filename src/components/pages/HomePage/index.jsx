import Nav from "../../organisms/Nav";
import Pet from "../../../assets/img/pet_picture.webp";

import Welcome from "../../organisms/WelcomeContainer";
import CardsContainer from "../../organisms/cardsContainer";
import Card from "../../molecules/Card";
import Button from "../../atoms/Button";
import ServicesContainer from "../../organisms/ServicesContainer";

export default function HomePage() {
    return ( 
        <div className="w-full bg-white">
            <Nav variant="green"></Nav>
            <Welcome></Welcome>
            <div className="flex justify-center items-center pt-16">
                <p className="text-3xl md:text-5xl font-medium text-petrack-green text-center">Mis Mascotas</p>
            </div>
            <div className="mx-12 sm:mx-24 md:mx-44 my-20">
                <CardsContainer>
                    <Card typeCard="pet" imgSrc={Pet} imgAlt="MedicalRecord"></Card>
                    <Card typeCard="pet" imgSrc={Pet} imgAlt="MedicalRecord"></Card>
                    <Card typeCard="pet" imgSrc={Pet} imgAlt="MedicalRecord"></Card>
                </CardsContainer>
            </div>
            <ServicesContainer></ServicesContainer>
            <div className="grid gap-5 md:gap-10 pt-24">
                <h2 className="text-3xl md:text-8xl font-bold text-petrack-green text-center">Cambia una vida</h2>
                <p className="text-xl md:text-4xl font-semibold text-center">Adopta una mascota</p>
                <div className=" flex flex-col md:flex-row justify-center items-center gap-3 md:gap-8">
                    <Button type="button" size="small" variant="solid-green">Todos</Button>
                    <Button type="button" size="small" variant="border-green">Perros</Button>
                    <Button type="button" size="small" variant="border-green">Gatos</Button>
                </div>
            </div>
            <div className="mx-12 md:mx-24 lg:mx-44 my-8 md:my-20">
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