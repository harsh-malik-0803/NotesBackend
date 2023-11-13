import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const login = async(req , res , next )=>{
    try {
        const {email , password } = req.body 

        let user = await User.findOne({ email }).select("+password")
        // console.log(user)

        if(!user) return next(new ErrorHandler(400 , "Invalid Email or Password" ))

        const isMatch = await bcrypt.compare(password, user.password)
        
        if( !isMatch ) return next(new ErrorHandler(400 , "Invalid Email or Password" ))

        sendCookie(user , res , `Welcome Back, ${user.name}` , 200 )    
    } catch (error) {
        next(error)
    }
    
}


export const register = async(req , res , next )=>{
    try {
        const {name , email , password } = req.body
        let user = await User.findOne({email}) ;
        
        // console.log(user)
        if(user) return next(new ErrorHandler(400 , "User Already Exist" ))

        const hashPassword = await bcrypt.hash(password , 10 )

        user = await User.create({name , email , password:hashPassword })
        
        sendCookie(user , res , "Registered Successfully" , 201)
    } catch (error) {
        next(error)
    }
}

export const logout = (req , res)=>{
    res.status(200)
    .cookie("token" , "" , {
        expire : new Date(Date.now()) ,
        sameSite: (process.env.NODE_ENV === "Develpoment") ? "lax" : "none",
        secure: (process.env.NODE_ENV === "Develpoment") ? false : true,
    }).json({
        success:true,
        user : req.user ,
    })
}   

export const getMyProfile = (req , res)=>{
    res.status(200).json({
        success:true,
        user : req.user,
    })
}   