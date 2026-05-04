import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import riderImg from '../../assets/images/agent-pending.png';


const Rider = () => {

    const {
        register,
        handleSubmit,
        control,
        // formState: { errors }
    } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);
    const regions = [...new Set(regionsDuplicate)];

    // explore useMemo useCallback 
    const riderRegion = useWatch({ control, name: 'region' });    // --> kon region e seta watch kora

    const districtByRegion = (region) => {
        const regionDistricts = serviceCenters.filter(c => c.region === region);    // --> je region select korci seta nibe just filter kore
        const districts = regionDistricts.map(d => d.district); // --> region er under e j j district ace sei gulo nibe
        return districts;
    }

    const handleRiderApplication = data => {
        console.log(data);

        // post data into database
        axiosSecure.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your application has been submitted. Successfully",
                        showConfirmButton: false,
                        timer: 2500
                    });
                }

            })


    }


    return (
        <div className='p-5 md:p-10 space-y-5 bg-white rounded-3xl m-2 md:m-6'>
            <h2 className="text-4xl font-black text-secondary">Be a Rider</h2>
            <p>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal <br /> packages to business shipments — we deliver on time, every time.</p>

            <hr className='text-gray-300' />


            <form onSubmit={handleSubmit(handleRiderApplication)}
                className='space-y-5 p-4 text-black'>
                <h2 className='text-3xl font-bold text-secondary'>Tell us about yourself</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>

                    {/* rider details section */}
                    <div>
                        <fieldset className="fieldset">
                            {/* Rider name */}
                            <label className="label font-bold text-black">Your Name</label>
                            <input type="text" {...register('name')}
                                defaultValue={user?.displayName}
                                className="input w-full" placeholder="Your Name" />

                            {/* Rider Email */}
                            <label className="label font-bold text-black">Your Email</label>
                            <input type="email" {...register('email')}
                                defaultValue={user?.email}
                                className="input w-full" placeholder="Your Email" />

                            {/* Region */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Regions</legend>
                                <select {...register('region')} defaultValue="Pick a region" className="select w-full">
                                    <option disabled={true}>Pick a region</option>
                                    {
                                        regions.map((r, i) =>
                                            <option key={i} value={r}>{r}</option>
                                        )
                                    }
                                </select>
                            </fieldset>

                            {/* District */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Your District</legend>
                                <select {...register('district')} defaultValue="Select Your District" className="select w-full">
                                    <option disabled={true}>Select Your District</option>
                                    {
                                        districtByRegion(riderRegion).map((r, i) =>    // region onojayi district dekabe
                                            <option key={i} value={r}>{r}</option>
                                        )
                                    }
                                </select>
                            </fieldset>

                            {/* Address */}
                            <label className="label font-bold text-black">Your Address</label>
                            <input type="text" {...register('address')} className="input w-full" placeholder="Your Address" />

                            {/* Phone no */}
                            <label className="label font-bold text-black">Phone Number</label>
                            <input type="text" {...register('phone')} className="input w-full" placeholder="Your Phone No" />

                            {/* NID */}
                            <label className="label font-bold text-black">NID No</label>
                            <input type="text" {...register('nid')}
                                className="input w-full" placeholder="NID" />

                            {/* Driving license */}
                            <label className="label font-bold text-black">Driving License</label>
                            <input type="text" {...register('drivingLicense')}
                                className="input w-full" placeholder="Driving License" />

                            {/* Bike info */}
                            <label className="label font-bold text-black">Bike Registration</label>
                            <input type="text" {...register('bikeRegistration')}
                                className="input w-full" placeholder="Bike Registration Number" />

                        </fieldset>
                    </div>

                    {/* image section */}
                    <div>
                        <img src={riderImg} alt="" />
                    </div>
                </div>
                <input type="submit" className='btn btn-primary text-secondary' value="Apply as a Rider" />
            </form>

        </div>
    );
};

export default Rider;