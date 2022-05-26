const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')


const generateJwt = (id, email, userName) => {
    return jwt.sign(
        {id, email, userName}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, userName} = req.body
        if (!email || !password || !userName) {
            return next(ApiError.badRequest('Некорректные данные'))
        }
        const condidate = await User.findOne({where: {email}})
        if (condidate) {
            return next(ApiError.badRequest('Пользователь с такои email уже зарегистрирован'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword, userName})
        const token = generateJwt(user.id, user.userName, user.email)
        res.json({token, user})
    }

    async login(req, res, next) {
        const {email, password, userName} = req.body
        const user = await User.findOne({where: {email, userName}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Пароль указан не верно'))
        }
        const token = generateJwt(user.id, user.email, user.userName)
        res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.userName)
        return res.json({token})
    }
}

module.exports = new UserController()