import React from 'react';
import LogoImage from './../assets/logo.png'
const Logo = () => {
  return (
    <div className="flex items-center ">
      <img className="h-14 w-full" src={LogoImage} alt="logo" />
      <p className="-ml-6 -mb-6 text-xl font-bold">tasksTeam</p>
    </div>
  );
};

export default Logo;