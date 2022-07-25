import LooksOneIcon from '@mui/icons-material/LooksOne'
import LooksTwoIcon from '@mui/icons-material/LooksTwo'
import Looks3Icon from '@mui/icons-material/Looks3'
import Looks4Icon from '@mui/icons-material/Looks4'
import { Stack, styled, TextField, Typography } from '@mui/material'

export default function CreateRoomForm() {
  return (
    <>
      <Stack>
        <Stack direction="row">
          <LooksOneIcon color="primary" />
          <Typography>Description</Typography>
        </Stack>

        <Stack spacing={2} mb={3} width="40%">
          <Stack
            alignItems={{ sm: 'center', xs: 'flex-start' }}
            spacing={2}
            direction={{ sm: 'row', xs: 'column' }}
          >
            <Typography textAlign={{ sm: 'right', xs: 'left' }} width="60%">
              Housing type
            </Typography>
            <TextField size="small" />
          </Stack>
        </Stack>

        <Stack spacing={2} mb={3} width="40%">
          <Stack
            alignItems={{ sm: 'center', xs: 'flex-start' }}
            spacing={2}
            direction={{ sm: 'row', xs: 'column' }}
          >
            <Typography textAlign={{ sm: 'right', xs: 'left' }} width="60%">
              Available from
            </Typography>
            <TextField size="small" />
          </Stack>
        </Stack>
      </Stack>

      <Stack>
        <Stack direction="row">
          <LooksTwoIcon color="primary" />
          <Typography>Details</Typography>
        </Stack>

        <Stack spacing={2} mb={3} width="40%">
          <Stack
            alignItems={{ sm: 'center', xs: 'flex-start' }}
            spacing={2}
            direction={{ sm: 'row', xs: 'column' }}
          >
            <Typography textAlign={{ sm: 'right', xs: 'left' }} width="60%">
              Surface
            </Typography>
            <TextField size="small" />
          </Stack>
        </Stack>

        <Stack spacing={2} mb={3} width="40%">
          <Stack
            alignItems={{ sm: 'center', xs: 'flex-start' }}
            spacing={2}
            direction={{ sm: 'row', xs: 'column' }}
          >
            <Typography textAlign={{ sm: 'right', xs: 'left' }} width="60%">
              Floor
            </Typography>
            <TextField size="small" />
          </Stack>
        </Stack>

        <Stack spacing={2} mb={3} width="40%">
          <Stack
            alignItems={{ sm: 'center', xs: 'flex-start' }}
            spacing={2}
            direction={{ sm: 'row', xs: 'column' }}
          >
            <Typography textAlign={{ sm: 'right', xs: 'left' }} width="60%">
              Bathroom
            </Typography>
            <TextField size="small" />
          </Stack>
        </Stack>

        <Stack spacing={2} mb={3} width="40%">
          <Stack
            alignItems={{ sm: 'center', xs: 'flex-start' }}
            spacing={2}
            direction={{ sm: 'row', xs: 'column' }}
          >
            <Typography textAlign={{ sm: 'right', xs: 'left' }} width="60%">
              Kitchen
            </Typography>
            <TextField size="small" />
          </Stack>
        </Stack>

        <Stack spacing={2} mb={3} width="40%">
          <Stack
            alignItems={{ sm: 'center', xs: 'flex-start' }}
            spacing={2}
            direction={{ sm: 'row', xs: 'column' }}
          >
            <Typography textAlign={{ sm: 'right', xs: 'left' }} width="60%">
              Furnished
            </Typography>
            <TextField size="small" />
          </Stack>
        </Stack>

        <Stack spacing={2} mb={3} width="40%">
          <Stack
            alignItems={{ sm: 'center', xs: 'flex-start' }}
            spacing={2}
            direction={{ sm: 'row', xs: 'column' }}
          >
            <Typography textAlign={{ sm: 'right', xs: 'left' }} width="60%">
              Smoking
            </Typography>
            <TextField size="small" />
          </Stack>
        </Stack>

        <Stack spacing={2} mb={3} width="40%">
          <Stack
            alignItems={{ sm: 'center', xs: 'flex-start' }}
            spacing={2}
            direction={{ sm: 'row', xs: 'column' }}
          >
            <Typography textAlign={{ sm: 'right', xs: 'left' }} width="60%">
              Pet
            </Typography>
            <TextField size="small" />
          </Stack>
        </Stack>
      </Stack>
      {/* <Stack direction="row">
        <Looks3Icon color="primary" />
        <Typography>Address</Typography>
      </Stack>
      <Stack direction="row">
        <Looks4Icon color="primary" />
        <Typography>Rent</Typography>
      </Stack> */}
    </>
  )
}
