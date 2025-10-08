import mongoose, { Schema } from "mongoose";
import bcrypt from bcrypt


const citizenSchema = new Schema ({
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index:true
    },
    phoneNumber : {
        type : Number,
        required : true,
        unique : true,
        index:true
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    city : {
        type : String,
        required : true,
        lowercase:true,
        trim:true
    },
    pincode : {
        type : Number,
        required : true,
        trim:true 
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
},{timestamps:true})

export const Citizen = mongoose.model("Citizen",citizenSchema)