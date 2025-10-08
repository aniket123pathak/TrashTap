import mongoose, { Schema } from "mongoose";
import bcrypt from bcrypt

const workerSchema = new Schema({
    phoneNumber : {
        type : Number,
        required : true,
        unique : true,
        index:true
    },
    employeeId : {
        type : String,
        required : true,
        unique : true
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

export const Worker = mongoose.model("Worker",workerSchema)