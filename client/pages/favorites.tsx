import { Stack, Typography } from '@mui/material'

import AuthCheck from '../components/AuthCheck'
import RoomGrid from '../components/RoomLayout/RoomGrid'
import { useAppSelector } from '../hooks/hooks'

export default function Favorites() {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <AuthCheck>
      {user?.favLists.length ? (
        <RoomGrid rooms={user.favLists} />
      ) : (
        <Typography>Your favorite list is empty</Typography>
      )}
    </AuthCheck>
  )
}
