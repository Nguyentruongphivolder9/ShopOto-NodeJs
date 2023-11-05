const { Schema, default: mongoose } = require('mongoose');

const categorySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    brandId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Brand',
    },
    category_name: {
        type: String,
        require: [true, "Category name can't be empty."],
        trim: true,
    },
    image_cate: {
        type: String,
        validate: {
            validator: function (v) {
                return /\.(jpg|jpeg|png)$/i.test(v);
            },
            message: (props) => `${props.value} allow type: jpg, jpeg, png`
        },
        required: [true, 'Image is required']
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Category", categorySchema);