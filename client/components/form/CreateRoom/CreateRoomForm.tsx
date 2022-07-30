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
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import InputRow from './InputRow'
import { useAppSelector } from '../../../hooks/hooks'
import instance from '../../../axios/instance'
import { request } from '../../../axios/requests'

type CreateFormType = {
  housingType: 'studio' | 'apartment' | 'shared' | ''
  availableFrom: Date
  images: FileList
  description: string
  surface: string
  bathRoomType: 'private' | 'shared' | ''
  kitchenType: 'in-room' | 'shared' | 'private' | ''
  furnished: 'furnished' | 'unfurnished' | 'partially-furnished' | ''
  smoking: boolean | ''
  pets: boolean | ''
  address: {
    street: string
    streetNumber: string
    postalCode: string
    municipality: string
  }
  rent: string
}

export default function CreateRoomForm() {
  const { user } = useAppSelector((state) => state.auth)
  const { control, register, handleSubmit } = useForm<CreateFormType>({
    defaultValues: {
      housingType: '',
      availableFrom: new Date(),
      // images: '',
      description: '',
      surface: '',
      bathRoomType: '',
      kitchenType: '',
      furnished: '',
      smoking: '',
      pets: '',
      address: {
        street: '',
        streetNumber: '',
        postalCode: '',
        municipality: '',
      },
      rent: '',
    },
  })

  async function onSubmit(data: CreateFormType) {
    const submit = {
      owner: user?._id,
      housingType: data.housingType,
      surface: Number(data.surface),
      rent: Number(data.rent),
      availableFrom: data.availableFrom.toISOString().slice(0, 10),
      bathroomType: data.bathRoomType,
      kitchenType: data.kitchenType,
      furnished: data.furnished,
      smoking: data.smoking.valueOf() === 'true' ? true : false,
      pets: data.pets.valueOf() === 'true' ? true : false,
      address: {
        street: data.address.street,
        streetNumber: Number(data.address.streetNumber),
        postalCode: data.address.postalCode,
        municipality: data.address.municipality,
      },
    }

    try {
      const res = await instance.post(request('users', 'add-room'), submit)
      // console.log(data.images)
      if (data.images.length && res.status === 201) {
        // Create form data to send file
        const formData = new FormData()
        // Append each img to form data
        for (let i = 0; i < data.images.length; i++) {
          formData.append('images', data.images[i])
        }

        await instance.post(
          request('users', 'upload', res.data._id),
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
      }
    } catch (error) {
      console.log(error)
    }
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="availableFrom"
              render={({ field }) => (
                <DatePicker
                  {...field}
                  inputFormat="yyyy/MM/dd"
                  renderInput={(params) => (
                    <TextField {...params} fullWidth size="small" />
                  )}
                />
              )}
              control={control}
            />
          </LocalizationProvider>
        </InputRow>
        <Stack
          direction={{ md: 'row', sm: 'column', xs: 'column' }}
          mb={3}
          gap={2}
        >
          <Stack
            width="220px"
            direction="row"
            justifyContent={{ md: 'flex-end' }}
          >
            <Typography paragraph mb="0">
              <span style={{ fontWeight: '700' }}>Images {''}</span>
              <span>(optional)</span>
            </Typography>
          </Stack>
          <input
            {...register('images')}
            accept="image/*"
            multiple
            type="file"
            title="Upload file"
            name="images"
          />
        </Stack>
        <TextField
          placeholder="Describe your property (optional)"
          multiline
          rows={5}
          sx={{ width: '40%', marginBottom: '20px' }}
        />
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
            name="pets"
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
