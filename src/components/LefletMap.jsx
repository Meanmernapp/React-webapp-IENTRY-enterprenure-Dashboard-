import React, { useState } from 'react';
import { MapContainer, useMapEvents, TileLayer, Marker, Popup } from 'react-leaflet';
import Geocode from "react-geocode";

function AddMarkerToClick({ latlng }) {
    console.log(latlng)

    const [markers, setMarkers] = useState();
    // console.log(markers)

    const map = useMapEvents({
        click(e) {
            const newMarker = e.latlng;
            sessionStorage.setItem("location", JSON.stringify(e.latlng))
            setMarkers(newMarker);
            const { lat, lng } = newMarker
            console.log(newMarker)
            Geocode.setApiKey("AIzaSyDez0zzXX1CKyVOrcoCZLzNToqv8BqPjKE");
            Geocode.fromLatLng(lat, lng).then(
                (response) => {
                    const address = response.results[0].formatted_address;
                    // console.log(address)
                },
                (error) => {
                    console.error(error);
                }
            );
        },
    })

    return (
        <>
            {
                markers && (
                    <Marker position={{lat, lng}}>
                        <Popup>Marker is at {markers}</Popup>
                    </Marker>
                )
            }
        </>
    )
}

const LefletMap = ({ latlng }) => {
    console.log(latlng)
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
            <AddMarkerToClick latlng={latlng} />
        </MapContainer>
    )
}

export default LefletMap
