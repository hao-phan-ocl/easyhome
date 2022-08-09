import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { ReactNode, SyntheticEvent, useState } from 'react'
import { Paper, Typography } from '@mui/material'

import CreateRoomForm from '../components/Form/CreateRoom/CreateRoomForm'
import AuthCheck from '../components/AuthCheck'
import { useAppSelector } from '../hooks/hooks'
import RoomGridLarge from '../components/RoomLayout/RoomGridLarge'

interface TabPanelProps {
  children?: ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function Listings() {
  const [value, setValue] = useState(0)
  const { user } = useAppSelector((state) => state.auth)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <AuthCheck>
      <Paper sx={{ bgcolor: 'rgb(225 225 225)' }}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="My Advert" {...a11yProps(0)} />
              <Tab label="Create a listing" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {!user?.properties.length ? (
              <Typography>Your listing is empty</Typography>
            ) : (
              <RoomGridLarge rooms={user.properties} />
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CreateRoomForm />
          </TabPanel>
        </Box>
      </Paper>
    </AuthCheck>
  )
}
