import { Checkbox, FormControlLabel } from '@mui/material'
import { Control, Controller } from 'react-hook-form'
import { SearchForm } from './SearchBar'

type Props = {
  control: Control<SearchForm, object>
}

export default function BathroomType({ control }: Props) {
  return (
    <>
      <Controller
        control={control}
        name="bathRoomType.private"
        render={({ field }) => (
          <FormControlLabel
            {...field}
            sx={{ m: '0' }}
            control={<Checkbox sx={{ p: '5px' }} />}
            label="private bathroom"
          />
        )}
      />
      <Controller
        control={control}
        name="bathRoomType.shared"
        render={({ field }) => (
          <FormControlLabel
            {...field}
            sx={{ m: '0' }}
            control={<Checkbox sx={{ p: '5px' }} />}
            label="shared bathroom"
          />
        )}
      />
    </>
  )
}
