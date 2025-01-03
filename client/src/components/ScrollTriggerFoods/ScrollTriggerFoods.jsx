import React, { useEffect } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { bg_images_url } from './backgroundImges';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const ScrollTriggerFoods = ({stfm4}) => {
    useGSAP(() => {
        gsap.to(".stfm1", {
            scrollTrigger: {
                trigger: ".ScrollTriggerFoods_main",
                scrub: 2,
                start: "top 0%",
                end: "top -100%",
                pin: true,
            },
            y: 4 * window.innerHeight * -1,
        });
        
        // animation start --------------
        const animationMoment_y = -400
        gsap.to(".stfm2a", {
            y: animationMoment_y,
            scrollTrigger: {
                trigger: ".stfm1",
                scrub: 2,
                start: "top 0%",
                end: "top -15%",
            }
        });

        gsap.to(".stfm2b", {
            y: animationMoment_y,
            scrollTrigger: {
                trigger: ".stfm1",
                scrub: 2,
                start: "top -15%",
                end: "top -30%",
            }
        });
        gsap.to(".stfm2c", {
            y: animationMoment_y,
            scrollTrigger: {
                trigger: ".stfm1",
                scrub: 2,
                start: "top -30%",
                end: "top -52%",
            }
        });
        gsap.to(".stfm2d", {
            y: animationMoment_y,
            scrollTrigger: {
                trigger: ".stfm1",
                scrub: 2,
                start: "top -60%",
                end: "top -90%",
            }
        });

        // image moving
        const image_move_y = -20;
        gsap.to(".moving_img0", {
            y : image_move_y,
            scrollTrigger: {
                trigger: ".stfm1",
                start: "top 6%",
                end: "top -16%",
                scrub: 4,
            },
        });
        gsap.to(".moving_img1", {
            y : image_move_y,
            scrollTrigger: {
                trigger: ".stfm1",
                start: "top -16%",
                end: "top -30%",
                scrub: 4,
            },
        });
        
        gsap.to(".moving_img2", {
            y : image_move_y,
            scrollTrigger: {
                trigger: ".stfm1",
                start: "top -30%",
                end: "top -52%", 
                scrub: 4, 
            },
        });
        
        gsap.to(".moving_img3", {
            y : image_move_y,
            scrollTrigger: {
                trigger: ".stfm1",
                start: "top -52%",
                end: "top -90%", 
                scrub: 4,
            },
        });
        
        // color change animation --
        
        if(!stfm4.current) return ;
        const colorChangeTarget = stfm4.current ;
        gsap.to(colorChangeTarget, {
            backgroundColor: "rgb(254 226 226)",
            scrollTrigger: {
                trigger: ".stfm1",
                start: "top 6%",
                end: "top -16%",
                scrub: true,
            },
        });
        
        gsap.to(colorChangeTarget, {
            backgroundColor: "rgb(220 252 231)",
            scrollTrigger: {
                trigger: ".stfm1",
                start: "top -16%",
                end: "top -30%",
                scrub: true, 
            },
        });
        
        gsap.to(colorChangeTarget, {
            backgroundColor: "rgb(219 234 254)",
            scrollTrigger: {
                trigger: ".stfm1",
                start: "top -30%",
                end: "top -52%", 
                scrub: true,
            },
        });
        gsap.to(colorChangeTarget, {
            backgroundColor: "transparent",
            scrollTrigger: {
                trigger: ".stfm1",
                start: "top -52%",
                end: "top -90%", 
                scrub: true,
            },
        });

    });

    useEffect(() => {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
    }, []);
    
    const navigate = useNavigate();
    return (
        <div className='stfm4'>
        <div className='ScrollTriggerFoods_main h-screen grid grid-cols-2 overflow-hidden'>
            <div className='col-span-1 max-sm:absolute max-sm:invisible stfm1 h-full w-full flex justify-center items-end flex-col'>
                <div className='flex h-screen justify-center items-end pr-10 w-[80%] flex-col'>
                    <div className="flex items-start flex-col w-full">
                        <div className='text-lg text-gray-900 w-full'>
                            Greek Pizza
                        </div>
                        <div className="font-poppins font-medium text-4xl leading-normal text-[#1A1A1A]">
                            Fresh, tangy <br />Greek pizza with olives.
                        </div>
                    </div>
                </div>
                <div className='flex h-screen justify-center items-end pr-10 w-[80%] flex-col'>
                    <div className="flex items-start flex-col w-full">
                        <div className='text-lg text-gray-900 w-full'>
                            Pizza Pepperoni
                        </div>
                        <div className="font-poppins font-medium text-4xl leading-normal text-[#1A1A1A]">
                            Classic pepperoni pizza <br /> with savory toppings.
                        </div>
                    </div>
                </div>
                <div className='flex h-screen justify-center items-end pr-10 w-[80%] flex-col'>
                    <div className="flex items-start flex-col w-full">
                        <div className='text-lg text-gray-900 w-full'>
                            Pasta
                        </div>
                        <div className="font-poppins font-medium text-4xl leading-normal text-[#1A1A1A]">
                            Delicious pasta <br /> with rich, savory sauce
                        </div>
                    </div>
                </div>
                <div className='flex h-screen justify-center items-end pr-10 w-[80%] flex-col'>
                    <div className="flex items-start flex-col w-full">
                        <div className='text-lg text-gray-900 w-full'>
                            Dosa
                        </div>
                        <div className="font-poppins font-medium text-4xl leading-normal text-[#1A1A1A]">
                            Crispy dosa <br /> served with flavorful chutneys
                        </div>
                    </div>
                </div>
                <div className='flex h-screen justify-center items-end pr-10 w-[80%] flex-col'>
                    <div className="flex items-start flex-col w-full">
                        <div className='text-lg text-gray-900 w-full'>
                            Pizza Pepperoni
                        </div>
                        <div className="font-poppins font-medium text-4xl leading-normal text-[#1A1A1A]">
                            Classic pepperoni pizza <br /> with savory toppings.
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-span-1 max-sm:col-span-2 stfm2 '>
                <div className='h-screen flex justify-start items-center w-full '>
                    <div className='h-fit w-fit rounded-xl relative flex overflow-hidden'>
                        <div onClick={() => navigate("/food/6739dc84e485c0b5c0b79546")} className="cursor-pointer hover:scale-105 duration-100 z-[9] rounded-xl relative bg-red-300 w-[22rem] h-[25rem] flex justify-center items-center">
                            <img className='moving_img0 shadow-xl rounded-xl shadow-gray-600 object-cover w-[16rem] h-[20rem]' src={bg_images_url[0]} alt="" />
                        </div>
                        <div onClick={() => navigate("/food/661e7fab816db760e6c416f1")} className="cursor-pointer z-[99] rounded-2xl w-[22rem] h-[25rem] flex justify-center items-center top-[150%] absolute stfm2a backdrop-blur-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <img className='moving_img1 shadow-xl rounded-xl shadow-gray-600 object-cover w-[16rem] h-[20rem]' src={bg_images_url[1]} alt="" />
                        </div>
                        <div onClick={() => navigate("/food/6739de43181c30bf0b833042")} className="cursor-pointer z-[999] rounded-2xl w-[22rem] h-[25rem] flex justify-center items-center top-[150%] absolute stfm2b bg-green-200 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <img className='moving_img2 shadow-xl rounded-xl shadow-gray-600 object-cover w-[16rem] h-[20rem]' src={bg_images_url[2]} alt="" />
                        </div>
                        <div onClick={() => navigate("/food/6739dd92181c30bf0b833035")} className="cursor-pointer z-[9999] rounded-xl w-[22rem] h-[25rem] flex justify-center items-center top-[150%] absolute stfm2c bg-blue-200 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <img className='moving_img3 shadow-xl rounded-xl shadow-gray-600 object-cover w-[16rem] h-[20rem]' src={bg_images_url[3]} alt="" />
                        </div>
                        <div onClick={() => navigate("/food/6739dc84e485c0b5c0b79546")} className="cursor-pointer z-[99999] rounded-xl w-[22rem] h-[25rem] flex justify-center items-center top-[150%] absolute stfm2d bg-gray-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <img className='moving_img4 shadow-xl rounded-xl shadow-gray-600 object-cover w-[16rem] h-[20rem]' src={bg_images_url[4]} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default ScrollTriggerFoods