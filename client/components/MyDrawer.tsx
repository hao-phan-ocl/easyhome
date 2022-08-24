import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import PersonIcon from '@mui/icons-material/Person'
import FavoriteIcon from '@mui/icons-material/Favorite'
import InventoryIcon from '@mui/icons-material/Inventory'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import LockIcon from '@mui/icons-material/Lock'
import LoginIcon from '@mui/icons-material/Login'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useRouter } from 'next/router'

import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { logout } from '../redux/features/authSlice'
import emptyAvatar from '../public/gray-avatar.jpg'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function MyDrawer({ open, setOpen }: Props) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  function handleLogout() {
    dispatch(logout())
    localStorage.clear()
    router.push('/')
    setOpen(false)
  }

  return (
    <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
      <Box role="presentation" width={250}>
        {user ? (
          <>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              p="15px 0"
            >
              {user?.avatar ? (
                <Avatar
                  sx={{ marginRight: '15px', width: 35, height: 35 }}
                  src={user?.avatar}
                  alt="Avatar"
                />
              ) : (
                <Avatar sx={{ marginRight: '15px', width: 35, height: 35 }}>
                  <Image src={emptyAvatar} alt="Avatar" />
                </Avatar>
              )}

              <Typography color="primary" fontSize={18}>
                {user?.firstName} {user?.lastName}
              </Typography>
            </Stack>
            <Divider />
            <List sx={{ color: '#888' }}>
              <Link href="/account">
                <a>
                  <ListItem>
                    <ListItemButton
                      sx={{ gap: '20px' }}
                      onClick={() => setOpen(false)}
                    >
                      <PersonIcon />
                      <ListItemText primary="Account" />
                    </ListItemButton>
                  </ListItem>
                </a>
              </Link>

              <Link href="/favorites">
                <a>
                  <ListItem color="#888">
                    <ListItemButton
                      sx={{ gap: '20px' }}
                      onClick={() => setOpen(false)}
                    >
                      <FavoriteIcon />
                      <ListItemText primary="Favorites" />
                    </ListItemButton>
                  </ListItem>
                </a>
              </Link>

              <Link href="listings">
                <a>
                  <ListItem>
                    <ListItemButton
                      sx={{ gap: '20px' }}
                      onClick={() => setOpen(false)}
                    >
                      <InventoryIcon />
                      <ListItemText primary="My adverts" />
                    </ListItemButton>
                  </ListItem>
                </a>
              </Link>

              <Link href="admin">
                <a>
                  <ListItem>
                    <ListItemButton
                      sx={{ gap: '20px' }}
                      onClick={() => setOpen(false)}
                    >
                      <AdminPanelSettingsIcon />
                      <ListItemText primary="Admin" />
                    </ListItemButton>
                  </ListItem>
                </a>
              </Link>
            </List>
            <Divider />
            <List sx={{ color: '#888' }}>
              <ListItem>
                <ListItemButton sx={{ gap: '20px' }} onClick={handleLogout}>
                  <LockIcon />
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        ) : (
          <List sx={{ color: '#888' }}>
            <Link href="register">
              <a>
                <ListItem>
                  <ListItemButton
                    sx={{ gap: '20px' }}
                    onClick={() => setOpen(false)}
                  >
                    <AccountCircleIcon />
                    <ListItemText primary="Register" />
                  </ListItemButton>
                </ListItem>
              </a>
            </Link>

            <Link href="login">
              <a>
                <ListItem>
                  <ListItemButton
                    sx={{ gap: '20px' }}
                    onClick={() => setOpen(false)}
                  >
                    <LoginIcon />
                    <ListItemText primary="Log in" />
                  </ListItemButton>
                </ListItem>
              </a>
            </Link>
          </List>
        )}
      </Box>
    </Drawer>
  )
}
