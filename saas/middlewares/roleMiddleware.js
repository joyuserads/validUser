// middlewares/authorizeRole.js
function authorizeRole(...rolesPermitidas) {
  return (req, res, next) => {
    if (!req.user || !rolesPermitidas.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acesso negado: Permissão insuficiente' });
    }
    next();
  };
}

module.exports = {authorizeRole};