import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user.email, 'driver_assigned'],
        queryFn: async () => {
            // await must be dite hbe
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliverStatus=driver_assigned`);
            return res.data;
        }
    })

    // delivery status update
    const handleDeliveryStatusUpdate = (parcel, status) => {

        const statusInfo = { deliveryStatus: status };

        let message = `Parcel status updated with ${status.split('_').join(' ')}`;

        axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    // refresh data
                    refetch();

                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: message,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    return (
        <div className='p-5 md:p-10 space-y-5 bg-white rounded-3xl m-6'>
            <h2 className="text-4xl font-bold text-secondary">Parcels Pending Pickup : {parcels.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>Name</th>
                            <th>Confirm</th>
                            <th>Other Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, i) =>
                                <tr key={parcel._id}>
                                    <th>{i + 1}</th>
                                    <td>{parcel.parcelName}</td>
                                    <td>
                                        {
                                            parcel.deliveryStatus === 'driver_assigned' ? <>
                                                <button
                                                    onClick={() => { handleDeliveryStatusUpdate(parcel, 'rider-arriving') }}
                                                    className="btn btn-primary text-secondary">Accept</button>
                                                <button
                                                    onClick={() => { handleDeliveryStatusUpdate(parcel, 'pending-pickup') }}
                                                    className="btn btn-warning text-secondary ms-2">Reject</button>
                                            </>
                                                :
                                                <span>Accepted</span>
                                        }
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => { handleDeliveryStatusUpdate(parcel, 'parcel_picked_up') }}
                                            className="btn btn-primary text-secondary">Marked as Pick Up</button>
                                        <button
                                            onClick={() => { handleDeliveryStatusUpdate(parcel, 'parcel_delivered') }}
                                            className="btn btn-primary text-secondary ms-2">Marked as Delivered</button>
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

export default AssignedDeliveries;