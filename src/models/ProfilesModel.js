const  mongoose = require('mongoose');
const SchemaDatabase = mongoose.Schema(
    {
        cusName: { type: String,  require: true },
        cusAdd: { type: String,  require: true },
        cusCity: { type: String,  require: true },
        cusState: { type: String },
        cusPostcode: { type: String,  require: true },
        cusCountry: { type: String,  require: true },
        cusPhone: { type: String,  require: true },
        cusFax: { type: String},
        shipName: { type: String },
        shipAdd: { type: String,  require: true },
        shipPostcode: { type: String,  require: true },
        shipCountry: { type: String,  require: true },
       shipPhone: { type: String},
     userID:{type:mongoose.Schema.Types.ObjectId, require:true},
    },
    { timestamps: true, versionKey: false }
);

const ProfilesModel = mongoose.model("profiles", SchemaDatabase);

module.exports = ProfilesModel;