import jwt from "jsonwebtoken"

const JWT_SECRET = "super123"
const EXPIRES_IN = "3d"

class TokenService{
    generateToken(userId){
        return jwt.sign({id: userId}, JWT_SECRET , {expiresIn: EXPIRES_IN})
    }

    verifyToken(token){
        return jwt.verify(token, JWT_SECRET)
    }
    extractToken(req){
        const header = req.headers.authorization || ""
        return header.startsWith("Bearer ") ? header.slice(7) : null
    }
    
}

export default new TokenService()