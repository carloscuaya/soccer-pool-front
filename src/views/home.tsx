import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next'
import { getUser, type UserProfile } from '@api/users'

function Home() {

    const { t } = useTranslation()
    const navigate = useNavigate()

    const username = localStorage.getItem('username')

    const [userData, setUserData] = useState<UserProfile>()

    const handleTournamentClick = (tournamentId: string) => {
        localStorage.setItem('selectedTournament', tournamentId)
        navigate("/matches")
    }

    useEffect(() => {
        if (!username) return

        const fetchUserData = async () => {
            try {
                const response = await getUser(username)
                setUserData(response.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchUserData()
    }, [username])


    return (
        <main className="pt-20 pb-24 px-4 min-h-screen">
            {/* Header Section */}
            <header className="mb-8">
                <div className="space-y-3">
                    <h1 className="text-primary text-4xl font-black text-on-surface tracking-tighter leading-none">{t('home.title')}</h1>
                    <p className="text-slate-500 text-sm leading-relaxed">{t('home.subtitle')}</p>
                </div>
            </header>
            {/* KPI Bento Grid (Horizontal Scroll on Mobile) */}
            <div className="flex gap-4 overflow-x-auto pb-6 -mx-4 px-4 snap-x hide-scrollbar">
                {/* Players */}
                <div className="min-w-[280px] bg-primary p-6 rounded-[2rem] shadow-lg relative overflow-hidden snap-center border border-white">
                    <div className="relative z-10">
                        <div className="w-10 h-10 bg-secondary-container text-on-secondary-container rounded-xl flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
                        </div>
                        <div className="space-y-0.5">
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">{t('home.activeRosters')}</p>
                            <h3 className="text-3xl font-black text-on-surface">{t('home.players')}</h3>
                        </div>
                        <div className="mt-4 flex -space-x-3">
                            <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAVi-bhHMWxcbW0u0lv-d9HfAapNgUBdotG35fqXCaJCNTwyI2Vbm8uvApY8bjofnQvvMbQr85d5-2gvv4L_ydGW6gzU_gwuVnsE3O6IFop5pIZKeKaf2gRn4uAsDGDjaeoIMOuc1Pspt-1OoMx_lH3PTZzbApLwj0iZ4EZXnlKSBDkVq5FHDXvD7Bvh3uvPnbdFrCY4zbTOYHYQtOpYDVI7Lwk9oR33CcItvKi9UAuD2h87QUObcgMn_iCQG2URLGNKe0zY4B9MM" />
                            <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKhKiQbLelGHLn5Um-jpaDuF1GjPCm4Wd7c9ymbiM29MvXjh1-qbMFOP3dq-qwEmD09Zu2FMHGlAKAcqDRd624980hIbcpYY7OiumEguiEmfroI0McrnDdU_sFhuDDNxeNAYZDncMq_wl4tZ1Nhti0whoQfEJ6xlvJroI8A_Lv7DKh0JMb4VCblYPw7NOl5w122ykFu93Lky1Jk708ZMOLWG6BdTikXl8S1Zb_BVg-BVhof43Jk4Zxmu6wTzNMYHhrJurRby5IoBk" />
                            <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-500">+1.2k</div>
                        </div>
                    </div>
                </div>
                {/* Prize Pool */}
                <div className="min-w-[280px] bg-primary p-6 rounded-[2rem] shadow-xl relative overflow-hidden text-on-primary snap-center">
                    <div className="relative z-10 h-full flex flex-col">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-xl flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                        </div>
                        <div className="space-y-0.5">
                            <p className="text-primary-fixed/60 font-bold uppercase tracking-widest text-[9px]">{t('home.prizeLiquidity')}</p>
                            <h3 className="text-3xl font-black">$1.7k</h3>
                        </div>
                        <div className="mt-4 flex items-center gap-3">
                            <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                                <div className="h-full bg-white"></div>
                            </div>
                            <span className="text-[10px] font-bold">100%</span>
                        </div>
                    </div>
                </div>
                {/* Live Events */}
                <div className="min-w-[280px] bg-surface-container-lowest p-6 rounded-[2rem] shadow-lg relative overflow-hidden snap-center border border-white">
                    <div className="relative z-10">
                        <div className="w-10 h-10 bg-error-container text-error rounded-xl flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>sensors</span>
                        </div>
                        <div className="space-y-0.5">
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">{t('home.currentStatus')}</p>
                            <h3 className="text-3xl font-black text-on-surface">{t('home.liveEvent')}</h3>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-primary text-[11px] font-bold">
                            <span className="material-symbols-outlined text-xs">trending_up</span>
                            <span>{t('home.trend')}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tournament Table Section */}
            <section className="mt-4 bg-surface-container-lowest rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
                <div className="overflow-x-auto mobile-table-scroll">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr className="text-slate-400 text-[9px] uppercase tracking-widest">
                                <th className="px-5 py-4 font-extrabold min-w-[200px]">{t('home.colTournament')}</th>
                                <th className="px-4 py-4 font-extrabold">{t('home.colMatches')}</th>
                                <th className="px-4 py-4 font-extrabold">{t('home.colScore')}</th>
                                <th className="px-4 py-4 font-extrabold">{t('home.colStatus')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {userData?.tournaments?.map((tournament) => (
                                <tr className="active:bg-slate-50 transition-colors" key={tournament._id}>
                                    <td className="px-5 py-5">
                                        <div className="cursor-pointer flex items-center gap-3" onClick={() => handleTournamentClick(tournament._id)}>
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white flex-shrink-0">
                                                <span className="material-symbols-outlined text-lg">emoji_events</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-on-surface text-sm">{tournament.name}</p>
                                                <p className="text-[10px] text-slate-400">Mexico</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-5">
                                        {tournament.matches_number}
                                    </td>
                                    <td className="px-4 py-5">
                                        {tournament.score ?? '--'}
                                    </td>
                                    <td className="px-4 py-5 text-on-surface font-semibold text-xs">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[8px] font-bold uppercase tracking-wider">
                                            <span className="w-1 h-1 rounded-full bg-primary animate-pulse"></span>
                                            {tournament.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
            {/* Featured Banner Mobile */}
            <section className="mt-8 space-y-4">
                <div className="relative h-48 rounded-3xl overflow-hidden shadow-lg">
                    <img alt="Featured Tournament" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkQeIjs7wqga-mU6wl2IUm_Ddfo1UL8EKKYvPqCfE7B5gRK1opF13Kc58G36epsuO2iP51XTulu42LQdq4kw0yNKEB4RnE1sncSJwhbW2wcRROPJLkAp318iu05br5IjWu0wu894XOP1aK0W2mdU41KetnbitiZN6TuTal1pnnK8sTulV5R_OgeppTX049p8-g468aZW8Br8rDMLrrw83dLf0dnoZj9hNZeJnW59l7AwTjDwfsp23sQBkyl57z91FYRl5RsjNJ3fc" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end">
                        <span className="bg-primary text-on-primary px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest self-start mb-1">{t('home.editorsChoice')}</span>
                        <h3 className="text-xl font-black text-white">{t('home.featuredTitle')}</h3>
                        <p className="text-white/80 text-[10px] mb-3">{t('home.featuredDesc')}</p>
                        <button className="bg-white text-on-background px-4 py-1.5 rounded-full font-bold text-[10px] self-start">{t('home.joinWaitingList')}</button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home
