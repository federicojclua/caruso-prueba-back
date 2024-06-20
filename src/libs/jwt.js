const jwt = require('jsonwebtoken');

// Función para generar un JWT
async function generateJwt(payload, expiresIn = '1d') {
    try {
        // Verificamos que la clave secreta esté definida en las variables de entorno
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET no está definida en las variables de entorno");
        }

        // Si esta todo bien, generamos el token
        const token = await new Promise((resolve, reject) => {
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn }, (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            });
        });
        
        return token;

    } catch (error) {
        // Manejo de posible errores
        throw new Error(`Error al generar el JWT: ${error.message}`);
    }
}

module.exports = { generateJwt };
