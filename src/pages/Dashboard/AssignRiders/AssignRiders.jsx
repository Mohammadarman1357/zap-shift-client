import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AssignRiders = () => {
    const axiosSecure = useAxiosSecure();

    // data load
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?deliveryStatus=pending-pickup`);

            return res.data;
        }
    })

    return (
        <div className='p-5 md:p-10 space-y-5 bg-white rounded-3xl m-2 md:m-6'>
            <h2 className='text-4xl font-black text-secondary'>Assign Riders : {parcels.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>
                       
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignRiders;