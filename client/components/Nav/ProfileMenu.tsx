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
import Link from 'next/link'

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
        <Link href="/account">
          <a>
            <MenuItem
              onClick={() => {
                handleClose()
              }}
            >
              Account
            </MenuItem>
          </a>
        </Link>
        <Link href="/favorites">
          <a>
            <MenuItem
              onClick={() => {
                handleClose()
              }}
            >
              Favorites
            </MenuItem>
          </a>
        </Link>
        <Link href="/listings">
          <a>
            <MenuItem
              onClick={() => {
                handleClose()
              }}
            >
              My adverts
            </MenuItem>
          </a>
        </Link>
        {user.role !== 'USER' && (
          <Link href="/admin">
            <a>
              <MenuItem
                onClick={() => {
                  handleClose()
                }}
              >
                Admin
              </MenuItem>
            </a>
          </Link>
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
