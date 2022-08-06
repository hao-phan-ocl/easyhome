import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import RoomCard from './RoomCard'
import { Room } from '../../types/schemas'

type RoomsProps = {
  rooms: Room[]
}

export default function RoomGrid({ rooms }: RoomsProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 1, md: 2, lg: 3 }}
      >
        {rooms.map((room) => (
          <Grid
            item
            xs={1}
            sm={1}
            md={1}
            lg={1}
            key={room._id}
            display="flex"
            justifyContent="center"
          >
            <RoomCard room={room} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
