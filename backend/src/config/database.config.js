import mongoose from "mongoose";

mongoose.set('strictQuery', true);

export const dbConnect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true , 
            // useUnifiedTopology : true ,
        });
        console.log("database connected !");
    } catch (err) {
        console.log(err);
    }
}
