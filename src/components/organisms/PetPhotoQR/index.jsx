import Image from "../../atoms/Image";
import QrCode from "../../atoms/Icons/QrCode";
import Button from "../../atoms/Button";
import { useOpenClose } from "../../../hooks/useOpenClose.js";
import Modal from "../../molecules/Modal";

export default function ({ petPicture, children }) {
    const hookModalQr = useOpenClose();

    return (<div className="relative rounded-3xl overflow-hidden w-full">
        <Image imgSrc={petPicture} imgAlt={"Pet profile picture"}></Image>
        <div className="absolute top-2 right-2 p-3">
            <Button onClick={hookModalQr.toggleModal} variant="solid-green" size="extra-small">
                <div className="flex items-center">
                    <QrCode className="mr-2"></QrCode>QRs (Name Pet)
                </div>
            </Button>
        </div>
        <div>
            <Modal isOpen={hookModalQr.isOpen} toggleModal={hookModalQr.toggleModal}>
                <h1>{children}</h1>
            </Modal>
        </div>
    </div>
    )
}