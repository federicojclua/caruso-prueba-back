const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Asegúrate de que la ruta al modelo de usuario es correcta

async function authMiddleware(req, res, next) {
	const token = req.header("Authorization")?.replace("Bearer ", "");
	if (!token) {
		return res
			.status(401)
			.json({ message: "No se proporcionó un token de autenticación" });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.id);
		if (!user) {
			return res.status(401).json({ message: "Usuario no encontrado" });
		}
		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({ message: "Token no válido" });
	}
}
module.exports = authMiddleware;

function checkRole(role) {
	return (req, res, next) => {
		if (req.user && req.user.role === role) {
			next();
		} else {
			res
				.status(403)
				.json({ message: "Acceso denegado: permisos insuficientes" });
		}
	};
}
module.exports = checkRole;