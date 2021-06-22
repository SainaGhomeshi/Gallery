// Packages
const express = require("express"); // License MIT

// Initialize Packages and Config
const router = express.Router();

const G = require("./../tools/G");
const V = require("./../tools/validator");

const apiController = require("./../controllers/apiController");

// Models
const User = require("../models/User");
const City = require("../models/City");

// Controllers

// General
router.post("/register", apiController.register);
router.post("/sellerregister", apiController.sellerRegister);
router.post("/addsuperadmin", apiController.registerSuperadmin);

router.post("/login", apiController.login);
router.post("/sellerlogin", apiController.sellerLogin);

// Get's

// Province
router.get("/province", apiController.oneProvince);
router.get("/provinces", apiController.allProvinces);

// City
router.get("/city", apiController.oneCity);
router.get("/cities", apiController.allCities);

// Category
router.get("/category", apiController.oneCategory);
router.get("/categories", apiController.allCategories);

// Product
router.get("/product", apiController.oneProduct);
router.get("/products", apiController.allProducts);

// Gallery
router.get("/gallery", apiController.oneGallery);
router.get("/galleries", apiController.allGalleries);

// Users
router.get("/user", apiController.oneUser);
router.get("/users", apiController.allUsers);

module.exports = router;
