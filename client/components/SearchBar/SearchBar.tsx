import { ReactNode, useEffect, useState } from 'react'
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
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
import { Room } from '../../types/schemas'
import { fetchAllRooms } from '../../redux/features/allRoomsSlice'

export type SearchForm = {
  housingType: {
    studio: string
    apartment: string
    shared: string
  }
  availableFrom: Date
  bathRoomType: {
    shared: string
    private: string
  }
  kitchenType: {
    inRoom: string
    share: string
    private: string
  }
  furnished: {
    furnished: string
    unfurnished: string
    partiallyFunished: string
  }
  smoking: string
  pets: string
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
      availableFrom: new Date(),
      bathRoomType: {
        shared: '',
        private: '',
      },
      kitchenType: {
        inRoom: '',
        share: '',
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

  function onSubmit(data: SearchForm) {
    console.log(data)
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
