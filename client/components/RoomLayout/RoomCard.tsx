import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import PlaceIcon from '@mui/icons-material/Place'
import EuroIcon from '@mui/icons-material/Euro'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Link from 'next/link'
import Image from 'next/image'
import { CardActionArea, Stack } from '@mui/material'
import { useState } from 'react'

import { Room } from '../../types/types'
import AddFavBtn from '../Button/AddFavBtn'
import logo from '../../public/logo.png'
import FlipBtn from '../Button/FlipBtn'

type RoomProps = {
  room: Room
}

type MyRowProps = {
  title: string
  text: string
}

function MyRow({ title, text }: MyRowProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" gap={2}>
      <Stack width="50%" alignItems="flex-end">
        <Typography fontWeight={700}> {title}</Typography>
      </Stack>
      <Stack width="50%">
        <Typography fontSize={15}>{text}</Typography>
      </Stack>
    </Stack>
  )
}

export default function RoomCard({ room }: RoomProps) {
  const date = new Date(room.availableFrom)
  const dateArray = date.toDateString().split(' ')
  const [flip, setFlip] = useState(false)
  const [show, setShow] = useState(false)

  return (
    // The container
    <Card
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
      sx={{
        minHeight: '370px',
        maxWidth: '270px',
        width: '100%',
        position: 'relative',
      }}
    >
      {show && (
        <Stack
          position="absolute"
          zIndex="10"
          right="0"
          p="5px 5px"
          bgcolor="#f3f3f3"
        >
          <FlipBtn handleFlip={() => setFlip(!flip)} />
        </Stack>
      )}

      {/* The card */}
      <Stack
        position="absolute"
        width="100%"
        height="100%"
        sx={{
          transformStyle: 'preserve-3d',
          transition: 'all .5s ease',
          transform: flip ? 'rotateY(180deg)' : 'none',
        }}
      >
        {/* The front */}
        <Stack
          width="100%"
          height="100%"
          position="absolute"
          sx={{ backfaceVisibility: 'hidden' }}
        >
          <Link href={`/room/${room._id}`}>
            <a>
              <CardActionArea>
                {room.images?.length ? (
                  <CardMedia
                    component="img"
                    height={200}
                    src={`http://${room.images[0]}`}
                    alt={`Room ${room._id}`}
                  />
                ) : (
                  <Stack>
                    <Image
                      priority
                      src={logo}
                      alt={`Room ${room._id}`}
                      height={200}
                      width="100%"
                    />
                  </Stack>
                )}
              </CardActionArea>
            </a>
          </Link>
          <CardContent>
            <Stack gap={2}>
              <Stack
                direction="row"
                alignItems="flex-end"
                gap={2}
                justifyContent="center"
              >
                <Link href={`/room/${room._id}`}>
                  <a>
                    <Typography
                      sx={{ cursor: 'pointer' }}
                      variant="h5"
                      fontWeight={700}
                      color="primary"
                    >
                      {room.housingType}
                    </Typography>
                  </a>
                </Link>
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
                  p="7px 12px"
                  width="fit-content"
                >
                  <CalendarMonthIcon fontSize="small" />
                  <Typography>
                    {dateArray[2]} {dateArray[1]}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <AddFavBtn roomId={room._id} />
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Stack>

        {/* The back */}
        <Stack
          position="absolute"
          width="100%"
          height="100%"
          justifyContent="center"
          gap={2}
          sx={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <MyRow title="Bathroom" text={room.bathroomType} />
          <MyRow title="Kitchen" text={room.kitchenType} />
          <MyRow
            title="Smoking"
            text={room.smoking ? 'allowed' : 'non-smoking'}
          />
          <MyRow title="Pets" text={room.pets ? 'allowed' : 'not allowed'} />
          <MyRow
            title="Furnished"
            text={
              room.furnished === 'partially-furnished'
                ? 'partitially'
                : room.furnished
            }
          />
        </Stack>
      </Stack>
    </Card>
  )
}
