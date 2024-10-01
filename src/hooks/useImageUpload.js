import { useState, useRef } from 'react'; 

export function useImageUpload(initialProfileImageUrl, initialBannerImageUrl) {
    const [profileImage, setProfileImage] = useState(initialProfileImageUrl || '');
    const [bannerImage, setBannerImage] = useState(initialBannerImageUrl || '');
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        // Asegurarse de que el archivo no sea undefined
        if (!file) {
            console.error("No se seleccionó ningún archivo.");
            return; // Salir si no hay archivo
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            if (fileInputRef.current) {
                if (fileInputRef.current.dataset.type === "banner") {
                    setBannerImage(reader.result); // Actualiza el banner
                } else {
                    setProfileImage(reader.result); // Actualiza el perfil
                }
            }
        };

        reader.readAsDataURL(file); // Lee la imagen como URL
    };

    const handleAddImageClick = (isBanner) => {
        if (fileInputRef.current) {
            fileInputRef.current.dataset.type = isBanner ? "banner" : "profile"; // Guardar el tipo de imagen
            fileInputRef.current.click(); // Abre el input de archivo
        }
    };

    const uploadImages = async () => {
        // Simulación de subida de imágenes
        if (!profileImage && !bannerImage) {
            throw new Error("Se requiere al menos una imagen para subir.");
        }

        // Simular un retardo en la carga
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    profileImageUrl: profileImage || "url_del_perfil_simulada.jpg", // Usa la imagen del perfil si está disponible
                    bannerImageUrl: bannerImage || "url_del_banner_simulada.jpg" // Usa la imagen del banner si está disponible
                });
            }, 2000);
        });
    };

    return {
        fileInputRef,
        profileImage,
        bannerImage,
        handleAddImageClick,
        handleFileChange,
        uploadImages, // Asegúrate de exportar esta función
    };
}


