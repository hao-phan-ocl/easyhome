import { useEffect } from 'react'
import {
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
} from '@mui/material'
import HouseIcon from '@mui/icons-material/House'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import SellIcon from '@mui/icons-material/Sell'
import SmokeFreeIcon from '@mui/icons-material/SmokeFree'
import PetsIcon from '@mui/icons-material/Pets'
import ShowerIcon from '@mui/icons-material/Shower'
import ChairIcon from '@mui/icons-material/Chair'
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Controller, useForm } from 'react-hook-form'

import Rent from './Rent'
import SearchItem from './SearchItem'
import HousingType from './HousingType'
import BathroomType from './BathroomType'
import FurnishedType from './FurnishedType'
import KitchenType from './KitchenType'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import {
  BathroomEnum,
  FurnishedEnum,
  HousingTypeEnum,
  KitchenEnum,
  Room,
} from '../../types/types'
import { fetchAllRooms, setAllRooms } from '../../redux/features/allRoomsSlice'
import instance from '../../axios/instance'
import { request } from '../../axios/requests'

export type SearchForm = {
  housingType: {
    studio: boolean | ''
    apartment: boolean | ''
    shared: boolean | ''
  }
  availableFrom: Date | ''
  bathRoomType: {
    shared: boolean | ''
    private: boolean | ''
  }
  kitchenType: {
    inRoom: boolean | ''
    shared: boolean | ''
    private: boolean | ''
  }
  furnished: {
    furnished: boolean | ''
    unfurnished: boolean | ''
    partiallyFunished: boolean | ''
  }
  smoking: boolean | ''
  pets: boolean | ''
  rent: number[] | ''
}

export default function SearchBar() {
  const dispatch = useAppDispatch()
  const { rooms } = useAppSelector((state) => state.allRooms)

  let arrForSort = [...rooms]
  function sortMinMax(rooms: Room[]) {
    return rooms.sort((a, b) => a.rent - b.rent)
  }

  useEffect(() => {
    dispatch(fetchAllRooms())
  }, [dispatch])

  const { control, handleSubmit } = useForm<SearchForm>({
    defaultValues: {
      housingType: {
        studio: '',
        apartment: '',
        shared: '',
      },
      availableFrom: '',
      bathRoomType: {
        shared: '',
        private: '',
      },
      kitchenType: {
        inRoom: '',
        shared: '',
        private: '',
      },
      furnished: {
        furnished: '',
        unfurnished: '',
        partiallyFunished: '',
      },
      smoking: '',
      pets: '',
      rent: '',
    },
  })

  async function onSubmit(data: SearchForm) {
    const submit: any = {}

    const {
      housingType,
      kitchenType,
      furnished,
      bathRoomType,
      availableFrom,
      smoking,
      pets,
      rent,
    } = data
    console.log('data', data)
    // Housing type
    submit.housingType = []
    if (housingType.apartment.valueOf() === true) {
      submit.housingType?.push(HousingTypeEnum.APARTMENT)
    }
    if (housingType.shared.valueOf() === true) {
      submit.housingType?.push(HousingTypeEnum.SHARED)
    }
    if (housingType.studio.valueOf() === true) {
      submit.housingType?.push(HousingTypeEnum.STUDIO)
    }

    // Kitchen type
    submit.kitchenType = []
    if (kitchenType.inRoom.valueOf() === true) {
      submit.kitchenType.push(KitchenEnum.INROOM)
    }
    if (kitchenType.private.valueOf() === true) {
      submit.kitchenType.push(KitchenEnum.PRIVATE)
    }
    if (kitchenType.shared.valueOf() === true) {
      submit.kitchenType.push(KitchenEnum.SHARED)
    }

    // Furnished type
    submit.furnished = []
    if (furnished.furnished.valueOf() === true) {
      submit.furnished.push(FurnishedEnum.FURNISHED)
    }
    if (furnished.partiallyFunished.valueOf() === true) {
      submit.furnished.push(FurnishedEnum.PARTIALLY)
    }
    if (furnished.unfurnished.valueOf() === true) {
      submit.furnished.push(FurnishedEnum.UNFURNISHED)
    }

    // Bathroom type
    submit.bathroomType = []
    if (bathRoomType.private.valueOf() === true) {
      submit.bathroomType.push(BathroomEnum.PRIVATE)
    }
    if (bathRoomType.shared.valueOf() === true) {
      submit.bathroomType.push(BathroomEnum.SHARED)
    }

    // Rent
    if (rent !== '') {
      submit.rentMin = rent[0]
      submit.rentMax = rent[1]
    }

    // Smoking
    if (smoking === '') {
      submit.smoking === false
    } else submit.smoking = smoking

    // Pets
    if (pets === '') {
      submit.pets === false
    } else submit.pets = pets

    // Availability
    if (availableFrom !== '') {
      submit.availableFrom = availableFrom.toISOString()
    }

    console.log('submit', submit)
    try {
      const res = await instance.post(request('rooms', 'search'), submit)

      if (res.status === 201) {
        dispatch(setAllRooms(res.data))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Paper
      sx={{
        backgroundColor: 'rgb(225 225 225)',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack width="100%" gap={3} m="20px 0">
          <SearchItem
            headTitle="Housing type"
            icon={<HouseIcon fontSize="small" />}
          >
            <HousingType control={control} />
          </SearchItem>

          <SearchItem
            headTitle="Availability"
            icon={<CalendarMonthIcon fontSize="small" />}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller
                control={control}
                name="availableFrom"
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    inputFormat="yyyy/MM/dd"
                    renderInput={(params) => (
                      <TextField
                        sx={{ maxWidth: '200px' }}
                        {...params}
                        size="small"
                      />
                    )}
                  />
                )}
              />
            </LocalizationProvider>
          </SearchItem>

          <SearchItem headTitle="Rent" icon={<SellIcon fontSize="small" />}>
            <Rent control={control} rooms={sortMinMax(arrForSort)} />
          </SearchItem>

          <SearchItem
            headTitle="Smoking"
            icon={<SmokeFreeIcon fontSize="small" />}
          >
            <Controller
              control={control}
              name="smoking"
              render={({ field }) => (
                <FormControlLabel
                  {...field}
                  sx={{ m: '0' }}
                  control={<Checkbox sx={{ p: '5px' }} />}
                  label="smoking"
                />
              )}
            />
          </SearchItem>

          <SearchItem headTitle="Pets" icon={<PetsIcon fontSize="small" />}>
            <Controller
              control={control}
              name="pets"
              render={({ field }) => (
                <FormControlLabel
                  {...field}
                  sx={{ m: '0' }}
                  control={<Checkbox sx={{ p: '5px' }} />}
                  label="allowed"
                />
              )}
            />
          </SearchItem>

          <SearchItem
            headTitle="Bathroom"
            icon={<ShowerIcon fontSize="small" />}
          >
            <BathroomType control={control} />
          </SearchItem>

          <SearchItem
            headTitle="Furnished"
            icon={<ChairIcon fontSize="small" />}
          >
            <FurnishedType control={control} />
          </SearchItem>

          <SearchItem
            headTitle="Kitchen"
            icon={<SoupKitchenIcon fontSize="small" />}
          >
            <KitchenType control={control} />
          </SearchItem>
          <Button variant="contained" type="submit">
            Search
          </Button>
        </Stack>
      </form>
    </Paper>
  )
}
