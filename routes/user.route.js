import express from "express"
import UserModel from "../model/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"; 
import dotenv from "dotenv";
dotenv.config();

const userRouter=express.Router()


userRouter.post("/register",async(req,res)=>{
    const {name,email,password,gender,age}=req.body
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err)
            {
                return res.status(500).json({
                    msg:"internal server error"
                })
            }
            else
            {
                const user=new UserModel({
                    name,email,password:hash,
                    gender,age
                })
                await user.save()
                return res.status(200).json({
                    msg:"user registered successfully"
                })
            }
        })
        
    } catch (error) {
        
        return res.status(500).json({
            msg:`ther is error please check :${error}`
        })
        
    }

})
userRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body
   
        try {
            const user=await UserModel.findOne({email})
           
                if(user)
                {
                    bcrypt.compare(password,user.password,async(err,result)=>{
                        if (err) {
                            return res.status(500).json({
                                msg:"there is issue in server"
                            })
                            
                        } 
                        if(result){
                            const token=jwt.sign({id:user._id},process.env.SECRET_KEY)
                            return res.status(200).json({
                                msg:"user logged in successfully",token
                            })}
                        else{
                            return res.status(401).json({msg:"invalid password"})

                        }


                    })

                   
                }
                else
                {
                   
                    return res.status(401).json({
                        msg:"there is no user found"
                    })
                }

           
            
        } catch (error) {
            return res.status(500).json({
                msg:`there is error in loging ${error}`
            })
            
        }

    })




export default userRouter