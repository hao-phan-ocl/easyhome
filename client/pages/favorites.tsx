import { Typography } from '@mui/material'
import Head from 'next/head'

import AuthCheck from '../components/AuthCheck'
import RoomGridLarge from '../components/RoomLayout/RoomGridLarge'
import { useAppSelector } from '../hooks/hooks'

export default function Favorites() {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <AuthCheck>
      <Head>
        <title>Favorites</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {user?.favLists.length ? (
        <RoomGridLarge rooms={user.favLists} />
      ) : (
        <Typography>Your favorite list is empty</Typography>
      )}
    </AuthCheck>
  )
}
