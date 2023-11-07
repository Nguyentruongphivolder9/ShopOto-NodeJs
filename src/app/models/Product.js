const { Schema, default: mongoose } = require('mongoose');
const slug = require('mongoose-slug-updater');

const productSchema = new Schema(
    {
        product_id: { type: String, require: [true, 'Product_id cannot not null.'] },
        product_name: {
            type: String,
            required: [true, 'Product name is not empty!'],
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
                message: () => 'Lỗi định dạng',
            },
        },
        category_id: {
            type: String,
            ref: 'Category',
        },

        brand_id: {
            type: String,
            ref: 'Brand',
        },

        price: {
            type: Number,
            required: [true, 'Giá sản phẩm không được để trống'],
            min: [1, 'Giá sản phẩm phải lớn hơn 1$ và nhỏ hơn 100000$'],
            max: [100000, 'Giá sản phẩm phải lớn hơn 1$ và nhỏ hơn 100000$'],
        },
        image: [
            {
                type: String,
                validate: {
                    validator: function (v) {
                        return /\.(jpg|jpeg|png)$/i.test(v);
                    },
                    message: (props) => `${props.value} allow type: jpg, jpeg, png`,
                },
                required: [true, 'Image is required'],
            },
        ],
        description: {
            type: String,
            validate: {
                validator: (v) => /\^sex|heroin$/gim.test(v),
                message: (props) => `${props.path} contains sensitive words!`,
            },
        },
        // slug: {
        //     type: String,
        //     slug: 'product_name',
        //     unique: true,
        // },
    },
    {
        timestamps: true,
    },
);

mongoose.plugin(slug);

module.exports = mongoose.model('Product', productSchema);
