import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { styled } from '@mui/system'
import { Button, Stack } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import FavoriteIcon from '@mui/icons-material/Favorite'
import InventoryIcon from '@mui/icons-material/Inventory'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'

import { useAppSelector } from '../../hooks/hooks'

export default function SubNav() {
  const router = useRouter()
  const { user } = useAppSelector((state) => state.auth)
  const [path, setPath] = useState<string>('')

  const CustomizedButton = styled(Button)(`
    border: 1px solid;
    padding: 5px 12px;
  `)

  useEffect(() => {
    const path = router.pathname.substring(11)
    setPath(path)
  }, [router])

  return (
    <Stack direction="row" gap={3}>
      <CustomizedButton
        startIcon={<PersonIcon />}
        onClick={() => {
          router.push('/dashboard/account')
          setPath('account')
        }}
        sx={{ color: path === 'account' ? 'primary' : '#888' }}
      >
        Account
      </CustomizedButton>
      <CustomizedButton
        startIcon={<FavoriteIcon />}
        onClick={() => {
          router.push('/dashboard/favorites')
          setPath('favorites')
        }}
        sx={{ color: path === 'favorites' ? 'primary' : '#888' }}
      >
        Favorites
      </CustomizedButton>
      <CustomizedButton
        startIcon={<InventoryIcon />}
        onClick={() => {
          router.push('/dashboard/listings')
          setPath('listings')
        }}
        sx={{ color: path === 'listings' ? 'primary' : '#888' }}
      >
        My adverts
      </CustomizedButton>
      {user?.role !== 'USER' && (
        <CustomizedButton
          startIcon={<AdminPanelSettingsIcon />}
          onClick={() => {
            router.push('/dashboard/admin')
            setPath('admin')
          }}
          sx={{ color: path === 'admin' ? 'primary' : '#888' }}
        >
          Admin
        </CustomizedButton>
      )}
    </Stack>
  )
}
