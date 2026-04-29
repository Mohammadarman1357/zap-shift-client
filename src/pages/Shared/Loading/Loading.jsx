import React from 'react';
import loadingImg from '../../../assets/images/loading.png';

const Loading = () => {
    return (
        <div className="min-h-screen text-4xl font-bold tracking-wider gap-5 flex justify-center items-center opacity-50 ">
            L <img src={loadingImg} alt="" className="w-20 animate-spin" />O A D I N G
        </div>
    );
};

export default Loading;