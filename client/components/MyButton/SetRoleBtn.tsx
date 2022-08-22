import { useState } from 'react'
import { Button } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import SetRoleDialog from '../Dialog/SetRoleDialog'
import { User } from '../../types/types'

type Props = {
  user: User
}

export default function SetRoleBtn({ user }: Props) {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <>
      <Button
        size="small"
        startIcon={<EditOutlinedIcon />}
        onClick={() => {
          setOpenDialog(true)
        }}
      >
        Edit role
      </Button>
      <SetRoleDialog
        user={user}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  )
}
