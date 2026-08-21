import React from 'react';
import Naver from '../component/Naver';
import { Outlet } from 'react-router';
import Footer from '../component/Footer';

const RootLayout = () => {
  return (
    <div>
      <header className="sticky top-0 bg-black z-50 ">
        <Naver></Naver>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer className='bg-black'>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default RootLayout;