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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { User } from '../../types/schemas'
import SetRoleDialog from '../Dialog/SetRoleDialog'
import { useAppDispatch } from '../../hooks/hooks'
import { setDialog } from '../../redux/features/popUpSlice'
import DeleteUserDialog from '../Dialog/DeleteUserDialog'
import RemoveAccountBtn from '../Button/RemoveAccountBtn'
import emptyAvatar from '../../public/gray-avatar.jpg'

type Props = {
  users: User[]
}

export default function TableBody({ users }: Props) {
  const dispatch = useAppDispatch()
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [openDelUserDialog, setDelUserDialog] = useState(false)

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
                  sx={{ width: 40, height: 40, m: 'auto' }}
                />
              ) : (
                <Avatar sx={{ width: 40, height: 40, m: 'auto' }}>
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
                    startIcon={<EditOutlinedIcon />}
                    onClick={() => handleClick(elem)}
                  >
                    Edit role
                  </Button>
                )}
              </Stack>
            </TableCell>
            <TableCell>
              {elem.role !== 'ADMIN' && (
                // <Button
                //   color="error"
                //   startIcon={<DeleteOutlineIcon />}
                //   onClick={() => {
                //     setDelUserDialog(true)
                //     setEditingUser(elem)
                //   }}
                // >
                //   Delete user
                // </Button>
                <RemoveAccountBtn userId={elem._id} />
              )}
            </TableCell>
          </StyledTableRow>
        ))}
      </MuiTableBody>
      <SetRoleDialog user={editingUser} />
      {/* <DeleteUserDialog
        userId={editingUser?._id}
        openDelUserDialog={openDelUserDialog}
        setDelUserDialog={setDelUserDialog}
      /> */}
    </>
  )
}
