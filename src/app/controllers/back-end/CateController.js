const Cate = require("../../models/Category");

class CateController{
    async getAllCate(req,res){
        try{
            const Cates = await Cate.find({});
            res.render('back-end/Category',{admin:true,Cates});
        }catch(err){
            res.status(500).send('Error:Something went wrong while retrieving category');
        }
    }
    getCateCreate(req,res){
        res.render('back-end/createCategory',{admin:true,data:null,err:null});
    }
    async createBrand(req,res){
        
    }
}