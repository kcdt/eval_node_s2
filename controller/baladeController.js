import Balade from "../entite/balade.js";
import { addBalade, updateBalade } from "../services/baladeService.js";

export const renderAddBalade = (req, res) => {
    res.render("back/editBalade", {
        titre: "Ajouter une balade",
        balade: null
    });
};

export const addBaladeHandler = async (req, res) => {
    try {
        await addBalade(req.body);
        res.status(200).json({ response: 'Balade ajoutée avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const renderUpdateBalade = async (req, res) => {
    try {
        const balade = await Balade.findById(req.params.id);
        if (!balade) {
            return res.status(404).json({ error: 'Balade non trouvée' });
        }
        res.render("back/editBalade", {
            titre: "Modifier une balade",
            balade
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateBaladeHandler = async (req, res) => {
    const { id } = req.params;

    try {
        await updateBalade(id, req.body)

        res.redirect("/");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteBaladeHandler = async (req, res) => {
    const { id } = req.params;

    try {
        await deleteBalade(id)

        res.redirect("/");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};