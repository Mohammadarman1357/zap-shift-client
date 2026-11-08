import React, { useEffect, useState } from 'react';
// import data from '../../../../json/data.json';

import bookingImg from '../../../assets/images/bookingIcon.png';

const WorkSection = () => {

    const [data, setData] = useState([]); 
    
    useEffect(() => {
        fetch('/json/data.json')
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.error("Error loading json data:", err));
    }, []);

    return (
        <div className='p-4'>
            <h2 className='font-bold text-3xl text-secondary mb-4'>How it Works</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                {
                    data.map((user) => (
                        <div key={user.id}
                            className='rounded-3xl bg-white py-8 px-6'
                        >
                            <img src={bookingImg} alt="" />
                            <h2 className='font-bold text-secondary text-xl mt-4'>{user.title}</h2>
                            <p className='text-[#606060] font-medium mt-4'> {user.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default WorkSection;