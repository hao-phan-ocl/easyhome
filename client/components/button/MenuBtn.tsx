import {
  Avatar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { Box } from '@mui/system'
import PersonIcon from '@mui/icons-material/Person'
import FavoriteIcon from '@mui/icons-material/Favorite'
import InventoryIcon from '@mui/icons-material/Inventory'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import LockIcon from '@mui/icons-material/Lock'
import Image from 'next/image'
import { useRouter } from 'next/router'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LoginIcon from '@mui/icons-material/Login'

import emptyAvatar from '../../public/gray-avatar.jpg'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { logout } from '../../redux/features/authSlice'
import Link from 'next/link'

export default function MenuBtn() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { user } = useAppSelector((state) => state.auth)

  function handleLogout() {
    dispatch(logout())
    localStorage.clear()
    router.push('/')
    setOpen(false)
  }

  return (
    <>
      <Tooltip title="More" arrow>
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            display: { sm: 'flex', md: 'none', lg: 'none' },
            position: 'absolute',
            left: 15,
          }}
        >
          <MenuIcon fontSize="large" color="primary" />
        </IconButton>
      </Tooltip>

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
                    alt="Avatar"
                    src={`http://${user?.avatar}`}
                    sx={{ width: 40, height: 40 }}
                  />
                ) : (
                  <Avatar sx={{ width: 40, height: 40 }}>
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
    </>
  )
}
