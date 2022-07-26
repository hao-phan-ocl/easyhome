import { Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  label: string
  children: ReactNode
}

export default function InputRow({ label, children }: Props) {
  return (
    <Stack mb={3} width="40%">
      <Stack
        alignItems={{ md: 'center', sm: 'flex-start' }}
        spacing={1}
        direction={{ md: 'row', sm: 'column', xs: 'column' }}
        width="100%"
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
    </Stack>
  )
}
