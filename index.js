const express = require('express')
require('dotenv').config()
const sequelize = require('./db')
const PORT = process.env.PORT || 5000

const app = express()

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