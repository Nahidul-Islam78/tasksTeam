import React from 'react';
import Hero from '../../component/Hero';
import Trusted from '../../component/Trusted';
import useAuth from '../../hooks/useAuth';
import Features from '../../component/Features';
import HowItWorks from '../../component/HowItWorks';
import Pricing from '../../component/Pricing';
import FAQ from '../../component/FAQ';


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
      <div>
        <HowItWorks></HowItWorks>
      </div>
      <div>
        <Pricing></Pricing>
      </div>
      <div>
        <FAQ></FAQ>
      </div>
    </div>
  );
};

export default HomePage;