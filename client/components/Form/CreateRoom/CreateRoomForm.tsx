import LooksOneIcon from '@mui/icons-material/LooksOne'
import LooksTwoIcon from '@mui/icons-material/LooksTwo'
import Looks3Icon from '@mui/icons-material/Looks3'
import Looks4Icon from '@mui/icons-material/Looks4'
import EuroIcon from '@mui/icons-material/Euro'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
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
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'

import InputRow from './InputRow'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import instance from '../../../axios/instance'
import { request } from '../../../axios/requests'
import {
  openSnackBarSuccess,
  setSnackBarMsg,
} from '../../../redux/features/popUpSlice'

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

const schema = yup
  .object({
    housingType: yup.string().required(),
    availableFrom: yup.date().required(),
    description: yup.string().max(50).required(),
    surface: yup.number().positive().required(),
    bathRoomType: yup.string().required(),
    kitchenType: yup.string().required(),
    furnished: yup.string().required(),
    smoking: yup.boolean().required(),
    pets: yup.boolean().required(),
    address: yup.object({
      street: yup.string().required(),
      streetNumber: yup.number().required(),
      postalCode: yup.string().required(),
      municipality: yup.string().required(),
    }),
    rent: yup.number().required(),
  })
  .required()

export default function CreateRoomForm() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormType>({
    defaultValues: {
      housingType: '',
      availableFrom: new Date(),
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
    resolver: yupResolver(schema),
  })

  async function onSubmit(data: CreateFormType) {
    const submit = {
      owner: user?._id,
      housingType: data.housingType,
      surface: Number(data.surface),
      description: data.description,
      rent: Number(data.rent),
      availableFrom: data.availableFrom.toISOString(),
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

      if (res.status === 201) {
        router.push('/')
        dispatch(openSnackBarSuccess(true))
        dispatch(setSnackBarMsg('New room created'))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ margin: 'auto' }}>
      <Stack gap={1} justifyContent="center">
        <Stack direction="row" gap={1}>
          <LooksOneIcon color="primary" />
          <Typography>Description</Typography>
        </Stack>
        <InputRow label={'Housing type'}>
          <Controller
            name="housingType"
            render={({ field }) => (
              <Stack width="100%">
                <Select
                  {...field}
                  size="small"
                  fullWidth
                  error={Boolean(errors.housingType)}
                >
                  <MenuItem value={'studio'}>studio</MenuItem>
                  <MenuItem value={'apartment'}>apartment</MenuItem>
                  <MenuItem value={'shared'}>shared apartment</MenuItem>
                </Select>
                <FormHelperText error>
                  {errors.housingType?.message}
                </FormHelperText>
              </Stack>
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
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      error={Boolean(errors.availableFrom)}
                      helperText={errors.availableFrom?.message}
                    />
                  )}
                />
              )}
              control={control}
            />
          </LocalizationProvider>
        </InputRow>
        <InputRow
          label={
            <>
              <span>Images </span>
              <span>
                <i style={{ fontWeight: 400 }}>(optional)</i>
              </span>
            </>
          }
        >
          <input
            style={{ marginTop: '7px' }}
            {...register('images')}
            accept="image/*"
            multiple
            type="file"
            title="Upload file"
            name="images"
          />
        </InputRow>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Describe your property:"
              multiline
              rows={5}
              error={Boolean(errors.description)}
              helperText={errors.description?.message}
              sx={{
                width: { md: '51%', sm: '72%', xs: '80%' },
                marginBottom: '20px',
              }}
            />
          )}
        ></Controller>
      </Stack>

      <Stack gap={1}>
        <Stack direction="row" gap={1}>
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
                error={Boolean(errors.surface)}
                helperText={errors.surface?.message}
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
              <Stack width="100%">
                <Select
                  {...field}
                  size="small"
                  fullWidth
                  error={Boolean(errors.bathRoomType)}
                >
                  <MenuItem value={'private'}>private</MenuItem>
                  <MenuItem value={'shared'}>shared</MenuItem>
                </Select>
                <FormHelperText error>
                  {errors.bathRoomType?.message}
                </FormHelperText>
              </Stack>
            )}
            control={control}
          />
        </InputRow>
        <InputRow label={'Kitchen'}>
          <Controller
            name="kitchenType"
            render={({ field }) => (
              <Stack width="100%">
                <Select
                  {...field}
                  size="small"
                  fullWidth
                  error={Boolean(errors.kitchenType)}
                >
                  <MenuItem value={'in-room'}>in-room</MenuItem>
                  <MenuItem value={'private'}>private</MenuItem>
                  <MenuItem value={'shared'}>shared</MenuItem>
                </Select>
                <FormHelperText error>
                  {errors.bathRoomType?.message}
                </FormHelperText>
              </Stack>
            )}
            control={control}
          />
        </InputRow>
        <InputRow label={'Furnished'}>
          <Controller
            name="furnished"
            render={({ field }) => (
              <FormControl
                error={Boolean(errors.furnished)}
                sx={{
                  width: '100%',
                }}
              >
                <RadioGroup {...field}>
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
                <FormHelperText>{errors.furnished?.message}</FormHelperText>
              </FormControl>
            )}
            control={control}
          />
        </InputRow>
        <InputRow label={'Smoking'}>
          <Controller
            name="smoking"
            render={({ field }) => (
              <FormControl
                error={Boolean(errors.smoking)}
                sx={{
                  width: '100%',
                }}
              >
                <RadioGroup {...field}>
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
                <FormHelperText>{errors.smoking?.message}</FormHelperText>
              </FormControl>
            )}
            control={control}
          />
        </InputRow>
        <InputRow label={'Pets'}>
          <Controller
            name="pets"
            render={({ field }) => (
              <FormControl
                error={Boolean(errors.pets)}
                sx={{
                  width: '100%',
                }}
              >
                <RadioGroup {...field}>
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
                <FormHelperText>{errors.pets?.message}</FormHelperText>
              </FormControl>
            )}
            control={control}
          />
        </InputRow>
      </Stack>
      <Stack gap={1}>
        <Stack direction="row" gap={1}>
          <Looks3Icon color="primary" />
          <Typography>Address</Typography>
        </Stack>
        <InputRow label="Street">
          <Controller
            name="address.street"
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                fullWidth
                error={Boolean(errors.address?.street)}
                helperText={errors.address?.street?.message}
              />
            )}
            control={control}
          />
        </InputRow>
        <InputRow label="Street number">
          <Controller
            name="address.streetNumber"
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                fullWidth
                error={Boolean(errors.address?.streetNumber)}
                helperText={errors.address?.streetNumber?.message}
              />
            )}
            control={control}
          />
        </InputRow>
        <InputRow label="Postal code">
          <Controller
            name="address.postalCode"
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                fullWidth
                error={Boolean(errors.address?.postalCode)}
                helperText={errors.address?.postalCode?.message}
              />
            )}
            control={control}
          />
        </InputRow>
        <InputRow label="Municipality">
          <Controller
            name="address.municipality"
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                fullWidth
                error={Boolean(errors.address?.municipality)}
                helperText={errors.address?.municipality?.message}
              />
            )}
            control={control}
          />
        </InputRow>
      </Stack>
      <Stack gap={1}>
        <Stack direction="row" gap={1}>
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
                error={Boolean(errors.rent)}
                helperText={errors.rent?.message}
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
        Create
      </Button>
    </form>
  )
}
