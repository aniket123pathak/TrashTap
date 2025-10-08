import mongoose, { Schema } from "mongoose";
import bcrypt from bcrypt
import jwt from "jsonwebtoken";

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

workerSchema.pre("save",async function (next) {
    if(this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10)
})

workerSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password)
}

workerSchema.methods.generateAccessToken =  function(){
    return jwt.sign({
        _id : this._id,
        email:this.email,
        fullName:this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

workerSchema.methods.generateRefreshToken = function (){
    return jwt.sign({
        _id : this._id,
        email:this.email,
        fullName:this.fullName,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const Worker = mongoose.model("Worker",workerSchema)