import PropTypes from "prop-types";
import LoadImage from "../LoadImage";
import { useEffect, useState } from "react";
import { useSession } from "../../../context/SessionContext";
import { uploadImage } from "../../../utils/imageManager";
import { getData } from "../../../utils/apiConnector";
import { showMessageDialog } from "../../../utils/customAlerts";

export default function EditPicture({ type = "profile", imageSrc, petData}) {
    const { userData, updateSessionState } = useSession();
    const [currentImage, setCurrentImage] = useState(imageSrc);

    useEffect(() => {
        setCurrentImage(imageSrc);
    }, [imageSrc]);

    const handleImageChange = async ({ value }) => {
        setCurrentImage(value);

        try {
            const pictureUploadResult = await uploadImage(value);
            if (!pictureUploadResult || !pictureUploadResult.imageUrl || !pictureUploadResult.publicId) {
                throw new Error("Error uploading image. Please try again.");
            }

            let apiUrl, body;
            if (type !== "pet") {
                // User image update
                apiUrl = `https://www.APIPetrack.somee.com/User/EditUser/${userData.id}`;
                body = {
                    ...userData,
                    ...(type === "profile"
                        ? { profilePicture: pictureUploadResult.imageUrl, imagePublicId: pictureUploadResult.publicId }
                        : { coverPicture: pictureUploadResult.imageUrl, imagePublicIdCover: pictureUploadResult.publicId })
                };
            } else {
                // Pet image update
                apiUrl = `https://www.APIPetrack.somee.com/Pet/EditPet/${petData.id}`;
                body = {
                    ...petData,
                    petPicture: pictureUploadResult.imageUrl,
                    imagePublicId: pictureUploadResult.publicId
                };
            }

            const apiResponse = await getData(apiUrl, body, true, "PUT");
            if (!apiResponse.result) {
                throw new Error(apiResponse.message || "Error updating image in database.");
            }
            updateSessionState();
            showMessageDialog("Imagen cambiada exitosamente", "success", "top");
        } catch (error) {
            console.error("Error editing image:", error);
            showMessageDialog(error.message || "Error al editar la imagen", "success", "top");
        }
    };

    return (
        <LoadImage
            name="profile"
            image={currentImage}
            imageType={type === "pet" ? "button" : type === "profile" ? "rounded" : "rectangular"}
            onChange={handleImageChange}
        />
    );
}

EditPicture.propTypes = {
    type: PropTypes.oneOf(["profile", "cover", "pet"]),
    imageSrc: PropTypes.string.isRequired,
    petData: PropTypes.object // Asegura que petData sea requerido solo si type === "pet"
};
