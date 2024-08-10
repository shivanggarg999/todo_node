import jwt from "jsonwebtoken";


const AuthenticateUser = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = req.cookies.token || (authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);

        if (!token) return res.status(401).json({ status_code: 0, message: 'Token missing, revoke token.' });
    
        jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ status_code: 0, message: 'token expired, revoke token.' });
                }
                return res.status(401).json({ status_code: 0, message: 'unauthorized access, revoke token.' });
            }
            req.user = user;
            next();
        });
    } catch (err) {
        return res.status(500).json({ status_code: 0, message: 'Something went wrong.' });
    }
}

export default AuthenticateUser;
