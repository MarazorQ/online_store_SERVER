const ApiError = require('../errors/apiErrors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

// вынесем создание токина, так как при авторизации это тоже потребуется
const createJwt = (id, email, role) =>{
    return jwt.sign({
        id: id, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next){   
        const {email, password, role} = req.body

        if (!email || !password){
            return next(ApiError.badReq("Неккоректные данные"))
        }
        const user = await User.findOne({where: {email}})
        if (user){
            return next(ApiError.badReq('Пользователь с таким именем уже существует'))
        }
        const hash = await bcrypt.hash(password, 5)
        const newUser = await User.create({email, role, password: hash})
        const basket = await Basket.create({userId: newUser.id})
        const token = createJwt(newUser.id, newUser.email, newUser.role)
        return res.json({token})
    }

    async login(req, res, next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user){
            return next(ApiError.iternal('Нет такого пользователя'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.iternal('Неверный логик или пароль'))
        }
        const token = createJwt(user.id, user.email, user.role)
        res.json({token})
    }

    async auth(req, res, next){
        const token = createJwt(req.user.id, req.user.email, req.user.role)
        res.json({token})
    }
}

module.exports = new UserController