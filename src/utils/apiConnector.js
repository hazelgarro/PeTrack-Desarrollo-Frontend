import { getSessionToken } from "./sessionManager";

export async function getData(apiUrl, body, needToken, method) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        // Si se recibe un token, se agrega a los encabezados
        if (needToken) {
            let token = getSessionToken();
            if(token){
                 headers['Authorization'] = `Bearer ${token}`;
            }else{
                return {
                    result: false,
                    message: responseData.message || "The user is not logged in",
                };
            }
        }

        let fetchParams = {
            method: method,
            headers: headers
        };

        if (method === "POST" || method === "PUT") {
            fetchParams.body = JSON.stringify(body); // Convierte el cuerpo a JSON
        }

        const response = await fetch(apiUrl, fetchParams);

        const responseData = await response.json();

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