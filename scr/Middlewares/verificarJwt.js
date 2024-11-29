const jwt = require("jsonwebtoken")

function verificarJwt(req, res, next){
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader)
        return res.status(403).json({ message: "Header de autorizaçao não encontrado"});
    
    const [bearer , token ] = authHeader.split(" ");

    if(!/^Bearer$/.test(bearer))
        return res.status(403).json({ message: "Header de autorização mal formatado"});

    jwt.verify(token, process.env.jwt, (err, {usuario}) => {
        if(err) return res.status(403).json( { message: " JWT token é invalido" });

        req.usuarioId = usuario._id;

        next();
    }); 
}

module.exports = verificarJwt;