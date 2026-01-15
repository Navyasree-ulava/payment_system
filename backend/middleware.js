import dotenv from "dotenv";
dotenv.config();
import jsonwebtoken from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            message: "Unauthorized"
        })
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        if(!decoded.userId){
            return res.status(403).json({
                message: "Unauthorized"
            })
        } else {
            req.userId = decoded.userId;
            next();
        }
    } catch (error) {
        return res.status(403).json({
            message: "Unauthorized"
        })
    }

}

export default authMiddleware;
