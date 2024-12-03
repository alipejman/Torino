const checkPermissions = (permission) => {
    return (req, res, next) => {
        const admin = req.admin;
        if (!admin || !admin.permissions.includes(permission)) {
            return res.status(403).json({ message: "دسترسی لغو شد ، شما مجوز ندارید" });
        }
        next();};
};
module.exports = checkPermissions;