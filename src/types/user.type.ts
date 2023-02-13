export interface IProfile {
  user_id: number
  numberPhone: null | string
  address: null | string
  gender: null | string
  avatar: null | string
  dob: null | string
  created_at: string
  updated_at: string
}
export interface IUser {
  id: number
  name: string
  email: string
  email_verified_at: null | string
  profiles: IProfile
}
export interface IDateUpdateUser {
  name: string
  numberPhone: string
  address: string
  gender: string
  dob: string
}
