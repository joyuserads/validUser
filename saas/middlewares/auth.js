const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authorization = req.header('Authorization');
    if (!authorization) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;
