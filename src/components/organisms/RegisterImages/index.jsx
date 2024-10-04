import Button from "../../atoms/Button";
import ProfileImage from "../../atoms/ProfileImage";
import Banner from "../../atoms/Banner";
import Form from "../Form";
import { useImageUpload } from "../../../hooks/useImageUpload"; // Importar el hook personalizado
import { useState } from "react";

export default function RegisterImages({ userTypeId = "1", profileImageUrl, bannerImageUrl, onSubmit }) {
    const {
        fileInputRef,
        profileImage,
        bannerImage,
        handleAddImageClick,
        handleFileChange,
        uploadImages, // Obtener la función para subir imágenes
    } = useImageUpload(profileImageUrl, bannerImageUrl); // Pasar las URLs al hook

    const [error, setError] = useState(""); // Estado para el mensaje de error

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario

        if (!profileImage && !bannerImage) {
            setError(`Upload ${userTypeId === "1" ? '' : 'at least'} one image to continue..`);
            return; // Evitar que se envíe el formulario
        }

        setError("");

        try {
            const { profileImageUrl, bannerImageUrl } = await uploadImages(); // Subir imágenes y obtener las URLs
            console.log("URLs de las imágenes:", profileImageUrl, bannerImageUrl);
            onSubmit();
        } catch (error) {
            setError("Error al subir las imágenes. Intenta de nuevo."); // Manejar errores de subida
            alert("No se pudieron subir las imágenes. Intenta de nuevo."); // Mostrar alerta de error
        }
    };

    return (
        <Form title="Perfil" subTitle={`Select an image for your profile${userTypeId === "1" ? '' : ' and cover'}`} onSubmit={handleSubmit}>
            <div className="relative w-full flex flex-col items-center px-4">

                {["2", "3"].includes(userTypeId) && (
                    <div className="absolute w-full -top-2 flex justify-center z-0">
                        <Banner imageSrc={bannerImage} /> {/* Pasar la imagen del banner */}
                        <div className="absolute bottom-3 right-3">
                            <Button
                                size="extra-small"
                                variant="solid-green"
                                variant2="content-fit"
                                onClick={() => handleAddImageClick(true)} // Maneja el clic para el banner
                            >
                                +
                            </Button>
                        </div>
                    </div>
                )}

                <div className={`relative z-10 mt-${userTypeId === "1" ? '' : '16'}`}>
                    <ProfileImage size="extra-large" imageSrc={profileImage} /> {/* Pasar la imagen del perfil */}
                    <div className="absolute bottom-3 right-3">
                        <Button
                            size="extra-small"
                            variant="solid-green"
                            variant2="content-fit"
                            onClick={() => handleAddImageClick(false)} // Maneja el clic para la imagen de perfil
                        >
                            +
                        </Button>
                    </div>
                </div>

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef} // Asignar la referencia al input
                    className="hidden" // Ocultar el input
                    onChange={handleFileChange}
                />
                
                {error && <p className="text-red-500">{error}</p>}

                <div className="flex flex-col w-full max-w-xs justify-end pt-8 gap-2">
                    <Button size="small" variant="solid-green" type="submit">Continue</Button>
                    <Button onClick={onSubmit} size="small">Skip</Button>
                </div>
            </div>
        </Form>
    );
}


