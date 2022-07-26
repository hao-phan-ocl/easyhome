import LooksOneIcon from '@mui/icons-material/LooksOne'
import LooksTwoIcon from '@mui/icons-material/LooksTwo'
import Looks3Icon from '@mui/icons-material/Looks3'
import Looks4Icon from '@mui/icons-material/Looks4'
import EuroIcon from '@mui/icons-material/Euro'
import {
  Button,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

import InputRow from './InputRow'

type CreateFormType = {
  housingType: 'studio' | 'apartment' | 'shared' | ''
  surface: string
  bathRoomType: 'private' | 'shared' | ''
  kitchenType: 'in-room' | 'shared' | 'private' | ''
  furnished: 'furnished' | 'unfurnished' | 'partially-furnished' | ''
  smoking: boolean | ''
  pet: boolean | ''
  address: {
    street: string
    streetNumber: string
    postalCode: string
    municipality: string
  }
  rent: string
}

export default function CreateRoomForm() {
  const { control, handleSubmit } = useForm<CreateFormType>({
    defaultValues: {
      housingType: '',
      surface: '',
      bathRoomType: '',
      kitchenType: '',
      furnished: '',
      smoking: '',
      pet: '',
      address: {
        street: '',
        streetNumber: '',
        postalCode: '',
        municipality: '',
      },
      rent: '',
    },
  })

  function onSubmit(data: CreateFormType) {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={1}>
        <Stack direction="row">
          <LooksOneIcon color="primary" />
          <Typography>Description</Typography>
        </Stack>
        <InputRow label={'Housing type'}>
          <Controller
            name="housingType"
            render={({ field }) => (
              <Select {...field} size="small" fullWidth>
                <MenuItem value={'studio'}>studio</MenuItem>
                <MenuItem value={'apartment'}>apartment</MenuItem>
                <MenuItem value={'shared'}>shared apartment</MenuItem>
              </Select>
            )}
            control={control}
          />
        </InputRow>
        <InputRow label={'Available from'}>
          <TextField size="small" fullWidth />
        </InputRow>
        <InputRow label={'Images (optional)'}>
          <Button variant="contained" component="label" fullWidth>
            Upload
            <input hidden accept="image/*" multiple type="file" />
          </Button>
        </InputRow>
      </Stack>

      <Stack gap={1}>
        <Stack direction="row">
          <LooksTwoIcon color="primary" />
          <Typography>Details</Typography>
        </Stack>
        <InputRow label={'Surface'}>
          <Controller
            name="surface"
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      m<sup>2</sup>
                    </InputAdornment>
                  ),
                }}
              />
            )}
            control={control}
          />
        </InputRow>
        <InputRow label={'Bathroom'}>
          <Controller
            name="bathRoomType"
            render={({ field }) => (
              <Select {...field} size="small" fullWidth>
                <MenuItem value={'private'}>private</MenuItem>
                <MenuItem value={'shared'}>shared</MenuItem>
              </Select>
            )}
            control={control}
          />
        </InputRow>
        <InputRow label={'Kitchen'}>
          <Controller
            name="kitchenType"
            render={({ field }) => (
              <Select {...field} size="small" fullWidth>
                <MenuItem value={'in-room'}>in-room</MenuItem>
                <MenuItem value={'private'}>private</MenuItem>
                <MenuItem value={'shared'}>shared</MenuItem>
              </Select>
            )}
            control={control}
          />
        </InputRow>
        <InputRow label={'Furnished'}>
          <Controller
            name="furnished"
            render={({ field }) => (
              <RadioGroup
                {...field}
                sx={{
                  width: '100%',
                }}
              >
                <FormControlLabel
                  value={'furnished'}
                  control={<Radio size="small" />}
                  label="furnished"
                />
                <FormControlLabel
                  value={'unfurnished'}
                  control={<Radio size="small" />}
                  label="unfurnished"
                />
                <FormControlLabel
                  value={'partially-furnished'}
                  control={<Radio size="small" />}
                  label="partially-furnished"
                />
              </RadioGroup>
            )}
            control={control}
          />
        </InputRow>
        <InputRow label={'Smoking'}>
          <Controller
            name="smoking"
            render={({ field }) => (
              <RadioGroup
                {...field}
                sx={{
                  width: '100%',
                }}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio size="small" />}
                  label="smoking ok"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio size="small" />}
                  label="non-smoking"
                />
              </RadioGroup>
            )}
            control={control}
          />
        </InputRow>
        <InputRow label={'Pet'}>
          <Controller
            name="pet"
            render={({ field }) => (
              <RadioGroup
                {...field}
                sx={{
                  width: '100%',
                }}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio size="small" />}
                  label="allowed"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio size="small" />}
                  label="not allowed"
                />
              </RadioGroup>
            )}
            control={control}
          />
        </InputRow>
      </Stack>
      <Stack gap={1}>
        <Stack direction="row">
          <Looks3Icon color="primary" />
          <Typography>Address</Typography>
        </Stack>
        <InputRow label="Street">
          <Controller
            name="address.street"
            render={({ field }) => (
              <TextField {...field} size="small" fullWidth />
            )}
            control={control}
          />
        </InputRow>
        <InputRow label="Street number">
          <Controller
            name="address.streetNumber"
            render={({ field }) => (
              <TextField {...field} size="small" fullWidth />
            )}
            control={control}
          />
        </InputRow>
        <InputRow label="Postal code">
          <Controller
            name="address.postalCode"
            render={({ field }) => (
              <TextField {...field} size="small" fullWidth />
            )}
            control={control}
          />
        </InputRow>
        <InputRow label="Municipality">
          <Controller
            name="address.municipality"
            render={({ field }) => (
              <TextField {...field} size="small" fullWidth />
            )}
            control={control}
          />
        </InputRow>
      </Stack>
      <Stack gap={1}>
        <Stack direction="row">
          <Looks4Icon color="primary" />
          <Typography>Rent</Typography>
        </Stack>
        <InputRow label="Rent">
          <Controller
            name="rent"
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EuroIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            control={control}
          />
        </InputRow>
      </Stack>
      <Button type="submit" variant="contained">
        Save
      </Button>
    </form>
  )
}
