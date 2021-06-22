// Packages
const fs = require("fs");
const path = require("path");

// General Tools (user defined)
const G = require("./../tools/G");
const M = require("./../tools/messages");

// Models
const Province = require("./../models/Province");
const City = require("./../models/City");
const User = require("./../models/User");
const Gallery = require("../models/Gallery");
const Product = require("../models/Product");
const GalleryFactor = require("./../models/GalleryFactor");
// Operations
module.exports = {
  // Update Gallery Information
  async updateGallery(req, res) {
    try {
      const currentSeller = req.user;
      const thisGallery = await Gallery.findOne({ owner: currentSeller._id });

      if (!thisGallery)
        return res.json({ success: false, msg: "یوزر غیر مجاز" });
      const data = {
        name: req.body.name || thisGallery.name,
        address: req.body.address || thisGallery.address,
        description: req.body.description || thisGallery.description,
      };
      const id = thisGallery._id;
      const item = await Gallery.findByIdAndUpdate(id, data, { new: true });

      if (!item)
        return res.json({ success: false, msg: M.UPDATING_DATA_FAILURE });

      return res.json({ success: true, msg: M.UPDATING_DATA_SUCCESS, item });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },

  // Update Gallery Avatar
  async editavatar(req, res) {
    try {
      const currentSeller = req.user;
      const thisGallery = await Gallery.findOne({ owner: currentSeller._id });

      const avatar = req.file
        ? req.file.filename
        : thisGallery.avatar || "galleryAvatar.png";
      const id = thisGallery._id;
      const item = await Gallery.findByIdAndUpdate(
        id,
        { avatar },
        { new: true }
      );

      if (!item)
        return res.json({ success: false, msg: M.UPDATING_DATA_FAILURE });

      if (
        req.file &&
        thisGallery.avatar &&
        thisGallery.avatar !== "galleryAvatar.png"
      ) {
        const filePath = path.join(
          __dirname,
          `./files/galleryAvatar/${thisGallery.avatar}`
        );
        fs.unlink(filePath, (error) => {
          if (error) throw error;
        });
      }

      return res.json({ success: true, msg: M.UPDATING_DATA_SUCCESS, item });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },

  // Add Product
  async addProduct(req, res) {
    try {
      const currentSeller = req.user;
      const thisGallery = await Gallery.findOne({ owner: currentSeller._id });

      let count = await Product.countDocuments();
      const productId = `P${count + 1000001}`;

      const data = {
        name: req.body.name,
        category: req.body.category,
        image: req.file ? req.file.filename : "productImage.png",
        description: req.body.description,
        number: req.body.number,
        price: req.body.price,
        isDiscounted: req.body.isDiscounted || false,
        priceWithDiscount: req.body.priceWithDiscount || 0,
        seller: currentSeller._id,
        gallery: thisGallery._id,
        productId,
      };

      const item = await new Product(data).save();

      if (!item)
        return res.json({ success: false, msg: M.SAVING_DATA_FAILURE });

      return res.json({ success: true, msg: M.SAVING_DATA_SUCCESS, item });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },

  // Edit Product
  async updateProduct(req, res) {
    try {
      const id = req.query.id;
      if (!(await G.isValid(id)))
        return res.json({ success: false, msg: M.INVALID_ID });
      const currentSeller = req.user;

      const thisProduct = await Product.findById(id);
      if (String(thisProduct.seller) != String(currentSeller._id))
        return res.json({ success: false, msg: M.INVALID_USER });

      const data = {
        name: req.body.name || thisProduct.name,
        category: req.body.category || thisProduct.category,
        image: req.file
          ? req.file.filename
          : thisProduct.image || "productImage.png",
        description: req.body.description || thisProduct.description,
        number: req.body.number || thisProduct.number,
        price: req.body.price || thisProduct.price,
        isDiscounted: req.body.isDiscounted || thisProduct.isDiscounted,
        priceWithDiscount:
          req.body.priceWithDiscount || thisProduct.priceWithDiscount,
      };

      const item = await Product.findByIdAndUpdate(id, data, { new: true });

      if (!item)
        return res.json({ success: false, msg: M.UPDATING_DATA_FAILURE });

      if (
        req.file &&
        thisProduct.image &&
        thisProduct.image !== "productImage.png"
      ) {
        const filePath = path.join(
          __dirname,
          `./../files/productImage/${thisProduct.image}`
        );
        fs.unlink(filePath, (error) => {
          if (error) throw error;
        });
      }

      return res.json({ success: true, msg: M.UPDATING_DATA_SUCCESS, item });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },

  // Delete Product
  async deleteProduct(req, res) {
    try {
      const id = req.query.id;
      if (!(await G.isValid(id)))
        return res.json({ success: false, msg: M.INVALID_ID });

      const item = await Product.findByIdAndDelete(id);
      if (!item)
        return res.json({ success: false, msg: M.DELETING_DATA_FAILURE });

      if (item.image !== "productImage.png") {
        const filePath = path.join(
          __dirname,
          `./../files/productImage/${item.image}`
        );
        fs.unlink(filePath, (error) => {
          if (error) throw error;
        });
      }

      return res.json({ success: true, msg: M.DELETING_DATA_SUCCESS });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },

  // Factor
  async oneGalleryFactor(req, res) {
    try {
      const id = req.query.id;
      if (!(await G.isValid(id)))
        return res.json({ success: false, msg: M.INVALID_ID });

      const item = await GalleryFactor.findOne({ _id: id })
        .populate({
          path: "user",
          model: User,
          select: { __v: 0, createdAt: 0, updatedAt: 0, password: 0 },
        })
        .populate({
          path: "seller",
          model: User,
          select: { __v: 0, createdAt: 0, updatedAt: 0, password: 0 },
        })
        .populate({
          path: "gallery",
          model: Gallery,
          select: { __v: 0, createdAt: 0, updatedAt: 0, password: 0 },
        })
        .populate({
          path: "items.product",
          model: Product,
          select: { __v: 0, createdAt: 0, updatedAt: 0, password: 0 },
        });

      if (!item) return res.json({ success: false, msg: M.GET_DATA_FAILURE });
      if (item.seller != req.user._id)
        return res.json({ success: false, msg: "Invalid Seller" });

      return res.json({
        success: true,
        msg: M.GET_DATA_SUCCESS,
        item,
      });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },
  async allGalleryFactors(req, res) {
    try {
      const thisUser = req.user;
      const page = req.query.page;
      const limitCount = page ? 20 : 0;
      let query = { seller: thisUser._id };

      const options = {
        select: { createdAt: false, updatedAt: false, __v: false },
        sort: { created: -1 },
        skip: page ? (page - 1) * limitCount : 0,
      };

      if (req.query.condition) {
        query.condition = req.query.condition;
      }

      // Customizing Query
      const count = await GalleryFactor.countDocuments(query);
      const items = await GalleryFactor.find(query)
        .select(options.select)
        .sort(options.sort)
        .limit(limitCount)
        .skip(options.skip)
        .populate({
          path: "user",
          model: User,
          select: { __v: 0, createdAt: 0, updatedAt: 0, password: 0 },
        })
        .populate({
          path: "seller",
          model: User,
          select: { __v: 0, createdAt: 0, updatedAt: 0, password: 0 },
        })
        .populate({
          path: "gallery",
          model: Gallery,
          select: { __v: 0, createdAt: 0, updatedAt: 0, password: 0 },
        })
        .populate({
          path: "items.product",
          model: Product,
          select: { __v: 0, createdAt: 0, updatedAt: 0, password: 0 },
        })

        .exec();

      if (items.length === 0)
        return res.json({ success: false, msg: M.GET_DATA_FAILURE });
      return res.json({
        success: true,
        msg: M.GET_DATA_SUCCESS,
        items,
        count,
      });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },

  async changeFactorCondition(req, res) {
    try {
      const id = req.query.id;
      if (!(await G.isValid(id)))
        return res.json({ success: false, msg: M.INVALID_ID });

      const condition = req.query.condition;
      if (
        !condition &&
        condition != "pending" &&
        condition != "approved" &&
        condition != "sent" &&
        condition != "delivered"
      ) {
        return res.json({ success: false, msg: "Invalid Condition" });
      }

      const gallery = await GalleryFactor.findOne({ _id: id });
      if (gallery.seller != req.user._id)
        return res.json({ success: false, msg: "Invalid Seller" });

      const item = await GelleryFactor.findOneAndUpdate(
        { _id: id },
        { $set: { condition } },
        { new: true }
      );

      if (!item)
        return res.json({ success: false, msg: M.UPDATING_DATA_FAILURE });

      return res.json({
        success: true,
        msg: M.UPDATING_DATA_SUCCESS,
        item,
      });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },

  async changeAdsStatus(req, res) {
    try {
      const thisUser = req.user;

      const g = await Gallery.findOne({ owner: thisUser._id });
      if (!g) return res.json({ success: false, msg: M.UPDATING_DATA_FAILURE });

      let finalAdsStatus;
      if (g.adsStatus === true) finalAdsStatus = false;
      if (g.adsStatus === false) finalAdsStatus = true;

      const item = await Gallery.findOneAndUpdate(
        { _id: g._id },
        { $set: { adsStatus: finalAdsStatus } },
        { new: true }
      );

      return res.json({
        success: true,
        msg: M.UPDATING_DATA_SUCCESS,
        item,
      });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },
};
