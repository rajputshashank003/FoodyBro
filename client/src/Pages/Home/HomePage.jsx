import {React, useState, useEffect} from 'react';
import Thumbnail from '../../components/Thumbnails/Thumbnail.jsx';
import classes from "./HomePage.module.css";
import { useParams } from 'react-router-dom';
import Tags from '../../components/Tags/Tags.jsx';
import NotFound from '../../components/NotFound/NotFound.jsx';
import { getAll , getAllTags ,searchFood , getAllByTag} from '../../Services/services.js';
import axios from 'axios';

export default function HomePage() {
  const [sample_foods , setSampleFoods] = useState([]);
  const [sample_tags , setSampleTags] = useState([]);
  const {searchTerm, tag} = useParams();
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTag = await getAllTags();
        setSampleTags(responseTag.data);
        
        let responseFood;
        if (tag) {
          responseFood = await getAllByTag(tag);
        } else if (searchTerm) {
          responseFood = await searchFood(searchTerm);
        } else {
          responseFood = await getAll();
        }
  
        setSampleFoods(responseFood.data);
        
        function removeDuplicatesById(foods) {
          const uniqueFoodsMap = new Map();
          
          foods.forEach(food => {
            uniqueFoodsMap.set(food.id, food);
          });
          
          return Array.from(uniqueFoodsMap.values());
        }

        if (userData?.id) {
          try {
            const recomendRequestedResult = await axios.get(`/api/foods/recommendations/${userData.id}`);
            const recommendedItems = recomendRequestedResult.data;

            let sortedFoods = [];
            const notRecommendedFoods = [];
            recommendedItems.forEach(item => {
              const foodsWithItem = responseFood.data.filter(food => food.name.toLowerCase().includes(item.toLowerCase()));
              sortedFoods.push(...foodsWithItem);
            });
            responseFood.data.forEach(food => {
              if (!recommendedItems.some(item => food.name.toLowerCase().includes(item.toLowerCase()))) {
                notRecommendedFoods.push(food);
              }
            });
            sortedFoods.push(...notRecommendedFoods);
            sortedFoods = removeDuplicatesById(sortedFoods);

            setSampleFoods(sortedFoods);
          } catch (error) {
            console.error("Error fetching recommendations:", error);
          }
        }          
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, [searchTerm, tag]);
  
  return (
    <>
        {
          sample_tags && sample_tags.length > 0 &&
          <div className={classes.tags}>
            <Tags tags={sample_tags}/>
          </div>
        }
        {
          (sample_foods && sample_foods.length == 0) ?
            <NotFound message="Reset Search"/>
            :
            <div className={classes.main}>
              {
                sample_foods.map( food => (
                  <Thumbnail key={food.id} food={food}/>
                ))
              }
            </div>  
        }
    </>
  )
}