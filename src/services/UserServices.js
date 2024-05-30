const EmailSend = require("../utility/EmailHelper");
const UsersModel= require("../models/UsersModel");
const  ProfilesModel = require("../models/ProfilesModel")
const {EncodeToken} = require("../utility/TokenHelper");

const UserOTPService =async (req)=>{
    try {
        let email=req.params.email;
        let code=Math.floor(100000+Math.random()*900000);

        let EmailText=`Your Verification Code is= ${code}`
        let EmailSubject='Email Verification'

        await EmailSend(email,EmailText,EmailSubject);

        await UsersModel.updateOne({email:email},{$set:{otp:code}},{upsert:true})

        return {status:"success", message:"6 Digit OTP has been send"}
    }catch (e) {
        return {status:"fail", message:e}
    }

}

const VerifyOTPService =async (req)=>{


    try{
        const email = req.params.email;
        const otp = req.params.otp;
        const total=  await UsersModel.find({email:email,otp:otp}).count("total");
        //user count
        if(total===1){
            //user id read
            const user_id=   await  UsersModel.find({email:email,otp:otp}).select('_id');
            //user_id need to conver arry of object to TOSring()
            //create user token
            let token = EncodeToken(email,user_id[0]._id.toString())
            //update otp upto 0
            await UsersModel.updateOne({email:email},{$set:{otp:0}});
            return {status:"success", message:"Valid otp", token:token}
        }else {
            return {status:"fail", message:"InValid otp"}
        }
    }catch (e) {
        return {status:"fail", message:"InValid otp"}
    }
}


const SaveProfileService =async (req)=>{
try{

    const  user_id =req.headers.user_id;
    const reqBody = req.body;
    reqBody.userID=user_id;
    await ProfilesModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true})
    return {status:"success", message:"Profile Save Success"}
}catch (e) {
    return {status:"fail", message:"Something Went Wrong"}
}
}

const ReadProfileService =async (req)=>{
    try {
        const  user_id =req.headers.user_id;
        const  result =   await ProfilesModel.find({userID:user_id});
        return {status:"success", data:result}
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}

module.exports = {
    UserOTPService,
    VerifyOTPService,
    SaveProfileService,
    ReadProfileService
}


