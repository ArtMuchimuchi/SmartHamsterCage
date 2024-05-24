const mongoose = require("mongoose")

const LogSchema = mongoose.Schema(
    {
        light: {
            type: String,
            require: true
        },
        sound: {
            type: String,
            require: true
        },
        temperature: {
            type: String,
            require: true
        },
        humidity: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
)

const Log = mongoose.model("Log", LogSchema)

module.exports = Log;