import { useState, useRef } from 'react';

// Simulación de función para subir imagen al servidor
const uploadImageToServer = async (file) => {
    // Aquí deberías implementar la lógica para subir la imagen al servidor
    // Por ejemplo, usando fetch o axios
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/upload-endpoint', { // Cambia esto a tu endpoint real
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Error al subir la imagen');
    }

    const data = await response.json();
    return data.url; // Asumiendo que el servidor devuelve la URL de la imagen
};

export function useImageUpload(initialProfileImageUrl, initialBannerImageUrl) {
    const [profileImage, setProfileImage] = useState(initialProfileImageUrl || '');
    const [bannerImage, setBannerImage] = useState(initialBannerImageUrl || '');
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

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
        // Suponiendo que las imágenes están almacenadas en el estado
        const profileImageFile = fileInputRef.current.files[0]; // Obtener archivo de perfil
        const bannerImageFile = fileInputRef.current.files[1]; // Obtener archivo de banner

        const profileImageUrl = await uploadImageToServer(profileImageFile);
        const bannerImageUrl = await uploadImageToServer(bannerImageFile);

        setProfileImage(profileImageUrl); // Actualizar el estado con la URL del perfil
        setBannerImage(bannerImageUrl); // Actualizar el estado con la URL del banner

        return { profileImageUrl, bannerImageUrl }; // Retornar las URLs
    };

    return {
        fileInputRef,
        profileImage,
        bannerImage,
        handleAddImageClick,
        handleFileChange,
        uploadImages, // Exponer la función para subir imágenes
    };
}