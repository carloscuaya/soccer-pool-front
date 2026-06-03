import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { getTournaments, type Tournament } from '@api/tournaments'
import { useNavActions } from '@layouts/NavActionsContext'

const statusBadgeClass = (status: string) =>
    status === 'active'
        ? 'bg-gradient-to-br from-primary to-primary-container text-on-primary'
        : 'bg-surface-container-highest text-on-surface-variant'

function TournamentsAdmin() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { setTopNavActions } = useNavActions()

    const username = localStorage.getItem('username')

    const [tournaments, setTournaments] = useState<Tournament[]>([])
    const [loading, setLoading] = useState(true)

    const fetchTournaments = useCallback(async () => {
        setLoading(true)
        try {
            const res = await getTournaments()
            setTournaments(res.data)
        } catch {
            // silent — list stays empty
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (username !== 'hisoka') {
            navigate('/home')
            return
        }

        setTopNavActions(
            <button
                onClick={() => navigate('/home')}
                className="p-2 rounded-full hover:bg-sky-50 transition-colors"
            >
                <span className="material-symbols-outlined text-green-800">arrow_back</span>
            </button>
        )

        fetchTournaments()

        return () => setTopNavActions(null)
    }, [navigate, setTopNavActions, username, fetchTournaments])

    return (
        <main className="pt-20 pb-28 px-6 min-h-screen bg-surface-container">
            {/* Header */}
            <header className="mb-10 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-black text-on-surface tracking-tight leading-none">
                        {t('tournamentsAdmin.title')}
                    </h1>
                    <p className="mt-2 text-sm text-on-surface-variant leading-relaxed max-w-xs">
                        {t('tournamentsAdmin.subtitle')}
                    </p>
                </div>
                <button
                    onClick={() => navigate('/tournaments-admin/create')}
                    className="mt-1 flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold transition-all hover:brightness-95"
                >
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
                    New
                </button>
            </header>

            {/* Tournament List */}
            <section className="flex flex-col gap-4">
                {loading ? (
                    <>
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-surface-container-lowest rounded-3xl p-5 animate-pulse flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex-shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3.5 bg-surface-container-high rounded-full w-2/3" />
                                    <div className="h-2.5 bg-surface-container rounded-full w-1/3" />
                                </div>
                            </div>
                        ))}
                    </>
                ) : tournaments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3 text-on-surface-variant">
                        <span className="material-symbols-outlined text-5xl opacity-30">emoji_events</span>
                        <p className="text-sm">{t('tournamentsAdmin.emptyState')}</p>
                    </div>
                ) : (
                    tournaments.map(tournament => (
                        <div
                            key={tournament._id}
                            className="bg-surface-container-lowest rounded-3xl p-5 flex items-center gap-4"
                            style={{ boxShadow: '0 4px 16px 0 rgba(0, 77, 98, 0.05)' }}
                        >
                            {/* Icon */}
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-on-primary flex-shrink-0">
                                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-on-surface text-sm truncate">{tournament.name}</p>
                                <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                                    <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-bold">
                                        {tournament.matches_number} matches
                                    </span>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusBadgeClass(tournament.status)}`}>
                                        {tournament.status}
                                    </span>
                                </div>
                            </div>

                            {/* Edit button */}
                            <button
                                onClick={() => navigate(`/tournaments-admin/${tournament._id}/edit`, { state: { tournament } })}
                                className="p-2 rounded-full hover:bg-surface-container transition-colors flex-shrink-0"
                                aria-label="Edit tournament"
                            >
                                <span className="material-symbols-outlined text-on-surface-variant text-xl">edit</span>
                            </button>
                        </div>
                    ))
                )}
            </section>

            {/* FAB */}
            <button
                onClick={() => navigate('/tournaments-admin/create')}
                className="fixed bottom-24 md:bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary flex items-center justify-center z-40 transition-transform active:scale-95"
                style={{ boxShadow: '0 8px 32px 0 rgba(0, 77, 98, 0.12)' }}
                aria-label="Create tournament"
            >
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
            </button>
        </main>
    )
}

export default TournamentsAdmin
