// src/middlewares/checkRole.js
function checkRole(role) {
    return (req, res, next) => {
      if (req.user && req.user.role === role) {
        next();
      } else {
        res.status(403).json({ message: 'Acceso denegado: permisos insuficientes' });
      }
    };
  }
  
  module.exports = checkRole;