// src/components/TestMap.jsx
import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: 20.5937, // India center
  lng: 78.9629,
};

const TestMap = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDn8VOYztBaWLpTnvNOIVYG9TkIVLJJcfs">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5} />
    </LoadScript>
  );
};

export default TestMap;
