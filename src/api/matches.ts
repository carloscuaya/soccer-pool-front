import client from './client'

export interface Match {
    _id: string
    code: string
    localTeam: string
    scoreLocalTeam: number | null
    logoPathLocalTeam: string
    visitTeam: string
    scoreVisitTeam: number | null
    logoPathVisitTeam: string
    matchDate: string
    status: string
    userScore: number | null
}

export const getMatches = (username: string, tournamentId: string) =>
    client.get<Match[]>(`/matches/${username}/${tournamentId}`)

export const updateForecast = (matchId: string, scoreLocalTeam: number, scoreVisitTeam: number) =>
    client.put('/matches', { matchId, scoreLocalTeam, scoreVisitTeam })
