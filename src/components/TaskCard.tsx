import React from 'react'
import type { Task } from '../interfaces/task';
import { AccessTime, LocationOnOutlined } from '@mui/icons-material'
import { Box, Card, CardContent, Typography } from '@mui/joy'
import { Minimap } from './Minimap';

interface Props {
  task: Task
}

export const TaskCard: React.FC<Props> = ({task}) => {

  return(
    <Card
        variant='outlined'
        orientation='horizontal'
        sx={{
          textAlign: 'start'
        }}
      >
        <CardContent sx={{gap: 1}}>
          {/* Title, coordinates */}
          <Box 
            sx={{
              display: 'flex', 
              justifyContent: 'space-between', 
              width: '100%' 
            }}
          >
            <Typography level='title-lg'>{task.title}</Typography>
            
            <Box
              sx={{
                display: 'flex',
                gap: 1
              }}
            > 
              {/* Location */}
              {
                task.lat ? 
                (
                  <Typography level='body-sm' sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}>
                    <LocationOnOutlined fontSize='small'/>
                    {task.lat + ", " + task.lon}
                  </Typography>
                )
                :
                (<></>)
              }
            </Box>
            
          </Box>

          <Box 
            sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}
          > 
            {/* Time, Description */}
            <Box>
              
            <Typography level='body-xs' sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}>
              <AccessTime fontSize='small'/>
              {new Date(task.isoTime).toLocaleString("fi-fi")}
            </Typography>

            <Typography
              sx={{
                mr: 2,
                mt: 1,
              }}
            >{task.body}</Typography>
            </Box>

            
            { 
              /* Location preview */
              (task.lat && task.lon) ? 
              (
                <Minimap lat={task.lat} lon={task.lon} id={task.id}/>
              )
              : 
              (<></>)
            }
          </Box>
            
        </CardContent>
      </Card>
  );
}