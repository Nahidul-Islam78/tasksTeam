import React from 'react';
import Naver from '../component/Naver';
import { Outlet } from 'react-router';
import Footer from '../component/Footer';

const RootLayout = () => {
  return (
    <div className=" w-full min-h-screen bg-linear-to-r from-[#0b1320] via-[#0f1d30] to-[#12233b] ">
      <header className="sticky top-0 bg-linear-to-r from-[#0b1320] via-[#0f1d30] to-[#12233b] z-50">
        <Naver></Naver>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default RootLayout;