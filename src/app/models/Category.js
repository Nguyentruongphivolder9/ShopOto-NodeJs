const { Schema, default: mongoose } = require('mongoose');
const shortid = require('shortid');

const categorySchema = new Schema({
    category_id: {
        type:String,
        default: shortid.generate,
        unique:true,
    },
    brand_id:{
        type:String,
        ref:'Brand',
    },
    cate_name: {
        type: String,
        require: [true, "Category name can't be empty."],
        trim: true,
    },
    cate_img:{
        type:String,
        validator:function(v){
            return /\.(jpg|jpeg|png)$/i.test(v);
        },
        message:"Invalid image field format",
        required: [true,"Ảnh sản phẩm không được để trống"]
    },
    cate_description:{
        type:String,
        required:[true,"Mô tả sản phẩm không được để trống"]
    },
    on_store:{
        type:Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Category", categorySchema);