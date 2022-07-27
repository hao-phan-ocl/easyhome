import Image from 'next/image'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import PlaceIcon from '@mui/icons-material/Place'
import EuroIcon from '@mui/icons-material/Euro'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import LoopIcon from '@mui/icons-material/Loop'
import { CardActionArea, IconButton, Stack } from '@mui/material'

import logo from '../public/logo.png'
import { Room } from '../types/schemas'

type RoomProps = {
  room: Room
}

export default function RoomCard({ room }: RoomProps) {
  if (room.images) console.log(room.images[0])
  return (
    <Card>
      <CardActionArea>
        <CardMedia>
          {/* {room.images && (
            <Image src={room.images[1]} alt="logo" layout="fill" />
          )} */}
          <Image src={logo} alt="logo" />
        </CardMedia>
      </CardActionArea>

      <CardContent>
        <Stack gap={2}>
          <Stack
            direction="row"
            alignItems="flex-end"
            gap={2}
            justifyContent="center"
          >
            <Typography
              sx={{ cursor: 'pointer' }}
              variant="h5"
              fontWeight={700}
              component="div"
              color="primary"
              onClick={() => alert('room name')}
            >
              {room.housingType}
            </Typography>

            <Stack direction="row">
              <Typography fontSize={19}>{room.surface} m</Typography>
              <sup>2</sup>
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="center" gap={2}>
            <Stack direction="row" gap={1}>
              <PlaceIcon color="primary" />
              <Typography>{room.address.municipality}</Typography>
            </Stack>
            <Stack direction="row" gap={0.5} alignItems="center">
              <Typography fontWeight={800} color="secondary">
                {room.rent}
              </Typography>
              <EuroIcon fontSize="small" color="secondary" />
            </Stack>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              bgcolor="#e1dfdf"
              borderRadius="5px"
              p="7px"
              width="fit-content"
            >
              <CalendarMonthIcon fontSize="small" />
              <Typography>20 Aug</Typography>
            </Stack>
            <Stack direction="row">
              <IconButton onClick={() => alert('clicked')} color="primary">
                <LoopIcon />
              </IconButton>
              <IconButton onClick={() => alert('clicked')} color="primary">
                {/* <FavoriteIcon /> */}
                <FavoriteBorderIcon />
              </IconButton>
            </Stack>
          </Stack>
          {/* <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography> */}
        </Stack>
      </CardContent>
    </Card>
  )
}
