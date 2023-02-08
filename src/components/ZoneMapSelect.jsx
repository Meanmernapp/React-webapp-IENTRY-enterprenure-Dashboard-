import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/

function AddMarkerToClick({ latlng }) {

    return (
        <>
            {
                <Marker
                    position={latlng}
                    clickable={false}
                >
                    <Popup>Marker is at {latlng}</Popup>
                </Marker>
            }
        </>
    )
}

const ZoneMapSelect = ({ latlng, setLatitude, setLongitude }) => {

    return (
        <>
            {
                <MapContainer
                    center={latlng}
                    zoom={13}
                    style={{
                        height: "100vh",
                        width: "100%",
                        zIndex: 0
                    }}


                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <AddMarkerToClick latlng={latlng}
                        setLatitude={setLatitude}
                        setLongitude={setLongitude} />
                </MapContainer>

            }
        </>
    )
}

export default ZoneMapSelect
