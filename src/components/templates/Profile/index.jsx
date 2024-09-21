import pet_picture from "../../../assets/img/pet_picture.webp";

import PetPhotoQr from "../../molecules/PetPhotoQr";
import IconText from "../../molecules/IconText";
import ProfileInfoContainer from "../../organisms/ProfileInfoContainer";
import DropMenu from "../../molecules/DropMenu";
import MenuIcon from "../../atoms/Icons/Menu";
import DeleteIcon from "../../atoms/Icons/Delete";
import Button from "../../atoms/Button";
import Transfer from "../../atoms/Icons/Transfer";
import History from "../../atoms/Icons/History";
import Edit from "../../atoms/Icons/Edit";

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

    return (
        <div className="relative xl:mx-44 md:mx-20 m-4">
            <div className="relative">
                <PetPhotoQr petPicture={pet_picture}></PetPhotoQr>
                <DropMenu> {buttons} </DropMenu>
            </div>
            <div className="flex w-full justify-between my-4">
                <h2 className="justify-center text-4xl font-bold">Name</h2>
                <div className="hidden lg:flex flex-wrap space-x-4">{buttons}</div>
            </div>
            <ProfileInfoContainer className="mt-6 lg:mt-4">
                <IconText iconName="dog" text="Breed"></IconText>
                <IconText iconName="female" text="Gender"></IconText>
                <IconText iconName="age" text="2 years"></IconText>
                <IconText iconName="weight" text="Weight"></IconText>
                <IconText iconName="location" text="Esparza, Costa Rica"></IconText>
            </ProfileInfoContainer>
        </div> 
    )
}