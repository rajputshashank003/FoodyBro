import mongoose from "mongoose";

export const userSchema = new mongoose.Schema( 
    {
        name : { type : String , required : true},
        email : { type : String , required : true , unique : true },
        password : { type : String , required : true},
        address : { type : String , required : true},
        isAdmin : { type : Boolean , default : false} ,
    },
    {
        timestamps : true ,
        toJSON: {
            virtuals : true ,
        },
        toObject : {
            virtuals : true ,
        },
    }
);

export const userModel = mongoose.model("user", userSchema);    