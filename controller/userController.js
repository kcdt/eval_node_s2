import User from "../entite/user.js";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../middleware/authenticate.js";

export const renderCreateUser = (req, res) => {
    res.render("back/registerUser", {
        titre: "Créer un user"
    });
};

export const createUserHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const renderUserLogin = async (req, res) => {
    res.render("back/loginUser", {
        titre: "S'authentifier"
    });
};

export const userLoginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        const isMatch = await user.isValidPassword(password);
        if (!isMatch) return res.status(401).json({ message: 'Mot de passe incorrect' });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 3600000 }); // 1 heure
        
        res.status(200).json({ token, message: 'Connexion réussie' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const userLogoutHandler = (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: false, sameSite: 'strict' });

    res.status(200).json({ message: 'Déconnexion réussie' });
};

