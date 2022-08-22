import { Stack } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import RoomCardLarge from '../../components/RoomLayout/RoomCardLarge'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { fetchRoom } from '../../redux/features/roomSlice'

export default function RoomId() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { room } = useAppSelector((state) => state.room)
  const { roomId } = router.query

  useEffect(() => {
    if (roomId) dispatch(fetchRoom(roomId as string))
  }, [roomId, dispatch])

  return (
    <Stack>
      <Head>
        <title>Room Detail</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {room && <RoomCardLarge room={room} />}
      <Stack></Stack>
    </Stack>
  )
}
