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
import { useAppDispatch } from '../../hooks/hooks'
import { setDialog } from '../../redux/features/popUpSlice'

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

  return (
    <>
      <MuiTableBody>
        {users.map((user) => (
          <StyledTableRow key={user.email}>
            <TableCell>
              <Typography>{user.firstName}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{user.lastName}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{user.email}</Typography>
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
                <Typography>{user.role}</Typography>
                {user.role !== 'ADMIN' && (
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => {
                      dispatch(setDialog(true))
                      setEditingUser(user)
                    }}
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
