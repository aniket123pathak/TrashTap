import express from "express"
import { asyncHandler } from "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js"
import { apiError } from "../utils/apiError.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { Citizen } from "../models/citizen.model.js"

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
        const citizen = await Citizen.findById(id)

        const accessToken = citizen.generateAccessToken()
        const refreshToken = citizen.generateRefreshToken()

        citizen.refreshToken = refreshToken

        await citizen.save({validateBeforeSave:true})
        return { accessToken , refreshToken }
    } catch (error) {
        throw new apiError(500,"something went wrong while generating the Access and refresh token")
    }
}

const citizenRegister = asyncHandler ( async (req,res) => {
    const {email,fullName,phoneNumber,city,pincode,password} = req.body
    if(!email||!fullName||!phoneNumber||!city||!pincode||!password) {
        throw new apiError(400,"Fill Every Field..")
    }

    if([email,fullName,phoneNumber,city,pincode].some((fields)=>(fields)?.trim()==="")){
        throw new apiError(400,"Fill Every Field..")
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
    throw new apiError(
      400,
      "Phone number must be exactly 10 digits and contain no letters or symbols."
    );
  }

  const existedCitizen = await Citizen.findOne({
    $or:[{email},{phoneNumber}]
  })

  if(existedCitizen){
    throw new apiError(400,"User Alredy Registerd..pls login")
  }

  const citizen = await Citizen.create({
    fullName,
    email : email.toLowerCase(),
    phoneNumber,
    city,
    pincode,
    password
  })

  const createdCitizen = await Citizen.findById(citizen._id).select(
    "-password -refreshToken"
  )

  if(!createdCitizen){
    throw new apiError(500,"Unable To create The User...")
  }

  return res
  .status(201)
  .json(new apiResponse(
    201,
    createdCitizen,
    "New Citizen registered Successfully.."
  ))

})

const citizenLogin = asyncHandler( async (req,res)=>{
    const{ phoneNumber , email , password} = req.body

    if(!email && !phoneNumber){
        throw new apiError(400,"Enter the Phone Number or email..")
    }

    const citizen = await Citizen.findOne({
        $or:[{email},{phoneNumber}]
    })

    if(!citizen){
        throw new apiError(404,"User Not Found..check Credentials or new Register First..")
    }

    const isPasswordValid = await citizen.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new apiError(400,"Invalid Password")
    }

    const { accessToken , refreshToken } = await generateAccessAndRefreshToken(citizen._id)

    const loggedInCitizen = await Citizen.findById(citizen._id).select("-password -refreshToken")

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
                citizen : loggedInCitizen , refreshToken , accessToken
            },
            "User Logged In successful"
        )
    )
})

const citizenLogout = asyncHandler(async (req,res)=>{
    await Citizen.findByIdAndUpdate(
        req.citizen._id,
        {
            $set : {
                refreshToken : undefined
            }
        },
        {
            new : true
        }
    )

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new apiResponse(200,{},"Citizen Logged Out Successfully..")
    )
})

export {
    citizenRegister,
    citizenLogin,
    citizenLogout
}