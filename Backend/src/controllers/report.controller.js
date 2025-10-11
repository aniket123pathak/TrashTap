import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { Citizen } from "../models/citizen.model.js";
import { Worker } from "../models/worker.model.js";
import { Report } from "../models/report.model.js";

const reportBin = asyncHandler(async(req,res)=>{

})

export {
    reportBin
}