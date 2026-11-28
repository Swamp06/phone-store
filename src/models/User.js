import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname:{
        type:String ,
        required: true,
        trim: true
    },
    lastname:{
        type:String ,
        required: true,
        trim: true
    },
    email:{
        type:String ,
        required: true,
        trim: true,
        unique: true,
        lowercase:true
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
        select: false,
        trim: true
    },
    avatar:{
        type: String,
        default: "",
    },
    role:{
        type: String,
        enum: ["user" , "admin"],
        default: "user"
    }
})

export default mongoose.model("User" , userSchema)