import {
  TableCell,
  tableCellClasses,
  TableRow,
  Typography,
  styled,
} from '@mui/material'
import MuiTableHead from '@mui/material/TableHead'

export default function TableHead() {
  const headers = ['Photo', 'First name', 'Last name', 'Email', 'Role', '']

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  }))

  return (
    <MuiTableHead>
      <TableRow>
        {headers.map((header) => (
          <StyledTableCell key={header}>
            <Typography>{header}</Typography>
          </StyledTableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  )
}
