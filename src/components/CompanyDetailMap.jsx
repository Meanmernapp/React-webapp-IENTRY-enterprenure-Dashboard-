import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const CompanyDetailMap = ({ position }) => {
    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: "14rem", width: "100%" }}
        // onClick={(e) => handleClick(e)}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {location && (
                <Marker position={location}>
                    <Popup>Marker is at {location}</Popup>
                </Marker>
            )}
        </MapContainer>
    )
}

export default CompanyDetailMap
