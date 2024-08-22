import jwt from "jsonwebtoken";

const AuthenticateUser = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = req.cookies.token || (authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);

        if (!token) {
            return res.status(401).json({ status_code: 2, message: 'unauthorized access, token missing.' });
        }
    
        jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ status_code: 2, message: 'unauthorized access, token expired.' });
                }
                return res.status(401).json({ status_code: 0, message: 'unauthorized access, invalid token.' });
            }
            req.user_id = user.id;
            next();
        });
    } catch (err) {
        return res.status(500).json({ status_code: 0, message: 'Something went wrong.' });
    }
}


export default AuthenticateUser;
