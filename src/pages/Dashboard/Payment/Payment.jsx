import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading/Loading';

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

    const handlePayment = async () => {

        // same as backend. to access on backend . to heat backend
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName,
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        console.log(res.data);

        // window use korte hobe. navigate kora jabe na. because new ekta url er modde eta open hobe bar bar tai.
        window.location.href = res.data.url;

    }

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <h2>Please Pay ${parcel.cost} for : {parcel.parcelName}</h2>
            <button
                onClick={handlePayment}
                className="btn btn-primary text-secondary">Pay</button>
        </div>
    );
};

export default Payment;