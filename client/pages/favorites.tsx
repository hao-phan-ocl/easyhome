import { Stack, Typography } from '@mui/material'

import AuthCheck from '../components/AuthCheck'
import RoomGridLarge from '../components/RoomLayout/RoomGridLarge'
import { useAppSelector } from '../hooks/hooks'

export default function Favorites() {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <AuthCheck>
      {user?.favLists.length ? (
        <RoomGridLarge rooms={user.favLists} />
      ) : (
        <Typography>Your favorite list is empty</Typography>
      )}
    </AuthCheck>
  )
}
