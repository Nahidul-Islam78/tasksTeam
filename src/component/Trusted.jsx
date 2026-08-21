import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import AmazonVector from './../assets/brands/amazon_vector.png';
import Amazon from './../assets/brands/amazon.png';
import Casio from './../assets/brands/casio.png';
import Moonstar from './../assets/brands/moonstar.png';
import Randstad from './../assets/brands/randstad.png';
import Star from './../assets/brands/star.png';
import StartPeople from './../assets/brands/start_people.png';

const Trusted = () => {
  const brands = [
    {
      name: 'Amazon',
      image: AmazonVector,
    },
    {
      name: 'Amazon',
      image: Amazon,
    },
    {
      name: 'Casio',
      image: Casio,
    },
    {
      name: 'Moonstar',
      image: Moonstar,
    },
    {
      name: 'Randstad',
      image: Randstad,
    },
    {
      name: 'Star',
      image: Star,
    },
    {
      name: 'Start People',
      image: StartPeople,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}

        <div data-aos="fade-up" className="mb-10 text-center">
          {/* Small badge */}

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300">
            <ShieldCheck size={15} className="text-indigo-400" />
            Trusted by growing teams
          </div>

          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Trusted by <span className="text-indigo-400">modern teams</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            Teams use TaskFlow to organize projects, collaborate efficiently,
            and get work done faster.
          </p>
        </div>

        {/* Logos */}

        <div data-aos="fade-up" data-aos-delay="100" className="relative">
          {/* Left fade */}

          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-slate-950 to-transparent" />

          {/* Right fade */}

          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-slate-950 to-transparent" />

          <Swiper
            slidesPerView={2}
            spaceBetween={16}
            loop={true}
            freeMode={true}
            speed={5000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
              1280: {
                slidesPerView: 6,
              },
            }}
            modules={[Autoplay]}
            className="trusted-swiper"
          >
            {brands.map((brand, index) => (
              <SwiperSlide key={`${brand.name}-${index}`}>
                <div className="group flex h-24 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-6 transition duration-300 hover:border-indigo-400/30 hover:bg-white/[0.06]">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="max-h-9 max-w-[120px] object-contain opacity-50 grayscale brightness-0 invert transition duration-300 group-hover:opacity-90 group-hover:grayscale-0"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Bottom text */}

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            Built for teams of all sizes — from startups to growing businesses.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Trusted;
