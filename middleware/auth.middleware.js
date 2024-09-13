import jwt from "jsonwebtoken"
import UserModel from "../model/user.model.js"


const auth=async(req,res,next)=>{
const token=req.headers.authorization.split(" ")[1]
if(!token)
{
    return res.status(401).json({
        msg:"token is not found"
    })
}
try {
    const decoded=jwt.verify(token,process.env.SECRET_KEY)
    if(!decoded)
    {
        return res.status(401).json({
            msg:"Invalid Token please login again"
        })
    }
    const user=await UserModel.findById(decoded.id)
    req.user=user
    next()
} catch (error) {
    res.status(401).json({
        msg:"Invalid Token"
    })
    
}
}
export default auth