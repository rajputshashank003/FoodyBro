import {React, useState, useEffect} from 'react';
import Thumbnail from '../../components/Thumbnails/Thumbnail.jsx';
import classes from "./HomePage.module.css";
import { useParams } from 'react-router-dom';
import Tags from '../../components/Tags/Tags.jsx';
import NotFound from '../../components/NotFound/NotFound.jsx';
import { getAll , getAllTags ,searchFood , getAllByTag} from '../../Services/services.js';

export default function HomePage() {
  const [sample_foods , setSampleFoods] = useState([]);
  const [sample_tags , setSampleTags] = useState([]);
  const {searchTerm, tag} = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const responseTag = await getAllTags();
      setSampleTags(responseTag.data);
      
      const responseFood = 
      tag ?
      await getAllByTag(tag) 
      :
      searchTerm ?
      await searchFood(searchTerm) 
      :
      await getAll();

      setSampleFoods(responseFood.data);
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