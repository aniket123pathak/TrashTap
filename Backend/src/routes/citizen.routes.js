import { Router } from "express";
import { citizenLogin, citizenRegister } from "../controllers/citizen.controller.js";

const citizenRouter = Router();

citizenRouter.route("/registerCitizen").post(citizenRegister)
citizenRouter.route("/loginCitizen").post(citizenLogin)

export { citizenRouter }