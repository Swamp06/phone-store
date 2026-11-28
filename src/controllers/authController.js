
import User from "../models/User.js";
import passwordService from "../services/passwordService.js";
import tokenService from "../services/tokenService.js";

export default new class UserController{
    async register(req , res){
        try {
            const {firstname , lastname , email , password , avatar , role} = req.body
            if (!firstname || !lastname || !email || !password) {
                return res.status(400).json({message: "Заполните все поля"})
            }

            const condidate = await User.findOne({email})
            if (condidate) {
                return res.status(400).json({message: "Email занят"})
            }
            
            const hashPassword = await passwordService.hashPassword(password)

            const user = await User.create({
                firstname,
                lastname,
                email,
                password: hashPassword,
                avatar,
                role: "user"
            })
            const token = tokenService.generateToken(user._id)
            res.status(200).json({
                token,
                user:{
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    avatar: user.avatar,
                    role: user.role
                }
            })
        } catch (err) {
            res.status(500).json("Ошибка при регистрации: " + err)
        }
    }

    async login(req,res){
        try {
            const {email , password} = req.body

            if (!email || !password) {
                return res.status(400).json({message: "Email и пароль обязательны"})
            }

            const user = await  User.findOne({email}).select("+password")


            if (!user) {
                return res.status(400).json({message: "Неверные данные"})
            }
            const ok = await passwordService.comparePassword(password , user.password)

            if (!ok) {
              return res.status(400).json({message: "Неверные данные"})  
            }

            const token = tokenService.generateToken(user._id)

            res.json({
                token,
                user:{
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    avatar: user.avatar,
                    role: user.role
                }
            })

        } catch (err) {
            res.status(500).json({message: "Ошибка при авторизации: " + err})
        }
    }

    async getMe(req , res){
        const {_id , firstname , lastname , email , avatar , role} = req.user.authorization

        res.json({id:_id , firstname , lastname , email , avatar , role})
    }
}