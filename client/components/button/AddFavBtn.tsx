import { IconButton } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { addFav, removeFav } from '../../redux/features/authSlice'

type Props = {
  roomId: string
}

export default function AddFavBtn({ roomId }: Props) {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  const added = user?.favLists.some((elem) => elem._id === roomId)

  function handleOnClick(roomId: string) {
    if (added) dispatch(removeFav(roomId))
    else dispatch(addFav(roomId))
  }

  return (
    <IconButton onClick={() => handleOnClick(roomId)} color="primary">
      {added ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  )
}
