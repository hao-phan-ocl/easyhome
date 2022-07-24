import { useRouter } from 'next/router'
import { styled } from '@mui/system'
import { Button, Stack } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import FavoriteIcon from '@mui/icons-material/Favorite'
import InventoryIcon from '@mui/icons-material/Inventory'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'

export default function AccountNav() {
  const router = useRouter()

  const CustomizedButton = styled(Button)(
    ({ theme }) => `
    color: #888;
    border: 1px solid;
    padding: 5px 12px;
  `,
  )

  return (
    <Stack direction="row" gap={3}>
      <CustomizedButton startIcon={<PersonIcon />}>Account</CustomizedButton>
      <CustomizedButton startIcon={<FavoriteIcon />}>
        Favorites
      </CustomizedButton>
      <CustomizedButton startIcon={<InventoryIcon />}>
        My adverts
      </CustomizedButton>
      <CustomizedButton startIcon={<AdminPanelSettingsIcon />}>
        Admin
      </CustomizedButton>
    </Stack>
  )
}
