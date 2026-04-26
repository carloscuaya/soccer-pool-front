import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { sileo } from "sileo"
import { format, formatInTimeZone } from 'date-fns-tz'
import { es } from "date-fns/locale/es"

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

function Matches() {

    const navigate = useNavigate()

    const location = useLocation()
    const username = location.state?.username
    const tournamentId = location.state?.tournamentId

    const [matchesData, setMatchesData] = useState<Match[]>()
    const [tournamentMatchesData, setTournamentMatchesData] = useState<Match[]>()

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('username')
        sileo.success({ title: "You have been logged out" })
        navigate("/login")
    }

    const convertDate = (dateString: string) => {
        // console.log("dateString: ", dateString)
        const timeZone = "America/Mexico_City"
        const pattern = 'yyyy-MM-dd HH:mm:ssXXX'
        const mexicoTime = formatInTimeZone(dateString, timeZone, pattern)
        // console.log("mexicoTime: ", mexicoTime)
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
            sileo.warning({ title: "Please enter both scores before submitting." })
            return
        }

        try {
            // Replace with your actual endpoint URL and adjust the payload if needed
            const response = await axios.put(`https://spb-4d1b4d1e.fastapicloud.dev/matches`, {
                matchId: match._id,
                scoreLocalTeam: match.scoreLocalTeam,
                scoreVisitTeam: match.scoreVisitTeam
            })
            console.log("Forecast submitted successfully:", response.data)
            sileo.success({ title: "Forecast submitted successfully!" })
        } catch (error) {
            console.error('Error submitting forecast:', error)
            sileo.error({ title: "Error submitting forecast. Please try again." })
        }
    }

    // Define an async function to fetch data
    const fetchTournamentMatchesData = async () => {
        console.log("fetchTournamentMatchesData")
        console.log("tournamentId: ", tournamentId)
        try {
            const response = await axios.get(`https://spb-4d1b4d1e.fastapicloud.dev/tournaments/matches/?tournament_id=${tournamentId}`)
            console.log("tournamentMatchesData: ", response.data)
            setTournamentMatchesData(response.data) // Access results via .data property
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }


    // Define an async function to fetch data
    const fetchMatchesData = async () => {
        console.log("fetchMatchesData")
        console.log("tournamentId: ", tournamentId)
        console.log("username: ", username)
        try {
            const response = await axios.get(`https://spb-4d1b4d1e.fastapicloud.dev/matches/${username}/${tournamentId}`)
            console.log("matchesData: ", response.data)
            setMatchesData(response.data) // Access results via .data property
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        fetchTournamentMatchesData()
        fetchMatchesData()
    }, []) // Empty dependency array means this runs once on mount



    return (
        <div className="bg-background text-on-surface selection:bg-secondary-container">
            {/* TopNavBar */}
            <nav className="fixed top-0 w-full flex justify-between items-center px-6 py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl z-50 no-border bg-slate-100/50 dark:bg-slate-900/50 shadow-[0_20px_40px_-15px_rgba(186,234,255,0.4)]">
                <div className="cursor-pointer flex items-center gap-2" onClick={() => navigate("/home")}>
                    <span className="text-xl font-black text-green-800 dark:text-green-500 tracking-tighter">Jacobo Xinto Futball Pro</span>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 rounded-full hover:bg-sky-50 transition-colors">
                        <span className="material-symbols-outlined text-green-800 dark:text-green-400">notifications</span>
                    </button>
                    <div className="hidden md:block">
                        <button className="flex flex-col items-center gap-1 text-green-700 font-bold" onClick={() => handleLogout()}>
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>logout</span>
                            <span className="text-[10px] uppercase tracking-tighter">Logout</span>
                        </button>
                    </div>
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container border-2 border-secondary-container">
                        <img alt="User Profile Avatar" data-alt="close-up portrait of a professional soccer coach in a stadium setting with soft bokeh lights" src={`${import.meta.env.BASE_URL}/user-avatar.png`} />
                    </div>
                </div>
            </nav>
            {/* Main Content Canvas */}
            <main className="pt-20 pb-24 px-6 max-w-2xl mx-auto">
                {/* Live Match Pulse Card */}

                {matchesData?.map((match) => (
                    <section className="mb-10" key={match.code}>
                        <div className="relative overflow-hidden bg-surface-container-lowest rounded-3xl p-2 shadow-[0_32px_64px_-12px_rgba(0,77,98,0.08)]">
                            <div className="absolute top-0 right-0 w-32 h-32 grass-texture pointer-events-none"></div>
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
                                            <span className="block text-[10px] uppercase font-bold text-secondary mb-2">Local</span>
                                            <input className="w-16 h-16 bg-white border-none rounded-2xl text-center font-black text-2xl focus:ring-2 focus:ring-primary shadow-sm" placeholder="0" type="number" value={match.scoreLocalTeam ?? ''} onChange={(e) => handleChange(match.code, e.target.value, 'scoreLocalTeam')} />
                                        </div>
                                        <span className=" font-black text-2xl text-secondary">-</span>
                                        <div className="text-center">
                                            <span className="block text-[10px] uppercase font-bold text-secondary mb-2">Visit</span>
                                            <input className="w-16 h-16 bg-white border-none rounded-2xl text-center font-black text-2xl focus:ring-2 focus:ring-primary shadow-sm" placeholder="0" type="number" value={match.scoreVisitTeam ?? ''} onChange={(e) => handleChange(match.code, e.target.value, 'scoreVisitTeam')} />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => submitForecast(match._id)}
                                        className="w-full bg-primary text-on-primary font-bold py-4 rounded-full shadow-[0_8px_24px_rgba(13,99,27,0.2)] hover:bg-primary-container transition-all active:scale-95"
                                    >
                                        Submit
                                    </button>
                                </div>
                            )}
                            {match.status !== 'OPEN' && (
                                <div className="bg-secondary-container/30 border-2 border-dashed border-secondary-container/50 rounded-3xl p-6 relative">
                                    <div className="flex items-center justify-center gap-8 mb-6">
                                        <div className="text-center">
                                            <span className="block text-[10px] uppercase font-bold text-secondary mb-2">Local</span>
                                            <span className=" font-black text-4xl text-secondary">{match.scoreLocalTeam ?? ''}</span>
                                        </div>
                                        <span className=" font-black text-3xl text-secondary">-</span>
                                        <div className="text-center">
                                            <span className="block text-[10px] uppercase font-bold text-secondary mb-2">Visit</span>
                                            <span className=" font-black text-4xl text-secondary">{match.scoreVisitTeam ?? ''}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </section>
                ))}
                {/* Dynamic Visual Anchor (Bento Style) */}
                <section className="grid grid-cols-2 gap-4 mb-10">
                    <div onClick={() => navigate("/leaderboard")} className="cursor-pointer col-span-1 bg-secondary-container rounded-3xl p-5 flex flex-col justify-between aspect-square relative overflow-hidden hover:scale-[1.02] active:scale-95 transition-transform">
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent"></div>
                        <span className="material-symbols-outlined text-on-secondary-container text-4xl">military_tech</span>
                        <div className="relative z-10">
                            <h5 className=" font-bold text-sm leading-tight text-on-secondary-container">Leaderboard</h5>
                            <p className="text-xs text-on-secondary-container/70 mt-1">Rank #12 Top Predictor</p>
                        </div>
                    </div>
                </section>
            </main>
            {/* BottomNavBar */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl flex justify-around items-center py-4 px-2 z-50 border-t-0 shadow-[0_-10px_30px_-15px_rgba(186,234,255,0.4)]">
                <button onClick={() => navigate("/home")} className="flex flex-col items-center gap-1 text-slate-500 font-medium">
                    <span className="material-symbols-outlined">dashboard</span>
                    <span className="text-[10px] uppercase tracking-tighter">Dash</span>
                </button>

                <button className="flex flex-col items-center gap-1 text-green-700 font-bold" onClick={() => handleLogout()}>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>logout</span>
                    <span className="text-[10px] uppercase tracking-tighter">Logout</span>
                </button>
            </nav>

        </div>
    )
}

export default Matches


