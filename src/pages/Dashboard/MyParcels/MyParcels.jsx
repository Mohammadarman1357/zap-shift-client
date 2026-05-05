import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiEdit } from 'react-icons/fi';
import { FaMagnifyingGlass, FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],   // email er personwise data dekabe
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    });

    const handleParcelDelete = id => {
        console.log(id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                // template string
                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        console.log(res.data);

                        if (res.data.deletedCount) {

                            // refresh the data in the ui
                            refetch();  // delete korar sate sate data refresh kore pelbe

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your parcel request has been deleted.",
                                icon: "success"
                            })
                        }
                    })

            };
        });
    }

    const handlePayment = async (parcel) => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName,
        }

        const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);

        console.log(res.data.url);
        // window.location.href = res.data.url; --> use assign to avoid warning from here 
        window.location.assign(res.data.url);
    }

    return (
        <div className='p-5 md:p-10 space-y-5 bg-white rounded-3xl m-2 md:m-6'>
            <h2 className='text-4xl font-black text-secondary'>My Parcels : {parcels.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Tracking Id</th>
                            <th>Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* dynamic */}
                        {
                            parcels.map((parcel, index) =>
                                <tr key={parcel._id}>
                                    <th>{index + 1}</th>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.cost}</td>
                                    <td>
                                        {
                                            parcel.paymentStatus === 'paid' ?
                                                <span className='text-green-400'>Paid</span>
                                                :
                                                <button
                                                    onClick={() => handlePayment(parcel)}
                                                    className="btn btn-sm btn-primary text-secondary">Pay</button>


                                            // <Link to={`/dashboard/payment/${parcel._id}`}>
                                            //     <button className="btn btn-sm btn-primary text-secondary">Pay</button>
                                            // </Link>
                                        }
                                    </td>
                                    <td>{parcel.trackingId}</td>
                                    <td>{parcel.deliveryStatus}</td>
                                    <td>
                                        <button className='btn btn-square hover:bg-primary'><FiEdit></FiEdit></button>
                                        <button className='btn btn-square hover:bg-primary mx-2'><FaMagnifyingGlass></FaMagnifyingGlass></button>

                                        <button
                                            onClick={() => handleParcelDelete(parcel._id)}
                                            className='btn btn-square hover:bg-red-500'>
                                            <FaTrashCan></FaTrashCan>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyParcels;


