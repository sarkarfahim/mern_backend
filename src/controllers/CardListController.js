const {CartListAllServices,UpdateCartListServices,RemoveCartListServices,SaveCartListServices }=require("../services/CartListServices")


exports.CartList = async (req,res)=>{
    const  result = await CartListAllServices(req);
    return res.status(200).json(result)
}

exports.SaveCartList = async (req,res)=>{
    const  result = await SaveCartListServices(req);
    return res.status(200).json(result)
}

exports.UpdateCartList = async (req,res)=>{
    const  result = await UpdateCartListServices(req);
    return res.status(200).json(result)
}

exports.RemoveCartList = async (req,res)=>{
    const  result = await RemoveCartListServices(req);
    return res.status(200).json(result)
}