import client from './client'
import type { Match } from './matches'

export interface CreateTournamentPayload {
    name: string
    matches_number: number
    status: string
}

export interface Tournament {
    _id: string
    name: string
    matches_number: number
    status: string
}

export interface LeaderboardEntry {
    userId: string
    username: string
    score: number
    position?: number
    slow_payer?: boolean
}

export const getLeaderboard = (tournamentId: string) =>
    client.get<LeaderboardEntry[]>(`/tournaments/leaderboard/${tournamentId}`)

export const getTournamentMatches = (tournamentId: string) =>
    client.get<Match[]>(`/tournaments/matches/?tournament_id=${tournamentId}`)

export type UpdateTournamentPayload = Partial<CreateTournamentPayload>

export const getTournaments = () =>
    client.get<Tournament[]>('/tournaments/')

export const createTournament = (payload: CreateTournamentPayload) =>
    client.post<Tournament>('/tournaments/', payload)

export const updateTournament = (tournamentId: string, payload: UpdateTournamentPayload) =>
    client.put<Tournament>(`/tournaments/${tournamentId}`, payload)
