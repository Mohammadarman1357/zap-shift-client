import React from 'react';
// import loadingImg from '../../../assets/images/loading.png';
import loadingAnimation from '../../assets/json/loading.json';
import LottieComponent from "react-lottie";

// If LottieComponent is an object, use .default, otherwise use it directly
const Lottie = LottieComponent.default || LottieComponent;
// problem solve here

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-5">
            <div className="max-w-sm relative">
                <Lottie
                    options={{
                        animationData: loadingAnimation,
                        autoplay: true,
                        loop: true,
                    }}
                ></Lottie>
            </div>
        </div>



        // <div className="min-h-screen text-4xl font-bold tracking-wider gap-5 flex justify-center items-center opacity-50 ">
        //     L <img src={loadingImg} alt="" className="w-20 animate-spin" />O A D I N G
        // </div>
    );
};

export default Loading;