import PetPhotoQR from "../../molecules/PetPhotoQr";

export default function PetProfileHeader({petPicture}){
    return (
        <div>
            <PetPhotoQR petPicture={petPicture}></PetPhotoQR>
        </div>
    )
}