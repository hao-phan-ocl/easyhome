import { Button } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useState } from 'react'

import DeleteUserDialog from '../Dialog/DeleteUserDialog'

type Props = {
  userId?: string
}

export default function RemoveAccountBtn({ userId }: Props) {
  const [openDelUserDialog, setDelUserDialog] = useState(false)

  return (
    <>
      <Button
        color="error"
        startIcon={<DeleteOutlineIcon />}
        onClick={() => {
          setDelUserDialog(true)
        }}
      >
        Remove account
      </Button>
      <DeleteUserDialog
        userId={userId}
        openDelUserDialog={openDelUserDialog}
        setDelUserDialog={setDelUserDialog}
      />
    </>
  )
}
