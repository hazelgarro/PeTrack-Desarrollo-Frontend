import pet_picture from "../../../assets/img/pet_picture.webp";

import PetPhotoQR from "../../molecules/PetPhotoQr";
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
    // const buttons = [
    //     { label: 'Edit', icon: <i className="fas fa-edit"></i>, onClick: () => alert('Edit clicked') },
    //     { label: 'Delete', icon: <i className="fas fa-trash"></i>, onClick: () => alert('Delete clicked') },
    //     { label: 'Transfer', icon: <i className="fas fa-exchange-alt"></i>, onClick: () => alert('Transfer clicked') },
    //     { label: 'History of owners', icon: <i className="fas fa-history"></i>, onClick: () => alert('History clicked') }
    // ];

    const buttons = <>
        <Button variant="border-green" size="small">
            <div className="flex items-center gap-1">
                <DeleteIcon size="medium"></DeleteIcon> <span>Delete</span>
            </div>
        </Button>
        <Button variant="border-green" size="small">
            <div className="flex items-center gap-1">
                <Transfer size="medium"></Transfer> <span>Transfer</span>
            </div>
        </Button>
        <Button variant="border-green" size="small">
            <div className="flex items-center gap-1">
                <History size="medium"></History> <span>History of owners</span>
            </div>
        </Button>
        <Button variant="border-green" size="small">
            <div className="flex items-center gap-1">
                <Edit size="medium"></Edit> <span>Edit</span>
            </div>
        </Button>
    </>;

    return (
        <div className="relative xl:mx-44 md:mx-20 m-4">
            <div className="relative">
                <PetPhotoQR petPicture={pet_picture}></PetPhotoQR>
                <DropMenu> {buttons} </DropMenu>
            </div>
            <div className="flex my-4">
                <div className="text-4xl font-bold">Name</div>
                <div className="hidden lg:flex space-x-4">{buttons}</div>
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