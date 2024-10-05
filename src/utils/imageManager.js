import { v4 as uuidv4 } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dg2l6tblc',
    api_key: '915636439722653',
    api_secret: 'QCQ_ubacuA0wCrgfp9KllJMdNkg'
});

async function uploadToCloudinary(image, publicId, options = {}) {
    try {
        const uploadResult = await cloudinary.uploader.upload(image, {
            public_id: publicId,
            format: options.format || 'webp', // Permite cambiar el formato a través de opciones
            ...options
        });

        return uploadResult;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw new Error(`Failed to upload image: ${error.message}`);
    }
}

export async function uploadImage(image, folder) {
    try {
        const generatedPublicId = `${folder}/picture_${uuidv4()}`;
        const uploadResult = await uploadToCloudinary(image, generatedPublicId);

        const optimizedUrl = cloudinary.url(generatedPublicId, {
            fetch_format: 'auto',
            quality: 'auto'
        });

        return {
            result: uploadResult,
            message: "Image uploaded successfully",
            uploadedImage: {
                imageUrl: optimizedUrl,
                publicId: generatedPublicId
            }
        };

    } catch (error) {
        console.error("Error uploading image:", error);
        throw new Error(`Failed to upload image: ${error.message}`);
    }
}

//Devuelve una url con una imagen reducida, esto para agilizar cargas en determinados casos
export async function getCroppedUrl(publicId, width, height) {
    try {
        const croppedUrl = cloudinary.url(publicId, {
            crop: 'auto',
            gravity: 'auto',
            width: width,
            height: height
        });

        return croppedUrl;
    } catch (error) {
        console.error("Error getting cropped URL:", error);
        throw new Error(`Failed to get cropped URL: ${error.message}`);
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