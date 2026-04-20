import { useNavigate } from "react-router"

function Matches() {

    const navigate = useNavigate()



    return (
        <div className="bg-background text-on-surface font-body selection:bg-secondary-container">
            {/* TopNavBar */}
            <nav className="fixed top-0 w-full flex justify-between items-center px-6 py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl z-50 no-border bg-slate-100/50 dark:bg-slate-900/50 shadow-[0_20px_40px_-15px_rgba(186,234,255,0.4)]">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-green-800 dark:text-green-500 tracking-tighter font-headline">Jacobo Xinto Futbol Pro</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-6">
                        <a className="text-green-700 dark:text-green-400 font-bold border-b-2 border-green-700 font-headline text-sm tracking-tight py-1" href="#">Matches</a>
                        <a className="text-slate-500 dark:text-slate-400 font-medium font-headline text-sm tracking-tight hover:bg-sky-50 transition-colors duration-300 rounded-lg px-2" href="#">Dashboard</a>
                        <a className="text-slate-500 dark:text-slate-400 font-medium font-headline text-sm tracking-tight hover:bg-sky-50 transition-colors duration-300 rounded-lg px-2" href="#">Athletes</a>
                    </div>
                    <button className="p-2 rounded-full hover:bg-sky-50 transition-colors">
                        <span className="material-symbols-outlined text-green-800 dark:text-green-400">notifications</span>
                    </button>
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container border-2 border-secondary-container">
                        <img alt="User Profile Avatar" data-alt="close-up portrait of a professional soccer coach in a stadium setting with soft bokeh lights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ3sNcoPoECE5O9k82660a1waS_mgApyUAmvn87L9r6B3az6GPTNAUgczV5fQYB6rHZwP7_v-jI8r_aCPqVWgI0Up6watu21hRf7pBarlrJoTsjCxTRGzsGXmFfMI6wCEuACZZiyvPku3tfF0Qi7lMmcOQSnA8gimw9wMpptZzZaHKsrtIaRKMohmhelUSJuPm7Ihuir6z1A7p-RmRyBKJptiXDbbTzmLr4oBkBxwsAx5RruPcp9z3dP_0K9i8m2Td51zkE4vobj0" />
                    </div>
                </div>
            </nav>
            {/* Main Content Canvas */}
            <main className="pt-20 pb-24 px-6 max-w-2xl mx-auto">
                {/* Header Section */}
                <header className="mb-10 mt-6">
                    <h1 className="font-headline font-black text-4xl tracking-tighter text-on-surface mb-2">MATCH DAY PULSE</h1>
                    <div className="flex items-center gap-3">
                        <span className="inline-block w-2 h-2 rounded-full bg-error animate-pulse"></span>
                        <p className="text-secondary font-semibold text-sm tracking-wide uppercase">3 Live Matches Underway</p>
                    </div>
                </header>
                {/* Live Match Pulse Card */}
                <section className="mb-10">
                    <div className="relative overflow-hidden bg-surface-container-lowest rounded-3xl p-6 shadow-[0_32px_64px_-12px_rgba(0,77,98,0.08)]">
                        <div className="absolute top-0 right-0 w-32 h-32 grass-texture pointer-events-none"></div>
                        <div className="flex justify-between items-center mb-6">
                            <span className="bg-error/10 text-error px-3 py-1 rounded-full text-xs font-bold font-headline uppercase tracking-widest">Live • 74'</span>
                            <span className="text-on-surface-variant font-medium text-xs font-headline">CHAMPIONS LEAGUE</span>
                        </div>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex flex-col items-center gap-2 flex-1">
                                <div className="w-16 h-16 bg-surface-container rounded-2xl flex items-center justify-center p-2">
                                    <img className="w-full h-full object-contain" data-alt="minimalist football club logo with gold and black elements on a white shield" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUw4BNHV8T8a1qTDeTalpX2hUAJMtteL_RMtZwfIardIMbcjFCNCmm3Ubah0PJerz1GlR60nejykPby9wRm0bMuJK-7K6rUTdF0nfwboqGRwmaeduDFzVzS4rz-Cb-iVnXpHY-KRZzWPsQdTFwYr_LMMS0N2vpmfP0eWzYHHn9dkbJ-OoTP77fvtMhMja5xmx7e0LLn-uisws66JLtxyjIyiXaeOZ7xOLtBO99rnTIkTpaYUIL34toog1iKtNgFV13QAl0LyyGZMw" />
                                </div>
                                <span className="font-headline font-bold text-sm">FC Madrid</span>
                            </div>
                            <div className="flex flex-col items-center flex-1">
                                <span className="font-headline font-black text-5xl tracking-tighter text-primary">3 - 1</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 flex-1">
                                <div className="w-16 h-16 bg-surface-container rounded-2xl flex items-center justify-center p-2">
                                    <img className="w-full h-full object-contain" data-alt="minimalist blue and silver football crest with a star icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIn0t8gUlY7DA1Ugx-G45fU-JV00I6YkvaUlN26UyHDldXNojJGcOQzH_b45awd6KF-MgrKqVwI4Mp3EIjUNzRlS9R8OcAdsAh67a-q_J_Ol6IC9jHXAasJ7fv_8MCAEjgP1uyW-cy5RuhnRjK6aiE3z3_yHKLaTtpwK3cUn7IGbNfDjzaeTsNYJs2ajVENWrQ6xS48vLtdj0mBBe860LNQIOuAE8k1d_5lJw2maHiM_14lO4L37KZ0hoZq7IUC4urjqFRBA0YFKM" />
                                </div>
                                <span className="font-headline font-bold text-sm">Munich FC</span>
                            </div>
                        </div>
                        <div className="bg-surface-container-low rounded-2xl p-4">
                            <div className="flex items-center justify-between text-xs text-on-surface-variant mb-2">
                                <span>Win Probability</span>
                                <span className="font-bold text-primary">82%</span>
                            </div>
                            <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[82%] rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Forecast Input Section */}
                <section className="mb-10">
                    <h3 className="font-headline font-bold text-xl mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary">analytics</span>
                        Expert Forecasts
                    </h3>
                    <div className="bg-secondary-container/30 border-2 border-dashed border-secondary-container/50 rounded-3xl p-6 relative">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h4 className="font-headline font-bold text-on-secondary-fixed">London Derby</h4>
                                <p className="text-on-secondary-fixed-variant text-sm">Kickoff in 2h 45m</p>
                            </div>
                            <span className="bg-white px-3 py-1 rounded-full text-[10px] font-bold text-secondary-fixed-dim bg-secondary uppercase tracking-widest">Pre-Match</span>
                        </div>
                        <div className="flex items-center justify-center gap-8 mb-6">
                            <div className="text-center">
                                <span className="block text-[10px] uppercase font-bold text-secondary mb-2">Home</span>
                                <input className="w-16 h-16 bg-white border-none rounded-2xl text-center font-headline font-black text-2xl focus:ring-2 focus:ring-primary shadow-sm" placeholder="0" type="number" />
                            </div>
                            <span className="font-headline font-black text-2xl text-secondary">:</span>
                            <div className="text-center">
                                <span className="block text-[10px] uppercase font-bold text-secondary mb-2">Away</span>
                                <input className="w-16 h-16 bg-white border-none rounded-2xl text-center font-headline font-black text-2xl focus:ring-2 focus:ring-primary shadow-sm" placeholder="0" type="number" />
                            </div>
                        </div>
                        <button className="w-full bg-primary text-on-primary font-headline font-bold py-4 rounded-full shadow-[0_8px_24px_rgba(13,99,27,0.2)] hover:bg-primary-container transition-all active:scale-95">
                            Submit Forecast
                        </button>
                    </div>
                </section>
                {/* Dynamic Visual Anchor (Bento Style) */}
                <section className="grid grid-cols-2 gap-4 mb-10">
                    <div className="col-span-1 bg-surface-variant rounded-3xl p-5 flex flex-col justify-between aspect-square">
                        <span className="material-symbols-outlined text-primary text-4xl">stadium</span>
                        <div>
                            <h5 className="font-headline font-bold text-sm leading-tight">Stadium Attendance</h5>
                            <p className="text-xs text-on-surface-variant mt-1">94% Average</p>
                        </div>
                    </div>
                    <div className="col-span-1 bg-secondary-container rounded-3xl p-5 flex flex-col justify-between aspect-square relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent"></div>
                        <span className="material-symbols-outlined text-on-secondary-container text-4xl">military_tech</span>
                        <div className="relative z-10">
                            <h5 className="font-headline font-bold text-sm leading-tight text-on-secondary-container">Leaderboard</h5>
                            <p className="text-xs text-on-secondary-container/70 mt-1">Rank #12 Top Predictor</p>
                        </div>
                    </div>
                </section>
            </main>
            {/* BottomNavBar */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl flex justify-around items-center py-4 px-2 z-50 border-t-0 shadow-[0_-10px_30px_-15px_rgba(186,234,255,0.4)]">
                <button onClick={() => navigate("/home")} className="flex flex-col items-center gap-1 text-slate-500 font-medium">
                    <span className="material-symbols-outlined">dashboard</span>
                    <span className="text-[10px] font-headline uppercase tracking-tighter">Dash</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-slate-500 font-medium">
                    <span className="material-symbols-outlined">emoji_events</span>
                    <span className="text-[10px] font-headline uppercase tracking-tighter">Leaderboard</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-green-700 font-bold">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>logout</span>
                    <span className="text-[10px] font-headline uppercase tracking-tighter">Logout</span>
                </button>
            </nav>

        </div>
    )
}

export default Matches


