import PetImage from "../../atoms/Image"; // Renombrado a 'PetImage'
import QrCodeIcon from "../../atoms/Icons/QrCode";
import Button from "../../atoms/Button";
import { useOpenClose } from "../../../hooks/useOpenClose.js";
import Modal from "../../molecules/Modal";
import { QRCode } from "react-qrcode-logo"; // Cambiado a 'react-qrcode-logo'
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import imgLogo from "../../../assets/img/isotipo.svg";

export default function PetPhotoQR({ petPicture, petName = "Pet Name" }) {
    const hookModalQr = useOpenClose();
    const svgRef = useRef(null);

    const downloadQR = () => {
        const svg = svgRef.current.querySelector('canvas'); // Ahora seleccionamos el canvas
        const pngFile = svg.toDataURL('image/png'); // Obtenemos los datos del canvas directamente

        // Crear el enlace de descarga
        const downloadLink = document.createElement('a');
        downloadLink.href = pngFile;
        downloadLink.download = `${petName}_QR.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div className="relative rounded-3xl overflow-hidden w-full">
            <PetImage imgSrc={petPicture} imgAlt={"Pet profile picture"} /> {/* Usar 'PetImage' */}
            <div className="absolute top-2 right-2 p-3">
                <Button onClick={hookModalQr.toggleModal} variant="solid-green" size="extra-small">
                    <div className="flex items-center">
                        <QrCodeIcon className="mr-2" />QR Code for {petName}
                    </div>
                </Button>
            </div>
            <div>
                <Modal isOpen={hookModalQr.isOpen} toggleModal={hookModalQr.toggleModal}>
                    <div className="flex flex-col items-center gap-6 w-48 text-center">
                        <h2 className="text-petrack-green text-xl font-outfit font-bold">QR Code for {petName}</h2>
                        <div ref={svgRef}>
                            <QRCode
                                value={window.location.href}
                                size={200}
                                logoImage={imgLogo} // Aquí se especifica la imagen del logotipo
                                logoWidth={40} // Ajusta el tamaño del logotipo
                                logoHeight={40}
                                qrStyle="dots" // Puedes usar diferentes estilos: "dots" o "squares"
                                eyeRadius={10} // Ajustar el radio de los "ojos" del QR
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
    petPicture: PropTypes.string,
    petName: PropTypes.string,
};