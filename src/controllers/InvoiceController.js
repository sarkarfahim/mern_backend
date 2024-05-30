const {CreateInvoiceService, PaymentFailService, PaymentCancelService, PaymentIPNService, PaymentSuccessService,
    InvoiceListService, InvoiceProductListService
} = require("../services/InvoiceServices");


exports.CreateInvoice = async (req,res)=>{

    const  result = await CreateInvoiceService(req)
    return res.status(200).json(result)
}

exports.PaymentFail = async (req,res)=>{
    const  result = await PaymentFailService(req);
    return res.status(200).json(result)
}


exports.PaymentCancel = async (req,res)=>{
    const  result = await PaymentCancelService(req);
    return res.status(200).json(result)
}
exports.PaymentIPN = async (req,res)=>{
    const  result = await PaymentIPNService(req);
    return res.status(200).json(result)
}

exports.PaymentSuccess = async (req,res)=>{
    const  result = await PaymentSuccessService(req);

    return res.status(200).json(result)
}

exports.InvoiceList = async (req,res)=>{
    const  result = await InvoiceListService(req) ;
    return res.status(200).json(result)
}

exports.InvoiceProductList = async (req,res)=>{
    const  result = await  InvoiceProductListService(req);
    return res.status(200).json(result)
}