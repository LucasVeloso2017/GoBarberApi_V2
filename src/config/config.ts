export default {
    jwt:{
        secret:String(process.env.APP_SECRET),
        //secret:"asdasdasdasd",
        expiresIn:'2d'
    }
}