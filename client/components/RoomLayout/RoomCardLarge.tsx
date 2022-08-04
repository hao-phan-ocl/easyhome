import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  IconButtonProps,
  Paper,
  Stack,
  styled,
  Tooltip,
  Typography,
} from '@mui/material'
import LoopIcon from '@mui/icons-material/Loop'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Container } from '@mui/system'
import { useState } from 'react'

import { Room } from '../../types/schemas'
import RoomCard from './RoomCard'

type RoomProps = {
  room: Room
}

type StyledStackProps = {
  title: string
  text: string
  subtext?: string | number
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

function StyledStack({ title, text, subtext }: StyledStackProps) {
  return (
    <Stack direction="row" gap={{ md: 10, sm: 6, xs: 4 }} width="100%">
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
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  return (
    <Container maxWidth="md">
      <Stack
        direction={{ md: 'row', sm: 'column', xs: 'column' }}
        gap={2}
        alignItems={{ md: 'stretch', sm: 'center', xs: 'center' }}
      >
        <Stack width="25%" minWidth="250px">
          <RoomCard room={room} />
        </Stack>

        <Card
          sx={{
            width: '75%',
          }}
        >
          <CardContent sx={{ padding: '10px 16px' }}>
            <Stack gap={2}>
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
            </Stack>
          </CardContent>
          <CardActions sx={{ padding: '3px 16px' }}>
            <Tooltip title="More" arrow>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </Tooltip>
          </CardActions>
          <Collapse
            in={expanded}
            timeout="auto"
            unmountOnExit
            sx={{ backgroundColor: '#d1a273' }}
          >
            <CardContent>
              <Typography fontWeight={650} mb="15px">
                Description
              </Typography>
              <Typography>{room.description}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Stack>
    </Container>
  )
}
