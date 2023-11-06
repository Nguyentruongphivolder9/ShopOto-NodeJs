const { Schema, default: mongoose } = require('mongoose');

const brandSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
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