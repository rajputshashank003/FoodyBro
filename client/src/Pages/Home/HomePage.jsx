import {React, useState, useEffect} from 'react';
import Thumbnail from '../../components/Thumbnails/Thumbnail.jsx';
import classes from "./HomePage.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import Tags from '../../components/Tags/Tags.jsx';
import NotFound from '../../components/NotFound/NotFound.jsx';
import { getAll , getAllTags ,searchFood , getAllByTag, saveSearchTerm} from '../../Services/services.js';
import {verifyToken, getUser} from "../../Services/userService.js";
import { useAuth } from "../../components/Hooks/useAuth";
import Alert from '@mui/material/Alert';
import { toast } from 'react-toastify';
import * as userService from "../../Services/userService.js";

export default function HomePage() {
  const [sample_foods , setSampleFoods] = useState([]);
  const [sample_tags , setSampleTags] = useState([]);
  const {searchTerm, tag} = useParams();
  const userData = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const {user , updateProfile} = useAuth();

  useEffect(() => {
    const verify = async () => {
      if(!userData) return ;
      const data = await verifyToken();
      if(!data.success){
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
    verify();
  },[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = getUser() ? getUser().id : "";
        
        const responseTag = await getAllTags(userId);
        setSampleTags(responseTag.data);
        
        let responseFood;
        if (tag) {
          responseFood = await getAllByTag(tag, userId);
        } else if (searchTerm) {
          responseFood = await searchFood(searchTerm);
          await saveSearchTerm( user?.id , searchTerm );
        } else {
          responseFood = await getAll(userId);
        }
  
        setSampleFoods(responseFood.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, [searchTerm, tag]);

  const sendEmailVerification = async () => {
    const {data} = await userService.sendEmailVerification(user.id);
    toast.success(data.msg);
  }
  const load_next_6_foods = async (ind) => {
    if(ind <= sample_foods.length - 2 || searchTerm || tag) {
      return ;
    }
    const userId = getUser() ? getUser().id : "";
    let next_5 = await getAll(userId , sample_foods.length);
    // console.log("finding next 6", next_6);
    setSampleFoods((prev) => {
      return [...prev , ...next_5.data]
    })
  }
  
  return (
    <>
        {
          sample_tags && sample_tags.length > 0 &&
          <div className={classes.tags}>
            <Tags tags={sample_tags}/>
          </div>
        }
        {
          user && !user.is_verified &&
          <div className={classes.email_verification}>
            <Alert 
                onClick={sendEmailVerification} 
                variant="outlined" 
                severity="error" 
                sx={{
                    cursor: "pointer",
                    width: "40%",
                    color: "red",
                    '@media only screen and (max-width: 600px)': {
                      width : "80%"
                    }
                }}
            >
                click to verify your email
            </Alert>
          </div>
        }
        {
          (!sample_foods || sample_foods.length === 0) ?
            <NotFound message="Reset Search"/>
            :
            <div className={classes.main + " px-2"}>
              {
                sample_foods.map( (food, ind) => (
                  <Thumbnail ind={ind} load_next_6_foods={load_next_6_foods} key={food._id + "" + ind} food={food}/>
                ))
              }
            </div>  
        }
    </>
  )
}