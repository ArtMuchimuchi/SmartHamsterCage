const mongoose = require("mongoose")

const ItemSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
)

const Item = mongoose.model("Item", ItemSchema)

module.exports = Item;