import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { workerLogin, workerLogout, workerRegister } from "../controllers/worker.controller.js";

const workerRouter = Router()

workerRouter.route("/registerWorker").post(workerRegister)
workerRouter.route("/loginWorker").post(workerLogin)
workerRouter.route("/logoutWorker").post(verifyJWT,workerLogout)

export { workerRouter }