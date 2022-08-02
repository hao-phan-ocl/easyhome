import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

import AuthCheck from '../../components/AuthCheck'
import RemoveAccountBtn from '../../components/Button/RemoveAccountBtn'
import { useAppSelector } from '../../hooks/hooks'
import emptyAvatar from '../../public/gray-avatar.jpg'

export default function Account() {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <AuthCheck>
      <Stack alignItems="center">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            {user?.avatar ? (
              <Avatar
                alt="Avatar"
                src={`http://${user?.avatar}`}
                sx={{ width: 80, height: 80, m: 'auto' }}
              />
            ) : (
              <Avatar sx={{ width: 80, height: 80, m: 'auto' }}>
                <Image src={emptyAvatar} alt="Avatar" />
              </Avatar>
            )}
            <Divider sx={{ m: '15px 0' }} />
            <Typography fontWeight={800}>First name</Typography>
            <Typography mb={2}>{user?.firstName}</Typography>
            <Typography fontWeight={800}>Last name</Typography>
            <Typography mb={2}>{user?.lastName}</Typography>
            <Typography fontWeight={800}>Email</Typography>
            <Typography mb={2}>{user?.email}</Typography>
            <Typography fontWeight={800}>Account role</Typography>
            <Typography mb={2}>{user?.role}</Typography>
            {user?.gender && (
              <>
                <Typography fontWeight={800}>Gender</Typography>
                <Typography mb={2}>{user?.gender}</Typography>
              </>
            )}
            {user?.country && (
              <>
                <Typography fontWeight={800}>Country</Typography>
                <Typography mb={2}>{user?.country}</Typography>
              </>
            )}
          </CardContent>
          <CardActions>
            <Stack gap={2} m="auto" alignItems="center">
              <Link href="/account/account-info">
                <a>
                  <Button size="small" variant="contained">
                    Edit profile
                  </Button>
                </a>
              </Link>
              <RemoveAccountBtn userId={user?._id} />
            </Stack>
          </CardActions>
        </Card>
      </Stack>
    </AuthCheck>
  )
}
