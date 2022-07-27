import { Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  label: string
  children: ReactNode
}

export default function InputRow({ label, children }: Props) {
  return (
    <Stack
      alignItems={{ md: 'center', sm: 'flex-start' }}
      spacing={2}
      direction={{ md: 'row', sm: 'column', xs: 'column' }}
      width="40%"
      mb={3}
    >
      <Typography
        fontWeight={700}
        textAlign={{ md: 'right', sm: 'left' }}
        width="100%"
      >
        {label}
      </Typography>
      {children}
    </Stack>
  )
}
