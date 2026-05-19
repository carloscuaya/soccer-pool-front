import client from './client'

export interface Tournament {
    _id: string
    name: string
    matches_number: number
    status: string
    score: number | null
}

export interface UserProfile {
    _id: string
    username: string
    fullname: string
    hasUpdatedPassword?: boolean
    tournaments: Tournament[]
}

export const login = (username: string, password: string) =>
    client.post<{ access_token: string }>('/login', { username, password })

export const getUser = (username: string) =>
    client.get<UserProfile>(`/users/${username}`)

export const updatePassword = (username: string, newPassword: string) =>
    client.put('/users/password', { username, newPassword })
