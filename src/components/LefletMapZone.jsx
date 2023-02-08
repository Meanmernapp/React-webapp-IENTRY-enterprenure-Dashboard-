import React, { useState } from 'react';
import { MapContainer, useMapEvents, TileLayer, Marker, Popup } from 'react-leaflet';
import Geocode from "react-geocode";
import { HashLoader } from 'react-spinners';
import { override } from '../Helpers/spinnercss';

function AddMarkerToClick({ latlng, setLatitude, setLongitude }) {
    const [markers, setMarkers] = useState(latlng);
    console.log(markers)

    const map = useMapEvents({
        click(e) {

            setMarkers([
                e.latlng.lat,
                e.latlng.lng
            ]);
            // Geocode.setApiKey("AIzaSyDez0zzXX1CKyVOrcoCZLzNToqv8BqPjKE");
            Geocode.setApiKey("AIzaSyDRCcydEnjt7P-riOx4X-Dm4F1HDntPEDg")
            Geocode.fromLatLng(e.latlng.lat, e.latlng.lng).then(
                (response) => {
                    const address = response.results[0].formatted_address;
                    // console.log(address, e.latlng.lat, e.latlng.lng)
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
                <Marker
                    key={markers[0]}
                    position={markers}
                >
                    <Popup>Marker is at {markers}</Popup>
                </Marker>
            }
        </>
    )
}

const LefletMapZone = ({ latlng }) => {
    return (
        <>
            {
                latlng[0] !== undefined ?
                    <MapContainer
                        center={latlng}
                        zoom={13}
                        style={{ height: "27rem", width: "100%" }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <AddMarkerToClick latlng={latlng} />
                    </MapContainer> :
                    <div className="overlay">
                        <HashLoader loading="true" css={override} size={50} color="#fff" />
                    </div>
            }
        </>
    )
}

export default LefletMapZone
