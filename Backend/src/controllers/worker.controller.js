import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Worker } from "../models/worker.model.js";

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

const generateAccessAndRefreshToken = async (id) => {
    try {
        const worker = await Worker.findById(id)

        const accessToken = worker.generateAccessToken()
        const refreshToken = worker.generateRefreshToken()

        worker.refreshToken = refreshToken

        await worker.save({validateBeforeSave:true})
        return { accessToken , refreshToken }
    } catch (error) {
        throw new apiError(500,"something went wrong while generating the Access and refresh token")
    }
}

const workerRegister = asyncHandler(async (req, res) => {
  const { phoneNumber, employeeId, fullName, city, pincode, password } =
    req.body;

  if (
    !employeeId ||
    !fullName ||
    !phoneNumber ||
    !city ||
    !pincode ||
    !password
  ) {
    throw new apiError(400, "Fill Every Field..");
  }

  if([employeeId,fullName,phoneNumber,city,pincode].some((fields)=>(fields)?.trim()==="")){
        throw new apiError(400,"Fill Every Field..")
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
    throw new apiError(
      400,
      "Phone number must be exactly 10 digits and contain no letters or symbols."
    );
  }

  const existedWorker = await Worker.findOne({
    $or : [{phoneNumber},{employeeId}]
  })

  if(existedWorker){
    throw new apiError(400,"Worker alreday Registered..pls login")
  }

  const worker = await Worker.create({
    phoneNumber,
    employeeId,
    fullName,
    city,
    pincode,
    password,
  })

  const createdWorker = await Worker.findById(worker._id).select("-password -refreshToken")

  if(!createdWorker){
    throw new apiError(500,"Something went wrong..Error in creating the worker")
  }

  return res
  .status(201)
  .json(
    new apiResponse(201,createdWorker,"Worker Registration created Successfully...")
  )

});

const workerLogin = asyncHandler(async (req, res) => {
    const{ phoneNumber , employeeId , password} = req.body
    
        if(!employeeId && !phoneNumber){
            throw new apiError(400,"Enter the Phone Number or employeeId..")
        }
    
        const worker = await Worker.findOne({
            $or:[{employeeId},{phoneNumber}]
        })
    
        if(!worker){
            throw new apiError(404,"User Not Found..check Credentials or new Register First..")
        }
    
        const isPasswordValid = await worker.isPasswordCorrect(password)
    
        if(!isPasswordValid){
            throw new apiError(400,"Invalid Password")
        }
    
        const { accessToken , refreshToken } = await generateAccessAndRefreshToken(worker._id)
    
        const loggedInWorker = await Worker.findById(worker._id).select("-password -refreshToken")
    
        const options = {
            httpOnly : true,
            secure : true
        }
    
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(
            new apiResponse(
                200,
                {
                    worker : loggedInWorker , refreshToken , accessToken
                },
                "User Logged In successful"
            )
        )
});

const workerLogout = asyncHandler(async (req, res) => {});

export { workerRegister, workerLogin, workerLogout };
