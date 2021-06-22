// Packages
const express = require("express"); // License MIT

// Initialize Packages and Config
const router = express.Router();

const G = require("./../tools/G");
const U = require("./../tools/uploader")
const V = require("./../tools/validator")

// Controllers
const superAdminController = require("./../controllers/superAdminController")

// Middleware
router.use(require("./../tools/token"))
router.use(require("./../tools/isSuperAdmin"))

// Models
const User = require("../models/User")
const City = require("../models/City")


// General
router.get('/changeblock', superAdminController.changeUserBlockCondition)
router.get('/resetpassword', superAdminController.resetUserPassword)

router.post('/category', U.imageUploader('categoryImage'), V.CategoryValidator(), V.validate, superAdminController.createCategory)
router.put('/category', U.imageUploader('categoryImage'), superAdminController.updateCategory)
router.delete('/category', superAdminController.deleteCategory)

router.post('/province', superAdminController.addProvince)
router.put('/province', superAdminController.editProvince)
router.delete('/province', superAdminController.deleteProvince)

router.post('/city', superAdminController.addCity)
router.put('/city', superAdminController.editCity)
router.delete('/city', superAdminController.deleteCity)

module.exports = router