import client from './client'
import type { Match } from './matches'

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
