const { BrandsListService, CategoriesListService, ProductDetailsService, ProductListByBrandsService, ProductListByCategoriesService, ProductListByKeywordService, ProductListByRemarkService, ProductReviewListService, ProductSliderListService, ProductListBySmilierService,CreateReviewListService} = require("../services/ProductServices")


exports.BrandsList = async (req,res)=>{
let result = await BrandsListService();
   return res.status(200).json(result);

}
exports.CategoriesList = async (req,res)=>{
    let result = await CategoriesListService();
    return res.status(200).json(result);

}
exports.ProductSliderList = async (req,res)=>{
    let result = await ProductSliderListService();
    return res.status(200).json(result);

}
exports.ProductListByCategories = async (req,res)=>{
    let result = await ProductListByCategoriesService(req);
    return res.status(200).json(result);

}
exports.ProductListByBrands= async (req,res)=>{

    let result = await ProductListByBrandsService(req);
    return res.status(200).json(result);
}

exports.ProductListByRemark= async (req,res)=>{

    let result = await ProductListByRemarkService(req);
    return res.status(200).json(result);
}






exports.ProductListBySmilier= async (req,res)=>{
    let result = await ProductListBySmilierService(req);
    return res.status(200).json(result);

}

exports.ProductDetails= async (req,res)=>{
    let result = await ProductDetailsService(req);
    return res.status(200).json(result);

}
exports.ProductListByKeyword= async (req,res)=>{
    let result = await ProductListByKeywordService(req);
    return res.status(200).json(result);

}





exports.ProductReviewList= async (req,res)=>{

    let result = await ProductReviewListService(req);
    return res.status(200).json(result);
}

exports.CreateReviewList= async (req,res)=>{

    let result = await CreateReviewListService(req);
    return res.status(200).json(result);
}