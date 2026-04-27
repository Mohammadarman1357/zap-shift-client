import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';  // must be add korte hobe
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const serviceCenters = useLoaderData();
    const position = [22.3569, 91.7832]


    return (
        <div>
            <h2 className="text-5xl">We are available in 64 districts</h2>
            <div>

            </div>
            {/* */}
            <div className='border w-full h[800px'>
                <MapContainer
                    center={position}
                    zoom={8}
                    scrollWheelZoom={false}
                    className='h-[800px]'
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