import { Box, Button, Chip, Link, Stack, Typography } from '@mui/joy'
import { useEffect, useState } from 'react'
import { TaskCard } from './components/TaskCard'
import { Add, GitHub } from '@mui/icons-material'
import { EntryModal } from './components/EntryModal'
import type { Task } from './interfaces/task'



function App() {
  const [logEntries, setLogEntries] = useState<Task[]>([])
  const [creatingEntry, setCreatingEntry] = useState(false)

  const handleCloseDialog = () => {
    setCreatingEntry(false);
  }

  const addEntry = (event: Task) => {
    setLogEntries([event, ...logEntries]);
  }

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data.json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const events = data as Task[];
        
        events.sort((a, b) => new Date(b.isoTime).getTime() - new Date(a.isoTime).getTime());

        setLogEntries(events);
      })
  }, [])

  const cards = logEntries.map((entry) => {
    return (
      <TaskCard task={entry} key={entry.id}/>
    );
  })

  return (
    <Box sx={{textAlign: 'center', display: 'flex', justifySelf: 'center'}}>
      <Stack spacing={2} sx={{p: 5}}>
        <Typography level='h2'>Unit Logbook</Typography>

        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Chip color='primary'>{logEntries.length + " entries"}</Chip>
          <Button onClick={() => {setCreatingEntry(true)}}>
            <Add />
            New entry
          </Button>
        </Box>
        {cards}

        <Stack spacing={0}>
          <Typography level='body-xs' sx={{color: 'black'}}>ICT Conscript Admission Test - Task 01a-swdev-frontend</Typography>
          <Typography level='body-xs'>
            <Link href="https://github.com/Akaseli/test-ictconscript-admission" target='_blank' sx={{color: 'black'}}>
              <GitHub sx={{color: 'black'}}/>
              Source code
            </Link>
          </Typography>

        </Stack>
        
      </Stack>

      <EntryModal open={creatingEntry} onModalClose={handleCloseDialog} onSubmit={addEntry}/>
    </Box>
  )
}

export default App
