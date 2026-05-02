import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../Shared/Loading/Loading';

const Payment = () => {
    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: parcel } = useQuery({
        queryKey: ['parcels', parcelId],    // it will make a id conbinely with parcel & parcelId
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <h2>Please Pay : {parcel.parcelName}</h2>
            <button className="btn btn-primary text-secondary">Pay</button>
        </div>
    );
};

export default Payment;