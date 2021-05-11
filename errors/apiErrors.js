class ApiErrors extends Error{
    constructor(status, message){
        super();
        this.status = status
        this.message = message
    }

    static badReq(message){
        return new ApiErrors(404, message)
    }
    static iternal(message){
        return new ApiErrors(500, message)
    }
    // доступа нет
    static forbidden(message){
        return new ApiErrors(403, message)
    }
}

module.exports = ApiErrors