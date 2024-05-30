const WishListModel = require("../models/WishListModel");
const mongoose=  require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
const e = require("express");
 const WishListAllServices =async (req)=>{


       try{
           const user_id = new ObjectID(req.headers.user_id);

           const matchStage = {$match:{userID:user_id}};

           const jointStageByProduct = {$lookup:{from:"products", localField:"productID",foreignField:"_id",as:"product"}}
           const unwindProductStage = {$unwind:"$product"}

           const jointStageByBrand = {$lookup:{from:"brands", localField:"product.brandID",foreignField:"_id",as:"brand"}}
           const unwindBrandStage = {$unwind:"$brand"}


           const jointStageByCategory = {$lookup:{from:"categories", localField:"product.categoryID",foreignField:"_id",as:"category"}}
           const unwindCategoryStage = {$unwind:"$category"}

           const   projectionStage={$project:{
                   '_id':0,'userID':0,'createdAt':0,'updatedAt':0,'product._id':0,
                   'product.categoryID':0,'product.brandID':0,
                   'brand._id':0,'category._id':0
               }
           }

           let data = await WishListModel.aggregate([
               matchStage,
               jointStageByProduct,
               unwindProductStage,
               jointStageByBrand,
               unwindBrandStage,
               jointStageByCategory,
               unwindCategoryStage,projectionStage
           ])

           return {status:"success", data:data}
       }catch (e) {
           return {status:"fail", message:"Something Went Wrong"}
       }

 }

 const SaveWishListServices = async (req)=>{
     try{
         const user_id = req.headers.user_id;
     const reqBody=  req.body;
      reqBody.userID=user_id;

       await WishListModel.updateOne(reqBody, {$set:reqBody},{upsert:true});
         return {status:"success", message:"WishList Save Success"}
     }catch (e) {
         return {status:"fail", message:"Something Went Wrong"}
     }
 }

 const RemoveWishListServices =async (req)=> {
     try{
         const user_id = req.headers.user_id;
         const reqBody = req.body;
         reqBody.userID = user_id;

         await WishListModel.deleteOne(reqBody);
         return {status: "success", message: "WishList Remove Success"}
     }catch (e) {
             return {status:"fail", message:"Something Went Wrong"}
         }
 }


 module.exports= {
     WishListAllServices,
     SaveWishListServices,
     RemoveWishListServices
 }