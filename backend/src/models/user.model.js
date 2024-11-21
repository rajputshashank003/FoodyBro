import mongoose from "mongoose";

export const userSchema = new mongoose.Schema( 
    {
        name : { type : String , required : true},
        email : { type : String , required : true , unique : true },
        password : { type : String , required : true},
        address : { type : String , required : true},
        phone : {type : Number , required : true},
        isAdmin : { type : Boolean , default : false} ,
        favourite_food: { type: [String], ref: "food" },
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