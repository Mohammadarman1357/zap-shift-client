import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser } = useAuth();

    const handleRegistration = (data) => {
        console.log('after register', data)
        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl text-center font-bold mt-8">Create an Account</h3>
            <p className='text-center'>Register with ZapShift</p>

            <form className='card-body' onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">

                    {/* Name */}
                    <label className="label">Name</label>
                    <input type="text" className="input" placeholder="Name" />
                    
                    {/* Email */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {errors.email?.type === 'required' && <p
                        className='text-red-500'>Email is required.
                    </p>}
                    {/* Password */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password',
                        {
                            required: true,
                            minLength: 6,
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        })}
                        className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p
                            className='text-red-500'>
                            Password is required.
                        </p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>
                            Password must be 6 characters or longer.
                        </p>
                    }
                    {
                        errors.password?.type === 'pattern' && <p
                            className='text-red-500'>
                            Password must have at least one uppercase, one lowercase, one number and at least one special characters.
                        </p>
                    }
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-primary text-secondary mt-4">Register</button>
                </fieldset>
                <p className='text-[#71717A]'>Already have an account? <Link className='text-green-600 link-hover' to="/login">Login</Link></p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;