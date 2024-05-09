import {Router} from "express";
import { sample_users } from "../data.js";
import jwt from "jsonwebtoken";
import handler from "express-async-handler";
import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";

const router = Router();

router.post("/login", handler( async (req, res) => {
    const {email, password} = req.body;

    const user = await userModel.findOne( {email});

    if(user && (await bcrypt.compare(password, user.password ))) {
        return res.send(generateTokenResponse(user));
    }
    res.status(400).send("username or password is invalid !");
}));

router.post("/register", 
    handler (async(req, res) => {
        const {name , email , password, address} = req.body;
        const isAlreadyRegistered = await userModel.findOne({email});
        if(isAlreadyRegistered) return res.status(400).send("user already registered !");
        
        const salt_rounds = Number(process.env.SALT_ROUNDS);
        const encPass = await bcrypt.hash(password,salt_rounds);

        const newUserDetails = {
            name ,
            email : email.toLowerCase() , 
            password : encPass , 
            address,
        }

        const resultUser = await userModel.create(newUserDetails); // this result user also has id ;
        res.send(generateTokenResponse(resultUser));
    })
)

const generateTokenResponse = user => {
    const token = jwt.sign({
        id:user.id, email: user.email, isAdmin : user.isAdmin, 
    },
    process.env.JWT_SECRET,
    {
        expiresIn:"30d"
    }
    );
    return {
        id:user.id, email: user.email, isAdmin : user.isAdmin, 
        name:user.name,address: user.address , token
    }
}

export default router;