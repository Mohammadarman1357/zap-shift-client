import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEye, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();

    // data load by tanstack
    const { refetch, data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    })

    const updateRiderStatus = (rider, status) => {

        const updateInfo = { status: status, email: rider.email }

        axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Rider status is set to ${status}`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            })

    }

    const handleApproval = rider => {
        updateRiderStatus(rider, 'approved');
    }

    const handleRejection = rider => {
        updateRiderStatus(rider, 'rejected');
    }

    const handleDeleteRider = id => {
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
                axiosSecure.delete(`riders/${id}`)
                    .then(res => {
                        console.log(res.data);

                        if (res.data.deletedCount) {
                            // refresh the data in the ui
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Approval request has been deleted.",
                                icon: "success"
                            })
                        }
                    })
            }
        })
    }



    return (
        <div className='p-5 md:p-10 space-y-5 bg-white rounded-3xl m-2 md:m-6'>
            <h2 className='text-4xl font-black text-secondary'>Riders Pending Approval : {riders.length}</h2>

            < div className="overflow-x-auto" >
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>Application Status</th>
                            <th>Work Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            riders.map((rider, index) =>
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>
                                    <td>{rider.district}</td>
                                    <td className={`${rider.status === 'approved' ? ' text-secondary ' : 'text-rose-500'}`}
                                    >{rider.status}</td>
                                    <td>{rider.workStatus}</td>
                                    <td>
                                        <button
                                            className='btn text-secondary mr-2'>
                                            <FaEye></FaEye>
                                        </button>
                                        <button
                                            onClick={() => handleApproval(rider)}
                                            className='btn btn-primary text-secondary'>
                                            <FaUserCheck></FaUserCheck>
                                        </button>
                                        <button
                                            onClick={() => handleRejection(rider)}
                                            className='btn bg-yellow-400 text-secondary mx-2'>
                                            <IoPersonRemoveSharp></IoPersonRemoveSharp>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteRider(rider._id)}
                                            className='btn bg-red-500'>
                                            <FaTrashCan></FaTrashCan>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }


                    </tbody>
                </table>
            </div >
        </div >
    );
};

export default ApproveRiders;