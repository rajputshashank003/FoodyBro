import {Router} from "express";
import handler from "express-async-handler";
import auth from "../middleware/Auth.mid.js";
import { orderModel } from "../models/order.model.js";
import { OrderStatus } from "../constants/orderStatus.js";

const router = Router();

router.use(auth);

router.post(
    "/create", 
    handler ( async (req, res) => {
        const order = req.body;
        if(order.items.length <= 0) res.status(400).send("Cart Is Empty !");
        
        await orderModel.deleteOne({
            user: req.user.id,
            status : OrderStatus.NEW,
        });

        const newOrder = new orderModel({
            ...order , user : req.user.id,
        });
        await newOrder.save();
        res.send(newOrder);
    })      
);

router.put(
    "/pay",
    handler( async (req, res) => {
        const order = await orderModel.findOne({user : req.user.id , status: OrderStatus.NEW}).populate('user');
        if(!order) return res.status(400).send();
        order.paymentId = "1235";
        order.status = OrderStatus.PAYED;
        await order.save();
        res.send(order._id);
    })
);

router.get (
    "/newOrderForCurrentUser",
    handler ( async ( req, res) => {
        const order = await orderModel.findOne({user : req.user.id , status: OrderStatus.NEW}).populate("user");
        if(order) return res.send(order);
        return res.status(400).send();
    })
);

export default router ;