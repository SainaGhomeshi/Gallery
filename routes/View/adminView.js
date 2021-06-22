const express = require('express')
const router = express.Router();


router.get('/login',(req, res) => {
    res.render('admin/login')
})

router.get('/register',(req, res) => {
    res.render('admin/register')
})

router.get('/listOfCities',(req, res) => {
    res.render('admin/listOfCities')
})

router.get('/listOfProvince',(req, res) => {
    res.render('admin/listOfProvince')
})

router.get('/listOfCategories',(req, res) => {
    res.render('admin/listOfCategories')
})

router.get('/category',(req, res) => {
    res.render('admin/category')
})

router.get('/listOfSellers',(req, res) => {
    res.render('admin/listOfSellers')
})

router.get('/listOfShopProducts',(req, res) => {
    res.render('admin/listOfShopProducts')
})

router.get('/listOfUsers',(req, res) => {
    res.render('admin/listOfUsers')
})

module.exports = router;