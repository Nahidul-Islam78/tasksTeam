import React from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import AmazonVector from './../assets/brands/amazon_vector.png'
import Amazon from './../assets/brands/amazon.png'
import Casio from './../assets/brands/casio.png'
import Moonstar from './../assets/brands/moonstar.png'
import Randstad from './../assets/brands/randstad.png'
import Star from './../assets/brands/star.png'
import StartPeople from './../assets/brands/start_people.png'

const Trusted = () => {
  return (
    <div className="text-[#ffffff] my-14 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p data-aos="fade-up" className="text-3xl text-center my-6">
        Trusted by modern teams
      </p>
      <div className=" py-5">
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay]}
          className="mySwiper "
        >
          <SwiperSlide>
            <img
              src={AmazonVector}
              className="brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={Amazon}
              className="brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={Casio}
              className="brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={Moonstar}
              className="brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={Randstad}
              className="brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={Star}
              className="brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={StartPeople}
              className="brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Trusted;