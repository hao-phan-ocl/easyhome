import { Button } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import RoomGrid from '../components/RoomLayout/RoomGrid'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { fetchAllRooms } from '../redux/features/allRoomsSlice'

const Home: NextPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { rooms } = useAppSelector((state) => state.allRooms)
  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchAllRooms())
  }, [dispatch])

  return (
    <>
      <Button onClick={() => router.push('/search')}>Search</Button>
      {user && <h1>Welcome {user.email}</h1>}
      <RoomGrid rooms={rooms} />
    </>
  )
}

export default Home
