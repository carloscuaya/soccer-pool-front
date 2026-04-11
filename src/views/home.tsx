import { useState } from 'react';

function Home() {

    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const toogleMenu = () => {
        console.log("togleMenu")
        setOpenMenu(!openMenu)
    };


    return (
        <div className="bg-background text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container">
            {/* Mobile Overlay & Drawer */}
            <div className={`fixed inset-0 bg-black/50 z-[60] ${openMenu ? 'translate-x-0' : '-translate-x-full'}`} id="drawer-overlay" onClick={toogleMenu}></div>
            <aside className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-slate-950 z-[70] shadow-2xl flex flex-col py-6 ${openMenu ? 'translate-x-0' : '-translate-x-full'}`} id="mobile-drawer">
                <div className="px-6 mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-on-primary">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>sports_soccer</span>
                        </div>
                        <div>
                            <h2 className="font-headline font-extrabold text-green-800 leading-none">Jacobo Xinto</h2>
                            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Pro Manager</p>
                        </div>
                    </div>
                    <button className="p-2 text-slate-400" onClick={toogleMenu}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <nav className="flex-1 space-y-1">
                    <a className="text-slate-500 hover:text-green-600 px-6 py-4 flex items-center gap-4 hover:bg-sky-50 transition-all" href="#">
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="font-headline font-semibold text-base">Dashboard</span>
                    </a>
                    <a className="bg-green-50 text-green-700 border-r-4 border-green-700 px-6 py-4 flex items-center gap-4" href="#">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                        <span className="font-headline font-semibold text-base">Tournaments</span>
                    </a>
                    <a className="text-slate-500 hover:text-green-600 px-6 py-4 flex items-center gap-4 hover:bg-sky-50 transition-all" href="#">
                        <span className="material-symbols-outlined">sports_soccer</span>
                        <span className="font-headline font-semibold text-base">Matches</span>
                    </a>
                    <a className="text-slate-500 hover:text-green-600 px-6 py-4 flex items-center gap-4 hover:bg-sky-50 transition-all" href="#">
                        <span className="material-symbols-outlined">leaderboard</span>
                        <span className="font-headline font-semibold text-base">Standings</span>
                    </a>
                    <a className="text-slate-500 hover:text-green-600 px-6 py-4 flex items-center gap-4 hover:bg-sky-50 transition-all" href="#">
                        <span className="material-symbols-outlined">groups</span>
                        <span className="font-headline font-semibold text-base">Athletes</span>
                    </a>
                </nav>
                <div className="px-6 pt-4 border-t border-slate-100 mt-auto">
                    <a className="text-slate-500 px-4 py-4 flex items-center gap-4 hover:bg-sky-50 rounded-xl transition-all" href="#">
                        <span className="material-symbols-outlined">settings</span>
                        <span className="font-headline font-semibold text-base">Settings</span>
                    </a>
                </div>
            </aside>
            {/* TopAppBar Mobile */}
            <header className="fixed top-0 w-full flex justify-between items-center px-4 h-16 bg-white/90 backdrop-blur-xl z-50 shadow-sm">
                <div className="flex items-center gap-3">
                    <button className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors" onClick={toogleMenu}>
                        <span className="material-symbols-outlined text-green-800">menu</span>
                    </button>
                    <span className="text-lg font-black text-green-800 tracking-tighter font-headline">Jacobo Xinto Pro</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full text-green-800">
                        <span className="material-symbols-outlined">search</span>
                    </button>
                    <button className="p-2 rounded-full text-green-800">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <img alt="User Profile Avatar" className="w-8 h-8 rounded-full border border-secondary-fixed object-cover ml-1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDld8x1EjQDTeAYEK_IMXi1g4KBAJE2Ug-O-KIeIM3HK0TX9kVJVWAeskGk0qQHrIe3Tahgg5TUt_KPHwc56tiFfY09wmSKmApMqtIqhJlBFHChsGnkeDRFLj7Im-yXgNSDO07MTyPkmIqGA7WMmYMwZjRHi9tzZUrk7yAiaaXJya8203E5M_BmSMLno12drwjdozS-DIr6_aynKHUR_YcgFwJ3VS5_EtrbT_i2mYf6wWcnvSAilT7YOUkDI_YMI75zVMHmhDyptno" />
                </div>
            </header>
            {/* Main Content Area */}
            <main className="pt-20 pb-24 px-4 min-h-screen">
                {/* Header Section */}
                <header className="mb-8">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-primary font-headline font-bold uppercase tracking-[0.2em] text-[10px]">
                            <span className="w-6 h-[2px] bg-primary"></span>
                            Arena Management
                        </div>
                        <h1 className="text-4xl font-headline font-black text-on-surface tracking-tighter leading-none">TOURNAMENTS</h1>
                        <p className="text-slate-500 font-body text-sm leading-relaxed">Manage global brackets and real-time match data in the world's premier football manager platform.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                        <button className="bg-primary text-on-primary w-full sm:w-auto px-8 py-3 rounded-full font-headline font-bold shadow-xl shadow-primary/20 text-center">
                            Create Tournament
                        </button>
                        <button className="bg-secondary-fixed text-on-secondary-fixed w-full sm:w-auto px-6 py-3 rounded-full font-headline font-bold flex items-center justify-center gap-2 shadow-sm">
                            <span className="material-symbols-outlined text-xl">filter_list</span>
                            Refine List
                        </button>
                    </div>
                </header>
                {/* KPI Bento Grid (Horizontal Scroll on Mobile) */}
                <div className="flex gap-4 overflow-x-auto pb-6 -mx-4 px-4 snap-x hide-scrollbar">
                    {/* Live Events */}
                    <div className="min-w-[280px] bg-surface-container-lowest p-6 rounded-[2rem] shadow-lg grass-texture relative overflow-hidden snap-center border border-white">
                        <div className="relative z-10">
                            <div className="w-10 h-10 bg-error-container text-error rounded-xl flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>sensors</span>
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-slate-500 font-headline font-bold uppercase tracking-widest text-[9px]">Current Status</p>
                                <h3 className="text-3xl font-headline font-black text-on-surface">14 Live Events</h3>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-primary text-[11px] font-bold">
                                <span className="material-symbols-outlined text-xs">trending_up</span>
                                <span>+3 from yesterday</span>
                            </div>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-5">
                            <span className="material-symbols-outlined text-[100px]">stadium</span>
                        </div>
                    </div>
                    {/* Players */}
                    <div className="min-w-[280px] bg-surface-container-lowest p-6 rounded-[2rem] shadow-lg grass-texture relative overflow-hidden snap-center border border-white">
                        <div className="relative z-10">
                            <div className="w-10 h-10 bg-secondary-container text-on-secondary-container rounded-xl flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-slate-500 font-headline font-bold uppercase tracking-widest text-[9px]">Active Rosters</p>
                                <h3 className="text-3xl font-headline font-black text-on-surface">1,280 Players</h3>
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
                                <p className="text-primary-fixed/60 font-headline font-bold uppercase tracking-widest text-[9px]">Prize Liquidity</p>
                                <h3 className="text-3xl font-headline font-black">$450.2k</h3>
                            </div>
                            <div className="mt-4 flex items-center gap-3">
                                <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-white w-3/4"></div>
                                </div>
                                <span className="text-[10px] font-bold">75%</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Tournament Table Section */}
                <section className="mt-4 bg-surface-container-lowest rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
                    <div className="px-5 py-5 flex items-center justify-between border-b border-slate-100">
                        <h2 className="font-headline font-extrabold text-lg text-on-surface">Standings</h2>
                        <div className="flex gap-1.5">
                            <button className="p-2 rounded-xl bg-slate-50 text-slate-600"><span className="material-symbols-outlined text-sm">download</span></button>
                            <button className="p-2 rounded-xl bg-secondary-container text-on-secondary-container"><span className="material-symbols-outlined text-sm">edit_note</span></button>
                        </div>
                    </div>
                    <div className="overflow-x-auto mobile-table-scroll">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr className="text-slate-400 text-[9px] uppercase tracking-widest font-headline">
                                    <th className="px-5 py-4 font-extrabold min-w-[200px]">Tournament</th>
                                    <th className="px-4 py-4 font-extrabold">Status</th>
                                    <th className="px-4 py-4 font-extrabold">Pool</th>
                                    <th className="px-5 py-4 font-extrabold text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                <tr className="active:bg-slate-50 transition-colors">
                                    <td className="px-5 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white flex-shrink-0">
                                                <span className="material-symbols-outlined text-lg">emoji_events</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-on-surface text-sm">Continental Cup</p>
                                                <p className="text-[10px] text-slate-400">Berlin, DE</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-5">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[8px] font-bold uppercase tracking-wider">
                                            <span className="w-1 h-1 rounded-full bg-primary animate-pulse"></span>
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-4 py-5 text-on-surface font-semibold text-xs">$120k</td>
                                    <td className="px-5 py-5 text-right">
                                        <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                                    </td>
                                </tr>
                                <tr className="active:bg-slate-50 transition-colors">
                                    <td className="px-5 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed flex-shrink-0">
                                                <span className="material-symbols-outlined text-lg">calendar_today</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-on-surface text-sm">Rising Stars</p>
                                                <p className="text-[10px] text-slate-400">Madrid, ES</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-5">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary text-[8px] font-bold uppercase tracking-wider">
                                            Upcoming
                                        </span>
                                    </td>
                                    <td className="px-4 py-5 text-on-surface font-semibold text-xs">$45k</td>
                                    <td className="px-5 py-5 text-right">
                                        <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="px-5 py-4 bg-slate-50/50 flex items-center justify-between">
                        <p className="text-[10px] text-slate-500 font-medium">Page 1 of 4</p>
                        <div className="flex gap-1.5">
                            <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400"><span className="material-symbols-outlined text-base">chevron_left</span></button>
                            <button className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">1</button>
                            <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400"><span className="material-symbols-outlined text-base">chevron_right</span></button>
                        </div>
                    </div>
                </section>
                {/* Featured Banner Mobile */}
                <section className="mt-8 space-y-4">
                    <div className="relative h-48 rounded-3xl overflow-hidden shadow-lg">
                        <img alt="Featured Tournament" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkQeIjs7wqga-mU6wl2IUm_Ddfo1UL8EKKYvPqCfE7B5gRK1opF13Kc58G36epsuO2iP51XTulu42LQdq4kw0yNKEB4RnE1sncSJwhbW2wcRROPJLkAp318iu05br5IjWu0wu894XOP1aK0W2mdU41KetnbitiZN6TuTal1pnnK8sTulV5R_OgeppTX049p8-g468aZW8Br8rDMLrrw83dLf0dnoZj9hNZeJnW59l7AwTjDwfsp23sQBkyl57z91FYRl5RsjNJ3fc" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end">
                            <span className="bg-primary text-on-primary px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest self-start mb-1">Editor's Choice</span>
                            <h3 className="text-xl font-headline font-black text-white">World Series Finals</h3>
                            <p className="text-white/80 font-body text-[10px] mb-3">Registration opens in 4 days.</p>
                            <button className="bg-white text-on-background px-4 py-1.5 rounded-full font-headline font-bold text-[10px] self-start">Join Waiting List</button>
                        </div>
                    </div>
                    <div className="bg-secondary-container/30 rounded-3xl p-6 border-2 border-dashed border-secondary-fixed">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-secondary shadow-sm flex-shrink-0">
                                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-headline font-black text-on-secondary-container leading-tight">Level Up</h3>
                                <p className="text-on-secondary-fixed-variant font-body text-[11px]">Premium tournaments for pro clans.</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="bg-white/50 backdrop-blur-sm px-3 py-2 rounded-xl flex-1">
                                <p className="text-[8px] font-headline font-bold text-slate-500 uppercase tracking-widest">Global Rank</p>
                                <p className="text-base font-headline font-black text-secondary">#142</p>
                            </div>
                            <div className="bg-white/50 backdrop-blur-sm px-3 py-2 rounded-xl flex-1">
                                <p className="text-[8px] font-headline font-bold text-slate-500 uppercase tracking-widest">Medals</p>
                                <p className="text-base font-headline font-black text-secondary">24/50</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            {/* Floating Action Button Mobile */}
            <div className="fixed bottom-6 right-6 z-40">
                <button className="w-14 h-14 bg-primary text-on-primary rounded-full shadow-[0_8px_25px_rgba(13,99,27,0.4)] flex items-center justify-center active:scale-90 transition-transform">
                    <span className="material-symbols-outlined text-2xl">add</span>
                </button>
            </div>


        </div>
    )
}

export default Home


