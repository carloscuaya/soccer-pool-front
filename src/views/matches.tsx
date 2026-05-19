import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { sileo } from "sileo"
import { useTranslation } from 'react-i18next'
import i18next from '@i18n/index'
import useRequiredLocalStorage from '@hooks/useRequiredLocalStorage'
import { format, formatInTimeZone } from 'date-fns-tz'
import { es } from "date-fns/locale/es"
import { getMatches, updateForecast, type Match } from '@api/matches'
import { getTournamentMatches } from '@api/tournaments'

function Matches() {

    const { t } = useTranslation()
    const navigate = useNavigate()

    const [matchesData, setMatchesData] = useState<Match[]>()
    const [tournamentMatchesData, setTournamentMatchesData] = useState<Match[]>()
    const [savingMatches, setSavingMatches] = useState<Set<string>>(new Set())
    const [savedMatches, setSavedMatches] = useState<Set<string>>(new Set())
    const username = useRequiredLocalStorage('username', t('common.sessionExpired'), '/login')
    const [selectedTournament] = useState<string | null>(() => localStorage.getItem('selectedTournament'))

    const currentLang = i18next.language

    const toggleLanguage = () => {
        const next = currentLang === 'es' ? 'en' : 'es'
        i18next.changeLanguage(next)
        localStorage.setItem('lang', next)
    }

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('username')
        localStorage.removeItem('selectedTournament')
        sileo.success({ title: t('common.loggedOut') })
        navigate("/login")
    }

    const convertDate = (dateString: string) => {
        const timeZone = "America/Mexico_City"
        const pattern = 'yyyy-MM-dd HH:mm:ssXXX'
        const mexicoTime = formatInTimeZone(dateString, timeZone, pattern)
        const spanishFormat = format(mexicoTime, "d 'de' MMMM, yyyy HH:mm", { locale: es })
        return spanishFormat
    }

    const handleChange = (code: string, newValue: string, field: 'scoreLocalTeam' | 'scoreVisitTeam') => {
        setMatchesData(prev =>
            prev?.map(match =>
                match.code === code ? { ...match, [field]: newValue === '' ? null : Number(newValue) } : match
            )
        )
    }

    const submitForecast = async (matchId: string) => {
        const match = matchesData?.find(m => m._id === matchId)
        if (!match) return

        if (match.scoreLocalTeam === null || match.scoreVisitTeam === null) {
            sileo.warning({ title: t('matches.warnScores') })
            return
        }

        setSavingMatches(prev => new Set(prev).add(matchId))

        try {
            await updateForecast(match._id, match.scoreLocalTeam, match.scoreVisitTeam)
            setSavedMatches(prev => new Set(prev).add(matchId))
            sileo.success({ title: t('matches.successForecast') })
            setTimeout(() => {
                setSavedMatches(prev => {
                    const next = new Set(prev)
                    next.delete(matchId)
                    return next
                })
            }, 3000)
        } catch (error) {
            console.error('Error submitting forecast:', error)
            sileo.error({ title: t('matches.errForecast') })
        } finally {
            setSavingMatches(prev => {
                const next = new Set(prev)
                next.delete(matchId)
                return next
            })
        }
    }

    useEffect(() => {
        if (!username || !selectedTournament) return

        const fetchTournamentMatchesData = async () => {
            try {
                const response = await getTournamentMatches(selectedTournament)
                setTournamentMatchesData(response.data)
            } catch (error) {
                console.error('Error fetching tournament matches:', error)
            }
        }

        const fetchMatchesData = async () => {
            try {
                const response = await getMatches(username, selectedTournament)
                setMatchesData(response.data)
            } catch (error) {
                console.error('Error fetching matches:', error)
            }
        }

        fetchTournamentMatchesData()
        fetchMatchesData()
    }, [username, selectedTournament])



    return (
        <div className="bg-background text-on-surface selection:bg-secondary-container">
            {/* TopNavBar */}
            <nav className="fixed top-0 w-full flex justify-between items-center px-6 py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl z-50 no-border bg-slate-100/50 dark:bg-slate-900/50 shadow-[0_20px_40px_-15px_rgba(186,234,255,0.4)]">
                <div className="cursor-pointer flex items-center gap-2" onClick={() => navigate("/home")}>
                    <span className="text-xl font-black text-green-800 dark:text-green-500 tracking-tighter">{t('common.appName')}</span>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate("/leaderboard")} className="p-2 rounded-full hover:bg-sky-50 transition-colors">
                        <span className="material-symbols-outlined text-green-800 dark:text-green-400">military_tech</span>
                    </button>
                    <button className="p-2 rounded-full hover:bg-sky-50 transition-colors">
                        <span className="material-symbols-outlined text-green-800 dark:text-green-400">notifications</span>
                    </button>
                    <button onClick={toggleLanguage} className="text-xs font-bold text-secondary border border-secondary/30 rounded-full px-3 py-1 hover:bg-secondary/10 transition-colors">
                        {currentLang === 'es' ? 'EN' : 'ES'}
                    </button>
                    <div className="hidden md:block">
                        <button className="flex flex-col items-center gap-1 text-green-700 font-bold" onClick={() => handleLogout()}>
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>logout</span>
                            <span className="text-[10px] uppercase tracking-tighter">{t('common.logout')}</span>
                        </button>
                    </div>
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container border-2 border-secondary-container">
                        <img alt="User Profile Avatar" data-alt="close-up portrait of a professional soccer coach in a stadium setting with soft bokeh lights" src={`${import.meta.env.BASE_URL}/user-avatar.png`} />
                    </div>
                </div>
            </nav>
            {/* Main Content Canvas */}
            <main className="pt-20 pb-24 px-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1 w-full max-w-2xl mx-auto md:mx-0">

                {matchesData?.map((match) => (
                    <section className="mb-10" key={match.code}>
                        <div className="relative overflow-hidden bg-surface-container-lowest rounded-3xl p-2 shadow-[0_32px_64px_-12px_rgba(0,77,98,0.08)]">
                            <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"></div>
                            <div className="flex justify-between items-center mb-6">
                                {match.userScore != null && <span className="bg-secondary-container text-primary px-3 py-1 rounded-full text-lg font-bold uppercase tracking-widest">{match.userScore}</span>}
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{convertDate(match.matchDate)} </span>
                                <span className="text-on-surface-variant font-medium text-xs">LIGUILLA CLAUSURA 2026</span>
                            </div>
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-16 h-16 bg-surface-container rounded-2xl flex items-center justify-center p-2">
                                        <img className="w-full h-full object-contain" data-alt="minimalist football club logo with gold and black elements on a white shield" src={`${import.meta.env.BASE_URL}${match.logoPathLocalTeam}`} />
                                    </div>
                                    <span className=" font-bold text-sm">{match.localTeam}</span>
                                </div>
                                <div className="flex flex-col items-center flex-1">
                                    <span className=" font-black text-4xl tracking-tighter text-primary">{tournamentMatchesData?.find(tmatch => tmatch.code === match.code)?.scoreLocalTeam} - {tournamentMatchesData?.find(tmatch => tmatch.code === match.code)?.scoreVisitTeam}</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-16 h-16 bg-surface-container rounded-2xl flex items-center justify-center p-2">
                                        <img className="w-full h-full object-contain" data-alt="minimalist blue and silver football crest with a star icon" src={`${import.meta.env.BASE_URL}${match.logoPathVisitTeam}`} />
                                    </div>
                                    <span className=" font-bold text-sm">{match.visitTeam}</span>
                                </div>
                            </div>
                            {/* Forecast Input Section */}
                            {match.status === 'OPEN' && (
                                <div className="bg-secondary-container/30 border-2 border-dashed border-secondary-container/50 rounded-3xl p-6 relative">
                                    <div className="flex items-center justify-center gap-8 mb-6">
                                        <div className="text-center">
                                            <span className="block text-[10px] uppercase font-bold text-secondary mb-2">{t('matches.local')}</span>
                                            <input className="w-16 h-16 bg-white border-none rounded-2xl text-center font-black text-2xl focus:ring-2 focus:ring-primary shadow-sm" placeholder="0" type="number" value={match.scoreLocalTeam ?? ''} onChange={(e) => handleChange(match.code, e.target.value, 'scoreLocalTeam')} />
                                        </div>
                                        <span className=" font-black text-2xl text-secondary mt-6">-</span>
                                        <div className="text-center">
                                            <span className="block text-[10px] uppercase font-bold text-secondary mb-2">{t('matches.visit')}</span>
                                            <input className="w-16 h-16 bg-white border-none rounded-2xl text-center font-black text-2xl focus:ring-2 focus:ring-primary shadow-sm" placeholder="0" type="number" value={match.scoreVisitTeam ?? ''} onChange={(e) => handleChange(match.code, e.target.value, 'scoreVisitTeam')} />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => submitForecast(match._id)}
                                        disabled={savingMatches.has(match._id) || savedMatches.has(match._id)}
                                        className={`w-full font-bold py-4 rounded-full transition-all active:scale-95 flex items-center justify-center gap-2 disabled:cursor-not-allowed ${
                                            savedMatches.has(match._id)
                                                ? 'bg-green-500 text-white shadow-[0_8px_24px_rgba(34,197,94,0.3)]'
                                                : 'bg-primary text-on-primary shadow-[0_8px_24px_rgba(13,99,27,0.2)] hover:bg-primary-container'
                                        }`}
                                    >
                                        {savingMatches.has(match._id) ? (
                                            <>
                                                <span className="animate-spin-y text-lg">⚽</span>
                                                {t('matches.saving')}
                                            </>
                                        ) : savedMatches.has(match._id) ? (
                                            <>
                                                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                                {t('matches.saved')}
                                            </>
                                        ) : t('matches.submit')}
                                    </button>
                                </div>
                            )}
                            {match.status !== 'OPEN' && (
                                <div className="bg-secondary-container/30 border border-dashed border-secondary-container/50 rounded-3xl p-3 relative">
                                    <div className="flex items-center justify-center gap-8">
                                        <div className="text-center">
                                            <span className="block text-[10px] uppercase font-bold text-secondary mb-2">{t('matches.local')}</span>
                                            <span className=" font-black text-4xl text-secondary">{match.scoreLocalTeam ?? ''}</span>
                                        </div>
                                        <span className=" font-black text-3xl text-secondary mt-5">-</span>
                                        <div className="text-center">
                                            <span className="block text-[10px] uppercase font-bold text-secondary mb-2">{t('matches.visit')}</span>
                                            <span className=" font-black text-4xl text-secondary">{match.scoreVisitTeam ?? ''}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </section>
                ))}
                </div>

                {/* Dynamic Visual Anchor */}
                <aside className="hidden md:block sticky top-28 w-64 lg:w-80 shrink-0">
                    <div onClick={() => navigate("/leaderboard")} className="cursor-pointer bg-secondary-container rounded-3xl p-6 flex flex-col justify-between aspect-square relative overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(186,234,255,0.4)] hover:scale-[1.02] active:scale-95 transition-all">
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent"></div>
                        <span className="material-symbols-outlined text-on-secondary-container text-5xl">military_tech</span>
                        <div className="relative z-10">
                            <h5 className=" font-bold text-lg leading-tight text-on-secondary-container">{t('matches.leaderboardTitle')}</h5>
                            <p className="text-sm text-on-secondary-container/70 mt-1">{t('matches.leaderboardDesc')}</p>
                        </div>
                    </div>
                </aside>
            </main>
            {/* BottomNavBar */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl flex justify-around items-center py-4 px-2 z-50 border-t-0 shadow-[0_-10px_30px_-15px_rgba(186,234,255,0.4)]">
                <button onClick={() => navigate("/home")} className="flex flex-col items-center gap-1 text-slate-500 font-medium">
                    <span className="material-symbols-outlined">dashboard</span>
                    <span className="text-[10px] uppercase tracking-tighter">{t('common.dashboard')}</span>
                </button>

                <button onClick={() => navigate("/leaderboard")} className="flex flex-col items-center gap-1 text-slate-500 font-medium">
                    <span className="material-symbols-outlined">military_tech</span>
                    <span className="text-[10px] uppercase tracking-tighter">{t('common.leaders')}</span>
                </button>

                <button className="flex flex-col items-center gap-1 text-green-700 font-bold" onClick={() => handleLogout()}>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>logout</span>
                    <span className="text-[10px] uppercase tracking-tighter">{t('common.logout')}</span>
                </button>
            </nav>

        </div>
    )
}

export default Matches
