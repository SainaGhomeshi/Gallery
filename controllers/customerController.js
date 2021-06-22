// Packages
const fs = require("fs")
const path = require("path")

// General Tools (user defined)
const G = require('./../tools/G')
const M = require('./../tools/messages')

// Models
const Province = require('./../models/Province')
const City = require("./../models/City")
const User = require("./../models/User")
const Gallery = require("../models/Gallery")
const Product = require("../models/Product")
const UserFactor = require("../models/UserFactor")
const GalleryFactor = require("./../models/GalleryFactor")
// Operations
module.exports = {

    // Profile
    async profile(req, res) {
        try {

            const id = req.query.id || req.user._id
            if (!(await G.isValid(id))) return res.json({ success: false, msg: M.INVALID_ID })

            const item = await User.findOne({ _id: id })
                .select('-password -__v -createdAt -updatedAt')
                .populate({
                    path: 'city', model: City, select: { __v: 0, createdAt: 0, updatedAt: 0 },
                    populate: { path: 'province', model: Province, select: { __v: 0, createdAt: 0, updatedAt: 0 } }
                })
                .exec()

            if (!item) return res.json({ success: false, msg: M.GET_DATA_FAILURE })

            let gallery
            if (item.role === 'seller') gallery = await Gallery.findOne({ owner: id })

            return res.json({ success: true, msg: M.GET_DATA_SUCCESS, item, gallery })

        } catch (error) { res.status(500).send({ error: `An error has Accured ${error}` }) }
    },

    // Update Profile
    async updateProfile(req, res) {
        try {
            const id = req.user._id
            const currentProfile = req.user

            const data = {
                firstName: req.body.firstName || currentProfile.firstName,
                lastName: req.body.lastName || currentProfile.lastName,
                about: req.body.about || currentProfile.about,
                birthday: req.body.birthday || currentProfile.birthday,
                address: req.body.address || currentProfile.address,
                sex: req.body.sex || currentProfile.sex,
                city: req.body.city || currentProfile.city || null,
                phone: req.body.phone || currentProfile.phone,
                postId: req.body.postId || currentProfile.postId,
            }

            const item = await User.findOneAndUpdate({ _id: id }, { $set: data }, { new: true }).select('-password')

            if (!item) return res.json({ success: false, msg: M.UPDATING_DATA_FAILURE })

            return res.json({ success: true, msg: M.UPDATING_DATA_SUCCESS, item })

        } catch (error) { res.status(500).send({ error: `An error has Accured ${error}` }) }
    },

    // Update Avatar
    async updateAvatar(req, res) {
        try {
            const id = req.user._id
            const currentProfile = req.user
            const avatar = req.file ? req.file.filename : currentProfile.avatar || 'avatar.png'

            const item = await User.findOneAndUpdate({ _id: id }, { $set: { avatar } }, { new: true }).select('-password');
            if (!item) return res.json({ success: false, msg: M.UPDATING_DATA_FAILURE })

            if (req.file && currentProfile.avatar && currentProfile.avatar !== "avatar.png") {
                const filePath = path.join(__dirname, `./../files/userAvatar/${currentProfile.avatar}`)
                fs.unlink(filePath, (error) => { if (error) throw error })
            }
            return res.json({ success: true, msg: M.UPDATING_DATA_SUCCESS, item })
        } catch (error) { res.status(500).send({ error: `An error has Accured ${error}` }) }
    },

    // Buying Process
    async editProductFromCart(req, res) {
        try {
            const thisUser = req.user
            const operation = req.body.operation
            const data = {
                product: req.body.product,
                number: req.body.number
            }
            if (!(await G.isValid(data.product))) return res.json({ success: false, msg: M.INVALID_ID })

            let updateQuery = {}
            let baseProductUpdateQuery = {}
            const thisUserProducts = thisUser.cart.map(p => p.product)
            const isExistInCart = thisUserProducts.includes(data.product)

            const thisProduct = await Product.findOne({ _id: data.product })

            if (operation === true) {
                if (isExistInCart === true) return res.json({ success: false, msg: 'کالا قبلا اضافه شده است' })
                if (data.number > thisProduct.number) return res.json({ success: false, msg: 'موجودی کالا کم است' })
                updateQuery = { $push: { cart: data } }
                baseProductUpdateQuery = { $inc: { number: -data.number } }
            }
            if (operation === false) {
                if (isExistInCart === false) return res.json({ success: false, msg: 'چنین کالایی در سبد خرید پیدا نشد' })
                updateQuery = { $pull: { cart: { product: data.product } } }
                baseProductUpdateQuery = { $inc: { number: data.number } }
            }

            const item = await User.findOneAndUpdate({ _id: thisUser._id }, updateQuery, { new: true })
            if (!item) return res.json({ success: false, msg: M.UPDATING_DATA_FAILURE })

            await Product.findOneAndUpdate({ _id: data.product }, baseProductUpdateQuery)
            return res.json({ success: true, msg: M.UPDATING_DATA_SUCCESS, item: item.cart })
        } catch (error) { res.status(500).send({ error: `An error has Accured ${error}` }) }
    },

    async changeQuantity(req, res) {
        try {
            const thisUser = req.user
            const id = req.query.id

            let operation
            if (req.query.operation == true || req.query.operation == 'true') operation = true
            if (req.query.operation == false || req.query.operation == 'false') operation = false

            if (req.query.operation != true && req.query.operation != 'true' && req.query.operation != false && req.query.operation != 'false') {
                return res.json({ success: false, msg: 'عملیات نا معتبر' })
            }

            const findQuery = { _id: thisUser._id, 'cart.product': id }
            let updateQuery = {}
            let baseProductUpdateQuery = {}

            const thisUserProducts = thisUser.cart.map(p => p.product)
            const isExistInCart = thisUserProducts.includes(id)
            if (isExistInCart === false) return res.json({ success: false, msg: 'چنین کالایی در سبد خرید پیدا نشد' })

            if (operation === true) {
                const thisProduct = await Product.findOne({ _id: id })
                if (thisProduct.number <= 0) return res.json({ success: false, msg: 'موجودی کالا کم است' })
                updateQuery = { $inc: { 'cart.$.number': 1 } }
                baseProductUpdateQuery = { $inc: { number: -1 } }

            }

            if (operation === false) {
                updateQuery = { $inc: { 'cart.$.number': -1 } }
                baseProductUpdateQuery = { $inc: { number: 1 } }
            }

            const item = await User.findOneAndUpdate(findQuery, updateQuery, { new: true })

            if (!item) return res.json({ success: false, msg: M.UPDATING_DATA_FAILURE })
            await Product.findOneAndUpdate({ _id: id }, baseProductUpdateQuery)

            return res.json({ success: true, msg: M.UPDATING_DATA_SUCCESS, item: item.cart })

        } catch (error) { res.status(500).send({ error: `An error has Accured ${error}` }) }
    },

    async buyProducts(req, res) {
        try {
            const thisUser = req.user
            const cart = thisUser.cart
            if (cart.length === 0) return res.json({ success: false, msg: 'سبد خرید خالی است' })
            // Find the Products
            const productsIds = cart.map(p => p.product)
            let products = await Product.find({ _id: { $in: productsIds } }).select('-createdAt -updatedAt -__v')
            products = JSON.parse(JSON.stringify(products))

            // Getting Ready Products Array
            for (let i = 0; i < products.length; i++) {
                for (let j = 0; j < cart.length; j++) {
                    if (String(products[i]._id) == String(cart[j].product)) {
                        if (products[i].number < cart[j].number) return res.json({ success: false, msg: 'موجودی کالا کم است' })
                        products[i].number = cart[j].number
                        await Product.findOneAndUpdate({ _id: products[i]._id }, { $inc: { sellCount: cart[j].number } })
                        break
                    }
                }
            }

            let totalPrice = 0
            let finalProdcuts = []
            let galleries = []
            // User Factor and Product Manage
            products.forEach(product => {
                if (product.isDiscounted) {
                    totalPrice += (Number(product.priceWithDiscount) * Number(product.number))
                } else {
                    totalPrice += (Number(product.price) * Number(product.number))
                }
                if (!galleries.includes(product.gallery)) {
                    galleries.push({ gallery: product.gallery })
                }
            })


            // Galleries Factor and Product Manage
            let galleriesTemp = galleries
            let temp = {}
            let userItems = []
            for (let i = 0; i < galleriesTemp.length; i++) {
                for (let j = 0; j < products.length; j++) {
                    if (String(galleriesTemp[i].gallery) === String(products[j].gallery)) {
                        galleriesTemp[i].seller = products[j].seller
                        galleriesTemp[i].user = thisUser._id
                        galleriesTemp[i].description = products[j].description
                        temp = {
                            product: products[j]._id,
                            number: products[j].number,
                            price: Number(products[j].price),
                            priceWithDiscount: Number(products[j].priceWithDiscount),
                        }

                        galleriesTemp[i].totalPrice = 0
                        if (products[j].isDiscounted) {
                            galleriesTemp[i].totalPrice += (Number(temp.priceWithDiscount) * Number(temp.number))
                        } else {
                            galleriesTemp[i].totalPrice += (Number(temp.price) * Number(temp.number))
                        }
                        galleriesTemp[i].items = []
                        galleriesTemp[i].items.push({
                            product: products[j]._id,
                            number: temp.number,
                            price: temp.price,
                            priceWithDiscount: temp.priceWithDiscount
                        })

                        userItems.push({
                            product: products[j]._id,
                            number: temp.number,
                            price: temp.price,
                            priceWithDiscount: temp.priceWithDiscount
                        })

                        temp = {}
                    }
                }
            }

            const data = {
                user: thisUser._id,
                description: req.body.description,
                galleries: galleries.map(g => g.gallery),
                items: userItems,
                totalPrice
            }


            const userFactor = await new UserFactor(data).save()
            if (!userFactor) return res.json({ success: false, msg: 'خظای داخلی - فاکتور مشتری' })

            const glleryFactors = await GalleryFactor.insertMany(galleriesTemp)
            if (glleryFactors.length === 0) return res.json({ success: false, msg: 'خظای داخلی - فاکتور گالری' })


            await User.findOneAndUpdate({ _id: thisUser._id }, { $set: { cart: [] } })

            return res.json({ success: true, msg: 'خرید با موفقیت انجام شد', factor: userFactor })
        } catch (error) { res.status(500).send({ error: `An error has Accured ${error}` }) }
    },


    // Factor
    async oneUserFactor(req, res) {
        try {
            const id = req.query.id
            if (!(await G.isValid(id))) return res.json({ success: false, msg: M.INVALID_ID })

            const item = await UserFactor.findOne({ _id: id })
                .populate({ path: 'user', model: User, select: { __v: 0, createdAt: 0, updatedAt: 0, password: 0 } })
                .populate({ path: 'seller', model: User, select: { __v: 0, createdAt: 0, updatedAt: 0, password: 0 } })
                .populate({ path: 'gallery', model: Gallery, select: { __v: 0, createdAt: 0, updatedAt: 0, password: 0 } })
                .populate({ path: 'items.product', model: Product, select: { sellCount: 0, __v: 0, createdAt: 0, updatedAt: 0, number: 0, price: 0, priceWithDiscount: 0 } })

            if (!item) return res.json({ success: false, msg: M.GET_DATA_FAILURE })
            if (item.user != req.user._id) return res.json({ success: false, msg: 'Invalid Seller' })

            return res.json({
                success: true,
                msg: M.GET_DATA_SUCCESS,
                item
            })
        } catch (error) { res.status(500).send({ error: `An error has Accured ${error}` }) }
    },
    async allUserFactors(req, res) {
        try {
            const thisUser = req.user
            const page = req.query.page
            const limitCount = page ? 20 : 0
            let query = { user: thisUser._id }

            const options = {
                select: { createdAt: false, updatedAt: false, __v: false },
                sort: { created: -1 },
                skip: page ? (page - 1) * limitCount : 0
            }

            if (req.query.condition) {
                query.condition = req.query.condition
            }

            // Customizing Query
            const count = await UserFactor.countDocuments(query)
            const items = await UserFactor.find(query)
                .select(options.select).sort(options.sort).limit(limitCount).skip(options.skip)
                .populate({ path: 'seller', model: User, select: { __v: 0, createdAt: 0, updatedAt: 0, password: 0 } })
                .populate({ path: 'gallery', model: Gallery, select: { __v: 0, createdAt: 0, updatedAt: 0, password: 0 } })
                .populate({ path: 'items.product', model: Product, select: { sellCount: 0, __v: 0, createdAt: 0, updatedAt: 0, number: 0, price: 0, priceWithDiscount: 0 } })

                .exec()

            if (items.length === 0) return res.json({ success: false, msg: M.GET_DATA_FAILURE })
            return res.json({
                success: true,
                msg: M.GET_DATA_SUCCESS,
                items,
                count
            })
        } catch (error) { res.status(500).send({ error: `An error has Accured ${error}` }) }
    },
}