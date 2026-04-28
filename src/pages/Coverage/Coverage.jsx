import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';  // must be add korte hobe
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const position = [22.3569, 91.7832]
    const serviceCenters = useLoaderData();
    const mapRef = useRef(null);

    const handleSearch = e => {
        e.preventDefault();
        const location = e.target.location.value;
        const district = serviceCenters.find(c => c.district.toLowerCase().includes(location.toLowerCase()));

        if (district) {
            const coord = [district.latitude, district.longitude];
            // console.log(district, coord)

            // go to the location
            mapRef.current.flyTo(coord, 15)
        }
    }

    return (
        <div className='p-5 md:p-10 space-y-5 bg-white rounded-3xl m-6'>
            <h2 className="text-3xl font-bold text-secondary">We are available in 64 districts</h2>

            <div>
                {/* Search */}
                <form onSubmit={handleSearch}>
                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input type="search" className="grow" name='location' placeholder="Search" />

                    </label>
                </form>
            </div>

            <hr />
            <h2 className='text-2xl font-medium text-secondary'>We deliver almost all over Bangladesh</h2>

            {/* Map */}
            <div className='border border-gray-500 w-full h[800px'>
                <MapContainer
                    center={position}
                    zoom={8}
                    scrollWheelZoom={false}
                    className='h-[400px] md:h-[800px]'
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* Marker --> show - location point */}

                    {
                        serviceCenters.map((center, index) => (
                            <Marker
                                key={index}
                                position={[center.latitude, center.longitude]}>
                                <Popup>
                                    <strong>{center.district}</strong> <br />
                                    Service Area : {center.covered_area.join(', ')}
                                </Popup>
                            </Marker>
                        ))
                    }

                </MapContainer>
            </div>


        </div>
    );
};

export default Coverage;