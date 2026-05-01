import React from 'react';
import Logo from '../../../components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { BsArrowUpRightCircleFill } from 'react-icons/bs';

const NavBar = () => {

    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then()
            .catch((error) => {
                console.log(error);
            })
    }

    const links = <>
        <li><NavLink to={""} className={'text-[#606060] font-medium'}>Services</NavLink></li>
        <li><NavLink to="coverage" className={'text-[#606060] font-medium'}>Coverage</NavLink></li>
        <li><NavLink to={""} className={'text-[#606060] font-medium'}>About Us</NavLink></li>
        <li><NavLink to={""} className={'text-[#606060] font-medium'}>Pricing</NavLink></li>
        <li><NavLink to={"/sendParcel"} className={'text-[#606060] font-medium'}>Send Parcel</NavLink></li>
        {
            user && <li><NavLink to={"/dashboard/my-parcels"} className={'text-[#606060] font-medium'}>My Parcels</NavLink></li>
        }
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm md:py-5 md:px-6 rounded-br-2xl rounded-bl-2xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

                        {links}
                    </ul>
                </div>
                <a className="">
                    <Logo></Logo>
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <a
                            onClick={handleLogOut}
                            className="btn hover:btn-primary btn-outline btn-[#606060] text-[#606060] rounded-xl">LogOut</a>
                        : <Link to="/login" className="btn hover:btn-primary btn-outline btn-[#606060] rounded-xl text-[#606060]">Login</Link>
                }
                <Link to="/rider" className="btn btn-primary text-secondary rounded-xl ml-4 mr-2">Be a Rider</Link>
                <Link to="/rider"><BsArrowUpRightCircleFill className='text-secondary text-4xl'></BsArrowUpRightCircleFill></Link>
            </div>
        </div>
    );
};

export default NavBar;