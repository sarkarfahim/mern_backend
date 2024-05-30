const mongoose = require("mongoose");

const SchemaDatabase = mongoose.Schema(
    {




        brandName: { type: String,  require: true},
        brandsImg: {type: String,  require: true },

    },
    { timestamps: true, versionKey: false }
);

const BrandsModel = mongoose.model("brands", SchemaDatabase);

module.exports = BrandsModel;
