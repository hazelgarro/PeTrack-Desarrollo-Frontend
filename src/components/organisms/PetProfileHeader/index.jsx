import PetPhotoQR from "../../molecules/PetPhotoQr";
import IconText from "../../molecules/IconText";
import ProfileInfoContainer from "../ProfileInfoContainer";

export default function PetProfileHeader({ petPicture }) {
    return (
        <div>
            <PetPhotoQR petPicture={petPicture}></PetPhotoQR>

            <ProfileInfoContainer>
                <IconText iconName="dog" text="Breed"></IconText>
                <IconText iconName="female" text="Gender"></IconText>
                <IconText iconName="age" text="2 years"></IconText>
                <IconText iconName="weight" text="Weight"></IconText>
                <IconText iconName="location" text="Esparza, Costa Rica"></IconText>
            </ProfileInfoContainer>
        </div>
    )
}