import React, { use } from 'react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from './ReviewCard';

const Reviews = ({ reviewsPromise }) => {
    const reviews = use(reviewsPromise);

    return (
        <div>
            <div className='text-center'>
                <h3 className='text-3xl'>Review</h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit earum autem sunt exercitationem dolorem iste, possimus numquam facere ullam ex sed reiciendis optio, quae nisi rem? Quo, illo! Illum, ipsam!</p>
            </div>

            <>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'3'}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination]}
                    className="mySwiper"
                >
                    {
                        reviews.map(review =>
                            <SwiperSlide key={review.id}>
                                <ReviewCard review={review}></ReviewCard>
                            </SwiperSlide>

                        )
                    }
                </Swiper>
            </>
        </div>
    );
};

export default Reviews;