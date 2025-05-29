// components/GoogleMapPicker.tsx
"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useState, useCallback } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 35.6892, // Tehran
  lng: 51.389,
};

type Props = {
  onLocationSelect: (coords: { lat: number; lng: number }) => void;
  initialCoords?: { lat: number; lng: number };
};

export default function GoogleMapPicker({
  onLocationSelect,
  initialCoords,
}: Props) {
  const [marker, setMarker] = useState(initialCoords || defaultCenter);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_CLIENT_ID as string, // Set in .env
  });

  const onMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setMarker({ lat, lng });
        onLocationSelect({ lat, lng });
      }
    },
    [onLocationSelect]
  );

  if (!isLoaded) return <p>در حال بارگذاری نقشه...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={marker}
      zoom={12}
      onClick={onMapClick}>
      <Marker position={marker} />
    </GoogleMap>
  );
}
