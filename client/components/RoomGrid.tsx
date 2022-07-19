import { experimentalStyled as styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import RoomCard from './RoomCard'

export default function RoomGrid() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      >
        {Array.from(Array(13)).map((_, index) => (
          <Grid item xs={1} sm={1} md={1} lg={1} key={index}>
            <Item>
              <RoomCard />
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
