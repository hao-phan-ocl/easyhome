type RouteTypes = 'users' | 'rooms' | 'login'

type ApiTypes =
  | 'all'
  | 'register'
  | 'delete'
  | 'add-favorite'
  | 'remove-favorite'
  | 'add-room'
  | 'remove-room'
  | 'promote'
  | 'profile'
  | 'search'
  | 'local'
  | 'google'

type IdType = string

export function request(route: RouteTypes, type: ApiTypes, id: IdType = '') {
  return `${route}/${type}/${id}`
}
