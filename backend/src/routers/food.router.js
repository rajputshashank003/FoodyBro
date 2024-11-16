import {Router} from "express";
import { sample_foods, sample_tags } from "../data.js";
import {SearchHistory} from "../models/searchHistory.model.js";
import mongoose from "mongoose";
import { foodModel } from "../models/food.model.js";
import handler from "express-async-handler";
import admin from '../middleware/admin.mid.js';

const router = Router();

router.get("/",
    handler ( async (req,res) => {
    const result = await foodModel.find({});
    res.send(result);
}));

router.post(
  '/',
  admin,
  handler(async (req, res) => {
    const { name, price, tags, favorite, imageUrl, origins, cookTime } =
      req.body;
    const food = new foodModel({
      name,
      price,
      tags: tags.split ? tags.split(',') : tags,
      favorite,
      imageUrl,
      origins: origins.split ? origins.split(',') : origins,
      cookTime,
    });

    await food.save();

    res.send(food);
  })
);


router.put(
  '/',
  admin,
  handler(async (req, res) => {
    const { id, name, price, tags, favorite, imageUrl, origins, cookTime } =
      req.body;

    await foodModel.updateOne(
      { _id: id },
      {
        name,
        price,
        tags: tags.split ? tags.split(',') : tags,
        favorite,
        imageUrl,
        origins: origins.split ? origins.split(',') : origins,
        cookTime,
      }
    );

    res.send();
  })
);
router.delete(
  '/:foodId',
  admin,
  handler(async (req, res) => {
    const { foodId } = req.params;
    await foodModel.deleteOne({ _id: foodId });
    res.send();
  })
);

router.get("/search/:searchTerm", handler ( async (req,res) => {
    const searchTerm = req.params.searchTerm;
    const searchRegex = new RegExp(searchTerm , 'i');
    const foods = await foodModel.find({name : {$regex : searchRegex }});
    res.send(foods);
}));

router.post('/saveSearch', async (req, res) => {
  const { id, term } = req.body;
  const newSearch = new SearchHistory({ userId: id, searchTerm: term });
  try {
    const searchCount = await SearchHistory.countDocuments({ userId: id });
    if (searchCount >= 5) {
      const oldestSearch = await SearchHistory.findOneAndDelete({ userId: id }, { sort: { timestamp: 1 } });
    }
    await newSearch.save();
    res.status(201).json({ message: 'Search saved' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving search' });
  }
});


const getRecommendations = async (userId) => {
  try {
    const searches = await SearchHistory.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: '$searchTerm', count: { $sum: 1 }, lastSearchedAt: { $last: '$timestamp' } } },
      { $sort: { lastSearchedAt: -1, count: -1 } }, // Sort by last searched time and then by count
      { $limit: 4 }
    ]);
    const recommendedItems = searches.map(search => search._id);
    return recommendedItems;
  } catch (error) {
    console.error(error);
    return [];
  }
};
  
  router.get('/recommendations/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      const recommendations = await getRecommendations(userId);
      res.status(200).json(recommendations);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching recommendations' });
    }
  });




router.get("/tags", handler (async (req, res) => {
    console.log("calling tags");
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