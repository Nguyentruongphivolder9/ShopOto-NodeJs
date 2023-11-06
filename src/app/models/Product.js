const { Schema, default: mongoose } = require('mongoose');

const productSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
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
    hidden:{
        type:Boolean,
        default: false,
    },
}, 
{
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);