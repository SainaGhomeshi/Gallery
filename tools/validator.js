const M = require('./messages')
const { check, validationResult } = require('express-validator')

// Login
const LoginValidator = () => {
    return [
        check('email').isEmail().withMessage(M.VALIDATIONS.INVALID_EMAIL),
        check('password').isLength({ min: 6 }).withMessage(M.VALIDATIONS.PASSWORD_MUST_BE_6_CHARACTERS)
    ]
}

// Register
const RegisterValidator = () => {
    return [
        check('email').isEmail().withMessage(M.VALIDATIONS.INVALID_EMAIL),
        check('fullName').not().isEmpty().withMessage(M.VALIDATIONS.INVALID_FULLNAME),
        check('password').isLength({ min: 6 }).withMessage(M.VALIDATIONS.PASSWORD_MUST_BE_6_CHARACTERS)
    ]
}

// Province
const CountryValidator = () => {
    return [
        check("name").not().isEmpty().withMessage(M.EMPTY_FIELD)
    ]
}

// City
const CityValidator = () => {
    return [
        check("name").not().isEmpty().withMessage(M.EMPTY_FIELD),
        check("province").not().isEmpty().withMessage(M.EMPTY_FIELD).not().isMongoId().withMessage(M.INVALID_EMAIL).custom(value => !/\s/.test(value)).withMessage(M.INVALID_ID)
    ]
}

// Skill Category
const CategoryValidator = () => {
    return [
        check("name").not().isEmpty().withMessage(M.VALIDATIONS.EMPTY_FIELD)
    ]
}

// Skill
const SkillValidator = () => {
    return [
        check("name").not().isEmpty().withMessage(M.VALIDATIONS.EMPTY_FIELD),
        check("skillCategory").not().isEmpty().withMessage(M.VALIDATIONS.EMPTY_FIELD)
    ]
}

// Membership
const MembershipValidator = () => {
    return [
        check("name").not().isEmpty().withMessage(M.VALIDATIONS.EMPTY_FIELD),
        check("type").not().isEmpty().withMessage(M.VALIDATIONS.EMPTY_FIELD),
        check("days").not().isEmpty().withMessage(M.VALIDATIONS.EMPTY_FIELD)
    ]
}

// Social Network
const SocialNetworkValidator = () => {
    return [
        check("name").not().isEmpty().withMessage(M.VALIDATIONS.EMPTY_FIELD),
    ]
}

// Class Room
const ClassRoomValidator = () => {
    return [
        // check("title").not().isEmpty().withMessage(M.VALIDATIONS.EMPTY_FIELD),
        // check("skill").not().isEmpty().withMessage(M.VALIDATIONS.EMPTY_FIELD),
        // check("student").not().isEmpty().withMessage(M.VALIDATIONS.EMPTY_FIELD),
        check("dates").isArray().withMessage(M.VALIDATIONS.EMPTY_ARRAY)
        // check("end").not().isEmpty().withMessage(M.VALIDATIONS.EMPTY_FIELD).not().isDate().withMessage(M.VALIDATIONS.WRONG_DATE)
    ]
}

// Resume
const ResumeValidator = () => {
    return [
        check("title").not().isEmpty().withMessage(M.VALIDATIONS.EMPTY_FIELD),
        check("description").not().isEmpty().withMessage(M.VALIDATIONS.EMPTY_FIELD),
        check("start").not().isEmpty().withMessage(M.VALIDATIONS.EMPTY_FIELD),
        // .not().isDate().withMessage(M.VALIDATIONS.WRONG_DATE),
        check("end").not().isEmpty().withMessage(M.VALIDATIONS.EMPTY_FIELD)
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) return next()
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    return res.status(400).json({
        success: false,
        msg: M.VALIDATIONS.CHECK_THE_FIELD,
        errors: extractedErrors
    })
}

module.exports = {
    LoginValidator,
    RegisterValidator,
    CountryValidator,
    CityValidator,
    CategoryValidator,
    SkillValidator,
    MembershipValidator,
    SocialNetworkValidator,
    ClassRoomValidator,
    ResumeValidator,
    validate
}