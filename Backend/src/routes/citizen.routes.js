import { Router } from "express";
import { citizenRegister } from "../controllers/citizen.controller.js";

const citizenRouter = Router();

citizenRouter.route("/registerCitizen").post(citizenRegister)

export { citizenRouter }