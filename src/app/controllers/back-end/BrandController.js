const Brand = require('../../models/Brand');
const { default: mongoose } = require("mongoose");
const shortid = require("shortid");

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

        const imageUrl = `/img/brand/${brand_img.filename}`;
        const dataSubmit = {
            brand_id: shortid.generate(),
            brand_name: brand_name,
            brand_img: imageUrl,
        };

        await Brand.create(dataSubmit).then(result=>{
            req.session.message = "Brand created successfully";
            res.redirect("/admin/brand");
        })
    }

    async GetBrandEdit(req,res){
        const brandID = req.params.brand_id;
        const brands = await Brand.findOne({brand_id: brandID});

        res.render('back-end/editBrand',{admin:true,brands,err:null});
    }

    async editBrand(req,res){
        const brandID = req.params.brand_id;
        let {brand_name} = req.body;
        const brand_img = req.file;
        
        const brand = await Brand.findOne({brand_id: brandID});

        brand.brand_name = brand_name;
        
        if(brand_img && brand_img.filename){
            const imageUrl = `/img/brand/${brand_img.filename}`;
            brand.brand_img = imageUrl;
        }
        await brand.save();
        req.session.message = "Brand updated successfully";
        res.redirect("/admin/brand");
    }
}

module.exports = new brandController;