const { Schema, default: mongoose } = require('mongoose');
const slug = require('mongoose-slug-updater');
const shortid = require('shortid');

const productSchema = new Schema({
    product_id: {
        type:String,
        default: shortid.generate,
        unique:true,
    },
    category_id: {
        type: String,
        ref: 'Category',
    },
    product_name:{
        type:String,
        required: [true,"Tên sản phẩm là bắt buộc"]
    },
    price: {
        type: Number,
        required: [true, "Giá sản phẩm không được để trống"],
        min: [1000, 'Giả sản phẩm phải lớn hơn 1 ngàn đô'],
        max: [1000000, 'Giá sản phẩm phải nhỏ hơn 1 triệu đô']
    },
    image:[{
        type:String,
        validator:function(v){
            return /\.(jpg|jpeg|png)$/i.test(v);
        },
        message:"Invalid image field format",
        required: [true,"Ảnh sản phẩm không được để trống"]
    }],
    description:{
        type:String,
        required:[true,"Mô tả sản phẩm không được để trống"]
    },
    on_store:{
        type:Boolean,
        default: false,
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    },
}, 
{
    timestamps: true,
});

productSchema.plugin(slug);

module.exports = mongoose.model('Product', productSchema);