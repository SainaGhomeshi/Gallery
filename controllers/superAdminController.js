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
const Category = require("../models/Category");

// Operations
module.exports = {
  async changeUserBlockCondition(req, res) {
    try {
      const data = {
        id: req.query.id,
        condition:
          req.body.condition == true || req.body.condition == "true"
            ? true
            : false,
      };

      const thisUser = await User.findOne({ _id: data.id });
      if (!thisUser) {
        return res.json({
          success: false,
          msg: M.GET_DATA_FAILURE,
        });
      }

      if (thisUser.role === "superAdmin") {
        return res.json({
          success: false,
          msg: "Invalid User",
        });
      }

      if (thisUser.block === true && data.condition === true) {
        return res.json({
          success: false,
          msg: "Alreay Blocked",
        });
      }

      if (thisUser.block === false && data.condition === false) {
        return res.json({
          success: false,
          msg: "Already Unblocked",
        });
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: data.id },
        { $set: { block: data.condition } },
        { new: true }
      );
      if (!updatedUser) {
        res.json({
          success: false,
          msg: M.DB_UPDATE_DOCUMENT_ERROR,
        });
      }

      return res.json({
        success: true,
        msg: M.DB_UPDATE_DOCUMENT_SUCCESS,
        updatedUser,
      });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },

  // Change user Password
  async resetUserPassword(req, res) {
    try {
      const data = {
        id: req.query.id,
      };

      if (!(await G.isValid(data.id)))
        return res.json({ success: false, msg: M.INVALID_ID + " : User" });

      const thisUser = await User.findOne({ _id: data.id });
      if (!thisUser) {
        return res.json({
          success: false,
          msg: MESSAGES.DB_GET_DOCUMENT_ERROR,
        });
      }

      if (thisUser.role == "superAdmin") {
        return res.json({
          success: false,
          msg: "Invalid User",
        });
      }

      const userEmail = thisUser.email;
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(userEmail, 10, function (err, hash) {
          if (err) reject(err);
          resolve(hash);
        });
      });

      const updatedUser = await User.findOneAndUpdate(
        { _id: data.id },
        { $set: { password: hashedPassword } },
        { new: true }
      );
      if (!updatedUser) {
        res.json({
          success: false,
          msg: MESSAGES.DB_UPDATE_DOCUMENT_ERROR,
        });
      }

      return res.json({
        success: true,
        msg: MESSAGES.DB_UPDATE_DOCUMENT_SUCCESS,
        updatedUser,
      });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },

  // Category
  async createCategory(req, res) {
    try {
      console.log(req.file);
      const data = {
        name: req.body.name,
        description: req.body.description,
        image: req.file ? req.file.filename : "categoryImage.png",
      };

      const exist = await Category.findOne({ name: data.name });
      // if (exist) return res.json({ success: false, msg: M.DUPLICATE_DATA })

      const item = await new Category(data).save();

      if (!item)
        return res.json({ success: false, msg: M.SAVING_DATA_FAILURE });

      return res.json({ success: true, msg: M.SAVING_DATA_SUCCESS, item });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },
  async updateCategory(req, res) {
    try {
      const id = req.query.id;

      if (!(await G.isValid(id)))
        return res.json({ success: false, msg: M.INVALID_ID });

      const thisCategory = await Category.findById(id);

      if (!thisCategory)
        return res.json({ success: false, msg: M.GET_DATA_FAILURE });

      const data = {
        name: req.body.name || thisCategory.name,
        description: req.body.description || thisCategory.description,
        image: req.file
          ? req.file.filename
          : thisCategory.image || "categoryImage.png",
      };

      const item = await Category.findByIdAndUpdate(id, data, { new: true });
      if (!item)
        return res.json({ success: false, msg: M.UPDATING_DATA_FAILURE });

      if (
        req.file &&
        thisCategory.image &&
        thisCategory.image !== "categoryImage.png"
      ) {
        const filePath = path.join(
          __dirname,
          `./../../files/categoryImage/${thisCategory.image}`
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
  async deleteCategory(req, res) {
    try {
      const id = req.query.id;

      if (!(await G.isValid(id)))
        return res.json({ success: false, msg: M.INVALID_ID });

      const item = await Category.findByIdAndDelete(id);
      if (!item)
        return res.json({ success: false, msg: M.DELETING_DATA_FAILURE });

      if (thisCategory.image && thisCategory.image !== "categoryImage.png") {
        const filePath = path.join(
          __dirname,
          `./files/categoryImage/${item.image}`
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

  ///////////////////////////////
  // Start Province Operations //
  // Add
  async addProvince(req, res) {
    try {
      const data = {
        name: req.body.name,
      };

      const exist = await Province.findOne({ name: data.name });
      if (exist) {
        return res.json({
          success: false,
          msg: M.DUPLICATE_DATA,
        });
      }

      const item = await new Province(data).save();
      if (!item) {
        return res.json({
          success: false,
          msg: M.SAVING_DATA_FAILURE,
        });
      }

      return res.json({
        success: true,
        msg: M.SAVING_DATA_SUCCESS,
        item,
      });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },
  // Edit
  async editProvince(req, res) {
    try {
      const id = req.query.id;
      if (!(await G.isValid(id))) {
        return res.json({
          success: false,
          msg: M.INVALID_ID,
        });
      }

      const tempItem = await Province.findOne({ _id: id });
      if (!tempItem) {
        return res.json({
          success: false,
          msg: M.GET_DATA_FAILURE,
        });
      }
      const data = {
        name: req.body.name || item.name,
      };

      const item = await Province.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
      if (!item) {
        return res.json({
          success: false,
          msg: M.UPDATING_DATA_FAILURE,
        });
      }

      return res.json({
        success: true,
        msg: M.UPDATING_DATA_SUCCESS,
        item,
      });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },
  // Delete
  async deleteProvince(req, res) {
    try {
      const id = req.query.id;
      if (!(await G.isValid(id))) {
        return res.json({
          success: false,
          msg: M.INVALID_ID,
        });
      }

      const item = await Province.findOneAndDelete({ _id: id });
      if (!item) {
        return res.json({
          success: false,
          msg: M.DELETING_DATA_FAILURE,
        });
      }

      await City.deleteMany({ province: id });

      return res.json({
        success: true,
        msg: M.DELETING_DATA_SUCCESS,
      });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },
  // End Province Operations //
  /////////////////////////////

  ///////////////////////////
  // Start City Operations //
  // Add
  async addCity(req, res) {
    try {
      const data = {
        name: req.body.name,
        province: req.body.province,
      };

      if (!(await G.isValid(data.province))) {
        return res.json({
          success: false,
          msg: `${M.INVALID_ID}: province`,
        });
      }

      const thisProvince = await Province.findOne({ _id: data.province });
      if (!thisProvince) {
        return res.json({
          success: false,
          msg: `${M.GET_DATA_FAILURE}: province`,
        });
      }

      const exist = await City.findOne({ name: data.name });
      if (exist) {
        return res.json({
          success: false,
          msg: M.DUPLICATE_DATA,
        });
      }

      const item = await new City(data).save();
      if (!item) {
        return res.json({
          success: false,
          msg: M.SAVING_DATA_FAILURE,
        });
      }

      return res.json({
        success: true,
        msg: M.SAVING_DATA_SUCCESS,
        item,
      });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },
  // Edit
  async editCity(req, res) {
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

      let data = {
        name: req.body.name || item.name,
        province: req.body.province || item.province,
      };
      if (!(await G.isValid(data.province))) {
        return res.json({
          success: false,
          msg: `${M.INVALID_ID}: province`,
        });
      }

      const thisProvince = await Province.findOne({ _id: data.province });
      if (!thisProvince) {
        return res.json({
          success: false,
          msg: `${M.GET_DATA_FAILURE}: province`,
        });
      }

      const updatedItem = await City.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
      if (!updatedItem) {
        return res.json({
          success: false,
          msg: M.UPDATING_DATA_FAILURE,
        });
      }

      return res.json({
        success: true,
        msg: M.UPDATING_DATA_SUCCESS,
        updatedItem,
      });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },
  // Delete
  async deleteCity(req, res) {
    try {
      const id = req.query.id;
      if (!(await G.isValid(id))) {
        return res.json({
          success: false,
          msg: M.INVALID_ID,
        });
      }

      const item = await City.findOneAndDelete({ _id: id });
      if (!item) {
        return res.json({
          success: false,
          msg: M.DELETING_DATA_FAILURE,
        });
      }

      return res.json({
        success: true,
        msg: M.DELETING_DATA_SUCCESS,
      });
    } catch (error) {
      res.status(500).send({ error: `An error has Accured ${error}` });
    }
  },
};
