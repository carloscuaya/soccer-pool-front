import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import useLogout from '@hooks/useLogout'
import useLanguageToggle from '@hooks/useLanguageToggle'
import { useNavActions } from '@layouts/NavActionsContext'

function TopNavBar() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { handleLogout } = useLogout()
    const { currentLang, toggleLanguage } = useLanguageToggle()
    const { topNavActions } = useNavActions()

    return (
        <nav className="fixed top-0 w-full flex justify-between items-center px-6 py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl z-50 shadow-[0_20px_40px_-15px_rgba(186,234,255,0.4)]">
            <div className="cursor-pointer flex items-center gap-2" onClick={() => navigate('/home')}>
                <span className="text-xl font-black text-green-800 dark:text-green-500 tracking-tighter">{t('common.appName')}</span>
            </div>
            <div className="flex items-center gap-4">
                {topNavActions}
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
                    <img alt="User Profile Avatar" src={`${import.meta.env.BASE_URL}/user-avatar.png`} />
                </div>
            </div>
        </nav>
    )
}

export default TopNavBar
