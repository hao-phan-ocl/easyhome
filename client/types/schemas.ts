export type User = {
  firstName: string
  lastName: string
  role: 'ADMIN' | 'MODERATOR' | 'USER'
  email: string
  password?: string
  favLists?: string
  properties?: string
}
