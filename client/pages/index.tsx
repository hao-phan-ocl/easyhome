import { Grid } from '@mui/material'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import { Box } from '@mui/system'
import Head from 'next/head'

import RoomGrid from '../components/RoomLayout/RoomGrid'
import SearchBar from '../components/SearchBar/SearchBar'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { fetchAllRooms } from '../redux/features/allRoomsSlice'

const Home: NextPage = () => {
  const dispatch = useAppDispatch()
  const { rooms, filteredRooms } = useAppSelector((state) => state.allRooms)

  useEffect(() => {
    dispatch(fetchAllRooms())
  }, [dispatch])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Head>
        <title>Easy Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4.3} lg={3}>
          <SearchBar />
        </Grid>
        <Grid item xs={12} sm={6} md={7.7} lg={9}>
          <RoomGrid rooms={filteredRooms.length ? filteredRooms : rooms} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home
