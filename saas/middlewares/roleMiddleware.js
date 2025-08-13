function rolesMiddleware(rolePermitida){
    return (req, res, next) => {
        if(!rolePermitida.includes(req.user.role)){

            return res.status(403).json({ message: 'Acesso negado' });
        }
        next();
    };
}

module.exports = rolesMiddleware;