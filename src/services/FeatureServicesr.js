const FeaturesModel= require("../models/FeaturesModel");



const   FeaturesListService = async (req)=>{
    try{
    const  data= await FeaturesModel.find()
        return {status:"success" , data:data };
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}

    }
}


module.exports={
    FeaturesListService
}