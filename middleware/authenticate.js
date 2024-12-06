import jwt from 'jsonwebtoken';

export const JWT_SECRET = 'secret';

export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(403).json({ message: 'Accès refusé' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(401).json({ message: 'Token invalide' });

        req.user = user;
        next();
    });
};