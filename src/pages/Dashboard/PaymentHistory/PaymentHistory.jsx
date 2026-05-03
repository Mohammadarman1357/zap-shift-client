import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }

    })

    return (
        <div className='p-5 md:p-10 space-y-5 bg-white rounded-3xl m-2 md:m-6'>
            <h2 className='text-4xl font-black text-secondary'>Payment History :{payments.length} </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            payments.map((payment, index) =>
                                <tr key={index} >
                                    <th>{index + 1}</th>
                                    <td>Cy Ganderton</td>
                                    <td>$ {payment?.amount}</td>
                                    <td>{payment?.transactionId}</td>
                                </tr>
                            )
                        }


                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default PaymentHistory;