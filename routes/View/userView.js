const express = require('express')
const router = express.Router();


router.get('/profile',(req, res) => {
    res.render('user/profile')
})

router.get('/', async (req, res) => {
        res.render('user/index')
})

router.get('/checkout',(req, res) => {
    res.render('user/checkout')
})

router.get('/cart',(req, res) => {
    res.render('user/cart')
})

router.get('/aboutUs',(req, res) => {
    res.render('user/aboutUs')
})

router.get('/shop',(req, res) => {
    res.render('user/shop')
})

router.get('/category',(req, res) => {
    res.render('user/category')
})

module.exports = router;