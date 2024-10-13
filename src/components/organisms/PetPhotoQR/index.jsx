import PetImage from "../../atoms/Image"; // Renombrado a 'PetImage'
import QrCodeIcon from "../../atoms/Icons/QrCode";
import Button from "../../atoms/Button";
import { useOpenClose } from "../../../hooks/useOpenClose.js";
import Modal from "../../molecules/Modal";
import QRCode from "react-qr-code";
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

export default function PetPhotoQR({ petPicture, petName = "Pet Name" }) {
    const hookModalQr = useOpenClose();
    const svgRef = useRef(null);

    const downloadQR = () => {
        const svg = svgRef.current.querySelector('svg');
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const imgElement = new window.Image(); // Se mantiene el nombre 'imgElement' para evitar conflictos

        // Configura el tamaño del canvas
        canvas.width = 200;
        canvas.height = 200;

        imgElement.onload = function () {
            // Dibujar el SVG en el canvas
            ctx.drawImage(imgElement, 0, 0);
            const pngFile = canvas.toDataURL('image/png');

            // Crear el enlace de descarga
            const downloadLink = document.createElement('a');
            downloadLink.href = pngFile;
            downloadLink.download = `${petName}_QR.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        };

        // Establece la fuente de la imagen como el SVG convertido a data URI
        imgElement.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    };

    return (
        <div className="relative rounded-3xl overflow-hidden w-full">
            <PetImage imgSrc={petPicture} imgAlt={"Pet profile picture"}></PetImage> {/* Usar 'PetImage' */}
            <div className="absolute top-2 right-2 p-3">
                <Button onClick={hookModalQr.toggleModal} variant="solid-green" size="extra-small">
                    <div className="flex items-center">
                        <QrCodeIcon className="mr-2"></QrCodeIcon>QR Code for {petName}
                    </div>
                </Button>
            </div>
            <div>
                <Modal isOpen={hookModalQr.isOpen} toggleModal={hookModalQr.toggleModal}>
                    <div className="flex flex-col items-center gap-6 w-48 text-center">
                        <h2 className="text-petrack-green text-xl font-outfit font-bold">QR Code for {petName}</h2>
                        <div ref={svgRef}>
                            <QRCode value={window.location.href} size={200}></QRCode>
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