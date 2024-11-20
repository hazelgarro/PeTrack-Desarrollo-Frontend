import PropTypes from "prop-types";
import Banner from "../../atoms/Banner";
import Button from "../../atoms/Button";
import { useRef } from 'react';
import ProfileImage from "../../atoms/ProfileImage";
import {showMessageDialog} from '../../../utils/customAlerts.jsx';

export default function LoadImage({ name, image, defaultImage, imageType, onChange }) {

    const fileInputRef = useRef(null);

    const handleFileChange = async (event) => {
        event.preventDefault();
        const file = event.target.files[0];

        if (!file) {
            await showMessageDialog("No se seleccionó ningún archivo.", "warning", "top"); // User feedback for no file
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            onChange({ name, value: reader.result });
        };

        reader.readAsDataURL(file); // Read the image as a URL
    };

    const handleAddImageClick = () => {
        fileInputRef.current.click();
    };

    // Function to render the image based on imageType
    const renderImage = () => {
        const ImageComponent = imageType === "rectangular" ? Banner : ProfileImage;
        return (
            <ImageComponent
                imageSrc={image}
                defaultImage={defaultImage}
                onClick={handleAddImageClick}
                {...(imageType === "rectangular" ? {} : { size: "extra-large" })} // Add size prop conditionally
            />
        );
    };

    const button = (
        <Button
            size="extra-small"
            variant="solid-green"
            variant2="content-fit"
            onClick={handleAddImageClick}
            aria-label="Upload Image"
        >
            +
        </Button>
    );
    
    return (
        <div className="relative w-full flex flex-col items-center text-center">
            {/* Render the appropriate image */}
            {imageType !== "button" && renderImage()}
    
            <input
                name={name}
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />
    
            {imageType === "button" ? (
                button // Just use button directly without additional curly braces
            ) : (
                <div className={`absolute ${imageType === "rectangular" ? 'bottom-2 right-3' : 'bottom-3 right-5'}`}>
                    {button} {/* Use button directly here too */}
                </div>
            )}
        </div>
    );
}

LoadImage.propTypes = {
    name: PropTypes.string.isRequired,
    defaultImage: PropTypes.string,
    image: PropTypes.string.isRequired,
    imageType: PropTypes.oneOf(["rounded", "rectangular", "button"]).isRequired,
    onChange: PropTypes.func.isRequired, // Prop for handling image change
};

// Default prop for optional properties
LoadImage.defaultProps = {
    defaultImage: '',
};