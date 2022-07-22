export type User = {
  _id: string
  firstName: string
  lastName: string
  role: 'ADMIN' | 'MODERATOR' | 'USER'
  email: string
  password?: string
  favLists?: string
  properties?: string
}
