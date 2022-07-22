import { Paper, Table, TableContainer } from '@mui/material'
import { useEffect } from 'react'

import TableBody from './TableBody'
import TableHead from './TableHead'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { getAllUsers } from '../../redux/features/usersSlice'

export default function AdminTable() {
  const { users } = useAppSelector((state) => state.users)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead />
        <TableBody users={users} />
      </Table>
    </TableContainer>
  )
}
