const BrandsModel = require('../models/BrandsModel')
const CategoriesModel = require('../models/CategoriesModel')
const ProductsModel = require('../models/ProductsModel')
const ProductDetailsModel = require('../models/ProductDetailsModel')
const ReviewsModel = require('../models/ReviewsModel')
const ProductSlidersModel = require('../models/ProductSlidersModel')
const mongoose= require("mongoose");
const ObjectID = mongoose.Types.ObjectId;


const BrandsListService = async ()=>{
try{
    let data = await BrandsModel.find();
    return{status:"success",data:data}
}catch (e) {
    return{status:"fail",data:e}.toString()
}
}
const CategoriesListService = async ()=>{
    try{
        let data = await CategoriesModel.find();
        return{status:"success",data:data}
    }catch (e) {
        return{status:"fail",data:e}.toString()
    }
}
const ProductSliderListService= async ()=>{
    try{
        let data = await ProductSlidersModel.find();
        return{status:"success",data:data}
    }catch (e) {
        return{status:"fail",data:e}.toString()
    }
}
const ProductListByCategoriesService= async (req)=>{
try{
    let CategoryID = new ObjectID(req.params.CategoryID);
    let MatchStage = {$match: {categoryID:CategoryID}};
    let JointWithBrandStage={$lookup:{from:"brands",localField: "brandID",foreignField:"_id",as:"brand"}}
    let JointWithCategoryStage={$lookup:{from:"categories",localField: "categoryID",foreignField:"_id",as:"category"}}
    let UnwindBrandStage = {$unwind:"$brand"}
    let UnwindCategoryStage = {$unwind:"$category"}
    let ProjectionStage = {$project:{"brand._id":0,"category._id":0,"categoryID":0,"brandID":0}}

    let data = await ProductsModel.aggregate([
        MatchStage,JointWithBrandStage,
        JointWithCategoryStage,UnwindBrandStage,UnwindCategoryStage,
        ProjectionStage
    ])
    return {status:"success",data:data}
}catch (e) {
    return{status:"fail",data:e}.toString()
}
}
const ProductListByBrandsService= async (req)=>{
try{
    let BrandID = new ObjectID(req.params.BrandID);
    let  MatchStage = {$match:{brandID:BrandID}};
    let JoinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id", as:"brand"}}
    let JoinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id", as:"category"}}
    let UnwindBrandStage ={$unwind:"$brand"}
    let UnwindCategoryStage ={$unwind:"$category"}
    let ProjectionStage = {$project:{"brand._id":0,"category._id":0,"categoryID":0,"brandID":0}}

    let data =await  ProductsModel.aggregate(
        [
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage,
            ProjectionStage
        ]
    )
    return{status:"success",data:data}
}catch (e) {
    return{status:"fail",data:e}.toString()
}
}


const ProductListByRemarkService= async (req)=>{
    try{
        let Remark = req.params.Remark;
        let  MatchStage = {$match:{remark:Remark}};
        let JoinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id", as:"brand"}}
        let JoinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id", as:"category"}}
        let UnwindBrandStage ={$unwind:"$brand"}
        let UnwindCategoryStage ={$unwind:"$category"}
        let ProjectionStage = {$project:{"brand._id":0,"category._id":0,"categoryID":0,"brandID":0}}

        let data =await  ProductsModel.aggregate(
            [
                MatchStage,
                JoinWithBrandStage,
                JoinWithCategoryStage,
                UnwindBrandStage,UnwindCategoryStage,
                ProjectionStage
            ]
        )
        return{status:"success",data:data}
    }catch (e) {
        return{status:"fail",data:e}.toString()
    }
}








const ProductListBySmilierService= async (req)=>{
    try{
        let CategoryID = new ObjectID(req.params.CategoryID);
        let MatchStage = {$match: {categoryID:CategoryID}};
        let limitStage ={$limit:20};
        let JointWithBrandStage={$lookup:{from:"brands",localField: "brandID",foreignField:"_id",as:"brand"}}
        let JointWithCategoryStage={$lookup:{from:"categories",localField: "categoryID",foreignField:"_id",as:"category"}}
        let UnwindBrandStage = {$unwind:"$brand"}
        let UnwindCategoryStage = {$unwind:"$category"}
        let ProjectionStage = {$project:{"brand._id":0,"category._id":0,"categoryID":0,"brandID":0}}

        let data = await ProductsModel.aggregate([
            MatchStage,limitStage,
            JointWithBrandStage,
            JointWithCategoryStage,UnwindBrandStage,UnwindCategoryStage,
            ProjectionStage
        ])
        return {status:"success",data:data}
    }catch (e) {
        return{status:"fail",data:e}.toString()
    }
}

