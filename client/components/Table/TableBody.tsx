import MuiTableBody from '@mui/material/TableBody'
import Image from 'next/image'
import {
  Avatar,
  Stack,
  styled,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'

import { User } from '../../types/schemas'
import { useAppSelector } from '../../hooks/hooks'
import RemoveAccountBtn from '../Button/RemoveAccountBtn'
import emptyAvatar from '../../public/gray-avatar.jpg'
import SetRoleBtn from '../Button/SetRoleBtn'

type Props = {
  users: User[]
}

export default function TableBody({ users }: Props) {
  const { user } = useAppSelector((state) => state.auth)

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }))

  return (
    <>
      <MuiTableBody>
        {users.map((elem) => (
          <StyledTableRow key={elem._id}>
            <TableCell>
              {elem?.avatar ? (
                <Avatar
                  alt="Avatar"
                  src={`http://${elem?.avatar}`}
                  sx={{ width: 40, height: 40, mr: 'auto' }}
                />
              ) : (
                <Avatar sx={{ width: 40, height: 40, mr: 'auto' }}>
                  <Image src={emptyAvatar} alt="Avatar" />
                </Avatar>
              )}
            </TableCell>
            <TableCell>
              <Typography
                color={user?.email === elem.email ? 'secondary' : 'inherit'}
              >
                {elem.firstName}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                color={user?.email === elem.email ? 'secondary' : 'inherit'}
              >
                {elem.lastName}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                color={user?.email === elem.email ? 'secondary' : 'inherit'}
              >
                {elem.email}
              </Typography>
            </TableCell>
            <TableCell>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  color={user?.email === elem.email ? 'secondary' : 'inherit'}
                >
                  {elem.role}
                </Typography>
                {elem.role !== 'ADMIN' && <SetRoleBtn user={elem} />}
              </Stack>
            </TableCell>
            <TableCell>
              {elem.role !== 'ADMIN' && <RemoveAccountBtn userId={elem._id} />}
            </TableCell>
          </StyledTableRow>
        ))}
      </MuiTableBody>
    </>
  )
}
