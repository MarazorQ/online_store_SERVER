const jwt = require('jsonwebtoken')

module.exports = function (req, res, next){
    if (req.method === "OPTIONS"){
        next()// нас интересуют только методы put,post,get,delete, поэтому пропускаем
    }
    try{
        const token = req.headers.authorization.split('')[1]// Bearer fdsefdsfsd13243 (выцепляем токен)
        if (!token){
            return res.status(401).json({message: "не авторизован!"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    }catch (e){
        res.status(401).json({message: "не авторизован!"})
    }
}