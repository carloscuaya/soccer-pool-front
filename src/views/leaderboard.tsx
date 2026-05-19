import { useNavigate } from "react-router"
import { sileo } from "sileo"
import { useEffect, useState } from "react"
import { useTranslation } from 'react-i18next'
import i18next from '@i18n/index'
import useRequiredLocalStorage from '@hooks/useRequiredLocalStorage'
import { getLeaderboard, type LeaderboardEntry } from '@api/tournaments'

function Leaderboard() {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
    const tournamentId = useRequiredLocalStorage('selectedTournament', t('common.selectTournament'), '/home')

    const currentLang = i18next.language

    const toggleLanguage = () => {
        const next = currentLang === 'es' ? 'en' : 'es'
        i18next.changeLanguage(next)
        localStorage.setItem('lang', next)
    }

    useEffect(() => {
        const fetchLeaderboardData = async (id: string) => {
            try {
                const response = await getLeaderboard(id)
                const data: LeaderboardEntry[] = response.data
                const sortedData = data.sort((a, b) => b.score - a.score).map((item, index) => ({
                    ...item,
                    position: index + 1
                }))
                const anonymousEntry: LeaderboardEntry = {
                    userId: 'noid',
                    username: 'pablito',
                    score: 0,
                    slow_payer: false,
                    position: sortedData.length + 1
                }
                setLeaderboardData([...sortedData, anonymousEntry])
            } catch (error) {
                console.error("Error fetching leaderboard data:", error)
                sileo.error({ title: t('leaderboard.errLoad') })
            }
        }

        if (tournamentId) {
            fetchLeaderboardData(tournamentId)
        }
    }, [tournamentId, t])

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('username')
        sileo.success({ title: t('common.loggedOut') })
        navigate("/login")
    }

    return (
        <div className="bg-background text-on-surface min-h-screen selection:bg-secondary-container">
            {/* TopNavBar */}
            <nav className="fixed top-0 w-full flex justify-between items-center px-4 md:px-6 py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl z-50 no-border shadow-[0_20px_40px_-15px_rgba(186,234,255,0.4)]">
                <div className="cursor-pointer flex items-center gap-2" onClick={() => navigate("/home")}>
                    <span className="text-xl font-black text-green-800 dark:text-green-500 tracking-tighter">{t('common.appName')}</span>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 rounded-full hover:bg-sky-50 transition-colors">
                        <span className="material-symbols-outlined text-green-800 dark:text-green-400">notifications</span>
                    </button>
                    <button onClick={toggleLanguage} className="text-xs font-bold text-secondary border border-secondary/30 rounded-full px-3 py-1 hover:bg-secondary/10 transition-colors">
                        {currentLang === 'es' ? 'EN' : 'ES'}
                    </button>
                    <div className="hidden md:block">
                        <button className="flex flex-col items-center gap-1 text-green-700 font-bold" onClick={handleLogout}>
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>logout</span>
                            <span className="text-[10px] uppercase tracking-tighter">{t('common.logout')}</span>
                        </button>
                    </div>
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container border-2 border-secondary-container">
                        <img alt="User Profile Avatar" data-alt="close-up portrait of a professional soccer coach" src={`${import.meta.env.BASE_URL}/user-avatar.png`} />
                    </div>
                </div>
            </nav>

            {/* Main Content Canvas */}
            <main className="pt-24 pb-24 px-4 md:px-6 max-w-2xl mx-auto">
                <header className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-primary text-4xl font-black text-on-surface tracking-tighter leading-none">{t('leaderboard.title')}</h1>
                        <p className="text-slate-500 text-sm leading-relaxed mt-2">{t('leaderboard.subtitle')}</p>
                    </div>
                    <div className="w-16 h-16 bg-secondary-container rounded-3xl flex items-center justify-center text-on-secondary-container shadow-sm">
                        <span className="material-symbols-outlined text-4xl">military_tech</span>
                    </div>
                </header>

                <section className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
                    <div className="overflow-x-auto md:overflow-x-visible mobile-table-scroll">
                        <table className="w-full text-left min-w-[350px]">
                            <thead className="bg-slate-50/50">
                                <tr className="text-slate-400 text-[10px] uppercase tracking-widest">
                                    <th className="px-5 py-4 font-extrabold w-24">{t('leaderboard.colPosition')}</th>
                                    <th className="px-4 py-4 font-extrabold">{t('leaderboard.colUsername')}</th>
                                    <th className="px-4 py-4 font-extrabold text-right">{t('leaderboard.colScore')}</th>
                                    <th className="px-4 py-4 font-extrabold text-center">{t('leaderboard.colSlowPayer')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {leaderboardData.map((user, index) => {
                                    const isFirst = index === 0 && leaderboardData.length > 0;
                                    const isLast = index === leaderboardData.length - 1 && leaderboardData.length > 1;

                                    return (
                                        <tr key={user.userId || index} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-5 py-5 font-bold text-on-surface text-sm flex items-center gap-2">
                                                {isFirst && (
                                                    <div className="relative group flex items-center">
                                                        <span className="text-xl cursor-help">🌟🦂</span>
                                                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 bg-slate-800 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                                            {t('leaderboard.tooltipFirst')}
                                                            <div className="absolute top-1/2 right-full -translate-y-1/2 border-4 border-transparent border-r-slate-800"></div>
                                                        </div>
                                                    </div>
                                                )}
                                                {isLast && (
                                                    <div className="relative group flex items-center">
                                                        <span className="text-xl cursor-help">😢</span>
                                                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 bg-slate-800 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                                            {t('leaderboard.tooltipLast')}
                                                            <div className="absolute top-1/2 right-full -translate-y-1/2 border-4 border-transparent border-r-slate-800"></div>
                                                        </div>
                                                    </div>
                                                )}
                                                <span className={`${isFirst ? 'text-primary text-lg' : ''}`}>
                                                    #{user.position}
                                                </span>
                                            </td>
                                            <td className="px-4 py-5 font-bold text-on-surface text-sm">
                                                {user.username}
                                            </td>
                                            <td className="px-4 py-5 font-black text-primary text-lg text-right flex items-center justify-end gap-2">
                                                <span>{user.score}</span>
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                {user.slow_payer ? (
                                                    <div className="relative group inline-flex">
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error-container text-error text-[8px] font-bold uppercase tracking-wider cursor-help">
                                                            <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                                                            {t('leaderboard.colSlowPayer')}
                                                        </span>
                                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-800 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                                            {t('leaderboard.slowPayerTooltip')}
                                                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                                                        </div>
                                                    </div>
                                                ) : user.slow_payer === false && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[8px] font-bold uppercase tracking-wider">
                                                        <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                                        {t('leaderboard.goodPayerBadge')}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>

                <div className="hidden md:block mt-8">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-primary font-bold hover:underline">
                        <span className="material-symbols-outlined">arrow_back</span>
                        {t('leaderboard.backToMatches')}
                    </button>
                </div>
            </main>

            {/* BottomNavBar */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl flex justify-around items-center py-4 px-2 z-50 border-t-0 shadow-[0_-10px_30px_-15px_rgba(186,234,255,0.4)]">
                <button onClick={() => navigate("/home")} className="flex flex-col items-center gap-1 text-slate-500 font-medium">
                    <span className="material-symbols-outlined">dashboard</span>
                    <span className="text-[10px] uppercase tracking-tighter">{t('common.dashboard')}</span>
                </button>
                <button onClick={() => navigate(-1)} className="flex flex-col items-center gap-1 text-slate-500 font-medium">
                    <span className="material-symbols-outlined">sports_soccer</span>
                    <span className="text-[10px] uppercase tracking-tighter">{t('common.matches')}</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-green-700 font-bold" onClick={handleLogout}>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>logout</span>
                    <span className="text-[10px] uppercase tracking-tighter">{t('common.logout')}</span>
                </button>
            </nav>
        </div>
    );
}

export default Leaderboard
