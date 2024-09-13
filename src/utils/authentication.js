async function authenticatePetOwner(email, password) {
    //el api recibe el objeto completo, por lo tanto hay que mandarle un id pero es solo por formato
    const apiUrl = "https://www.APIPetrack.somee.com/PetOwner/Login"

    let accountData = {
        email,
        password
    }

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