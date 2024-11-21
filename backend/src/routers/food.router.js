import {Router} from "express";
import { sample_foods, sample_tags } from "../data.js";
import {SearchHistory} from "../models/searchHistory.model.js";
import mongoose from "mongoose";
import { foodModel } from "../models/food.model.js";
import handler from "express-async-handler";
import admin from '../middleware/admin.mid.js';
import { userModel } from "../models/user.model.js";

const router = Router();

router.get("/",
    handler ( async (req,res) => {
    const result = await foodModel.find({});
    res.send(result);
}));

router.get("/favourites", handler (async (req, res) => {
  const {userId , foodId} = req.query;
  const user = await userModel.findById(userId);
  let isFavourite = false;
  if(user.favourite_food){
    isFavourite = user.favourite_food.includes(foodId);
  }
  res.status(200).json({
    success : true,
    data : isFavourite
  })
}));

router.post("/favourites", handler (async (req, res) => {
  const {userId , foodId} = req.body;
  const foodProduct = await userModel.findByIdAndUpdate(
    {_id : userId},
    {
      $push : {
        favourite_food : foodId
      }
    },
    {new : true}
  );
  res.status(200).json({
    success : true,
    data : foodProduct
  })
}));

router.delete("/favourites", handler (async (req, res) => {
  const {userId , foodId} = req.query;
  const foodProduct = await userModel.findByIdAndUpdate(
    {_id : userId},
    {
      $pull : {
        favourite_food : foodId
      }
    },
    {new : true}
  );
  res.status(200).json({
    success : true,
    data : foodProduct
  })

}));

router.post("/review", handler (async (req, res) => {
  const {id , comment , rating, email} = req.body;
  const foodProduct = await foodModel.findByIdAndUpdate(
    {_id : id},
    {
      $push : {
        reviews : {comment , rating, email}
      }
    },
    {new : true}
  );
  const updatedFood = await foodModel.findByIdAndUpdate(
    {_id : id},
    {
      $set : {
        rating : foodProduct.averageRating
      }
    },
    {new : true}
  );
  res.status(200).json({
    success : true,
    message : "Upload Success",
    data : updatedFood
  })
}));

router.delete("/review", handler (async (req, res) => {
  const {reviewId , foodId} = req.query;
  const foodProduct = await foodModel.findByIdAndUpdate(
    {_id : foodId}, 
    {
      $pull : {
        reviews : {_id : reviewId}
      }
    },
    {new : true}
  );
  const updatedFood = await foodModel.findByIdAndUpdate(
    {_id : foodId},
    {
      $set : {
        rating : foodProduct.averageRating
      }
    },
    {new : true}
  );
  res.status(200).json({
    success : true,
    message : "Data fetched success",
    data : updatedFood
  });
}));


router.get("/reviews/:id", handler (async (req, res) => {
  const {id} = req.params;
  const foodProduct = await foodModel.findById({_id : id});
  res.status(200).json({
    success : true,
    message : "Data fetched success",
    data : foodProduct.reviews
  });
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

router.post('/removeSearch', async (req, res) => {
  const { id, term } = req.body;
  try {
    await SearchHistory.findOneAndDelete({usrId : id , searchTerm : term});
    res.status(201).json({ message: 'Search removed' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing search' });
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




router.get("/tags/getAll/:userId", handler (async (req, res) => {
    const {userId} = req.params;
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
    if(userId && userId !== "-"){
      const foodIds = (await userModel.findById({_id : userId})).favourite_food ;
      ans.unshift({name : "favourites" , count : foodIds.length });
    } else {
      console.log("user Id is empty");
    }
    res.send(ans);
}));

router.get("/tags/:tag",handler( async (req, res) => {
    const {tag} = req.params;
    const foods = await foodModel.find({tags : tag});
    res.send(foods);
}));

router.get("/tags/favourites/:userId", handler (async (req, res) => {
  const {userId} = req.params;
  const foodIds = (await userModel.findById({_id : userId})).favourite_food;
  const foods = await foodModel.find({ _id: { $in: foodIds } });
  res.send(foods);
}));

router.get("/:id",handler( async (req, res) => {
    const {id} = req.params;
    const food = await foodModel.findById(id);
    res.send(food);
}));

export default router;