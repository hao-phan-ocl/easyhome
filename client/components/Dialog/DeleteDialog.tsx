import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Stack,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { Dispatch, forwardRef, SetStateAction } from 'react'

type Props = {
  openDialog: boolean
  setOpenDialog: Dispatch<SetStateAction<boolean>>
  handleDelete: () => void
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function DeleteDialog({
  openDialog,
  setOpenDialog,
  handleDelete,
}: Props) {
  return (
    <Dialog
      TransitionComponent={Transition}
      open={openDialog}
      onClose={() => setOpenDialog(false)}
    >
      <Stack p="10px 0">
        <DialogTitle fontWeight={800}>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will be deleted permanently
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setOpenDialog(false)
            }}
            sx={{ marginRight: '7px' }}
            size="small"
          >
            Cancel
          </Button>
          <Button size="small" onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  )
}
