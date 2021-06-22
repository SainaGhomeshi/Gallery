const express = require('express')
const router = express.Router();

router.get('/sellerProfile',(req, res) => {
    res.render('seller/sellerProfile')
})

router.get('/login',(req, res) => {
    res.render('seller/login')
})

router.get('/shopProfile',(req, res) => {
    res.render('seller/shopProfile')
})

router.get('/listOfCheckout',(req, res) => {
    res.render('seller/listOfCheckout')
})

router.get('/listOfProduct',(req, res) => {
    res.render('seller/listOfProduct')
})

router.get('/register',(req, res) => {
    res.render('seller/register')
})


module.exports = router;