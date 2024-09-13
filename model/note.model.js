import mongoose from "mongoose";

const noteSchema=new mongoose.Schema({
    title:{type:String,requried:true},
    description:{type:String,requried:true},
    status:{type:Boolean,requried:true},
   userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",requried:true}
},{
    versionKey:false,
    timestamps:true

})
const noteModel=mongoose.model("notes",noteSchema)

export default noteModel