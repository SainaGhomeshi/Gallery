// Packages
const express = require("express"); // License MIT

// Initialize Packages and Config
const router = express.Router();

const G = require("./../tools/G");
const U = require("./../tools/uploader")
const V = require("./../tools/validator")

// Controllers
const customerController = require("./../controllers/customerController")

// Middleware
router.use(require("./../tools/token"))
router.use(require("./../tools/isCustomer"))

// Models
const User = require("../models/User")
const City = require("../models/City")

// General
router.get('/profile', customerController.profile)
router.put('/editprofile', customerController.updateProfile)
router.put('/editavatar', U.imageUploader('userAvatar'), customerController.updateAvatar)

router.post('/editproductfromcart', customerController.editProductFromCart)
router.put('/changequantity', customerController.changeQuantity)
router.get('/buyproducts', customerController.buyProducts)


router.get('/userfactor', customerController.oneUserFactor)
router.get('/userfactors', customerController.allUserFactors)

module.exports = router