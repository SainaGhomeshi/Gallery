module.exports = async (req, res, next) => {
    if (req.user.role !== "superAdmin") {
        return res.status(403).send({ error: "دسترسی غیر مجاز" })
    }
    next()
}
