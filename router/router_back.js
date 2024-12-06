import express from "express";
import { renderAddBalade, addBaladeHandler, renderUpdateBalade, updateBaladeHandler, deleteBaladeHandler } from "../controller/baladeController.js";
import { renderCreateUser, createUserHandler, renderUserLogin, userLoginHandler, userLogoutHandler } from "../controller/userController.js";
import { validateBaladeSchema, validateId } from "../middleware/validate.js";
import { authenticateToken } from "../middleware/authenticate.js";

const router = express.Router();

router.get("/add", authenticateToken, renderAddBalade);

router.post("/add", [validateBaladeSchema, authenticateToken], addBaladeHandler);

router.get("/update-one/:id", [validateId, authenticateToken], renderUpdateBalade);

router.post("/update-one/:id", [validateId, authenticateToken], updateBaladeHandler);

router.post("/delete/:id", [validateId, authenticateToken], deleteBaladeHandler);

router.get("/register", renderCreateUser);

router.post("/register", createUserHandler);

router.get("/login", renderUserLogin);

router.post("/login", userLoginHandler);

router.get("/logout", userLogoutHandler);

export default router;