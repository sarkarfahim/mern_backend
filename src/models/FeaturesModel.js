const mongoose = require("mongoose");

const SchemaDatabase = mongoose.Schema(
    {
        name: { type: String,  require: true },
        description: { type: String,  require: true },
        img: { type: String,  require: true },
    },
    { timestamps: true, versionKey: false }
);

const   FeaturesModel = mongoose.model("features", SchemaDatabase);

module.exports = FeaturesModel;