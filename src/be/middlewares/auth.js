import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
    if(!req.headers.authorization) {
        res.status(403).json("No session");
        return ;
    }

    let results;
    try {
        results = jwt.verify(req.headers.authorization.split("Bearer ")[1], process.env.JWT_PRIVATE_KEY);
    } catch (err) {
        if(err.message === "jwt expired") {
            res.status(403).json("Session expired");
        } else {
            res.status(403).json("Invalid session");
        }
        return ;
    }

    req.session = results;
    next();
}