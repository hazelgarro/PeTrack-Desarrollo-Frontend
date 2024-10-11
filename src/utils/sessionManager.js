import { getData } from "./apiConnector";

export async function loginUser(email, password) {
    const apiUrl = "https://www.APIPetrack.somee.com/User/Login";

    const accountData = {
        email,
        password
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(accountData)
        });

        const responseData = await response.json();

        if (response.ok) {
            const token = responseData.data.token;

            const expires = new Date(Date.now() + 60 * 60 * 1000).toUTCString();
            document.cookie = `sessionToken=${token}; expires=${expires}; path=/; SameSite=Strict`;
        } else {
            console.log(response.status);
        }

        return responseData;
    } catch (error) {
        console.log(error.message || "An error occurred while creating the account.");
        return {
            result: false,
            message: error.message || "An error occurred while creating the account."
        };
    }
}

export function getSessionToken() {
    const token = getCookieData('sessionToken');
    return token ? token : null;
}

export async function verifyLogin() {
    const token = getSessionToken(); // Obtener token solo una vez

    if (token) {
        const apiUrl = "https://www.APIPetrack.somee.com/User/VerifyLogin";
        const body = { token };

        try {
            const response = await getData(apiUrl, body, false, "POST");
            return response; // Retorna la respuesta de la API directamente
        } catch (error) {
            return {
                result: false,
                message: "Error verifying login: " + (error.message || "Unknown error"),
                data:{}
            };
        }
    }

    return {
        result: false,
        message: "The user is not logged in",
        data:{}
    };
}

function getCookieData(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
    return null;
}

export function logoutUser() {
    document.cookie = 'sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}
