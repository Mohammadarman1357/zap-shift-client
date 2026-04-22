import React from 'react';

import logo from '../../assets/images/logo.png';

const Logo = () => {
    return (
        <div className='flex items-end'>
            <img src={logo} alt="" />
            <h3 className="text-3xl text-[#303030] font-bold -ms-2.5">zapShift</h3>
        </div>
    );
};

export default Logo;