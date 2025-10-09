import express from "express"
import { asyncHandler } from "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js"
import { apiError } from "../utils/apiError.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { Worker } from "../models/worker.model.js"

// --- Success ---
// 200: OK - Request successful
// 201: Created - New resource created
// 204: No Content - Success, no data back

// --- Client Errors ---
// 400: Bad Request - Invalid data sent
// 401: Unauthorized - Authentication required
// 403: Forbidden - Permission denied
// 404: Not Found - Resource not found

// --- Server Errors ---
// 500: Internal Server Error - Server-side issue

const workerRegister = asyncHandler(async(req,res)=>{

})

const workerLogin = asyncHandler(async(req,res)=>{

})

const workerLogout = asyncHandler(async(req,res)=>{

})

export {
    workerRegister,
    workerLogin,
    workerLogout
}