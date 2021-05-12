const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../errors/apiErrors')

class DeviceController {
    async create(req, res, next){
        try{
            const {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"// генерация рандомного id
            img.mv(path.resolve(__dirname, '..', 'static', fileName))// перемещения файла в папку
            
            if (info){
                info = JSON.parse(info)//ибо данные с форм даты, их надо обратно перегнать в js объекты
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: deviceId
                    })    
                )
            }

            const device = await Device.create({name, price, brandId, typeId, img: fileName})
    
            return res.json(device)
        }catch (e){
            next(ApiError.badReq(e.message))
        }
    }

    async get(req, res){
        let {brandId, typeId, limit, page} = req.query
        // устанавливаем дефолтные значения страниц и кол-ва, если не указано
        page = page || 1
        limit = limit || 9
        // количество отступов (нужно для пагинации на фронте)
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId){
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (!brandId && typeId){
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
        }
        if (brandId && !typeId){
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
        }
        if (brandId && typeId){
            devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset})
        }
        return res.json(devices)
    }

    async getOne(req, res){
        const {id} = req.params
        const device = await Device.findOne({
            where: {id},
            include: [{model: DeviceInfo, as: 'info'}]// подгружаем характеристики девайса
        })
        return res.json(device)
    }
}

module.exports = new DeviceController()