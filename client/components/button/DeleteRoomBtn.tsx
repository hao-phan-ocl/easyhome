import { IconButton, Tooltip } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import { useAppDispatch } from '../../hooks/hooks'
import {
  openSnackBarSuccess,
  setSnackBarMsg,
} from '../../redux/features/popUpSlice'
import DeleteDialog from '../Dialog/DeleteDialog'
import { useState } from 'react'
import { fetchRoom } from '../../redux/features/roomSlice'

type Props = {
  roomId: string
}

export default function DeleteRoomBtn({ roomId }: Props) {
  const [openDialog, setOpenDialog] = useState(false)
  const dispatch = useAppDispatch()

  async function handleDelete() {
    try {
      const res = await instance.delete(request('users', 'remove-room', roomId))

      if (res.status === 200) {
        dispatch(openSnackBarSuccess(true))
        dispatch(setSnackBarMsg('Room deleted!'))
        dispatch(fetchRoom(roomId))
        setOpenDialog(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Tooltip title="Delete Room" arrow>
        <IconButton
          color="secondary"
          size="small"
          onClick={() => setOpenDialog(true)}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Tooltip>
      <DeleteDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        handleDelete={handleDelete}
      />
    </>
  )
}
