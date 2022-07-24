import { Button } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import RoomGrid from '../components/RoomGrid'
import { useAppSelector } from '../hooks/hooks'

const Home: NextPage = () => {
  const router = useRouter()
  const { user } = useAppSelector((state) => state.auth)

  return (
    <>
      <Button onClick={() => router.push('/search')}>Search</Button>
      <Button onClick={() => router.push('/add-room')}>Create room</Button>
      {user && <h1>Welcome {user.email}</h1>}
      <RoomGrid />
    </>
  )
}

export default Home
