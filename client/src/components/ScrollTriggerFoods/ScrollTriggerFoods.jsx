import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { bg_images_url } from './backgroundImges';
import { useNavigate } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';
import useDimensions from '../Hooks/useDimensions';
import useScrollUtils from "./useScrollUtils";
import LandingVideoAnimation from '../LandingVideoAnimation.jsx/LandingVideoAnimation';

gsap.registerPlugin(ScrollTrigger);

const ScrollTriggerFoods = ({stfm4}) => {
   
    const dimensions = useDimensions();
    const ScrollUtils = dimensions.width > 600 ? useScrollUtils() : null;
    
    const scrollTriggerFoodsRef = useRef();
    useEffect(() => {
        const locomotiveScroll = new LocomotiveScroll({
            el : scrollTriggerFoodsRef.current
        });
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
    } , []);
    
    const navigate = useNavigate();
    
    return (
        <div ref={scrollTriggerFoodsRef} className='stfm4'>
            { 
                dimensions.width > 600 
                &&
                <div className='ScrollTriggerFoods_main h-screen grid grid-cols-2 overflow-hidden'>
                <div className='col-span-1 max-sm:absolute max-sm:invisible stfm1 h-full w-full flex justify-center items-end flex-col'>
                    <div
                        className='flex h-screen justify-center relative items-end pr-10 w-[80%] flex-col'
                    >
                        <div 
                            onMouseMove={ScrollUtils.handleMouseMouseName} 
                            onMouseLeave={ScrollUtils.handleMouseLeaveName}
                            className="flex items-start z-[9999] relative flex-col w-full"
                        >
                            <div className='text-lg text-gray-900 w-full'>
                                Greek Pizza
                            </div>
                            <div className="font-poppins font-medium text-4xl leading-normal text-[#1A1A1A]">
                                Fresh, tangy <br />Greek pizza with olives.
                            </div>
                        </div>
                    </div>
                    <div className='flex h-screen justify-center items-end pr-10 w-[80%] flex-col'>
                        <div 
                            onMouseMove={ScrollUtils.handleMouseMouseName} 
                            onMouseLeave={ScrollUtils.handleMouseLeaveName}
                            className="flex items-start flex-col w-full"
                        >
                            <div className='text-lg text-gray-900 w-full'>
                                Pizza Pepperoni
                            </div>
                            <div className="font-poppins font-medium text-4xl leading-normal text-[#1A1A1A]">
                                Classic pepperoni pizza <br /> with savory toppings.
                            </div>
                        </div>
                    </div>
                    <div className='flex h-screen justify-center items-end pr-10 w-[80%] flex-col'>
                        <div 
                            onMouseMove={ScrollUtils.handleMouseMouseName} 
                            onMouseLeave={ScrollUtils.handleMouseLeaveName}
                            className="flex items-start flex-col w-full"
                        >
                            <div className='text-lg text-gray-900 w-full'>
                                Pasta
                            </div>
                            <div className="font-poppins font-medium text-4xl leading-normal text-[#1A1A1A]">
                                Delicious pasta <br /> with rich, savory sauce
                            </div>
                        </div>
                    </div>
                    <div className='flex h-screen justify-center items-end pr-10 w-[80%] flex-col'>
                        <div 
                            onMouseMove={ScrollUtils.handleMouseMouseName} 
                            onMouseLeave={ScrollUtils.handleMouseLeaveName}
                            className="flex items-start flex-col w-full"
                        >
                            <div className='text-lg text-gray-900 w-full'>
                                Dosa
                            </div>
                            <div className="font-poppins font-medium text-4xl leading-normal text-[#1A1A1A]">
                                Crispy dosa <br /> served with flavorful chutneys
                            </div>
                        </div>
                    </div>
                    <div className='flex h-screen justify-center items-end pr-10 w-[80%] flex-col'>
                        <div 
                            onMouseMove={ScrollUtils.handleMouseMouseName} 
                            onMouseLeave={ScrollUtils.handleMouseLeaveName}
                            className="flex items-start flex-col w-full"
                        >
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
                        <div className='h-fit w-fit rounded-xl relative flex overflow-hidden cursor-none'>
                            <div 
                                onMouseMove={(e) => ScrollUtils.handleMouseEnter1(e, 0)} 
                                onMouseLeave={(e) => ScrollUtils.handleMouseLeave1(e , 0)} 
                                onClick={() => navigate("/food/6739dc84e485c0b5c0b79546")} 
                                className="cursor-none bg-cover img_par0 duration-100 z-[9] rounded-xl relative bg-red-300 w-[22rem] h-[25rem] flex justify-center items-center"
                            >
                                <img className='moving_img0 shadow-xl rounded-xl shadow-gray-600 object-cover w-[16rem] h-[20rem]' src={bg_images_url[0]} alt="" />
                            </div>
                            <div 
                                onMouseMove={(e) => ScrollUtils.handleMouseEnter1(e,1)} 
                                onMouseLeave={(e) => ScrollUtils.handleMouseLeave1(e,1)} 
                                onClick={() => navigate("/food/661e7fab816db760e6c416f1")} 
                                className=" img_par1 z-[99] rounded-2xl w-[22rem] h-[25rem] flex justify-center items-center top-[150%] absolute stfm2a backdrop-blur-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            >
                                <img className='moving_img1 shadow-xl rounded-xl shadow-gray-600 object-cover w-[16rem] h-[20rem]' src={bg_images_url[1]} alt="" />
                            </div>
                            <div 
                                onMouseMove={(e) => ScrollUtils.handleMouseEnter1(e,2)} 
                                onMouseLeave={(e) => ScrollUtils.handleMouseLeave1(e,2)} 
                                onClick={() => navigate("/food/6739de43181c30bf0b833042")} 
                                className=" img_par2 z-[999] rounded-2xl w-[22rem] h-[25rem] flex justify-center items-center top-[150%] absolute stfm2b bg-green-200 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            >
                                <img className='moving_img2 shadow-xl rounded-xl shadow-gray-600 object-cover w-[16rem] h-[20rem]' src={bg_images_url[2]} alt="" />
                            </div>
                            <div 
                                onMouseMove={(e) => ScrollUtils.handleMouseEnter1(e,3)} 
                                onMouseLeave={(e) => ScrollUtils.handleMouseLeave1(e,3)} 
                                onClick={() => navigate("/food/6739dd92181c30bf0b833035")} 
                                className=" img_par3 z-[9999] rounded-xl w-[22rem] h-[25rem] flex justify-center items-center top-[150%] absolute stfm2c bg-blue-200 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            >
                                <img className='moving_img3 shadow-xl rounded-xl shadow-gray-600 object-cover w-[16rem] h-[20rem]' src={bg_images_url[3]} alt="" />
                            </div>
                            <div 
                                onMouseMove={(e) => ScrollUtils.handleMouseEnter1(e,4)} 
                                onMouseLeave={(e) => ScrollUtils.handleMouseLeave1(e,4)} 
                                onClick={() => navigate("/food/6739dc84e485c0b5c0b79546")} 
                                className="img_par4 z-[99999] rounded-xl w-[22rem] h-[25rem] flex justify-center items-center top-[150%] absolute stfm2d bg-gray-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            >
                                <img className='moving_img4 shadow-xl rounded-xl shadow-gray-600 object-cover w-[16rem] h-[20rem]' src={bg_images_url[4]} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            }
        </div>
    )
}

export default ScrollTriggerFoods