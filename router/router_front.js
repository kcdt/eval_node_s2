import { Router } from "express"
import Balade from "../entite/balade.js";
import { getBaladesByArrondissement } from "../services/baladeService.js";

const router = Router()

router.get("/", async (req, res) => {
    try {
        const balades = await Balade.find();
        res.render("front/home", {
            titre : "Accueil", 
            balades,
            url : req.originalUrl
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get('/id/:id', async (req, res) => {
    try {
        const balade = await Balade.findById(req.params.id);
        if (!balade) {
            return res.status(404).json({ message: 'Balade introuvable' });
        }
        res.render("front/home", { 
            titre : "Détails de la balade", 
            balades : [balade],
            url : req.originalUrl
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/search/:search", async (req, res) => {
    try {
        const balades = await Balade.find({
            texte_intro: { $regex: req.params.search, $options: "i" },
        });

        if (!balades.length) {
            return res.status(404).json({ message: "Aucun résultat" });
        }

        res.render("front/home", {
            titre: "Détails de la balade",
            balades,
            url : req.originalUrl
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/arrondissement/:num", async (req, res) => {
    try {
        const searchedArrondissement = parseInt(req.params.num, 10);
        if (!searchedArrondissement || searchedArrondissement < 1 || searchedArrondissement > 20) {
            return res.status(404).send('Arrondissement invalide.');
        }
        const balades = await Balade.find({ arrondissement : searchedArrondissement });

        res.render("front/arrondissement", {
            titre: "Nombre de balade dans l'arrondissement",
            arrondissement : searchedArrondissement,
            balades,
            nbBalades : balades.length,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get("/synthese", async function (req, res){
    const results = await getBaladesByArrondissement();
    console.log(results)
    res.render("front/synthese", {
        titre: "Nombre de balade dans les différents arrondissements",
        results
    });
})

export default router;
