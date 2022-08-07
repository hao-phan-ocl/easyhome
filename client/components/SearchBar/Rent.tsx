import Slider from '@mui/material/Slider'
import { useEffect, useState } from 'react'
import { Control, Controller } from 'react-hook-form'

import { Room } from '../../types/types'
import { SearchForm } from './SearchBar'

type Props = {
  control: Control<SearchForm, object>
  rooms: Room[]
}

export default function Rent({ control, rooms }: Props) {
  let min = rooms[0]?.rent
  let max = rooms[rooms.length - 1]?.rent

  return (
    <Controller
      name="rent"
      control={control}
      render={({ field: { onChange } }) => (
        <Slider
          // remember to add key
          // min & max might be changing therefore Slider needs to be controlled
          // when key value changes, React creates a new Slider
          // and initializes it with the new defaultValue as an uncontrolled component
          // key is component id for react
          sx={{ maxWidth: '190px' }}
          key={`slider-${min}-${max}`}
          onChange={(_, value) => {
            onChange(value)
          }}
          valueLabelDisplay="auto"
          max={max as number}
          min={min as number}
          defaultValue={[min as number, max as number]}
          step={50}
        />
      )}
    />
  )
}
