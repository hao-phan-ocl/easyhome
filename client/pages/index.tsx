import { Button } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import instance from '../axios/instance'
import { request } from '../axios/requests'

import RoomGrid from '../components/RoomLayout/RoomGrid'
import { useAppSelector } from '../hooks/hooks'
import { Room } from '../types/schemas'

const Home: NextPage = () => {
  const router = useRouter()
  const { user } = useAppSelector((state) => state.auth)
  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    async function getRooms() {
      const res = await instance.get<Room[]>(request('rooms', 'all'))
      setRooms(res.data)
    }

    getRooms()
  }, [])

  return (
    <>
      <Button onClick={() => router.push('/search')}>Search</Button>
      {user && <h1>Welcome {user.email}</h1>}
      <RoomGrid rooms={rooms} />
    </>
  )
}

export default Home
