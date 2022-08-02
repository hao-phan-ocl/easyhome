import MuiTableBody from '@mui/material/TableBody'
import { useState } from 'react'
import Image from 'next/image'
import {
  Avatar,
  Button,
  Stack,
  styled,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import { User } from '../../types/schemas'
import SetRoleDialog from '../Dialog/SetRoleDialog'
import { useAppDispatch } from '../../hooks/hooks'
import { setDialog } from '../../redux/features/popUpSlice'
import RemoveAccountBtn from '../Button/RemoveAccountBtn'
import emptyAvatar from '../../public/gray-avatar.jpg'

type Props = {
  users: User[]
}

export default function TableBody({ users }: Props) {
  const dispatch = useAppDispatch()
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }))

  function handleClick(elem: User) {
    dispatch(setDialog(true))
    setEditingUser(elem)
  }

  return (
    <>
      <MuiTableBody>
        {users.map((elem) => (
          <StyledTableRow key={elem.email}>
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
              <Typography>{elem.firstName}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{elem.lastName}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{elem.email}</Typography>
            </TableCell>
            <TableCell>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography>{elem.role}</Typography>
                {elem.role !== 'ADMIN' && (
                  <Button
                    startIcon={<EditOutlinedIcon />}
                    onClick={() => handleClick(elem)}
                  >
                    Edit role
                  </Button>
                )}
              </Stack>
            </TableCell>
            <TableCell>
              {elem.role !== 'ADMIN' && <RemoveAccountBtn userId={elem._id} />}
            </TableCell>
          </StyledTableRow>
        ))}
      </MuiTableBody>
      <SetRoleDialog user={editingUser} />
    </>
  )
}
