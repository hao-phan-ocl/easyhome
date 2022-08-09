import { Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  label: string | ReactNode
  children: ReactNode
}

export default function InputRow({ label, children }: Props) {
  return (
    <Stack
      alignItems="flex-start"
      spacing={2}
      direction={{ md: 'row', sm: 'row', xs: 'column' }}
      mb={3}
    >
      <Typography
        mt="7px"
        fontWeight={700}
        textAlign={{ md: 'right', sm: 'right', xs: 'left' }}
        width={{ md: '20%', sm: '30%', xs: '100%' }}
      >
        {label}
      </Typography>
      <Stack width={{ md: '30%', sm: '40%', xs: '80%' }}>{children}</Stack>
    </Stack>
  )
}
