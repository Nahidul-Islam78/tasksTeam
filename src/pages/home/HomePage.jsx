import React from 'react';
import Hero from '../../component/Hero';
import Trusted from '../../component/Trusted';
import useAuth from '../../hooks/useAuth';
import Features from '../../component/Features';


const HomePage = () => {
  const info = useAuth()
  
  return (
    <div>
      <div>
        <Hero></Hero>
      </div>
      <div>
        <Trusted></Trusted>
      </div>
      <div>
        <Features></Features>
      </div>
    </div>
  );
};

export default HomePage;