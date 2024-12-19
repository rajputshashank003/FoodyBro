import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Testimonials from './Testimonials';
import MotionCard  from './MotionCard';

function LandingPage() {
    const [fontSize, setFontSize] = useState('0.5rem');
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 500) {
          setFontSize('4rem'); 
        } else {
          setFontSize("2.5rem");
        }
      };
      window.addEventListener('resize', handleResize);
      handleResize(); 

      return () => window.removeEventListener('resize', handleResize);
    }, []);
    const navigate = useNavigate();
    return (
          <section
            className="p-8 pb-16 md:p-10 lg:p-20 font-medium  overflow-x-clip md:items-center gap-3"
            >
            <div className=" ">
              <div className="max-md:w-[90%] ">
                <div className="text-4xl z-[99] md:text-7xl pb-4 font-black bg-gradient-to-b from-[#D32F2F] to-[#e3acac] text-transparent bg-clip-text tracking-tighter">
                    <span className='text-2xl hover:underline md:text-4xl'>Play on </span> 
                    <a
                      className=' hover:underline' 
                      href='https://chessv.netlify.app'
                    > 
                        ChessV 
                    </a>
                    <span className='text-2xl md:text-4xl'> to Compete, <br />Order on </span>
                    <span onClick={( ) => navigate("/home")} className='cursor-pointer'> 
                    <span
                        className='cursor-pointer' 
                        onClick={() => navigate("/home")}
                    > 
                        FoodyBro 
                    </span>
                    </span>
                    <span className='text-2xl md:text-4xl'> to Grab the Treat </span>
                </div>
                <div className="text-xl lg:text-2xl tracking-tighter opacity-85">
                    Craving something delicious? FoodyBro lets you explore, order, and enjoy your favorite meals with ease!
                </div>
      
                <div className="flex items-center gap-3 mt-6 text-lg">
                  <div onClick={() => navigate("/home")} className="cursor-pointer hover:underline">
                    ORDER <span className='text-[#D32F2F] font-bold'>NOW</span>
                  </div>
                </div>
              </div>
      
              <div className="">
                <Testimonials/>
              </div>
              <div>
              <MotionCard >
                <div className="flex flex-col items-center justify-center relative">
                  <div className="text-4xl md:text-5xl pb-3 px-2 lg:text-6xl font-bold tracking-tighter text-[#e8d4d3]">
                    Sign up today
                  </div>

                  <div className="text-center text-lg mb-8 md:text-xl">
                    Celebrate the joy of discovering your favorite meals with FoodyBro—track your cravings, orders, and share your food experiences with friends.
                  </div>
 
                  <div className="flex items-center gap-4 mt-4 text-lg">
                    <div onClick={() => navigate("/home")} className="cursor-pointer hover:underline">
                      Learn more
                      {/* <FaArrowRight className="h-3 w-3 inline ml-2" /> */}
                    </div>
                  </div>
                </div>
              </MotionCard>
              </div>
            </div>
          </section>
    )
}

export default LandingPage
