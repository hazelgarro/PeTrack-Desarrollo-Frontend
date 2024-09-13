export default async function createPetOwnerAccount(firstName, lastName, email, password) {
    const apiUrl = "https://www.APIPetrack.somee.com/PetOwner/CreateAccount";

    //el api recibe el objeto completo, por lo tanto hay que mandarle un id pero es solo por formato
    let accountData = {
        id: 0,
        firstName,
        lastName,
        email,
        password
    }

    console.log(accountData)

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(accountData)
        });
        
        if (!response.ok) {
            console.log(response.status);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
}