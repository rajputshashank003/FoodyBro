import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from "react-router-dom";
import { sample_foods } from '../../data';
import classes from "./FoodPage.module.css";
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '../../components/Hooks/useCart.jsx';
import NotFound from '../../components/NotFound/NotFound.jsx';
import { foodById } from '../../Services/services.js';

export default function FoodPage() {
  const { id } = useParams();
  const {addToCart } = useCart();
  const navigate = useNavigate();
  const handleAddToCart = () => {
    addToCart(food);
    navigate("/cart");
  }
  const [food, setFood] = useState();
  const [favoriteFood , setFavouriteFood] = useState(false);
  useEffect( () => {
    async function find(){
      const res = await foodById(id);
      setFood(res);  
    }
    find();
  }, []);

  const formattedCurrency = food ? 
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR', 
    }).format(food.price) 
    : null ;
  
  return (
    <>
    {food ? 
      <div className={classes.main}>
        <img className={classes.img} src={food.imageUrl}/>
        <span className={classes.span}>
          <h1 className={classes.name_Favourite}>
            {food.name}
            <FavoriteIcon onClick={() => setFavouriteFood((prev) => !prev)} sx={{ color: favoriteFood ? "red" : "grey", position:"relative", top:"0.6rem", fontSize:"2rem", cursor : 'pointer'}}/>
          </h1>
          <Rating name="read-only" value={food.stars} readOnly />
          <br/>
          {
            food.origins.map( (origin) => <Chip key={origin} label={origin}/> )
          }
          <br/>
          <br/>
          {
            food.tags.map( (origin) => <Chip key={origin} label={origin}/> )
          }
          <p>Time to cook about <MoreTimeIcon color="success" sx={{ fontSize: 28, position:"relative", top:"0.4rem" }} />{food.cookTime}</p>
          <span className={classes.priceName}>Price : </span><span className={classes.price}>{formattedCurrency}</span>
          <br/>
          <br/>
          <Button variant="contained" onClick={handleAddToCart}>Add To Cart <AddShoppingCartIcon /></Button>
        </span>
      </div>
      :
      <NotFound message="FoodPage Not Found ! "/>
    }
    </>
  )
}
