import pet_picture from "../../../assets/img/pet_picture.webp";

import PetPhotoQr from "../../organisms/PetPhotoQR";
import IconText from "../../molecules/IconText";
import ProfileInfoContainer from "../../organisms/ProfileInfoContainer";
import Modal from "../../molecules/Modal";
import MenuIcon from "../../atoms/Icons/Menu";
import { useModal } from "../../../hooks/useModal";
import DeleteIcon from "../../atoms/Icons/Delete";
import Button from "../../atoms/Button";
import Transfer from "../../atoms/Icons/Transfer";
import History from "../../atoms/Icons/History";
import Edit from "../../atoms/Icons/Edit";
import TextBlock from "../../molecules/TextBlock";

export default function Profile() {
    const buttons = <>
        <Button variant="border-green" variant2="content-fit" size="small">
            <div className="flex items-center gap-1">
                <DeleteIcon size="medium"></DeleteIcon> <span>Delete</span>
            </div>
        </Button>
        <Button variant="border-green" variant2="content-fit" size="small">
            <div className="flex items-center gap-1">
                <Transfer size="medium"></Transfer> <span>Transfer</span>
            </div>
        </Button>
        <Button variant="border-green" size="small">
            <div className="flex items-center gap-1">
                <History size="medium"></History> <span>History of owners</span>
            </div>
        </Button>
        <Button variant="border-green" variant2="content-fit" size="small">
            <div className="flex items-center gap-1">
                <Edit size="medium"></Edit> <span>Edit</span>
            </div>
        </Button>
    </>;

    const hookMenuBotones = useModal();

    return (
        <main className="relative xl:mx-44 md:mx-20 m-4">

            <section className="relative">
                <PetPhotoQr petPicture={pet_picture}></PetPhotoQr>
                <div className="lg:hidden">
                    {/* Hay que cambiar este botón por un componente button, pero hay que crear otra variante*/}
                    <button className="absolute bottom-4 right-4" label="Drop menu" onClick={hookMenuBotones.toggleModal}>
                        <MenuIcon />
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
                    <IconText iconName="dog" text="Breed"></IconText>
                    <IconText iconName="female" text="Gender"></IconText>
                    <IconText iconName="age" text="2 years"></IconText>
                    <IconText iconName="weight" text="Weight"></IconText>
                    <IconText iconName="location" text="Esparza, Costa Rica"></IconText>
                </ProfileInfoContainer>
            </section>
            <section className="my-6">
                <TextBlock title="About (name)">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae deleniti est, asperiores quisquam modi, tempore voluptates dolorum illum laudantium fugiat ex, consectetur facere assumenda ducimus. Quae fugit tempora eius tempore.</TextBlock>
                <TextBlock title="Especifications">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae deleniti est, asperiores quisquam modi, tempore voluptates dolorum illum laudantium fugiat ex, consectetur facere assumenda ducimus. Quae fugit tempora eius tempore.</TextBlock>
            </section>
            {/* <section class="medical-record">
                <h2>Medical record</h2>

                <article class="record-entry">
                    <h3>Title</h3>
                    <p>Lorem ipsum dolor sit amet consectetur. Quis quis id in cum.</p>
                </article>

                <article class="record-entry">
                    <h3>Title</h3>
                    <p>Lorem ipsum dolor sit amet consectetur. Quis quis id in cum.</p>
                </article>
            </section> */}
        </main>
    )
}