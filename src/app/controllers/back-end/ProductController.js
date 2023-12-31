const Product = require("../../models/Product");
const Cate = require("../../models/Category");
const { mongo, default: mongoose } = require("mongoose");
const slugify = require("slug");
const shortid = require("shortid");

class ProductController {
    async getAllProducts(req, res) {
        try{
        const products = await Product.find({});
        res.render('back-end/product',{admin:true,products});
        }catch(err){
            res.status(500).send('Error: Something went wrong while retrieving products.');
        }
    }
    async getFormCreate(req,res){
        const categories = await Cate.find();
        res.render('back-end/createProduct',{admin:true,data:null,err:null,categories});
    }
    async createProduct(req, res) {
        let { product_name, price,description,category_id } = req.body;
        const images = req.files;
        const hidden = req.body.hidden === "on";
        const product_id = shortid.generate();

        const imageUrls = images.map(file => `/img/product/${file.filename}`);

        let slug = slugify(product_name, { lower: true, remove: /[*+~.()'"!:@]/g });
        let count = 1;

        while(true){
            const existProduct = await Product.findOne({slug});
            if(!existProduct){
                break;
            }
            slug = `${slug}-${count}`;
            count++
        }

        const dataSubmit = {
            product_id : product_id,
            product_name: product_name,
            category_id : category_id,
            price: price,
            image: imageUrls,
            description: description,
            on_store: hidden,
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
        const productID = req.params.product_id;
        const categories = await Cate.find();
        const product = await Product.findOne({product_id: productID});

        res.render('back-end/editProduct',{admin:true,product,err:null,categories});
    }
    
    async editProduct(req,res){
        const productID = req.params.product_id;
        let{product_name,price,description,category_id} = req.body;
        const images = req.files;
        const hidden = req.body.hidden === "on";

        const product = await Product.findOne({product_id: productID});

        product.product_name = product_name;
        product.price = price;
        product.description = description;
        product.on_store = hidden === "on" ? true : false;
        product.category_id = category_id;

        if(images && images.length > 0) {
            const imageUrls = images.map(file => `/img/product/${file.filename}`);
            product.image = imageUrls;
        }

        if(product.isModified('product_name')){
             product.slug = slugify(product_name, { lower: true, remove: /[*+~.()'"!:@]/g });
        }

        await product.save();
        req.session.message = "Product updated successfully";
        res.redirect("/admin/product");
    }

    async showProduct(req,res){
        const productID = req.params.product_id;
        const product = await Product.findOne({product_id: productID});

        if(product){
            product.on_store = !product.on_store;
            await product.save()

            req.session.message = product.on_store ? "Product is in storage" : "Product is on store";
        }else{
            req.session.message = "Product is not found";
        }
        res.redirect("/admin/product");
    }
}

module.exports = new ProductController;