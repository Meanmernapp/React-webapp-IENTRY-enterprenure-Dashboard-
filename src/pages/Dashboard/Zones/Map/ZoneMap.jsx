import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  withLeaflet,
} from "react-leaflet";

const MyMarker = (props) => {
  const initMarker = (ref) => {
    if (ref) {
      ref.leafletElement.openPopup();
    }
  };

  return <Marker ref={initMarker} {...props} />;
};

const ZonesMap = ({
  LatLng,
  center = { lat: 51.5287718, lng: -0.2416804 },
  zoom = 8,
}) => {
  const [currentPos, setcurrentPos] = useState(null);

  const handleClick = (e) => {
    LatLng(e.latlng);
    setcurrentPos(e.latlng);
  };

  return (
    <div>
      <MapContainer
        style={{
          height: "25rem",
          width: "100%",
        }}
        center={center}
        zoom={zoom}
        onClick={(e) => handleClick(e)}
      >
        <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        {currentPos && (
          <MyMarker position={currentPos}>
            <Popup position={currentPos}>
              Current location: <pre>{JSON.stringify(currentPos, null, 2)}</pre>
            </Popup>
          </MyMarker>
        )}
      </MapContainer>
    </div>
  );
};

export default ZonesMap;
