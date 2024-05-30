const  mongoose = require('mongoose');
const SchemaDatabase = mongoose.Schema(
    {
        productID:{type:mongoose.Schema.Types.ObjectId, require:true},
       userID:{type:mongoose.Schema.Types.ObjectId, require:true},
    },
    { timestamps: true, versionKey: false }
);

const ReviewsModel = mongoose.model("users", SchemaDatabase);

module.exports = ReviewsModel;