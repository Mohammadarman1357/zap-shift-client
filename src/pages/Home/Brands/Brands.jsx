import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import casio from '../../../assets/brands/casio.png';
import amazon from '../../../assets/brands/amazon.png';
import amazonVector from '../../../assets/brands/amazon_vector.png';
import star from '../../../assets/brands/star.png';
import startPeople from '../../../assets/brands/start_people.png';
import moonstar from '../../../assets/brands/moonstar.png';
import randstad from '../../../assets/brands/randstad.png';
import { Autoplay } from 'swiper/modules';

const brandLogos = [amazon, amazonVector, casio, star, startPeople, moonstar, randstad];

const Brands = () => {
    return (
        <Swiper
            slidesPerView={4}
            centeredSlides={true}
            spaceBetween={30}
            grabCursor={true}
            loop={true}

            modules={[Autoplay]}

            autoplay={{
                delay: 1500,
                disableOnInteraction: false,
            }}
        >
            {
                brandLogos.map((logo, index) => (
                    <SwiperSlide key={index}>
                        <img src={logo} alt="" />
                    </SwiperSlide>
                ))
            }

        </Swiper>
    );
};

export default Brands;