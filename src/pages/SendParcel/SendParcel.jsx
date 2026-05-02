import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const SendParcel = () => {
    const {
        register,
        handleSubmit,
        control,
        // formState: { errors }
    } = useForm();

    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);
    const regions = [...new Set(regionsDuplicate)];

    // explore useMemo useCallback 
    const senderRegion = useWatch({ control, name: 'senderRegion' });    // --> kon region e seta watch kora
    const receiverRegion = useWatch({ control, name: 'receiverRegion' });

    const districtByRegion = (region) => {
        const regionDistricts = serviceCenters.filter(c => c.region === region);    // --> je region select korci seta nibe just filter kore
        const districts = regionDistricts.map(d => d.district); // --> region er under e j j district ace sei gulo nibe
        return districts;
    }

    const handleSendParcel = data => {
        console.log(data)
        const isDocument = data.parcelType === 'document';
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight);

        let cost = 0;
        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        }
        else {
            if (parcelWeight < 3) {
                cost = isSameDistrict ? 110 : 150;
            }
            else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
                cost = minCharge + extraCharge;
            }
        }
        console.log('cost', cost);
        data.cost = cost;   // cost ta patacci

        Swal.fire({
            title: "Agree with the cost?",
            text: `You will be charged ${cost} taka!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm and Continue Payment!"
        }).then((result) => {
            if (result.isConfirmed) {

                // confirmed. save the parcel info to the database
                axiosSecure.post('/parcels', data)
                    .then(res => {
                        console.log('after saving parcel', res.data);

                        if (res.data.insertedId) {

                            navigate('/dashboard/my-parcels');

                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Parcel has created. Please Pay",
                                showConfirmButton: false,
                                timer: 2500
                            });
                        }
                    })
            };
        });

    }

    return (
        <div className='p-5 md:p-10 space-y-5 bg-white rounded-3xl m-6'>
            <h2 className="text-4xl font-bold ml-4">Send A Parcel</h2>

            <form onSubmit={handleSubmit(handleSendParcel)}
                className='space-y-5 p-4 text-black'>

                <h2 className='text-2xl font-bold'>Enter your parcel details</h2>
                <hr className='text-gray-300' />

                {/* parcel type */}
                <div>
                    <label className='label  font-bold mr-6  text-black'>
                        <input type="radio" {...register('parcelType')}
                            value="document" className="radio radio-primary" defaultChecked />
                        Document
                    </label>
                    <label className='label font-bold text-black'>
                        <input type="radio" {...register('parcelType')}
                            value="non-document" className="radio radio-primary" />
                        Non Document
                    </label>
                </div>
                <hr className='text-gray-300' />

                {/* Parcel info name, weight */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>
                    <fieldset className="fieldset">
                        <label className="label font-bold text-black">Parcel Name</label>
                        <input type="text" {...register('parcelName')} className="input w-full" placeholder="Parcel Name" />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label font-bold text-black">Parcel Weight (KG)</label>
                        <input type="number" {...register('parcelWeight')} className="input w-full" placeholder="Parcel Weight" />
                    </fieldset>
                </div>

                {/* two column */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>
                    {/* sender details */}
                    <div>
                        <h4 className="text-xl font-semibold mb-4">Sender Details</h4>
                        <fieldset className="fieldset">
                            {/* Sender name */}
                            <label className="label font-bold text-black">Sender Name</label>
                            <input type="text" {...register('senderName')}
                                defaultValue={user?.displayName}
                                className="input w-full" placeholder="Sender Name" />
                            {/* Sender Email */}
                            <label className="label font-bold text-black">Sender Email</label>
                            <input type="email" {...register('senderEmail')}
                                defaultValue={user?.email}
                                className="input w-full" placeholder="Sender Email" />

                            {/* Sender Region */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Sender Regions</legend>
                                <select {...register('senderRegion')} defaultValue="Pick a region" className="select w-full">
                                    <option disabled={true}>Pick a region</option>
                                    {
                                        regions.map((r, i) =>
                                            <option key={i} value={r}>{r}</option>
                                        )
                                    }
                                </select>
                            </fieldset>

                            {/* Sender District */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Your District</legend>
                                <select {...register('senderDistrict')} defaultValue="Select Your District" className="select w-full">
                                    <option disabled={true}>Select Your District</option>
                                    {
                                        districtByRegion(senderRegion).map((r, i) =>    // region onojayi district dekabe
                                            <option key={i} value={r}>{r}</option>
                                        )
                                    }
                                </select>
                            </fieldset>

                            {/* Sender Address */}
                            <label className="label font-bold text-black">Sender Address</label>
                            <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Sender Address" />
                            {/* Sender Phone no */}
                            <label className="label font-bold text-black">Sender Phone No</label>
                            <input type="text" {...register('senderPhone')} className="input w-full" placeholder="Sender Phone No" />

                            {/* PickUp instruction */}
                            <label className="label font-bold text-black">Pickup Instruction</label>
                            <textarea type="text" {...register('pickupIstruction')} className="input w-full h-20" placeholder="Pickup Instruction" />

                        </fieldset>
                    </div>

                    {/* receiver details */}
                    <div>
                        <h4 className="text-xl font-semibold mb-4">Receiver Details</h4>
                        <fieldset className="fieldset">
                            {/* Receiver name */}
                            <label className="label font-bold text-black">Receiver Name</label>
                            <input type="text" {...register('receiverName')} className="input w-full" placeholder="Receiver Name" />
                            {/* Receiver Email */}
                            <label className="label font-bold text-black">Receiver Email</label>
                            <input type="email" {...register('receiverEmail')} className="input w-full" placeholder="Receiver Email" />


                            {/* Receiver Region */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Receiver Regions</legend>
                                <select {...register('receiverRegion')} defaultValue="Pick a region" className="select w-full">
                                    <option disabled={true}>Pick a region</option>
                                    {
                                        regions.map((r, i) =>
                                            <option key={i} value={r}>{r}</option>
                                        )
                                    }
                                </select>
                            </fieldset>

                            {/* receiver District */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Receiver District</legend>
                                <select {...register('receiverDistrict')} defaultValue="Select Your District" className="select w-full">
                                    <option disabled={true}>Select Your District</option>
                                    {
                                        districtByRegion(receiverRegion).map((d, i) =>  // show region wise districts
                                            <option key={i} value={d}>{d}</option>
                                        )
                                    }
                                </select>
                            </fieldset>

                            {/* Address */}
                            <label className="label font-bold text-black">Receiver Address</label>
                            <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="Receiver Address" />
                            {/* Receiver Phone no */}
                            <label className="label font-bold text-black">Sender Phone No</label>
                            <input type="text" {...register('receiverPhone')} className="input w-full" placeholder="Receiver Phone No" />

                            {/* PickUp instruction */}
                            <label className="label font-bold text-black">Delivery Instruction</label>
                            <textarea type="text" {...register('deliveryInstruction')} className="input w-full h-20" placeholder="Delivery Instruction" />
                        </fieldset>
                    </div>
                </div>
                <input type="submit" className='btn btn-primary text-secondary' value="Send Parcel" />
            </form>
        </div>
    );
};

export default SendParcel;