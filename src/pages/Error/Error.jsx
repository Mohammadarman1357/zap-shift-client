import React from 'react';
import errorImg from '../../assets/images/Error.png';

const Error = () => {
    return (
        <div className='p-5 md:p-10 bg-white rounded-3xl m-6'>
            <div className='flex flex-col items-center'>
                <img className='mx-auto' src={errorImg} alt="" />

                <button className='btn btn-primary text-secondary font-bold'>Go Home</button>
            </div>
        </div>
    );
};

export default Error;