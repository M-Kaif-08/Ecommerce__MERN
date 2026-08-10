export const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ succees: false, message: "Access denied - Admin Only" });
    }
    next();
}