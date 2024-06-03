const User = require('../models/userModel');

const checkRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id; // Supongamos que tienes el ID del usuario en req.user
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      if (user.role !== requiredRole) {
        return res.status(403).json({ message: 'Acceso denegado' });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Error de servidor' });
    }
  };
};

module.exports = checkRole;