import { AspectRatio } from '@mui/joy';
import React from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

interface Props {
  lat: number,
  lon: number,
  id: string
}

export const Minimap: React.FC<Props> = ({lat, lon, id}) => {
  return(
    <AspectRatio
        ratio={"4/3"}
        sx={{width: 200, height: 150}}
      >
        <MapContainer
          key={id} 
          center={[lat, lon]} 
          zoom={12} 
          scrollWheelZoom={false}
          dragging={false}
          doubleClickZoom={false}
          zoomControl={false}
          style={{width: '200px', height: '150px'}}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lon]} />

        </MapContainer>
      </AspectRatio>
  );
}