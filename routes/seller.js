// Packages
const express = require("express"); // License MIT

// Initialize Packages and Config
const router = express.Router();

const G = require("./../tools/G");
const U = require("./../tools/uploader");
const V = require("./../tools/validator");

// Middleware
router.use(require("./../tools/token"));
router.use(require("./../tools/isSeller"));

// Models
const User = require("../models/User");
const City = require("../models/City");

// Controllers
const sellerController = require("./../controllers/sellerController");

// General
router.put("/editgallery", sellerController.updateGallery);
router.put(
  "/editavatar",
  U.imageUploader("galleryAvatar"),
  sellerController.editavatar
);
// router.put('/editsellerprofile', sellerController.updateSellerProfile)
// router.put('/editselleravatar', sellerController.updateSellerAvatar)

router.post(
  "/product",
  U.imageUploader("productImage"),
  V.CategoryValidator(),
  V.validate,
  sellerController.addProduct
);
router.put(
  "/product",
  U.imageUploader("productImage"),
  sellerController.updateProduct
);
router.delete("/product", sellerController.deleteProduct);

router.get("/galleryfactor", sellerController.oneGalleryFactor);
router.get("/galleryfactors", sellerController.allGalleryFactors);
router.get("/changefactorcondition", sellerController.changeFactorCondition);
router.get("/changeadsstatus", sellerController.changeAdsStatus);

module.exports = router;
