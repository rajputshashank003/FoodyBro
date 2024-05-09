import {Router} from "express";
import { sample_foods, sample_tags } from "../data.js";

import { foodModel } from "../models/food.model.js";
import handler from "express-async-handler";

const router = Router();

router.get("/",
    handler ( async (req,res) => {
    const result = await foodModel.find({});
    res.send(result);
}));

router.get("/search/:searchTerm", handler ( async (req,res) => {
    const searchTerm = req.params.searchTerm;
    const searchRegex = new RegExp(searchTerm , 'i');
    const foods = await foodModel.find({name : {$regex : searchRegex }});
    res.send(foods);
}));


router.get("/tags", handler (async (req, res) => {
    const tags = await foodModel.aggregate([
        {
            $unwind : '$tags' ,
        },
        {
            $group : {
                _id : '$tags',
                count : {$sum : 1} ,
            },
        },
        {
            $project : {
                _id : 0,
                name : "$_id",
                count : "$count",
            }
        }
    ]).sort({count : -1 }); // -1 for descending and 1 is for ascending 

    // my define logic for finding tags ;

    const x = await foodModel.find({});
    const y =  x.map( (food) => {
        return food.tags;
    });

    const ans = [];
    y.map( (arr) => {
        arr.map( (ele) => {
            let a = ans.filter( (curr) => {
                return curr.name == ele && curr.count++
            });
            if(a.length > 0) a.count;
            else ans.push({name : ele , count : 1});
        });
    } );
    ans.sort(( ele1, ele2) => ele2.count - ele1.count);

    res.send(ans);
}));

router.get("/tags/:tag",handler( async (req, res) => {
    const tag = req.params.tag;
    const foods = await foodModel.find({tags : tag});
    res.send(foods);
}));

router.get("/:id",handler( async (req, res) => {
    const {id} = req.params;
    const food = await foodModel.findById(id);
    res.send(food);
}));

export default router;