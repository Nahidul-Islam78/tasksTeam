import React from 'react';
import DashBoardImage from './../assets/Dashboard.jpg'

const Hero = () => {
  return (
    <div className="my-6 md:my-12 flex flex-col md:flex-row gap-4 justify-center md:justify-around items-center">
      <div className=" text-[#ffffff] ">
        <p className='text-3xl font-medium mb-2'>
          Plan Better. <br />
          Collaborate Smarter. <br />
          Deliver Faster.
        </p>
        <p className='text-2xl mb-2'>
          Manage projects, assign tasks, track progress, <br /> and keep your entire
          team organized from one place.
        </p>
        <button className="btn">Start free</button>
      </div>
      <div >
        <img src={DashBoardImage} alt="dashboard" />
      </div>
    </div>
  );
};

export default Hero;