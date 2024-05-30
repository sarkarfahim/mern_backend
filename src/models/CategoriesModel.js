const mongoose = require("mongoose");

const SchemaDatabase = mongoose.Schema(
    {
        categoryName: { type: String,  require: true, unique:true },
        categoryImg: {type: String,  require: true },

    },
    { timestamps: true, versionKey: false }
);

const CategoriesModel = mongoose.model("categories", SchemaDatabase);

module.exports = CategoriesModel;
