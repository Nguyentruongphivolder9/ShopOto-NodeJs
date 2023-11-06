const { Schema, default: mongoose } = require('mongoose');

const categorySchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    brandId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Brand',
    },
    category_name: {
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
    description:{
        type:String,
        required:[true,"Mô tả sản phẩm không được để trống"]
    },
    hidden:{
        type:Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Category", categorySchema);