const mongoose= require("mongoose");
 const  CartsListModel =  require("../models/CartsListModel");
const  ProfilesModel= require("../models/ProfilesModel")
const  InvoicesModel= require("../models/InvoicesModel")
const  InvoiceProductsModel= require("../models/InvoiceProductsModel")
const  PaymentSettingsModel= require("../models/PaymentSettingsModel");
const  ObjectID= mongoose.Types.ObjectId;
const FormData = require('form-data');
const axios = require("axios");

const  CreateInvoiceService = async (req)=>{
    try{

    const user_id = new ObjectID(req.headers.user_id);
    const cus_email = req.headers.email;

        /// calculate total  , Payable ,Vat

        let matchStage = {$match:{userID:user_id}};
        let JointStageByProduct = {$lookup:{from:"products", localField:"productID", foreignField:"_id" , as:"product"}}
        let unwindProductStage = {$unwind:"$product"}

        let  CartProducts = await CartsListModel.aggregate([
            matchStage,JointStageByProduct,unwindProductStage
        ])

    /// total

    let totalAmount = 0;
        CartProducts.forEach((element)=> {
            let price;
            if (element["product"]["discount"]) {
                price = parseFloat(element["product"]["discountPrice"]);
            } else {
                price = parseFloat(element["product"]["price"]);
            }
            totalAmount +=parseFloat(element["qtz"])*price;

        })

        // vat & payable

        let vat = totalAmount * 0.05 // 5% vat
        let payable = totalAmount+vat;

//////// prepare customer details & shipping details

let profile = await ProfilesModel.aggregate([
    matchStage
])

        let cus_details =`Name:${profile[0]["cusName"]},email:${cus_email},City:${profile[0]["cusCity"]}`;
        let ship_details =`Name:${profile[0]["shipName"]},City:${profile[0]["shipPhone"]}`;

      /// Transaction & others

      let tran_Id = Math.floor(100000+Math.random()*900000)  ;
      let validation_id = 0;
      let delivery_status = "pending"
      let payment_status= "pending"


/// create invoice

        let createInvoice=await InvoicesModel.create({
            userID:user_id,
            payable:payable,
            cus_details:cus_details,
            ship_details:ship_details,
            tran_id:tran_Id,
            val_id:validation_id,
            payment_status:payment_status,
            delivery_status:delivery_status,
            total:totalAmount,
            vat:vat,
        })


/// create InvoiceProducts

let invoice_id = createInvoice["_id"];

        CartProducts.forEach(async (element)=> {
            await  InvoiceProductsModel.create({
                userID :user_id,
                invoiceID :invoice_id,
                productID :element["productID"],
                qtz: element["qtz"],
                price: element["productID"]["discount"]?element["product"]["discountPrice"]:element["product"]["price"],
                color:element["color"],
                size: element["size"],
            })
        })


    ///remove cart

    await  CartsListModel.deleteMany({userID:user_id});

//=============Step 07: Prepare SSL Payment=======

        let PaymentSettings=await PaymentSettingsModel.find();

        const formData=new FormData();

        formData.append('store_id',PaymentSettings[0]['store_id'])
        formData.append('store_passwd',PaymentSettings[0]['store_passwd'])
        formData.append('total_amount',payable.toString())
        formData.append('currency',PaymentSettings[0]['currency'])
        formData.append('tran_id',tran_Id)

        formData.append('success_url',`${PaymentSettings[0]['success_url']}/${tran_Id}`)
        formData.append('fail_url',`${PaymentSettings[0]['fail_url']}/${tran_Id}`)
        formData.append('cancel_url',`${PaymentSettings[0]['cancel_url']}/${tran_Id}`)
        formData.append('ipn_url',`${PaymentSettings[0]['ipn_url']}/${tran_Id}`)


        formData.append('cus_name',profile[0]['cusName'])
        formData.append('cus_email',cus_email)
        formData.append('cus_add1',profile[0]['cusAdd'])
        formData.append('cus_add2',profile[0]['cusAdd'])
        formData.append('cus_city',profile[0]['cusCity'])
        formData.append('cus_state',profile[0]['cusState'])
        formData.append('cus_postcode',profile[0]['cusPostcode'])
        formData.append('cus_country',profile[0]['cusCountry'])
        formData.append('cus_phone',profile[0]['cusPhone'])
        formData.append('cus_fax',profile[0]['cusFax'])


        formData.append('shipping_method',"YES")
        formData.append('ship_name',profile[0]['shipName'])
        formData.append('ship_add1',profile[0]['shipAdd'])
        formData.append('ship_add2',profile[0]['shipAdd'])
        formData.append('ship_city',profile[0]['shipAdd'])
        formData.append('ship_state',profile[0]['shipAdd'])
        formData.append('ship_country',profile[0]['shipCountry'])
        formData.append('ship_postcode',profile[0]['shipPostcode'])

        formData.append('product_name','According Invoice')
        formData.append('product_category','According Invoice')
        formData.append('product_profile','According Invoice')
        formData.append('product_amount','According Invoice')

        let SSLRes=await axios.post(PaymentSettings[0]['init_url'],formData);

        return {status:"success", data:SSLRes.data}
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}

    }
}


const  PaymentFailService = async (req)=>{
    try{
        let tranID=req.params.tranID;
        await InvoicesModel.updateOne({tran_Id:tranID},{payment_status:"fail"});
        return {status:"fail"};
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}

    }
}


const  PaymentCancelService = async (req)=>{
    try{
        let tranID=req.params.tranID;
        await InvoicesModel.updateOne({tran_Id:tranID},{payment_status:"cancel"});
        return {status:"cancel"};
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}

    }
}
const  PaymentIPNService = async (req)=>{
    try{
        let tranID=req.params.tranID;
        let status=req.body['status'];
        await  InvoicesModel.updateOne({tran_Id:tranID},{payment_status:status});
        return {status:"success"}
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}

const  PaymentSuccessService = async (req)=>{
    try{
        let tranID=req.params.tranID;
     await InvoicesModel.updateOne({tran_Id:tranID},{payment_status:"success"});
        return {status:"success"};
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}

    }
}
const  InvoiceListService = async (req)=>{
    try{
        let user_id = new ObjectID(req.headers.user_id);
        let invoice = await InvoicesModel.find({userID:user_id});

        return {status:"success", data:invoice}
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}

    }
}


const  InvoiceProductListService = async (req)=>{
    try{

        let user_id=new ObjectID(req.headers.user_id);
        let invoice_id=new ObjectID(req.params.invoice_id);
       // console.log(invoice_id)
        let matchStage={$match:{userID:user_id,invoiceID:invoice_id}}
        let JoinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
        let unwindStage={$unwind:"$product"}

        let products=await InvoiceProductsModel.aggregate([
            matchStage,
            JoinStageProduct,
            unwindStage
        ])

        return {status:"success",data:products }
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}


module.exports={
    CreateInvoiceService,
    PaymentFailService,
    PaymentCancelService,
    PaymentIPNService,
    PaymentSuccessService,
    InvoiceListService,
    InvoiceProductListService
}