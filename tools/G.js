// Package
const mongoose = require("mongoose")
const nodemailer = require('nodemailer')
const fs = require("fs")
const path = require("path")
const bcrypt = require("bcryptjs")

// Model
const EmailCode = require("./../models/EmailCode")
const ForgotPasswordCode = require("./../models/ForgotPasswordCode")
const User = require("./../models/User")

// Tool and Config
const M = require("./../tools/messages")

const tools = {

    async isValid(id) {
        return mongoose.Types.ObjectId.isValid(id)
    },

    // File Uplaod 
    async fileUpload(req, res) {
        const file = req.file
        if (!file) {
            return res.json({
                success: false,
                msg: M.FILE_UPLOAD_ERROR
            })
        }

        return res.json({
            success: true,
            msg: M.FILE_UPLOAD_SUCCESS,
            file
        })
    },

    // File Delete
    async fileDelete(req, res) {
        const files = req.body.files
        if (!files || files.length === 0) {
            return res.json({
                success: false,
                msg: MESSAGES.FILES_EMPTY
            })
        }

        for (let i = 0; i < files.length; i++) {
            fs.unlink(path.join(__dirname, "./../files/") + "/assets/" + files[i],
                function (err) { if (err) throw err }
            )
        }

        return res.json({
            success: true,
            msg: M.FILE_DELETE_SUCCESS
        })
    },

    // Delete Avatar
    async deleteAvatar(req, res) {
        const file = req.query.file
        if (!file) {
            return res.json({
                success: false,
                msg: M.FILES_EMPTY
            })
        }

        fs.unlink(path.join(__dirname, "./../files/") + "/userAvatar/" + file,
            function (err) { if (err) throw err }
        )


        return res.json({
            success: true,
            msg: M.FILE_DELETE_SUCCESS
        })
    },

    // Send Verify Code to Email Address
    async sendEmailVerifyCode(req, res) {
        try {

            let data = {
                user: req.user._id,
                email: req.user.email,
                code: Math.random().toString().slice(2, 8)
            }

            if (req.user.isEmailVerified) {
                return res.json({
                    success: false,
                    msg: MESSAGES.EMAIL_ALREADY_VERIFIED
                })
            }

            const thisUserCode = await EmailCode.findOne({ user: data.user })
            if (thisUserCode) {
                return res.json({
                    success: false,
                    msg: MESSAGES.CONFIRM_CODE_ALREADY_SENT
                })
            }

            let existFlag = true
            while (existFlag) {
                const existCode = await EmailCode.findOne({ code: data.code })
                if (!existCode) {
                    existFlag = false
                } else {
                    data.code = Math.random().toString().slice(2, 8)
                }
            }

            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: '',
                    pass: ''
                },
            });

            const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"><title>Registration</title>
        <style>.icons{border-top:1px solid #c7c7c7;padding-top:30px;display:flex;justify-content:center;padding-bottom:30px}.icon{width:70px;height:70px;margin:5px}</style></head>
        <body><div style="margin: 30px ;"><p>Hi ${req.user.fullName}</p><p>Welcome to SainaGallery. Your registration is almost complete. Please enter this Code to confirm your email address.</p> 
        <br><h1>${data.code}</h1> <br><p>If the about code does not work, please try resend the code</p> <br> <br><p>Regards,</p><p>SainaGallery Team.</p> <br><div></div> <br><div class="icons"> 
       </div></div></body></html>`
            const info = await transporter.sendMail({
                from: `SainaGallery <saina@gmail.com>`,
                to: data.email,
                subject: 'SainaGallery Registration',
                html: html,
                port: 465
            });

            if (info) {
                const item = await new EmailCode(data).save()
                console.log('SAVE IN DB')
                console.log(item)
                if (!item) {
                    return res.json({
                        success: false,
                        msg: MESSAGES.EMAIL_CODE_PROCESS_ERROR
                    })
                }
                return res.json({
                    success: true,
                    msg: MESSAGES.EMAIL_CODE_SUCCESS
                })
            } else {
                return res.json({
                    success: false,
                    msg: MESSAGES.EMAIL_CODE_ERROR
                })
            }
        } catch (error) { res.status(500).send({ error: `An error has Accured ${error}` }) }
    },
    // Verify Email Address
    async verifyEmail(req, res) {
        try {

            const user = req.user._id
            const code = req.query.code
            const item = await EmailCode.findOne({ user: user, code: code })

            if (!item) {
                return res.json({
                    success: false,
                    msg: MESSAGES.CODE_HAS_PASSED_ITS_TIME + ': Code bot Found.'
                })
            }

            if (item.code == code) {
                const deletedItem = await EmailCode.findByIdAndDelete({ _id: item._id })
                if (!deletedItem) {
                    return res.json({
                        success: false,
                        msg: MESSAGES.DB_DELETE_DOCUMENT_ERROR + ': Email Code'
                    })
                }
                const updatedUser = await User.findOneAndUpdate({ _id: user }, { $set: { isEmailVerified: true } }, { new: true })
                if (!updatedUser) {
                    return res.json({
                        success: false,
                        msg: MESSAGES.DB_UPDATE_DOCUMENT_ERROR + ': User Email Verify'
                    })
                }
                return res.json({
                    success: true,
                    msg: MESSAGES.EMAIL_VERIFIED_SUCCESS
                })
            } else {
                return res.json({
                    success: false,
                    msg: MESSAGES.EMAIL_CODE_WRONG
                })
            }
        } catch (error) { res.status(500).send({ error: `An error has Accured ${error}` }) }
    },

    // Forget password process
    async sendForgotPasswordCode(req, res) {
        try {
            const data = {
                email: req.query.email,
                code: Math.random().toString().slice(2, 8)
            }

            const thisUser = await User.findOne({ email: data.email })
            if (!thisUser) {
                return res.json({
                    success: false,
                    msg: M.GET_DATA_FAILURE + ': یوزر'
                })
            }

            const thisUserCode = await ForgotPasswordCode.findOne({ email: data.email })
            if (thisUserCode) {
                return res.json({
                    success: false,
                    msg: MESSAGES.CONFIRM_CODE_ALREADY_SENT
                })
            }

            let existFlag = true
            while (existFlag) {
                const existCode = await ForgotPasswordCode.findOne({ code: data.code })
                if (!existCode) {
                    existFlag = false
                } else {
                    data.code = Math.random().toString().slice(2, 8)
                }
            }

            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: '',
                    pass: ''
                },
            });

            const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <title>Forgot Password</title><style>.icons{border-top:1px solid #c7c7c7;padding-top:30px;display:flex;justify-content:center;padding-bottom:30px}.icon{width:70px;height:70px;margin:5px}</style></head>
        <body><div style="margin: 30px ;"><p>Hi ${thisUser.fullName}</p><p>Use the below Code to Change Your Password</p> <br><h1>${data.code}</h1> <br> <br><p>Regards,</p><p>SainaGallery Team.</p> <br><div></div> <br></div></body></html>`
            const info = await transporter.sendMail({
                from: `SainaGallery <saina@gmail.com>`,
                to: data.email,
                subject: 'Forgot Password Code',
                html: html,
                text: data.code
            });

            // Must be the info (email response) 

            if (info) {
                const item = await new ForgotPasswordCode(data).save()
                if (!item) {
                    return res.json({
                        success: false,
                        msg: M.FORGOT_PASSWORD_CODE_PROCESS_ERROR
                    })
                }
                return res.json({
                    success: true,
                    msg: M.FORGOT_PASSWORD_CODE_SUCCESS
                })
            } else {
                return res.json({
                    success: false,
                    msg: M.EMAIL_CODE_ERROR
                })
            }
        } catch (error) { res.status(500).send({ error: `An error has Accured ${error}` }) }
    },
    async verifyForgotPasswordCode(req, res) {
        try {

            const code = req.body.code
            const password = req.body.password
            const item = await ForgotPasswordCode.findOne({ code: code })
            if (!item) {
                return res.json({
                    success: false,
                    msg: MESSAGES.CODE_HAS_PASSED_ITS_TIME
                })
            }
            if (item.code === code) {
                const hashedPassword = await new Promise((resolve, reject) => {
                    bcrypt.hash(password, 10, function (err, hash) {
                        if (err) reject(err)
                        resolve(hash)
                    })
                })
                const updatedUser = await User.findOneAndUpdate({ email: item.email }, { $set: { password: hashedPassword } }, { new: true })
                if (!updatedUser) {
                    return res.json({
                        success: false,
                        msg: MESSAGES.FORGOT_PASSWORD_PROCCES_FAILURE
                    })
                }

                await ForgotPasswordCode.findOneAndDelete({ _id: item._id })
                return res.json({
                    success: true,
                    msg: MESSAGES.PASSWORD_CHANGED_SUCCESS
                })
            } else {
                return res.json({
                    success: false,
                    msg: MESSAGES.FORGOT_PASSWORD_CODE_WRONG
                })
            }
        } catch (error) { res.status(500).send({ error: `An error has Accured ${error}` }) }
    }
}

module.exports = tools
