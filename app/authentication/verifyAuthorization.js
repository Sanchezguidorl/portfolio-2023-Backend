const dotenv= require('dotenv');
const jwt= require('jsonwebtoken');
dotenv.config();

const secretKey= process.env.SECRETKEY;

const verifyAuthorization=(req, res, next)=>{
    const token= req.header('Authorization');

    if(!token){
        return res.json({success: false, error: 'Acceso denegado. Token no proporcionado' });
    }
const bearerToken= token.replace("Bearer ", "");
    try {
        const verify= jwt.verify(bearerToken, secretKey);
        next();
    } catch (error) {
      return  res.status(403).json({success: false, error:'Token inválido o expirado'});
    }
};


module.exports= verifyAuthorization;