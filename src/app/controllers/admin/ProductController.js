const fs = require("fs")
const Product = require("../../models/Product");
const { mongo, default: mongoose } = require("mongoose");

class ProductController {
    async getAllProducts(req, res) {
        try{
        const products = await Product.find({});
        res.render('back-end/product',{admin:true,products});
        }catch(err){
            res.status(500).send('Error: Something went wrong while retrieving products.');
        }
    }
    getFormCreate(req,res){
        res.render('back-end/createProduct',{admin:true,data:null,err:null});
    }
    async createProduct(req,res){
        let { product_name, price } = req.body;
        const images = req.files;

        const productFolderPath = './public/img/product';
        if (!fs.existsSync(productFolderPath)) {
            fs.mkdirSync(productFolderPath, { recursive: true });
        }

        const imageUrls = images.map(file => `/img/product/${file.filename}`);

        const dataSubmit = {
            _id: new mongoose.Types.ObjectId(),
            product_name: product_name,
            price: price,
            image: imageUrls,
        }
        await Product.create(dataSubmit).then(result =>{
            req.session.message = "Product create successfully";
            res.redirect("/admin/product");
        })
    }
}

module.exports = new ProductController;