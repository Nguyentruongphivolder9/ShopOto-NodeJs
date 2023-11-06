const fs = require("fs");
const Brand = require('../../models/Brand');
const { default: mongoose } = require("mongoose");

class brandController {
    async getAllBrand(req,res){
        try{
            const brands = await Brand.find({});
            res.render('back-end/brand',{admin:true,brands});
        }catch(err){
            res.status(500).send('Error:Something went wrong while retrieving brands');
        }
    }
    getBrandCreate(req,res){
        res.render('back-end/createBrand',{admin:true,data:null,err:null});
    }
    async createBrand(req,res){
        let {brand_name} = req.body;
        const brand_img = req.file;

        const brandFolderPath = './public/img/brand';

        if(!fs.existsSync(brandFolderPath)){
            fs.mkdirSync(brandFolderPath,{recursive:true});
        }

        const imageUrl = `/img/brand/${brand_img.filename}`;
        const dataSubmit = {
            id: new mongoose.Types.ObjectId(),
            brand_name: brand_name,
            brand_img: imageUrl,
        };

        await Brand.create(dataSubmit).then(result=>{
            req.session.message = "Brand created successfully";
            res.redirect("/admin/brand");
        })
    }
}

module.exports = new brandController;