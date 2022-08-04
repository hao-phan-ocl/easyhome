import { Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import RoomCardLarge from '../../components/RoomLayout/RoomCardLarge'
import { Room } from '../../types/schemas'

export default function RoomId() {
  const router = useRouter()
  const { roomId } = router.query

  const [room, setRoom] = useState<Room>()

  useEffect(() => {
    async function fetchRoom() {
      try {
        const res = await instance.get<Room>(
          request('rooms', 'single', roomId as string),
        )
        if (res.status === 200) {
          setRoom(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (roomId) {
      fetchRoom()
    }
  }, [roomId])

  return (
    <Stack>
      {room && <RoomCardLarge room={room} />}
      <Stack></Stack>
    </Stack>
  )
}
