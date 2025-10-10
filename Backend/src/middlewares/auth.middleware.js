import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { Citizen } from "../models/citizen.model.js";
import { Worker } from "../models/worker.model.js"

export const verifyJWT = asyncHandler ( async (req,_,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

        if(!token){
            throw new apiError(401,"Unauthorised request")
        }

        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const citizen = await Citizen.findById(decodedToken._id).select("-password -refreshToken")
        const worker = await Worker.findById(decodedToken._id).select("-password -refreshToken")

        if(!citizen && !worker){
            throw new apiError(401,"Invalid Access Token");
        }

        if(citizen){
            req.citizen = citizen;
            next();
        }
        else{
            req.worker = worker;
            next();
        }

    } catch (error) {
        throw new apiError(500,error?.message||"Invalid Access Token")
    }
})