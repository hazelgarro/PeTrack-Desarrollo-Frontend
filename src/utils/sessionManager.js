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
            const userData = responseData.data;
            const token = responseData.data.token;
            delete userData.token;
            delete userData.result;

            // Guardar token en cookie con expiración de 1 hora sin HttpOnly
            const expires = new Date(Date.now() + 60 * 60 * 1000).toUTCString();
            document.cookie = `sessionToken=${token}; expires=${expires}; path=/; SameSite=Strict`;

            // Guardar userData como JSON string en la cookie
            document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}; expires=${expires}; path=/; SameSite=Strict`;

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

export function getUserData() {
    const userDataString = getCookieData('userData');
    return userDataString ? JSON.parse(decodeURIComponent(userDataString)) : null;
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
    document.cookie = 'userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}
