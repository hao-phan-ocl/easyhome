import { IconButton, Tooltip } from '@mui/material'
import LoopIcon from '@mui/icons-material/Loop'

type Props = {
  handleFlip: () => void
}

export default function FlipBtn({ handleFlip }: Props) {
  function handleClick() {
    handleFlip()
  }

  return (
    <Tooltip title="More" arrow>
      <IconButton color="primary" size="small" onClick={handleClick}>
        <LoopIcon />
      </IconButton>
    </Tooltip>
  )
}
