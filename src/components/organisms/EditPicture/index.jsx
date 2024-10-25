import PropTypes from "prop-types";
import LoadImage from "../LoadImage";
import { useEffect, useState } from "react";
import { useSession } from '../../../context/SessionContext';
import { uploadImage } from "../../../utils/imageManager";
import { getData } from "../../../utils/apiConnector";

export default function EditPicture({ type = "profile", imageSrc, petData}) {
    const { userData, updateSessionState } = useSession();
    const [currentImage, setCurrentImage] = useState(imageSrc);

    useEffect(() => {
        setCurrentImage(imageSrc);
    }, [imageSrc]);

    const handleImageChange = async ({ value }) => {
        setCurrentImage(value);
        let pictureUploadResult;

        //Se maneja la subida y edición de imagenes ya sean de la mascota, portada o perfil
        if (type !== "pet") {
            if (type === "profile") {
                pictureUploadResult = await uploadImage(value);
            } else {
                pictureUploadResult = await uploadImage(value);
            }
            console.log(pictureUploadResult);

            if (pictureUploadResult.imageUrl && pictureUploadResult.publicId) {
                let body = userData;

                if (type === "profile") {
                    body.profilePicture = pictureUploadResult.imageUrl;
                    body.imagePublicId = pictureUploadResult.publicId;
                } else {
                    body.coverPicture = pictureUploadResult.imageUrl;
                    body.imagePublicIdCover = pictureUploadResult.publicId;
                }

                try {
                    const apiUrl = `https://www.APIPetrack.somee.com/User/EditUser/${userData.id}`;
                    const apiResponse = await getData(apiUrl, body, true, "PUT");

                    if (apiResponse.result) {
                        updateSessionState();
                        alert("Image changed successfully");
                    } else {
                        alert(apiResponse.message);
                    }
                } catch (error) {
                    console.error("Error editing image:", error);
                    alert("Error editing image");
                }
            } else {
                alert("Error editing image");
            }
        }else{
            //aquí irá el código para manejar el edit de la imagen de la mascota
        }
    };

    return (
        <LoadImage
            name="profile"
            image={currentImage}
            imageType={type === "profile" ? "rounded" : "rectangular"}
            onChange={handleImageChange}
        />
    );
}

EditPicture.propTypes = {
    type: PropTypes.oneOf(["profile", "cover", "pet"]),
    imageSrc: PropTypes.string.isRequired,
};