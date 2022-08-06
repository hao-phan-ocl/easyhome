import { Checkbox, FormControlLabel } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

import { SearchForm } from './SearchBar'

type Props = {
  control: Control<SearchForm, object>
}

export default function HousingType({ control }: Props) {
  return (
    <>
      <Controller
        name="housingType.apartment"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            {...field}
            sx={{ m: '0' }}
            control={<Checkbox sx={{ p: '5px' }} />}
            label="apartment"
          />
        )}
      />
      <Controller
        name="housingType.studio"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            {...field}
            sx={{ m: '0' }}
            control={<Checkbox sx={{ p: '5px' }} />}
            label="studio"
          />
        )}
      />
      <Controller
        name="housingType.shared"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            {...field}
            sx={{ m: '0' }}
            control={<Checkbox sx={{ p: '5px' }} />}
            label="shared"
          />
        )}
      />
    </>
  )
}
