import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Citizen } from "../models/citizen.model.js";
import nodemailer from "nodemailer";

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
    const citizen = await Citizen.findById(id);

    const accessToken = citizen.generateAccessToken();
    const refreshToken = citizen.generateRefreshToken();

    citizen.refreshToken = refreshToken;

    await citizen.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(
      500,
      "something went wrong while generating the Access and refresh token"
    );
  }
};

const generateOtp = (limit) => {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < limit; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const citizenRegister = asyncHandler(async (req, res) => {
  const { email, fullName, phoneNumber, city, pincode, password } = req.body;
  if (!email || !fullName || !phoneNumber || !city || !pincode || !password) {
    throw new apiError(400, "Fill Every Field..");
  }

  if (
    [email, fullName, phoneNumber, city, pincode].some(
      (fields) => fields?.trim() === ""
    )
  ) {
    throw new apiError(400, "Fill Every Field..");
  }

  if (!/^\d{10}$/.test(phoneNumber)) {
    throw new apiError(
      400,
      "Phone number must be exactly 10 digits and contain no letters or symbols."
    );
  }

  const existedCitizen = await Citizen.findOne({
    $or: [{ email }, { phoneNumber }],
  });

  if (existedCitizen) {
    throw new apiError(400, "User Alredy Registerd..pls login");
  }

  const citizen = await Citizen.create({
    fullName,
    email: email.toLowerCase(),
    phoneNumber,
    city,
    pincode,
    password,
  });

  const createdCitizen = await Citizen.findById(citizen._id).select(
    "-password -refreshToken"
  );

  if (!createdCitizen) {
    throw new apiError(500, "Unable To create The User...");
  }

  return res
    .status(201)
    .json(
      new apiResponse(
        201,
        createdCitizen,
        "New Citizen registered Successfully.."
      )
    );
});

const citizenLogin = asyncHandler(async (req, res) => {
  const { phoneNumber, email, password } = req.body;

  if (!email && !phoneNumber) {
    throw new apiError(400, "Enter the Phone Number or email..");
  }

  const citizen = await Citizen.findOne({
    $or: [{ email }, { phoneNumber }],
  });

  if (!citizen) {
    throw new apiError(
      404,
      "User Not Found..check Credentials or new Register First.."
    );
  }

  const isPasswordValid = await citizen.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new apiError(400, "Invalid Password");
  }

  const otp = generateOtp(6);
  
  citizen.otp = otp;
  citizen.expiresIn = new Date(Date.now() + 10 * 60 * 1000);
  await citizen.save({validateBeforeSave:false});

  const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS, 
        },
    });

    const info = await transporter.sendMail({
        from: '"TrashTap" <support@trashtap.com>',
        to: email,
        subject: "Your TrashTap Verification Code ",
        text: `Your OTP for TrashTap verification is: ${otp}`,
        html: `<b>Your OTP is: ${otp}</b><p>This code will expire in 10 minutes.</p>`,
    });

  return res.status(200).json(
    new apiResponse(
      200,
      {
        email : citizen.email
      },
      `OTP sent to your email ${email} successfully`
    )
  );
});

const citizenOtpVerification = asyncHandler(async (req, res) => {
    const {email , OTP } = req.body
    if(!OTP){
        throw new apiError(400,"OTP is required")
    }
    const citizen = await Citizen.findOne({email})

    if(!citizen){
        throw new apiError(400,"USer not found")
    }

    if (citizen.expiresIn < new Date(Date.now())) {
        throw new apiError(400, "OTP has expired. Please log in again.");
    }

    if(OTP!==citizen.otp){
        throw new apiError(400,"Invalid OTP")
    }

    citizen.otp = undefined;
    citizen.expiresIn = undefined;

    await citizen.save({validateBeforeSave:false})

    const { accessToken , refreshToken } =await generateAccessAndRefreshToken(citizen._id);

    const loggedInCitizen = await Citizen.findById(citizen._id).select("-password -refreshToken")

    if(!loggedInCitizen){
        throw new apiError(500,"Unable to login Citizen...")
    }

    const options = {
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new apiResponse(
            200,
            {
                citizen : loggedInCitizen , accessToken , refreshToken
            },
            "Citizen Logged in successfully"
        )
    )
});

const citizenLogout = asyncHandler(async (req, res) => {
  await Citizen.findByIdAndUpdate(
    req.citizen._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "Citizen Logged Out Successfully.."));
});

export { citizenRegister, citizenLogin, citizenOtpVerification, citizenLogout };
