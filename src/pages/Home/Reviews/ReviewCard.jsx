import React from 'react';
import { FaQuoteLeft, FaUser } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
    const { userName, review: testimonial, user_photoURL } = review;
    return (
        <div className="bg-base-200 rounded-3xl max-w-2xl">
            <div className="bg-base-100 p-8 rounded-3xl shadow-sm">

                {/* Quote Icon */}
                <FaQuoteLeft className="text-[#C3DFE2] text-4xl mb-4" />

                {/* Text */}
                <p className="mb-4">
                    {testimonial}
                </p>

                {/* Divider */}
                <div className="border-t-2 border-dashed border-secondary my-6"></div>

                {/* User Info */}
                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-full flex items-center justify-center">
                        <img src={user_photoURL} alt="" />
                    </div>

                    {/* Name + Role */}
                    <div>
                        <h3 className="text-lg font-semibold text-secondary">
                            {userName}
                        </h3>
                        <p className="text-[#606060] text-sm">
                            Senior Product Designer 
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReviewCard;