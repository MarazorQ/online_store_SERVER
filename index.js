const express = require('express')
require('dotenv').config()
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandleMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
// чтобы можно было отправлять запросы с браузера
app.use(cors())
// чтобы парсить json формат
app.use(express.json())
// чтобы можно было получить картинку в браузере по названию
app.use(express.static(path.resolve(__dirname, 'static')))
//для загрузки файлов
app.use(fileUpload({}))
app.use('/api', router)

//middleware который обрабатывает ошибки(замыкающий), должен идти в самом конце!
app.use(errorHandler)

app.get('/', (req, res) => {
    res.status(200).json({message: 'Is work!'})
})

const start_app = async () => {
    try{
        await sequelize.authenticate()// connect to bd
        await sequelize.sync()// сверяет данные со схемой данных
        app.listen(PORT, () => console.log(`SERVER STARTED ON ${PORT}`))
    }catch (e){
        console.log(`ERROR ${e}`)
    }
}

start_app()