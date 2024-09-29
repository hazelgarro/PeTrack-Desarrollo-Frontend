export default async function loginUser(email, password) {
    const apiUrl = "https://www.APIPetrack.somee.com/User/Login"

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
            localStorage.setItem('token', responseData.token);
        }else{
            console.log(response.status);
        }
        
        return responseData;

    } catch (error) {
        console.log(error.message || "An error occurred while creating the account.")
        return{
            result: false,
            message: error.message || "An error occurred while creating the account."
        };
    }
}