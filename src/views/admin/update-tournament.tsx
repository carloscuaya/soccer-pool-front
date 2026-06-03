import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { sileo } from 'sileo'
import { updateTournament, type Tournament } from '@api/tournaments'
import { useNavActions } from '@layouts/NavActionsContext'

const STATUS_OPTIONS = ['upcoming', 'active', 'finished'] as const

function UpdateTournament() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { state } = useLocation()
    const { setTopNavActions } = useNavActions()

    const username = localStorage.getItem('username')
    const tournament = state?.tournament as Tournament | undefined

    const [name, setName] = useState(tournament?.name ?? '')
    const [matchesNumber, setMatchesNumber] = useState<number | ''>(tournament?.matches_number ?? '')
    const [status, setStatus] = useState(tournament?.status ?? 'upcoming')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (username !== 'hisoka') {
            navigate('/home')
            return
        }

        if (!tournament) {
            navigate('/tournaments-admin')
            return
        }

        setTopNavActions(
            <button
                onClick={() => navigate('/tournaments-admin')}
                className="p-2 rounded-full hover:bg-sky-50 transition-colors"
            >
                <span className="material-symbols-outlined text-green-800">arrow_back</span>
            </button>
        )
        return () => setTopNavActions(null)
    }, [navigate, setTopNavActions, username, tournament])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!tournament || !name || matchesNumber === '') return
        setLoading(true)
        try {
            await updateTournament(tournament._id, { name, matches_number: matchesNumber as number, status })
            sileo.success({ title: t('tournamentsAdmin.updateSuccess') })
            navigate('/tournaments-admin')
        } catch {
            sileo.error({ title: t('tournamentsAdmin.updateError') })
        } finally {
            setLoading(false)
        }
    }

    if (!tournament) return null

    return (
        <main className="pt-20 pb-24 px-6 min-h-screen bg-surface-container">
            {/* Header */}
            <header className="mb-10">
                <h1 className="text-3xl font-black text-on-surface tracking-tight leading-none">
                    {t('tournamentsAdmin.sheetTitleEdit').toUpperCase()}
                </h1>
                <p className="mt-2 text-sm text-on-surface-variant leading-relaxed truncate">
                    {tournament.name}
                </p>
            </header>

            {/* Form Card */}
            <div
                className="bg-surface-container-lowest rounded-3xl p-8"
                style={{ boxShadow: '0 8px 32px 0 rgba(0, 77, 98, 0.06)' }}
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                            {t('createTournament.labelName')}
                        </label>
                        <div className="relative flex items-center">
                            <span
                                className="absolute left-3 material-symbols-outlined text-outline text-xl select-none"
                                style={{ fontVariationSettings: "'FILL' 0" }}
                            >
                                edit
                            </span>
                            <input
                                required
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-surface-container-low rounded-xl text-on-surface text-sm placeholder:text-outline/60 border-0 border-b-2 border-transparent focus:border-primary focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    {/* Matches */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                            {t('createTournament.labelMatches')}
                        </label>
                        <div className="relative flex items-center">
                            <span
                                className="absolute left-3 material-symbols-outlined text-outline text-xl select-none"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                sports_soccer
                            </span>
                            <input
                                required
                                type="number"
                                min={1}
                                value={matchesNumber}
                                onChange={e => setMatchesNumber(e.target.value === '' ? '' : Number(e.target.value))}
                                className="w-full pl-10 pr-4 py-3 bg-surface-container-low rounded-xl text-on-surface text-sm placeholder:text-outline/60 border-0 border-b-2 border-transparent focus:border-primary focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    {/* Status pills */}
                    <div className="flex flex-col gap-3">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
                            <span
                                className="material-symbols-outlined text-outline text-xl"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                flag
                            </span>
                            {t('createTournament.labelStatus')}
                        </label>
                        <div className="flex gap-3 flex-wrap">
                            {STATUS_OPTIONS.map(opt => (
                                <button
                                    key={opt}
                                    type="button"
                                    onClick={() => setStatus(opt)}
                                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                                        status === opt
                                            ? 'bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-sm'
                                            : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                                    }`}
                                >
                                    {t(`createTournament.status${opt.charAt(0).toUpperCase() + opt.slice(1)}`)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full py-4 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                    >
                        {loading ? (
                            <>
                                <span className="animate-spin-y inline-block">⚽</span>
                                {t('tournamentsAdmin.updating')}
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
                                {t('tournamentsAdmin.updateCta')}
                            </>
                        )}
                    </button>
                </form>
            </div>
        </main>
    )
}

export default UpdateTournament
