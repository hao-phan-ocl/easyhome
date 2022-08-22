import { IconButton, Tooltip } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'

import MyDrawer from '../MyDrawer'

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false)

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
      <MyDrawer open={open} setOpen={setOpen} />
    </>
  )
}