const ProductDetailsService= async (req)=>{
    try{
        let  ProductID =new ObjectID(req.params.ProductID);
        let MatchStage = {$match: {_id:ProductID}};
        let JointWithBrandStage={$lookup:{from:"brands",localField: "brandID",foreignField:"_id",as:"brand"}}
        let JointWithCategoryStage={$lookup:{from:"categories",localField: "categoryID",foreignField:"_id",as:"category"}}
        let JointWithDetailsStage={$lookup:{from:"productdetails",localField: "_id",foreignField:"productID",as:"details"}}
        let UnwindBrandStage = {$unwind:"$brand"}
        let UnwindCategoryStage = {$unwind:"$category"}
        let UnwindDetailsStage = {$unwind:"$details"}
        let ProjectionStage = {$project:{"brand._id":0,"category._id":0}}
        let data = await ProductsModel.aggregate([
            MatchStage,
            JointWithBrandStage,
            JointWithCategoryStage, JointWithDetailsStage,
            UnwindBrandStage,UnwindCategoryStage,UnwindDetailsStage,
            ProjectionStage
        ])
        return {status:"success",data:data}
    }catch (e) {
        return{status:"fail",data:e}.toString()
    }

}



const ProductListByKeywordService= async (req)=>{
try {
    let SearchRegex = {$regex:req.params.Keyword, "$options":"i"};
    let SearchParams = [{title:SearchRegex},{shortDes:SearchRegex}]
    let SearchQuery ={$or:SearchParams}
    let MatchStage = {$match: SearchQuery};
    let JointWithBrandStage={$lookup:{from:"brands",localField: "brandID",foreignField:"_id",as:"brand"}}
    let JointWithCategoryStage={$lookup:{from:"categories",localField: "categoryID",foreignField:"_id",as:"category"}}

    let UnwindBrandStage = {$unwind:"$brand"}
    let UnwindCategoryStage = {$unwind:"$category"}

    let ProjectionStage = {$project:{"brand._id":0,"category._id":0,"categoryID":0,"brandID":0}}

    let data = await ProductsModel.aggregate([
        MatchStage,
        JointWithBrandStage,
        JointWithCategoryStage,
        UnwindBrandStage,UnwindCategoryStage,
        ProjectionStage
    ])
    return {status:"success",data:data}
}catch (e) {
    return{status:"fail",data:e}.toString()
}
}


const ProductReviewListService= async (req)=>{
   try{
       let  ProductID =new ObjectID(req.params.ProductID);
       let MatchStage = {$match: {productID:ProductID}};
       let JointWithProfileStage={$lookup:{from:"profiles",localField:"userID",foreignField:"userID",as:"profile"}}
      let UnwindProfileStage = {$unwind:"$profile"}
 let ProjectionStage ={$project:{
         "des":1,"rating":1,

         "profile.cus_city":1
     }
       }
       let data = await ReviewsModel.aggregate([
           MatchStage,
           JointWithProfileStage,
           UnwindProfileStage,
           ProjectionStage
       ])

       return {status:"success",data:data}
   }catch (e) {
       return{status:"fail",data:e}.toString()
   }
}


const CreateReviewListService = async (req)=>{
    try{
        const user_id= req.headers.user_id;
        const reqBody= req.body;
        const  data = await ReviewsModel.create(
            {
                productID: reqBody["product_id"],
                userID: user_id,
                des:  reqBody["des"],
                rating: reqBody["rating"],
            }
        )
        return {status:"success",data:data}

    }catch (e) {
        return{status:"fail",data:e}.toString()
    }
}



module.exports ={
    BrandsListService,
    CategoriesListService,
    ProductDetailsService,
    ProductListByBrandsService,
    ProductListByCategoriesService,
    ProductListByKeywordService,
    ProductListByRemarkService,
    ProductReviewListService,
    ProductSliderListService,
    ProductListBySmilierService,
    CreateReviewListService
}