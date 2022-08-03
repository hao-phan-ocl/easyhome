import { useRouter } from 'next/router'

export default function RoomId() {
  const router = useRouter()
  const { roomId } = router.query
  return <div>{roomId}</div>
}
