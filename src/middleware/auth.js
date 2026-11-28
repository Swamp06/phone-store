import User from "../models/User.js";
import tokenService from "../services/tokenService.js";

class Auth{
    async authUser(req, res , next){
        try {
            const token = tokenService.extractToken(req)
            if(!token){
                res.status(401).json({message: "Нет токена"})
            }

            const payload = tokenService.verifyToken(token)

            const user = await User.findById(payload.id)
            if (!user) {
                res.status(401).json({message: "Пользователь не найден"})
                
            }
            req.user = user
            next()
        } catch (err) {
            res.status(401).json({message: "Невалидный токен: "  + err})
        }
    }
}

export default new Auth()