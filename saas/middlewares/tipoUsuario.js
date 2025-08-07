const jwt = require('jsonwebtoken');

function decodeJwt(req) {
    const { authorization } = req.headers
    if(authorization.toLowerCase().includes('bearer')){
        return jwt.validaToken(authorization);

    }else{
        return null;
    }
}

module.exports = (req, res, next) => {
    const dadosUsuarios = decodeJwt(req);
    const userId = dadosAutorizacao.sub;

    if(dadosAutorizacao){
        const user = {
            id: userId,
            tipo: dadosAutorizacao.tipo

        }
        req.user = user;
    }

    if (!req.user) {
        return res.status(401).json({
            message: 'Token Inválido'
        });
    }
    if (req.user.tipo !== 'admin') {
        return res.status(403).json({
            mess0age: 'Acesso negado'
        });
    }
    



}

