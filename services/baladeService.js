import Balade from "../entite/balade.js";

export const addBalade = async (data) => {
    const balade = new Balade({
        nom : data.nom,
        arrondissement : data.arrondissement,
        texte_intro : data.texte_intro,
        date_publication : new Date(),
    })
    try {
        await balade.save()
    } catch (error) {
        console.error("Erreur :", error.message);
    }
}

export const updateBalade = async (id, updateData) => {
    const { nom, arrondissement, texte_intro } = updateData;
    try {
        const updatedBalade = await Balade.updateOne(
            { _id: id },
            { $set: { nom, arrondissement, texte_intro, date_publication: new Date() } }
        );
    
        if (updatedBalade.matchedCount === 0) {
            return res.status(404).json({ message: "Balade non trouvée" });
        }
    } catch (error) {
        console.error("Erreur :", error.message);
    }
};

export const deleteBalade = async (id) => {
    try {
        const result = await Balade.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
        throw new Error("Aucune balade trouvée avec cet ID.");
        }

        console.log("Balade supprimée avec succès !");
        return { success: true, message: "Balade supprimée avec succès." };
    } catch (error) {
        console.error("Erreur :", error.message);
        return { success: false, error: error.message };
    }
};

export const getBaladesByArrondissement = async () => {
    try {
        const result = await Balade.aggregate([
            {
            $group: {
                _id: "$arrondissement",
                count: { $sum: 1 },
            },
            },
            {
            $sort: { _id: 1 },
            },
        ]);

        return result;
    } catch (error) {
        console.error("Erreur :", error.message);
    }
}