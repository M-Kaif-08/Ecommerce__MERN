import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
        }

        req.user = decode;
        next();
    } catch (error) {
        console.log("Error in verify token:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}