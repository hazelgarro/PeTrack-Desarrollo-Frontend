import pet_picture from "../../../assets/img/pet_picture.webp";
import PetPhotoQr from "../../organisms/PetPhotoQR";

import IconText from "../../molecules/IconText";
import MenuIcon from "../../atoms/Icons/Menu";
import LocationIcon from "../../atoms/Icons/Location/index.jsx";
import DeleteIcon from "../../atoms/Icons/Delete";
import TransferIcon from "../../atoms/Icons/Transfer";
import HistoryIcon from "../../atoms/Icons/History";
import EditIcon from "../../atoms/Icons/Edit";

import ProfileInfoContainer from "../../organisms/ProfileInfoContainer";
import Modal from "../../molecules/Modal";
import { useOpenClose } from "../../../hooks/useOpenClose.js";

import Button from "../../atoms/Button";
import TextBlock from "../../molecules/TextBlock";
import MedicalInfoCard from "../../molecules/MedicalInfoCard";
import MedicalInfoToggle from "../../organisms/MedicalInfoToggle";
import NavBar from "../../organisms/Nav";
import GenderIcon from "../../atoms/Icons/Gender";
import WeightIcon from "../../atoms/Icons/Weight";
import PetIcon from "../../atoms/Icons/Pet";
import AgeIcon from "../../atoms/Icons/Age";

export default function () {
    const buttons = <>
        <Button variant="border-green" variant2="content-fit" size="extra-small">
            <div className="flex items-center gap-1">
                <DeleteIcon size="medium"></DeleteIcon> <span>Delete</span>
            </div>
        </Button>
        <Button variant="border-green" variant2="content-fit" size="extra-small">
            <div className="flex items-center gap-1">
                <TransferIcon size="medium"></TransferIcon> <span>Transfer</span>
            </div>
        </Button>
        <Button variant="border-green" size="extra-small">
            <div className="flex items-center gap-1">
                <HistoryIcon size="medium"></HistoryIcon> <span>History of owners</span>
            </div>
        </Button>
        <Button variant="border-green" variant2="content-fit" size="extra-small">
            <div className="flex items-center gap-1">
                <EditIcon size="medium"></EditIcon> <span>Edit</span>
            </div>
        </Button>
    </>;

    const hookMenuBotones = useOpenClose();

    return (
        <div>
            <NavBar isAuthenticated={false}></NavBar>

            <main className="relative 2xl:mx-80 xl:mx-60 lg:mx-40 md:mx-24 mx-4 my-5">
                <section className="relative">
                    <PetPhotoQr petPicture={pet_picture}></PetPhotoQr>
                    <div className="lg:hidden">
                        {/* Hay que cambiar este botón por un componente button, pero hay que crear otra variante*/}
                        <button className="absolute bottom-4 right-4" label="Drop menu" onClick={hookMenuBotones.toggleModal}>
                            <MenuIcon size="extra-large" />
                        </button>

                        <Modal isOpen={hookMenuBotones.isOpen} toggleModal={hookMenuBotones.toggleModal}>
                            <div className="flex flex-wrap justify-start gap-4">
                                {buttons}
                            </div>
                        </Modal>
                    </div>
                </section>
                <section>
                    <div className="flex w-full justify-between my-4">
                        <h2 className="justify-center text-petrack-black text-4xl font-bold">Name</h2>
                        <div className="hidden lg:flex flex-wrap space-x-4">{buttons}</div>
                    </div>
                    <ProfileInfoContainer className="mt-6 lg:mt-4">
                        <IconText text="Breed">
                            <PetIcon petType="dog" size="medium"/>
                        </IconText>
                        <IconText text="Gender">
                            <GenderIcon size="large"/>
                        </IconText>
                        <IconText text="2 years">
                            <AgeIcon />
                        </IconText>
                        <IconText iconName="weight" text="Weight">
                            <WeightIcon size=""/>
                        </IconText>
                        <IconText text="Esparza, Costa Rica">
                            <LocationIcon size=""/>
                        </IconText>
                    </ProfileInfoContainer>
                </section>
                <section className="my-6">
                    <TextBlock title="About (name)">
                        <p className="text-petrack-black mt-2 mb-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae deleniti est, asperiores quisquam modi, tempore voluptates dolorum illum laudantium fugiat ex, consectetur facere assumenda ducimus. Quae fugit tempora eius tempore.</p>
                    </TextBlock>
                    <TextBlock title="Especifications">
                        <p className="text-petrack-black mt-2 mb-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae deleniti est, asperiores quisquam modi, tempore voluptates dolorum illum laudantium fugiat ex, consectetur facere assumenda ducimus. Quae fugit tempora eius tempore.</p>
                    </TextBlock>
                </section>
                <section>
                    <MedicalInfoToggle title="Medical Record">
                        <MedicalInfoCard></MedicalInfoCard>
                        <MedicalInfoCard></MedicalInfoCard>
                    </MedicalInfoToggle>
                </section>
            </main>
        </div>
    )
}