import { Checkbox, FormControlLabel } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

import { SearchForm } from './SearchBar'

type Props = {
  control: Control<SearchForm, object>
}

export default function FurnishedType({ control }: Props) {
  return (
    <>
      <Controller
        control={control}
        name="furnished.furnished"
        render={({ field }) => (
          <FormControlLabel
            {...field}
            sx={{ m: '0' }}
            control={<Checkbox sx={{ p: '5px' }} />}
            label="furnished"
          />
        )}
      />
      <Controller
        control={control}
        name="furnished.unfurnished"
        render={({ field }) => (
          <FormControlLabel
            {...field}
            sx={{ m: '0' }}
            control={<Checkbox sx={{ p: '5px' }} />}
            label="unfurnished"
          />
        )}
      />
      <Controller
        control={control}
        name="furnished.partiallyFunished"
        render={({ field }) => (
          <FormControlLabel
            {...field}
            sx={{ m: '0' }}
            control={<Checkbox sx={{ p: '5px' }} />}
            label="partially furnished"
          />
        )}
      />
    </>
  )
}
