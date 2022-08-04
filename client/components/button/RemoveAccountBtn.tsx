import { useState } from 'react'
import { Button } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import DeleteUserDialog from '../Dialog/DeleteUserDialog'

type Props = {
  userId: string
}

export default function RemoveAccountBtn({ userId }: Props) {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <>
      <Button
        size="small"
        color="error"
        startIcon={<DeleteOutlineIcon />}
        onClick={() => {
          setOpenDialog(true)
        }}
      >
        Remove account
      </Button>
      <DeleteUserDialog
        userId={userId}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  )
}
