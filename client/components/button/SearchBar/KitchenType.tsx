import { Checkbox, FormControlLabel } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

import { SearchForm } from './SearchBar'

type Props = {
  control: Control<SearchForm, object>
}

export default function KitchenType({ control }: Props) {
  return (
    <>
      <Controller
        control={control}
        name="kitchenType.inRoom"
        render={({ field }) => (
          <FormControlLabel
            {...field}
            sx={{ m: '0' }}
            control={<Checkbox sx={{ p: '5px' }} />}
            label="in room"
          />
        )}
      />
      <Controller
        control={control}
        name="kitchenType.share"
        render={({ field }) => (
          <FormControlLabel
            {...field}
            sx={{ m: '0' }}
            control={<Checkbox sx={{ p: '5px' }} />}
            label="shared kitchen"
          />
        )}
      />
      <Controller
        control={control}
        name="kitchenType.private"
        render={({ field }) => (
          <FormControlLabel
            {...field}
            sx={{ m: '0' }}
            control={<Checkbox sx={{ p: '5px' }} />}
            label="private (separate room)"
          />
        )}
      />
    </>
  )
}
