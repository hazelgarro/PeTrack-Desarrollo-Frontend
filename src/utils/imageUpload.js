export const saveImageLocally = (file) => {
    // Simula el guardado local, en producción se llamaría a un endpoint
    console.log("Saving image locally:", file.name);
    return URL.createObjectURL(file); // Crear una URL temporal para la previsualización
};
