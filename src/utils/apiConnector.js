export default async function getData(apiUrl, body, token) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        // Si se recibe un token, se agrega a los encabezados
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body), // Asegúrate de convertir el cuerpo a JSON
        });

        const responseData = await response.json();
        console.log("Message: " + responseData.message);

        if (!response.ok) {
            return {
                result: false,
                message: responseData.message || "An error occurred while creating the account."
            };
        }
        return responseData;

    } catch (error) {
        console.log("Error message: " + (error.message || "An error occurred while creating the account."));
        return {
            result: false,
            message: error.message || "An error occurred while creating the account."
        };
    }
}