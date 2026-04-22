import React from 'react';
import { FaQuoteLeft, FaUser } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
    const { userName, review: testimonial, user_photoURL } = review;
    return (
        <div className="bg-base-200 rounded-3xl max-w-2xl">
            <div className="bg-base-100 p-8 rounded-3xl shadow-sm">

                {/* Quote Icon */}
                <FaQuoteLeft className="text-teal-200 text-4xl mb-4" />

                {/* Text */}
                <p className="text-gray-600 leading-relaxed text-lg">
                    {testimonial}
                </p>

                {/* Divider */}
                <div className="border-t-2 border-dashed border-teal-200 my-6"></div>

                {/* User Info */}
                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-full bg-teal-800 flex items-center justify-center">
                        <img src={user_photoURL} alt="" />
                    </div>

                    {/* Name + Role */}
                    <div>
                        <h3 className="text-lg font-semibold text-teal-900">
                            {userName}
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Senior Product Designer
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReviewCard;