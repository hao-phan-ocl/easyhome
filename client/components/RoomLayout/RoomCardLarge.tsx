import { Paper, Stack, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { useState } from 'react'

import { Room } from '../../types/schemas'
import RoomCard from './RoomCard'
import DeleteRoomBtn from '../Button/DeleteRoomBtn'
import FlipBtn from '../Button/FlipBtn'

type RoomProps = {
  room: Room
}

type StyledStackProps = {
  title: string
  text: string
  subtext?: string | number
}

function StyledStack({ title, text, subtext }: StyledStackProps) {
  return (
    <Stack direction="row" gap={{ md: 10, sm: 6, xs: 4 }}>
      <Stack width={{ md: '20%', sm: '40%', xs: '40%' }} alignItems="flex-end">
        <Typography fontWeight={650}>{title}</Typography>
      </Stack>
      <Stack width={{ md: '80%', sm: '60%', xs: '60%' }}>
        <Typography>
          {text} {subtext}
        </Typography>
      </Stack>
    </Stack>
  )
}

export default function RoomCardLarge({ room }: RoomProps) {
  const [flip, setFlip] = useState(false)

  return (
    <Container maxWidth="md">
      <Stack
        direction={{ md: 'row', sm: 'column', xs: 'column' }}
        gap={2}
        alignItems={{ md: 'stretch', sm: 'center', xs: 'center' }}
      >
        <Stack minWidth="250px">
          <RoomCard room={room} />
        </Stack>

        {/* Card container */}
        <Stack position="relative" width="75%" minHeight="350px">
          <Stack position="absolute" right="0" zIndex="10" direction="row">
            <DeleteRoomBtn roomId={room._id} />
            <FlipBtn handleFlip={() => setFlip(!flip)} />
          </Stack>
          {/* The card */}
          <Stack
            width="100%"
            height="100%"
            position="absolute"
            sx={{
              transformStyle: 'preserve-3d',
              transition: 'all .5s ease',
              transform: flip ? 'rotateY(180deg)' : 'none',
            }}
          >
            {/* The front */}
            <Paper
              sx={{
                padding: '16px',
                backfaceVisibility: 'hidden',
                position: 'absolute',
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                backgroundColor: 'rgb(225 225 225)',
              }}
            >
              <Typography color="primary" fontWeight={800}>
                Additional Information
              </Typography>
              <StyledStack
                title="Address"
                text={room.address.street}
                subtext={room.address.streetNumber}
              />
              <StyledStack title="Postal" text={room.address.postalCode} />
              <StyledStack title="Kitchen" text={room.kitchenType} />
              <StyledStack title="Bathroom" text={room.bathroomType} />
              {room.smoking ? (
                <StyledStack title="Smoking" text="allowed" />
              ) : (
                <StyledStack title="Smoking" text="non-smoking" />
              )}
              {room.pets ? (
                <StyledStack title="Pets" text="allowed" />
              ) : (
                <StyledStack title="Pets" text="not allowed" />
              )}
              <StyledStack title="Furnished" text={room.furnished} />
            </Paper>

            {/* The back */}
            <Paper
              sx={{
                padding: '16px',
                backfaceVisibility: 'hidden',
                position: 'absolute',
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                transform: 'rotateY(180deg)',
                backgroundColor: 'rgb(225 225 225)',
              }}
            >
              <Typography fontWeight={650}>Description</Typography>
              <Typography paragraph>{room.description}</Typography>
            </Paper>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}
