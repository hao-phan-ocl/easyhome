import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material'
import Link from 'next/link'

import AuthCheck from '../../components/AuthCheck'
import RemoveAccountBtn from '../../components/Button/RemoveAccountBtn'
import { useAppSelector } from '../../hooks/hooks'

export default function Account() {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <AuthCheck>
      <Stack alignItems="center">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography fontWeight={800}>First name</Typography>
            <Typography mb={2}>{user?.firstName}</Typography>
            <Typography fontWeight={800}>Last name</Typography>
            <Typography mb={2}>{user?.lastName}</Typography>
            <Typography fontWeight={800}>Email</Typography>
            <Typography mb={2}>{user?.email}</Typography>
            <Typography fontWeight={800}>Account role</Typography>
            <Typography>{user?.role}</Typography>
          </CardContent>
          <CardActions>
            <Stack gap={2}>
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
