const fs = require("fs")
const Product = require("../../models/Product");
const { mongo, default: mongoose } = require("mongoose");
const slugify = require("slug");

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
    async createProduct(req, res) {
        let { product_name, price,description } = req.body;
        const images = req.files;
        const hidden = req.body.hidden === "on";

        const productFolderPath = './public/img/product';

        if (!fs.existsSync(productFolderPath)) {
            fs.mkdirSync(productFolderPath, { recursive: true });
        }

        const imageUrls = images.map(file => `/img/product/${file.filename}`);

        const slug = slugify(product_name, { lower: true, remove: /[*+~.()'"!:@]/g });

        const dataSubmit = {
            product_name: product_name,
            price: price,
            image: imageUrls,
            description: description,
            hidden: hidden,
            slug:slug,
        };


        await Product.create(dataSubmit).then(result => {
            req.session.message = "Product created successfully";
            res.redirect("/admin/product");
        })
        .catch(err =>{
            let errors = {};
            if(err.name === "ValidationError"){
                for(const field in err.errors){
                    errors[field] = err.errors[field].message;
                }
                res.render('back-end/createProduct',{errors, data: dataSubmit});
            }
        })
    }
    async getFormEdit(req,res){
        const productID = req.params.id;
        const product = await Product.findById(productID);

        res.render('back-end/editProduct',{admin:true,product,err:null});
    }
    
    async editProduct(req,res){
        const productID = req.params.id;
        let{product_name,price,description} = req.body;
        const images = req.files;

        const product = await Product.findById(productID);

        product.product_name = product_name;
        product.price = price;
        product.description = description;

        if(images && images.length > 0) {
            const imageUrls = images.map(file => `/img/product/${file.filename}`);
            product.image = imageUrls;
        }

        if(product.isModified('product_name')){
            product.slug = `${slugify(product_name,{lower:true})}.P${product_id}`;
        }

        await product.save();
        req.session.message = "Product updated successfully";
        res.redirect("/admin/product");
    }

    async showProduct(req,res){
        const productID = req.params.id;
        const product = await Product.findById(productID);

        if(product){
            product.hidden = !product.hidden;
            await product.save()

            req.session.message = product.hidden ? "Product is in storage" : "Product is on store";
        }else{
            req.session.message = "Product is not found";
        }
        res.redirect("/admin/product");
    }
}

module.exports = new ProductController;