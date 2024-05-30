import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).json('A token is required for authentication');

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret_key');
        req.user = decoded;
    } catch (err) {
        return res.status(401).json('Invalid Token');
    }
    return next();
};

export const checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json('You do not have the necessary permissions to access this resource');
        }
        next();
    };
};
