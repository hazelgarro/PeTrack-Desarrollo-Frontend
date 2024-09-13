// Consulta a la API para el login
async function login(username, password) {
    try {
        const response = await fetch('https://api.ejemplo.com/login', {
            method: 'POST', // Método POST para enviar los datos
            headers: {
                'Content-Type': 'application/json', // Cabecera indicando que se enviará JSON
            },
            body: JSON.stringify({
                username: username, // Se envían las credenciales en el cuerpo de la solicitud
                password: password,
            }),
        });

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('Error en la autenticación');
        }

        const data = await response.json(); // Parsear la respuesta como JSON
        console.log('Token de autenticación:', data.token); // Mostrar el token o la respuesta de éxito
        return data; // Retornar los datos recibidos (ej. token)

    } catch (error) {
        console.error('Error:', error); // Manejo de errores
    }
}

// Ejemplo de uso
login('miUsuario', 'miContraseña');