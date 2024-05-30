const  mongoose = require('mongoose');
const SchemaDatabase = mongoose.Schema(
    {
        email: { type: String,  require: true },
       otp: { type: String,  require: true },
    },
    { timestamps: true, versionKey: false }
);

const UsersModel = mongoose.model("users", SchemaDatabase);

module.exports = UsersModel;