import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();

    // data load by tanstack
    const { data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    })

    const handleApproval = id => {
        
    }

    return (
        <div>
            <h2 className='text-4xl font-black text-secondary'>Riders Pending Approval : {riders.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>Status</th>
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
                                    <td>{rider.status}</td>
                                    <td>
                                        <button
                                            onClick={() => handleApproval(rider._id)}
                                            className='btn btn-primary text-secondary'>
                                            <FaUserCheck></FaUserCheck>
                                        </button>
                                        <button className='btn bg-yellow-400 text-secondary mx-2'>
                                            <IoPersonRemoveSharp></IoPersonRemoveSharp>
                                        </button>
                                        <button className='btn bg-red-500'>
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

export default ApproveRiders;