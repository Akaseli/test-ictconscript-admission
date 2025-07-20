import { GpsFixedOutlined } from '@mui/icons-material';
import { Button, DialogTitle, Divider, FormControl, FormLabel, Input, Modal, ModalClose, ModalDialog, Stack, Textarea, Typography } from '@mui/joy';
import React, { useState } from 'react'
import type { Task } from '../interfaces/task';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LocationPickerMarker } from './LocationPickerMarker';

interface Props {
  open: boolean,
  onModalClose: () => void
  onSubmit: (arg1: Task) => void
}

export const EntryModal: React.FC<Props> = ({open, onModalClose, onSubmit}) => {
  const [latitude, setLatitude] = useState<number | ''>('');
  const [longitude, setLongitude] = useState<number | ''>('');

  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    })
  }

  const closeResetModal = () => {
    setLatitude('');
    setLongitude('');
    onModalClose();
  }

  const handleMapLatitude = (lat: number) => {
    setLatitude(lat);
  }

  const handleMapLongitude = (lon: number) => {
    setLongitude(lon);
  }

  return(
    <Modal open={open} onClose={closeResetModal}>
      <ModalDialog 
        size='sm'   
        sx={{
          maxHeight: '90vh', 
          overflow: 'auto',
        }}>
        <ModalClose />
        <DialogTitle>Create new entry</DialogTitle>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const values = Object.fromEntries(formData.entries());

            const task: Task = {
              title: values["title"].toString(), 
              body: values["description"].toString(), 
              id: Math.floor(10000000 + Math.random() * 90000000).toString(),
              isoTime: new Date().toISOString(),
              lat: null,
              lon: null
            }
            
            if(values["latitude"] != "" && values["longitude"] != ""){
              task.lat = parseFloat(values["latitude"].toString())
              task.lon = parseFloat(values["longitude"].toString())
            }

            onSubmit(task);
            closeResetModal();
          }}
        >
          <Stack spacing={1}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input required name='title'/>
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea minRows={2} required name='description'/>
            </FormControl>

            <Divider >
              <Typography level='body-xs'>Location (Optional)</Typography>
            </Divider>

            <Button onClick={fetchLocation} variant='outlined'>
              <GpsFixedOutlined fontSize='small' sx={{mr: 1}}/>
              Get device location
            </Button>

            <FormControl>
              <FormLabel>Latitude</FormLabel>
              <Input type='number' placeholder='0' value={latitude} sx={{flex: 1}}  
                slotProps={{
                  input: {
                    min: -90,
                    max: 90,
                    step: 'any'
                  }
                }}
                onChange={(e) => setLatitude(parseFloat(e.target.value))}
                name='latitude'
              />
            </FormControl>
            
            <FormControl>
               <FormLabel>Longitude</FormLabel>
                <Input type='number' placeholder='0' value={longitude} sx={{flex: 1}} slotProps={{
                  input: {
                    min: -180,
                    max: 180,
                    step: 'any'
                  }
                }}
                onChange={(e) => setLongitude(parseFloat(e.target.value))}
                name='longitude'
                />
            </FormControl>

            <MapContainer
              center={[latitude || 64.3, longitude || 26.4]}
              zoom={4} 
              scrollWheelZoom={true}
              style={{ height: '300px', width: '100%'}}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <LocationPickerMarker lat={latitude} lon={longitude} setLatitude={handleMapLatitude} setLongitude={handleMapLongitude}/>
            </MapContainer>
               
          
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}