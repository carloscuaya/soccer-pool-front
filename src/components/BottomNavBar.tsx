import { useNavigate, useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import useLogout from '@hooks/useLogout'

const DASHBOARD = { to: '/home', icon: 'dashboard', labelKey: 'common.dashboard' }
const MATCHES   = { to: '/matches', icon: 'sports_soccer', labelKey: 'common.matches' }
const LEADERBOARD = { to: '/leaderboard', icon: 'military_tech', labelKey: 'common.leaders' }

const NAV_ITEMS_BY_ROUTE: Record<string, typeof DASHBOARD[]> = {
    '/matches':    [DASHBOARD, LEADERBOARD],
    '/leaderboard': [DASHBOARD, MATCHES],
}

function BottomNavBar() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()
    const { handleLogout } = useLogout()

    const isHome = location.pathname === '/home'
    const navItems = NAV_ITEMS_BY_ROUTE[location.pathname] ?? []

    return (
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl flex justify-around items-center py-4 px-2 z-50 shadow-[0_-10px_30px_-15px_rgba(186,234,255,0.4)]">
            {isHome ? (
                <button onClick={handleLogout} className="flex flex-col items-center gap-1 text-slate-500 font-medium">
                    <span className="material-symbols-outlined">logout</span>
                    <span className="text-[10px] uppercase tracking-tighter">{t('common.logout')}</span>
                </button>
            ) : (
                <>
                    {navItems.map(item => (
                        <button
                            key={item.to}
                            onClick={() => navigate(item.to)}
                            className="flex flex-col items-center gap-1 text-slate-500 font-medium"
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span className="text-[10px] uppercase tracking-tighter">{t(item.labelKey)}</span>
                        </button>
                    ))}
                    <button onClick={handleLogout} className="flex flex-col items-center gap-1 text-slate-500 font-medium">
                        <span className="material-symbols-outlined">logout</span>
                        <span className="text-[10px] uppercase tracking-tighter">{t('common.logout')}</span>
                    </button>
                </>
            )}
        </nav>
    )
}

export default BottomNavBar
