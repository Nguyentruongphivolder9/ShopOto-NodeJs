const Cate = require("../../models/Category");
const shortid = require("shortid");

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
    async createCrate(req,res){
        let {category_name,description} = req.body;
        const cate_img = req.file;

        const imageUrl = `/img/category/${cate_img.filename}`;

        const dataSubmit = {
            category_id: shortid.generate(),
            cate_name: category_name,
            cate_img: imageUrl,
            cate_description: description
        };

        await Cate.create(dataSubmit).then(result =>{
            req.session.message = "Cate created successfully";
            res.redirect("/admin/category");
        })
    }

    async getCategoryEdit(req,res){
        const CateID = req.params.category_id;
        const Cates = await Cate.findOne({category_id: CateID});

        res.render('back-end/editCategory',{admin:true,Cates,err:null});
    }

    async editCate(req,res){
        const CateID = req.params.category_id;
        let{category_name,description} = req.body;

        const  cate = await Cate.findOne({category_id: CateID});

        cate.cate_name = category_name;
        cate.cate_description = description

        if(cate_img && cate_img.length > 0){
            const imageUrl = `/img/category/${cate_img.filename}`;
            cate.cate_img = imageUrl;
        }
        await cate.save();
        req.session.message = "Category updated successfully";
        res.redirect("/admin/category");
    }
}

module.exports = new CateController;