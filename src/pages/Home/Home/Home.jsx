import React from 'react';
import Banner from '../Banner/Banner';
import WorkSection from '../WorkSection/WorkSection';
import OurServices from '../OurServices/OurServices';
import Brands from '../Brands/Brands';
import Reviews from '../Reviews/Reviews';

const reviewsPromise = fetch('/public/json/reviews.json').then(res => res.json());

const Home = () => {
    return (
        <div className='mx-5 md:mx-15 space-y-10 mt-5'>
            <Banner></Banner>
            <WorkSection></WorkSection>
            <OurServices></OurServices>
            <Brands></Brands>
            <Reviews reviewsPromise={reviewsPromise}></Reviews>
        </div>
    );
};

export default Home;