const { Schema, default: mongoose } = require('mongoose');

const categorySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category_name: {
        type: String,
        require: [true, "Category name is not empty."],
        trim: true,
        validate: {
            validator: function (v) {
                if (v.length < 4 || v.length > 29) {
                    return false;
                }
                if (/[^a-zA-Z0-9\s]/.test(v)) {
                    return false;
                }
                return true;
            },
            message: () => "Lỗi định dạng"
        },
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
    timestamps: true
});

module.exports = mongoose.model("Category", categorySchema);