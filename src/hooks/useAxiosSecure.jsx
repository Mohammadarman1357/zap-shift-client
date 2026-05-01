import axios from 'axios';
import React from 'react';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000' // do not put '/' into last. remember it.
})

const useAxiosSecure = () => {
    
    return axiosSecure;
};

export default useAxiosSecure;