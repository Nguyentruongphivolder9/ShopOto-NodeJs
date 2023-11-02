const { Schema, default: mongoose } = require('mongoose');
const slug = require('mongoose-slug-updater');

const productSchema = new Schema({
    product_name: {
        type: String,
        required: [true, "Product name is not empty!"],
        trim: true,
        validate: {
            validator: function (v) {
                if (v.length < 4 || v.length > 49) {
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
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
    },
    price: {
        type: Number,
        required: [true, "Giá sản phẩm không được để trống"],
        min: [1, 'Giá sản phẩm phải lớn hơn 1$ và nhỏ hơn 100000$'],
        max: [100000, 'Giá sản phẩm phải lớn hơn 1$ và nhỏ hơn 100000$']
    },
    image: {
        type: String,
        validate: {
            validator: function (v) {
                return /\.(jpg|jpeg|png)$/i.test(v);
            },
            message: (props) => `${props.value} allow type: jpg, jpeg, png`
        },
        required: [true, 'Image is required']
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    },
}, {
    timestamps: true,
});

mongoose.plugin(slug);

module.exports = mongoose.model('Product', productSchema);