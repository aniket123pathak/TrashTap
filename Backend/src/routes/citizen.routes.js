import { Router } from "express";
import { citizenLogin, citizenLogout, citizenRegister } from "../controllers/citizen.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const citizenRouter = Router();

citizenRouter.route("/registerCitizen").post(citizenRegister)
citizenRouter.route("/loginCitizen").post(citizenLogin)
citizenRouter.route("/logoutCitizen").post(verifyJWT,citizenLogout)

export { citizenRouter }