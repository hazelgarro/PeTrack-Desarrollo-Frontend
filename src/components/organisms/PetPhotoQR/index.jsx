import PetImage from "../../atoms/Image"; // Renamed to 'PetImage'
import QrCodeIcon from "../../atoms/Icons/QrCode";
import Button from "../../atoms/Button";
import { useOpenClose } from "../../../hooks/useOpenClose.js";
import Modal from "../../molecules/Modal";
import { QRCode } from "react-qrcode-logo"; // Changed to 'react-qrcode-logo'
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import imgLogo from "../../../assets/img/isotipo.svg";
import EditPicture from "../EditPicture";
import { useSession } from "../../../context/SessionContext";

export default function PetPhotoQR({ petAccountData }) {
    const { userData, updateSessionState } = useSession();
    const hookModalQr = useOpenClose();
    const svgRef = useRef(null);

    const [petPicture, setPetPicture] = useState("");

    useEffect(() => {
        updateSessionState();
        updateImage(petAccountData.petPicture);
    }, [petAccountData]);

    const updateImage = (imgUrl) => {
        setPetPicture(imgUrl);
    }

    const downloadQR = () => {
        const canvas = svgRef.current.querySelector('canvas'); // Now selecting the canvas
        const pngFile = canvas.toDataURL('image/png'); // Get the data directly from the canvas

        // Create the download link
        const downloadLink = document.createElement('a');
        downloadLink.href = pngFile;
        downloadLink.download = `${petAccountData.name}_QR.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div className="relative rounded-3xl overflow-hidden w-full">
            <PetImage imgSrc={petPicture} imgAlt={"Pet profile picture"} /> {/* Use 'PetImage' */}

            <div className="absolute top-2 right-2 p-3">
                <Button onClick={hookModalQr.toggleModal} variant="solid-green" size="extra-small">
                    <div className="flex items-center">
                        <QrCodeIcon className="mr-2" />QR Code for {petAccountData.name}
                    </div>
                </Button>
            </div>
            {userData.id === petAccountData.ownerId &&
                <div className="absolute bottom-2 left-2 p-3">
                    <EditPicture type="pet" imageSrc={petPicture} petData={petAccountData} updateImage={updateImage} />
                </div>
            }

            <div>
                <Modal isOpen={hookModalQr.isOpen} toggleModal={hookModalQr.toggleModal}>
                    <div className="flex flex-col items-center gap-6 w-48 text-center">
                        <h2 className="text-petrack-green text-xl font-outfit font-bold">QR Code for {petAccountData.name}</h2>
                        <div ref={svgRef}>
                            <QRCode
                                value={window.location.href} // Make sure this is the desired URL
                                size={200}
                                logoImage={imgLogo} // Specify logo image
                                logoWidth={40} // Adjust logo size
                                logoHeight={40}
                                qrStyle="dots" // Different styles: "dots" or "squares"
                                eyeRadius={10} // Adjust eye radius of the QR
                            />
                        </div>
                        <Button onClick={downloadQR} variant="solid-green" size="extra-small">Download</Button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

PetPhotoQR.propTypes = {
    petAccountData: PropTypes.shape({
        petPicture: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired, // PropType for petAccountData with required name
};
