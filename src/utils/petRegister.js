export default async function createAccount(email, password, userTypeId, profilePicture, phoneNumber, additionalData) {
    const apiUrl = 'http://www.APIpetrack.somee.com/User/CreateAccount';

    const accountData = {
        email,
        password,
        userTypeId, //acepta "O" (PetOwner), "V" (Veterinarian) y "S" (PetShelter)
        profilePicture,
        phoneNumber,
        additionalData
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
        console.log("Message: " + responseData.message);

        if (!response.ok) {
            return{
                result: false,
                message: responseData.message || "An error occurred while creating the account."
            };
        }
        return{
            result: true,
            message: responseData.message
        };

    } catch (error) {
        console.log("Error message: "+ error.message || "An error occurred while creating the account.")
        return{
            result: false,
            message: error.message || "An error occurred while creating the account."
        };
    }
}