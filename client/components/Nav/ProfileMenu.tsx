import { useState } from 'react'
import {
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material'
import { useRouter } from 'next/router'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import LockIcon from '@mui/icons-material/Lock'

import { User } from '../../types/schemas'
import { useAppDispatch } from '../../hooks/hooks'
import { logout } from '../../redux/features/authSlice'

type MenuProps = {
  user: User
}

export default function ProfileMenu({ user }: MenuProps) {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  function handleLogout() {
    dispatch(logout())
    localStorage.clear()
    router.push('/')
  }

  return (
    <>
      <Button onClick={handleClick}>
        {user?.firstName + ' ' + user?.lastName}
        <ArrowDropDownIcon />
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            router.push('/dashboard/account')
            handleClose()
          }}
        >
          Account
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push('/dashboard/favorites')
            handleClose()
          }}
        >
          Favorites
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push('/dashboard/listings')
            handleClose()
          }}
        >
          My adverts
        </MenuItem>
        {user.role !== 'USER' && (
          <MenuItem
            onClick={() => {
              router.push('/dashboard/admin')
              handleClose()
            }}
          >
            Admin
          </MenuItem>
        )}

        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon sx={{ minWidth: 0 }}>
            <LockIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Log out</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
