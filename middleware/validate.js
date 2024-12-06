import * as yup from "yup";
import { isValidObjectId } from "mongoose"

const baladeSchema = yup.object({
    nom: yup
        .string()
        .required('Le nom est obligatoire')
        .min(3, 'Le nom doit contenir au moins 3 caractères')
        .max(50, 'Le nom ne doit pas dépasser 50 caractères'),
        
    arrondissement: yup
        .number()
        .required('L\'arrondissement est obligatoire')
        .integer('L\'arrondissement doit être un entier')
        .min(1, 'L\'arrondissement doit être compris entre 1 et 20')
        .max(20, 'L\'arrondissement doit être compris entre 1 et 20'),
        
    texte_intro: yup
        .string()
        .required('Le texte d\'introduction est obligatoire')
        .min(10, 'Le texte d\'introduction doit contenir au moins 10 caractères')
        .max(255, 'Le texte d\'introduction ne doit pas dépasser 255 caractères'),
        
    date_publication: yup
        .date()
        .default(() => new Date()) // Définit une valeur par défaut à la date actuelle
        .required('La date de publication est obligatoire'),
});

export const validateBaladeSchema = async (req, res, next) => {
    try {
        await baladeSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        res.status(400).json({
            errors: err.inner.map(e => ({
                path: e.path,
                message: e.message,
            })),
        });
    }
};

export const validateId = async (req, rep, next) => {
    const { id } = req.params ;
    if(!isValidObjectId(id)){
        rep.status(400).json({error : `id invalid ${ id }`})
        return 
    }
    next();
}

/* export const validateEmail = async (req, res, next) => {
    for (let user of users) {
        if (user.email === req.body.email) {
            res.status(400).json("Email déjà existant");
            return;
        }
    }
    next();
}

export const validateUserInfo = async (req, res, next) => {
    if (!findUser(req.body)) {
        res.status(400).json("Compte non existant");
        return;
    }
    next();
} */
