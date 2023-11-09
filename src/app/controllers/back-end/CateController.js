const Cate = require("../../models/Category");
const shortid = require("shortid");
const Brand = require("../../models/Brand");

class CateController{
    async getAllCate(req,res){
        try{
            const Cates = await Cate.find({});
            res.render('back-end/Category',{admin:true,Cates});
        }catch(err){
            res.status(500).send('Error:Something went wrong while retrieving category');
        }
    }
    async getCateCreate(req, res) {
        const Brands = await Brand.find({});
        res.render('back-end/createCategory', { admin: true, data: null, err: null, Brands });
    }
    async createCrate(req,res){
        let {category_name,description,brand_id} = req.body;
        const cate_img = req.file;
        const hidden = req.body.hidden === "on";
        
        const imageUrl = `/img/category/${cate_img.filename}`;

        const dataSubmit = {
            category_id: shortid.generate(),
            cate_name: category_name,
            brand_id: brand_id,
            cate_img: imageUrl,
            cate_description: description,
            on_store:hidden,
        };

        await Cate.create(dataSubmit).then(result =>{
            req.session.message = "Cate created successfully";
            res.redirect("/admin/category");
        })
    }

    async getCategoryEdit(req,res){
        const CateID = req.params.category_id;
        const Cates = await Cate.findOne({category_id: CateID});
        const Brands = await Brand.find({});
        res.render('back-end/editCategory',{admin:true,Cates,err:null,Brands});
    }

    async editCate(req,res){
        const CateID = req.params.category_id;
        let{category_name,description,brand_id,hidden} = req.body;
        const cate_img = req.file;
        const cate = await Cate.findOne({category_id: CateID});

        cate.cate_name = category_name;
        cate.cate_description = description;
        cate.brand_id = brand_id;
        cate.on_store = hidden === "on" ? true : false;

        if(cate_img && cate_img.filename){
            const imageUrl = `/img/category/${cate_img.filename}`;
            cate.cate_img = imageUrl;
        }
        await cate.save();
        req.session.message = "Category updated successfully";
        res.redirect("/admin/category");
    }

    async showCategory(req,res){
        const CateID = req.params.category_id;
        const cate = await Cate.findOne({category_id: CateID});

        if(cate){
            cate.on_store = !cate.on_store;
            await cate.save()

            req.session.message = cate.on_store ? "Category is hidden" : "Category is showing";
        }else{
            req.session.message = "Category is not found";
        }
        res.redirect("/admin/category");
    }
}

module.exports = new CateController;