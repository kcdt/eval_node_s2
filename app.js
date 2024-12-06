import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import front_router from "./router/router_front.js"
import back_router from "./router/router_back.js"

const app = express();
const PORT = 1212;

const path_dossier = dirname(fileURLToPath(import.meta.url))

app.use(express.static(join(path_dossier, "public")))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(bodyParser.json());

mongoose
    .connect('mongodb+srv://admin:XuYp7rKgBQBf4LTp@cluster0.kyvff.mongodb.net/Paris', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur de connexion à MongoDB :', err));

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(front_router)
app.use(back_router)

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
})