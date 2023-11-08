const { Schema, default: mongoose } = require('mongoose');
const shortid = require("shortid");

const brandSchema = new Schema({
    brand_id: {
        type:String,
        default: shortid.generate,
        unique:true,
    },
    brand_name:{
        type: String,
        required: [true,"Name is required!"],
        trim:true,
    },
    brand_img:{
        type:String,
        validator:function(v){
            return /\.(jpg|jpeg|png)$/i.test(v);
        },
        message:"Invalid image field format",
        required: [true,"Ảnh sản phẩm không được để trống"]
    },
},
{
    timestamps:true,
});

module.exports = mongoose.model('Brand', brandSchema);