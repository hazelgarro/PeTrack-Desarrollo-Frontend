import { v4 as uuidv4 } from 'uuid';
import { Cloudinary } from '@cloudinary/url-gen';

const cloud_name = "dg2l6tblc";
const presetName = "petrack_preset"

const cloudinary = new Cloudinary({
    cloud: {
        cloudName: cloud_name,
    },
});

//Los presets escogidos en 
async function uploadToCloudinary(localImageUrl, publicId) {
    try {
        const response = await fetch(localImageUrl);
        const blob = await response.blob(); // Convertimos la respuesta a blob

        const imageFile = new File([blob], "image", { type: blob.type });

        const data = new FormData();
        data.append('file', imageFile); // Adjuntamos el archivo
        data.append('upload_preset', presetName); // Adjuntamos el preset
        data.append('public_id', publicId);
        // Eliminamos el parámetro format de aquí

        const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
            method: 'POST',
            body: data,
        });

        return cloudinaryResponse.json();
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}

// Función que consume uploadToCloudinary
export async function uploadImage(localImageUrl) {
    if (!localImageUrl) {
        throw new Error("No image was provided.");
    }

    try {
        const generatedPublicId = `picture_${uuidv4()}`; // Generamos un publicId único
        const uploadResult = await uploadToCloudinary(localImageUrl, generatedPublicId); // Llamamos a uploadToCloudinary

        // Verificamos si hubo un resultado exitoso en la subida
        if (!uploadResult || uploadResult.error) {
            throw new Error(uploadResult.error ? uploadResult.error.message : "Upload failed");
        }

        const optimizedUrl = cloudinary.image(uploadResult.public_id)
        .format('webp')
        .quality('auto')
        .toURL();

        return {
            imageUrl: optimizedUrl,
            publicId: uploadResult.public_id // Aseguramos que usamos el public_id retornado
        };
    } catch (error) {
        console.error("Error uploading image:", error);
        throw new Error(`Failed to upload image: ${error.message}`);
    }
}

export async function deleteImage(publicId) {
    try {
        if (!publicId) {
            throw new Error('No public_id provided for deletion.');
        }

        const response = await cloudinary.uploader.destroy(publicId);

        if (response.result === 'ok') {
            console.log(`Image deleted successfully.`);
            return { result: true, message: 'Image deleted successfully' };
        } else {
            console.error(`Error deleting image: ${response.result}`);
            return { result: false, message: 'Error deleting the image' };
        }
    } catch (error) {
        console.error('Error attempting to delete the image:', error);
        return { result: false, message: error.message };
    }
}

export async function replaceImage(imagePath, publicId) {
    try {
        if (!publicId) {
            throw new Error('No public_id provided for replacing the image.');
        }

        const uploadResult = await uploadToCloudinary(imagePath, publicId, {
            overwrite: true,
            format: 'webp',
        });

        console.log('Image replaced successfully:', uploadResult);
        return { result: true, message: 'Image replaced successfully' };
    } catch (error) {
        console.error('Error replacing the image:', error);
        throw new Error(`Failed to replace image: ${error.message}`); // Mensaje de error más informativo
    }
}