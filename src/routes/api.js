const express = require("express");
const ProductController =require('../controllers/ProductController')
const UserController =  require("../controllers/UserController")
const WishListController = require("../controllers/WishListController")
const CardListController= require("../controllers/CardListController");
const InvoiceController= require("../controllers/InvoiceController");
const FeatureController= require("../controllers/FeatureController");

const AuthVerification =  require("../middlewares/AuthVerification")
const router = express.Router();

// Product API
router.get('/ProductBrandList',ProductController.BrandsList);
router.get('/ProductCategoryList',ProductController.CategoriesList);
router.get('/ProductSliderList',ProductController.ProductSliderList);

router.get('/ProductDetails/:ProductID',ProductController.ProductDetails);
router.get('/ProductListByBrand/:BrandID',ProductController.ProductListByBrands);
router.get('/ProductListByCategory/:CategoryID',ProductController.ProductListByCategories);
router.get('/ProductListByRemark/:Remark',ProductController.ProductListByRemark);
router.get('/ProductListBySmilier/:CategoryID',ProductController.ProductListBySmilier);

router.get('/ProductListByKeyword/:Keyword',ProductController.ProductListByKeyword);

router.get('/ProductReviewList/:ProductID',ProductController.ProductReviewList);


////user API
router.get('/UserOTP/:email',UserController.UserOTP);
router.get('/VerifyLogin/:email/:otp',UserController.VerifyOTP);
router.get('/UserLogout',AuthVerification,UserController.UserLogout);

router.get('/CreateProfile',AuthVerification,UserController.CreateProfile);
router.get('/UpdateProfile',AuthVerification,UserController.UpdateProfile);
router.get('/ReadProfile',AuthVerification,UserController.ReadProfile);


//// wishlist
router.get('/WishList',AuthVerification,WishListController.WishList);
router.post('/SaveWishList',AuthVerification,WishListController.SaveWishList);
router.post('/RemoveWishList',AuthVerification,WishListController.RemoveWishList);


////cartlist
router.post('/SaveCartList',AuthVerification,CardListController.SaveCartList);
router.post('/RemoveCartList',AuthVerification,CardListController.RemoveCartList);
router.post('/UpdateCartList/:cartID',AuthVerification,CardListController.UpdateCartList);
router.get('/CartList',AuthVerification,CardListController.CartList);

///invoice
router.get('/CreateInvoice',AuthVerification,InvoiceController.CreateInvoice);
router.get('/InvoiceList',AuthVerification,InvoiceController.InvoiceList);
router.get('/InvoiceProductList/:invoice_id',AuthVerification,InvoiceController.InvoiceProductList);

router.post('/PaymentSuccess/:tranID',InvoiceController.PaymentSuccess);
router.post('/PaymentFail/:tranID',InvoiceController.PaymentFail);
router.post('/PaymentCancel/:tranID',InvoiceController.PaymentCancel);
router.post('/PaymentIPN/:tranID',InvoiceController.PaymentIPN);


///feature

router.get('/FeatureList',FeatureController.FeatureList);

// create ReviewList
router.post('/CreateReviewList',AuthVerification,ProductController.CreateReviewList);


module.exports = router;