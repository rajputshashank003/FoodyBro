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
import Tags_v2 from '../../components_v2/Tags_v2/Tags_v2.jsx';
import Alert_v2 from '../../components_v2/Alert/Alert_v2.jsx';
import Thumbnails_v2 from '../../components_v2/Thumbnails_v2/Thumbnails_v2.jsx';

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
          if ( user && user?.id ) {
            await saveSearchTerm( user.id , searchTerm );
          }
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
  const load_next_5_foods = async (ind) => {
    ind += 2;
    if(ind < sample_foods.length - 1 || searchTerm || tag) {
      return ;
    }
    const userId = getUser() ? getUser().id : "";
    let next_5 = await getAll(userId , sample_foods.length);
    setSampleFoods((prev) => {
      return [...prev , ...next_5.data]
    })
  }
  
  return (
    <div className='px-4'>
        {
          sample_tags && sample_tags.length > 0 &&
          <div className={classes.tags}>
            {/* <Tags tags={sample_tags}/> */}
            <Tags_v2 tags={sample_tags} />
          </div>
        }
        {
          user && !user.is_verified &&
          (
          window.innerWidth > 600 ?
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
                Click to verify your email
            </Alert>
          </div>
          :
          <Alert_v2 onClick={sendEmailVerification} alert={"Click to verify your email"} />
          )
        }
        {
          (!sample_foods || sample_foods.length === 0) ?
            <NotFound message="Reset Search"/>
            :
            window.innerWidth > 600 ?
            <div className={classes.main + " px-2"}>
              {
                sample_foods.map( (food, ind) => (
                  <Thumbnail ind={ind} load_next_5_foods={load_next_5_foods} key={food._id + "" + ind} food={food}/>
                ))
              }
            </div>  
            :
            <div className='flex flex-col min-h-screen justify-start items-center my-4'>
              {!searchTerm && !tag && 
                <>
                  <div className="text text-[20px] text-neutral-600 font-semibold w-full justify-start mb-2">Recomended Foods</div>
                  <div  className="two rounded-[12px] p-[11px] gap-[11px] sm:hidden grid bg-gray-300 grid-cols-2 h-fit w-full">
                    <div onClick={() => navigate(`/food/${sample_foods[0].id}`)} className="left cursor-pointer relative col-span-1 flex flex-col gap-2">
                        <img src={sample_foods[2].imageUrl} className="img h-[120px] rounded-[8px]  w-full bg-gray-500"/>
                        <div className="name text-[25px] font-semibold leading-[25px]">{sample_foods[2].name}</div>
                        <div className="time text-[15px] text-neutral-600">{sample_foods[2].cookTime} min</div>
                    </div>
                    <div onClick={() => navigate(`/food/${sample_foods[1].id}`)} className="left cursor-pointer col-span-1 flex flex-col gap-2">
                        <img src={sample_foods[3].imageUrl} className="img h-[120px] rounded-[8px]  w-full bg-gray-500"/>
                        <div className="name text-[25px] font-semibold leading-[25px]">{sample_foods[3].name}</div>
                        <div className="time text-[15px] text-neutral-600">{sample_foods[3].cookTime} min</div>
                    </div>
                  </div>
                </>
              }
              <div className="text text-[20px] text-neutral-600 font-semibold w-full mb-2 mt-4 justify-start">All Foods</div>
              <div className={"flex w-full flex-wrap justify-center gap-4 mb-4"}>
                {
                  sample_foods.map( (food, ind) => (
                    <Thumbnails_v2 ind={ind} load_next_5_foods={load_next_5_foods} key={food._id + "" + ind} food={food}/>
                  ))
                }
              </div> 
            </div> 
        }
    </div>
  )
}