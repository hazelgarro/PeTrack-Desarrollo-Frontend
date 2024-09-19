import Image from "../../atoms/Image";
import QrCode from "../../atoms/Icons/QrCode";
import Button from "../../atoms/Button";

export default function PetPhotoQr({ petPicture }) {
    return (<div className="relative rounded-3xl overflow-hidden w-full">
        <Image imgSrc={petPicture} imgAlt={"Pet profile picture"}></Image>
        <div className="absolute top-2 right-2 p-3">
            <Button variant="solid-green" size="small">
                <div className="flex items-center">
                    <QrCode className="mr-2"></QrCode>QRs (Name Pet)
                </div>
            </Button>
        </div>
    </div>
    )
}