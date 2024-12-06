import { Schema, model } from "mongoose";

const baladeSchema = new Schema({
    "nom" : { 
        type : String, 
        required : false,
        minlength : [3 , "le nom contient au minimum 3 lettres"],
        maxlength : [255 , "le nom contient au maximum 255 lettres"],
    },
    "arrondissement" : {
        type : Number, 
        required : true,
        match : [/^(1[0-9]|20|[1-9])$/ , "numéro d'arrondissement invalide"]
    },
    "texte_intro" : {
        type : String, 
        required : true,
        minlength : [3 , "le nom contient au minimum 3 lettres"],
        maxlength : [255 , "le nom contient au maximum 255 lettres"],
    },
    "date_publication" : {
        type : Date,
        required : false,
        default : new Date(),
    }
})

const Balade = model("balade" , baladeSchema);

export default Balade