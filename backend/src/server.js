import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router.js";
import userRouter from "./routers/user.router.js";
import orderRouter from "./routers/order.router.js";
import { dbConnect } from "./config/database.config.js";
dbConnect();

const port = 8080
const app = express();

app.use(express.json());
app.use(cors({credentials: true , origin: '*'}));

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.listen(port , () => {
    console.log("Server Connected... !");
});