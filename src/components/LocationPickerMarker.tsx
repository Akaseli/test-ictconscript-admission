import React from 'react'
import { Marker, useMapEvents } from 'react-leaflet';

interface Props {
  lat: number | '',
  lon: number | '',
  setLatitude: (arg1: number) => void,
  setLongitude: (arg2: number) => void
}

export const LocationPickerMarker: React.FC<Props> = ({lat, lon, setLatitude, setLongitude}) => {
  useMapEvents({
    click(e) {
      setLatitude(e.latlng.lat);
      setLongitude(e.latlng.lng);
    }
  })

  return(
    (lat != '' && lon != '') 
    ? <Marker position={[lat, lon]} />
    : <></>
  );
}