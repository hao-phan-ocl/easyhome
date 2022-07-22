import MuiTableBody from '@mui/material/TableBody'
import { useState } from 'react'
import {
  Button,
  Stack,
  styled,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

import { User } from '../../types/schemas'
import SetRoleDialog from '../Dialog/SetRoleDialog'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { setDialog, setSnackBarError } from '../../redux/features/popUpSlice'

type Props = {
  users: User[]
}

export default function TableBody({ users }: Props) {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
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
    // if (user?.role === 'ADMIN') {
    dispatch(setDialog(true))
    setEditingUser(elem)
    // } else dispatch(setSnackBarError(true))
  }

  return (
    <>
      <MuiTableBody>
        {users.map((elem) => (
          <StyledTableRow key={elem.email}>
            <TableCell>
              <Typography>{elem.firstName}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{elem.lastName}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{elem.email}</Typography>
            </TableCell>
            {/* <TableCell>
            <Typography>{user.properties}</Typography>
          </TableCell> */}
            <TableCell>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography>{elem.role}</Typography>
                {elem.role !== 'ADMIN' && (
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleClick(elem)}
                  >
                    Edit role
                  </Button>
                )}
              </Stack>
            </TableCell>
          </StyledTableRow>
        ))}
      </MuiTableBody>
      <SetRoleDialog user={editingUser} />
    </>
  )
}
