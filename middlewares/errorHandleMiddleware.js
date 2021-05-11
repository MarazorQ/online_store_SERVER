const ApiErrors = require('../errors/apiErrors')

module.exports = function(req, res, err, next){
    //instanceof проверяет, принадлежит ли объект к определённому класс
    if (err instanceof ApiErrors){
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "Необработанная ошибка"})
}