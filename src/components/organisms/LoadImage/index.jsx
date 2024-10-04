import PropTypes from "prop-types";
import Banner from "../../atoms/Banner";
import Button from "../../atoms/Button";
import { useRef } from 'react';
import ProfileImage from "../../atoms/ProfileImage";

export default function LoadImage({ name, image, defaultImage, imageType, onChange }) {
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (!file) {
            console.error("No se seleccionó ningún archivo.");
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            onChange({ name, value: reader.result });
        };

        reader.readAsDataURL(file); // Lee la imagen como URL
    };

    const handleAddImageClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="relative w-full flex flex-col items-center text-center">
            {/* Mostrar la imagen actual en el formato adecuado */}
            {imageType === "rectangular" ? (
                <Banner imageSrc={image} defaultImage={defaultImage} onClick={handleAddImageClick}/>  // Muestra la imagen como banner
            ) : (
                <ProfileImage size="extra-large" imageSrc={image} defaultImage={defaultImage} onClick={handleAddImageClick}/>  // Muestra la imagen como perfil
            )}

            <div className={`absolute ${imageType === "rectangular" ? 'bottom-2 right-3' : 'bottom-3 right-14'}`}>
                <Button
                    size="extra-small"
                    variant="solid-green"
                    variant2="content-fit"
                    onClick={handleAddImageClick}
                >
                    +
                </Button>
            </div>
            <input
                name={name}
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
}

LoadImage.propTypes = {
    image: PropTypes.string.isRequired,
    imageType: PropTypes.oneOf(["rounded", "rectangular"]).isRequired,
    onChange: PropTypes.func.isRequired, // Prop para manejar el cambio de imagen
};
