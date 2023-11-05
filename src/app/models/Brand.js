const { Schema, default: mongoose } = require('mongoose');

const brandSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    brand_name:{
        type: String,
        required: [true,"Name is required!"],
        trim:true,
    },
    brand_image:{
        type:String,
        validator:function(v){
            return /\.(jpg|jpeg|png)$/i.test(v);
        },
        message:"Invalid image format",
        required:[true,"Image is required"]
    },
    timestamps: true,
});

module.exports = mongoose.model("Brands",brandSchema);