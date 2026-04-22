import React from 'react';
import serviceData from '../../../../public/json/services.json';
import serviceImg from '../../../assets/images/service.png';

const OurServices = () => {
    return (
        <div className='bg-secondary rounded-4xl p-15 text-center space-y-4'>
            <h2 className='text-white text-4xl font-bold'>Our Services</h2>
            <p className='font-medium text-[#DADADA] lg:mx-30 md:mx-20'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    serviceData.map((user) => (
                        <div key={user.id}
                            className='rounded-3xl bg-white py-8 px-6 hover:bg-primary'
                        >
                            <img className='mx-auto' src={serviceImg} alt="" />
                            <h2 className='font-bold text-secondary text-2xl mt-4'>{user.title}</h2>
                            <p className='text-[#606060] font-medium mt-4'> {user.description}</p>
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default OurServices;