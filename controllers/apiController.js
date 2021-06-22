// Packages
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
// Config and User Defined Tools

// General Tools (user defined)
const G = require("./../tools/G");
const M = require("./../tools/messages");

// Models
const User = require("./../models/User");
const Gallery = require("./../models/Gallery");
const Product = require("./../models/Product");
const City = require("./../models/City");
const Province = require("./../models/Province");
const Category = require("./../models/Category");

module.exports = {
  // Login
  async login(req, res) {
    try {
      const data = {
        email: req.body.email,
        password: req.body.password,
      };
      const thisUser = await User.findOne({
        email: data.email,
        role: { $in: ["customer", "superAdmin"] },
      });
      if (!thisUser)
        return res.status(400).json({
          success: false,
          msg: M.LOG_IN_INCORRECT_USER_NAME_OR_PASSWORD,
        });

      if (thisUser.block)
        return res.status(400).json({ success: false, msg: M.BLOCK });

      const passwordCheck = await thisUser.comparePassword(data.password);
      if (passwordCheck) {
        const userData = { role: thisUser.role, _id: thisUser._id };
        const token = await jwt.sign(userData, process.env.SECRET);
        const response = {
          success: true,
          msg: M.LOGGED_IN_SUCCESS,
          token: token,
          user: thisUser,
        };
        return res.status(200).json(response);
      } else {
        return res.status(401).json({
          success: false,
          msg: M.LOG_IN_INCORRECT_USER_NAME_OR_PASSWORD,
        });
      }
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },
  // Login Seller
  async sellerLogin(req, res) {
    try {
      const data = {
        email: req.body.email,
        password: req.body.password,
      };
      const thisUser = await User.findOne({
        email: data.email,
        role: "seller",
      }).populate({
        path: "city",
        model: City,
        populate: {
          path: "province",
          model: Province,
        },
      });
      if (!thisUser)
        return res.status(400).json({
          success: false,
          msg: M.LOG_IN_INCORRECT_USER_NAME_OR_PASSWORD,
        });

      if (thisUser.block)
        return res.status(400).json({ success: false, msg: M.BLOCK });

      const passwordCheck = await thisUser.comparePassword(data.password);
      if (passwordCheck) {
        const userData = { role: thisUser.role, _id: thisUser._id };
        const token = await jwt.sign(userData, process.env.SECRET);
        const gallery = await Gallery.findOne({ owner: thisUser._id });
        const response = {
          success: true,
          msg: M.LOGGED_IN_SUCCESS,
          token: token,
          user: thisUser,
          gallery,
        };

        return res.status(200).json(response);
      } else {
        return res.status(401).json({
          success: false,
          msg: M.LOG_IN_INCORRECT_USER_NAME_OR_PASSWORD,
        });
      }
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },
  async register(req, res) {
    try {
      const data = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
      };

      const thisUser = await User.findOne({ email: data.email });
      if (thisUser)
        return res.status(400).json({ success: false, msg: M.DUPLICATE_DATA });

      let count = await User.countDocuments({ role: { $ne: "superAdmin" } });
      // then combine the number with 'C' letter and sum of (count + 1000001)
      const userName = `C${count + 1000001}`;
      const item = await new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email,
        userName: userName,
        avatar: "avatar.png",
      }).save();

      if (!item)
        return res
          .status(500)
          .json({ success: false, msg: M.SAVING_DATA_FAILURE });
      const userData = { role: item.role, _id: item._id };
      const token = await jwt.sign(userData, process.env.SECRET);

      return res.json({
        success: true,
        msg: M.SAVING_DATA_SUCCESS,
        item,
        token,
      });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },

  async sellerRegister(req, res) {
    try {
      const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      };

      const thisUser = await User.findOne({
        email: data.email,
        role: "seller",
      });
      if (thisUser)
        return res.status(400).json({ success: false, msg: M.DUPLICATE_DATA });

      let count = await User.countDocuments({ role: { $ne: "superAdmin" } });
      // then combine the number with 'C' letter and sum of (count + 1000001)
      const userName = `C${count + 1000001}`;
      const item = await new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email,
        userName: userName,
        avatar: "avatar.png",
        role: "seller",
      }).save();

      if (!item)
        return res
          .status(500)
          .json({ success: false, msg: M.SAVING_DATA_FAILURE });

      let g = await Gallery.countDocuments();
      const galleryId = `G${g + 1000001}`;

      const newGallery = await new Gallery({
        owner: item._id,
        avatar: "galleryAvatar.png",
        galleryId: galleryId,
      }).save();

      const userData = { role: item.role, _id: item._id };
      const token = await jwt.sign(userData, process.env.SECRET);

      return res.json({
        success: true,
        msg: M.SAVING_DATA_SUCCESS,
        item,
        gallery: newGallery,
        token,
      });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },

  async registerSuperadmin(req, res) {
    try {
      const data = {
        email: req.body.email,
        password: req.body.password,
        sex: req.body.sex,
      };
      const thisUser = await User.findOne({ email: data.email });
      if (thisUser)
        return res.status(400).json({ success: false, msg: M.DUPLICATE_DATA });

      let count = await User.countDocuments({ role: "customer" });
      // then combine the number with 'C' letter and sum of (count + 1000001)
      const userName = `C${count + 1000001}`;
      const item = await new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email,
        userName: userName,
        role: "superAdmin",
        // city: req.body.city || null,
        // sex: req.body.sex,
        avatar: "avatar.png",
      }).save();

      if (!item)
        return res
          .status(500)
          .json({ success: false, msg: M.SAVING_DATA_FAILURE });

      return res.json({ success: true, msg: M.SAVING_DATA_SUCCESS, item });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },

  // ===================================
  // City
  async oneProvince(req, res) {
    try {
      const id = req.query.id;
      if (!(await G.isValid(id))) {
        return res.json({
          success: false,
          msg: M.INVALID_ID,
        });
      }

      const item = await Province.findOne({ _id: id });

      if (!item) {
        return res.json({
          success: false,
          msg: M.GET_DATA_FAILURE,
        });
      }

      return res.json({
        success: true,
        msg: M.GET_DATA_SUCCESS,
        item,
      });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },
  async allProvinces(req, res) {
    try {
      const page = req.query.page;
      const search = req.query.search || "";
      const limitCount = page ? 20 : 0;
      const options = {
        select: { createdAt: false, updatedAt: false },
        sort: { created: -1 },
        skip: page ? (page - 1) * limitCount : 0,
      };

      const count = await Province.countDocuments({
        name: { $regex: search, $options: "i" },
      });
      const items = await Province.find({
        name: { $regex: search, $options: "i" },
      })
        .select(options.select)
        .sort(options.sort)
        .limit(limitCount)
        .skip(options.skip)
        .exec();
      if (!items || items.length === 0) {
        return res.json({
          success: false,
          msg: M.GET_DATA_FAILURE,
        });
      }

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

  // City
  async oneCity(req, res) {
    try {
      const id = req.query.id;
      if (!(await G.isValid(id))) {
        return res.json({
          success: false,
          msg: M.INVALID_ID,
        });
      }

      const item = await City.findOne({ _id: id });

      if (!item) {
        return res.json({
          success: false,
          msg: M.GET_DATA_FAILURE,
        });
      }

      return res.json({
        success: true,
        msg: M.GET_DATA_SUCCESS,
        item,
      });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },
  async allCities(req, res) {
    try {
      const page = req.query.page;
      const search = req.query.search || "";
      const limitCount = page ? 20 : 0;
      const options = {
        select: { createdAt: false, updatedAt: false },
        sort: { created: -1 },
        skip: page ? (page - 1) * limitCount : 0,
      };

      let query = { name: { $regex: search, $options: "i" } };
      const province = req.query.province;

      if (province) {
        if (!(await G.isValid(province)))
          return res.json({ success: false, msg: M.INVALID_ID });
        query.province = province;
      }

      const count = await City.countDocuments(query);
      const items = await City.find(query)
        .select(options.select)
        .sort(options.sort)
        .limit(limitCount)
        .skip(options.skip)
        .populate({ path: "province", model: Province })
        .exec();
      if (!items || items.length === 0) {
        return res.json({
          success: false,
          msg: M.GET_DATA_FAILURE,
        });
      }

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

  // Category
  async oneCategory(req, res) {
    try {
      const id = req.query.id;
      if (!(await G.isValid(id)))
        return res.json({ success: false, msg: M.INVALID_ID });

      const item = await Category.findOne({ _id: id });
      if (!item) return res.json({ success: false, msg: M.GET_DATA_FAILURE });

      return res.json({
        success: true,
        msg: M.GET_DATA_SUCCESS,
        item,
      });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },
  async allCategories(req, res) {
    try {
      const page = req.query.page;
      const search = req.query.search || "";
      const limitCount = page ? 20 : 0;
      const query = { name: { $regex: search, $options: "i" } };

      const options = {
        select: { createdAt: false, updatedAt: false, __v: false },
        sort: { created: -1 },
        skip: page ? (page - 1) * limitCount : 0,
      };

      // Customizing Query
      const count = await Category.countDocuments(query);
      const items = await Category.find(query)
        .select(options.select)
        .sort(options.sort)
        .limit(limitCount)
        .skip(options.skip)
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
  // Product
  async oneProduct(req, res) {
    try {
      const id = req.query.id;
      if (!(await G.isValid(id)))
        return res.json({ success: false, msg: M.INVALID_ID });

      const item = await Product.findOne({ _id: id })
        .populate({
          path: "gallery",
          model: Gallery,
          select: { __v: 0, createdAt: 0, updatedAt: 0 },
        })
        .populate({
          path: "seller",
          model: User,
          select: { __v: 0, createdAt: 0, updatedAt: 0, password: 0 },
        })
        .populate({
          path: "category",
          model: Category,
          select: { __v: 0, createdAt: 0, updatedAt: 0, password: 0 },
        });

      if (!item) return res.json({ success: false, msg: M.GET_DATA_FAILURE });

      return res.json({
        success: true,
        msg: M.GET_DATA_SUCCESS,
        item,
      });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },
  async allProducts(req, res) {
    try {
      const page = req.query.page;
      const search = req.query.search || "";
      const limitCount = page ? 20 : 0;
      let query = { name: { $regex: search, $options: "i" } };

      const options = {
        select: { createdAt: false, updatedAt: false, __v: false },
        sort: { created: -1 },
        skip: page ? (page - 1) * limitCount : 0,
      };

      if (req.query.gallery) {
        if (!(await G.isValid(req.query.gallery)))
          return res.json({ success: false, msg: M.INVALID_ID });
        query.gallery = req.query.gallery;
      }

      if (req.query.category) {
        if (!(await G.isValid(req.query.category)))
          return res.json({ success: false, msg: M.INVALID_ID });
        query.category = req.query.category;
      }
      if (req.query.seller) {
        if (!(await G.isValid(req.query.seller)))
          return res.json({ success: false, msg: M.INVALID_ID });
        query.seller = req.query.seller;
      }

      // Customizing Query
      const count = await Product.countDocuments(query);
      const items = await Product.find(query)
        .select(options.select)
        .sort(options.sort)
        .limit(limitCount)
        .skip(options.skip)
        .populate({
          path: "gallery",
          model: Gallery,
          select: { __v: 0, createdAt: 0, updatedAt: 0 },
        })
        .populate({
          path: "category",
          model: Category,
          select: { __v: 0, createdAt: 0, updatedAt: 0 },
        })
        .populate({
          path: "seller",
          model: User,
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

  // Gallery
  async oneGallery(req, res) {
    try {
      const id = req.query.id;
      if (!(await G.isValid(id)))
        return res.json({ success: false, msg: M.INVALID_ID });

      const item = await Gallery.findOne({ _id: id }).populate({
        path: "seller",
        model: User,
        select: { __v: 0, createdAt: 0, updatedAt: 0, password: 0 },
      });

      if (!item) return res.json({ success: false, msg: M.GET_DATA_FAILURE });

      // Customizing Query
      const products = await Product.find({ gallery: id });

      return res.json({
        success: true,
        msg: M.GET_DATA_SUCCESS,
        item,
        products,
      });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },
  async allGalleries(req, res) {
    try {
      const page = req.query.page;
      const search = req.query.search || "";
      const limitCount = page ? 20 : 0;
      const options = {
        select: { createdAt: false, updatedAt: false },
        sort: { created: -1 },
        skip: page ? (page - 1) * limitCount : 0,
      };

      let query = { name: { $regex: search, $options: "i" } };

      const count = await Gallery.countDocuments(query);
      const items = await Gallery.find(query)
        .select(options.select)
        .sort(options.sort)
        .limit(limitCount)
        .skip(options.skip)
        .populate({ path: "owner", model: User })
        .exec();
      if (!items || items.length === 0) {
        return res.json({
          success: false,
          msg: M.GET_DATA_FAILURE,
        });
      }

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

  // User
  async oneUser(req, res) {
    try {
      const id = req.query.id;
      if (!(await G.isValid(id)))
        return res.json({ success: false, msg: M.INVALID_ID });

      const item = await User.findOne({ _id: id })
        .select("-password -role")
        .populate({
          path: "city",
          model: City,
          select: { __v: 0, createdAt: 0, updatedAt: 0 },
          populate: {
            path: "province",
            model: Province,
            select: { __v: 0, createdAt: 0, updatedAt: 0 },
          },
        });

      if (!item) return res.json({ success: false, msg: M.GET_DATA_FAILURE });

      item = JSON.parse(JSON.stringify(item));
      item.province = item.city ? item.city.province : null;

      return res.json({
        success: true,
        msg: M.GET_DATA_SUCCESS,
        item,
      });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },
  async allUsers(req, res) {
    try {
      const page = req.query.page;
      const search = req.query.search || "";
      const limitCount = page ? 20 : 0;
      let query = {
        firstName: { $regex: search, $options: "i" },
        lastName: { $regex: search, $options: "i" },
        role: { $ne: "superAdmin" },
      };

      const options = {
        select: {
          createdAt: false,
          updatedAt: false,
          __v: false,
          password: false,
          role: false,
        },
        sort: { created: -1 },
        skip: page ? (page - 1) * limitCount : 0,
      };

      if (req.query.role) {
        if (req.query.role != "seller" && req.query.role != "customer")
          return res.json({ success: false, msg: "Invalid Role" });
        query.role = req.query.role;
      }

      // Customizing Query
      const count = await User.countDocuments(query);
      let items = await User.find(query)
        .select(options.select)
        .sort(options.sort)
        .limit(limitCount)
        .skip(options.skip)
        .populate({
          path: "city",
          model: City,
          select: { __v: 0, createdAt: 0, updatedAt: 0 },
          populate: {
            path: "province",
            model: Province,
            select: { __v: 0, createdAt: 0, updatedAt: 0 },
          },
        })
        .exec();

      if (items.length === 0)
        return res.json({ success: false, msg: M.GET_DATA_FAILURE });

      items = JSON.parse(JSON.stringify(items));
      let finalItems = [];
      if (req.query.role === "seller") {
        let gallery = {};
        let products = [];
        for (let i = 0; i < items.length; i++) {
          gallery = await Gallery.findOne({ owner: items[i]._id });
          gallery = JSON.parse(JSON.stringify(gallery));
          products = await Product.find({ gallery: gallery._id });
          gallery = { ...gallery, products };
          finalItems[i] = {
            ...items[i],
            gallery,
          };
        }
      }

      items = finalItems.length != 0 ? finalItems : items;

      for (let i = 0; i < items.length; i++) {
        items[i].province = items[i].city ? items[i].city.province : null;
      }

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
};
