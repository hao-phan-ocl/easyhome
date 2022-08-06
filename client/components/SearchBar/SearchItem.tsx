import { Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'

type HeaderProps = {
  headTitle: string
  icon: ReactNode
  children: ReactNode
}

export default function SearchItem({ headTitle, icon, children }: HeaderProps) {
  return (
    <Stack gap={1}>
      <Stack direction="row" gap={1} alignItems="center">
        {icon}
        <Typography fontWeight={650}>{headTitle}</Typography>
      </Stack>
      {children}
    </Stack>
  )
}
