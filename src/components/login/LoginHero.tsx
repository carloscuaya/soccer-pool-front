import { useTranslation } from 'react-i18next'

function LoginHero() {
    const { t } = useTranslation()

    return (
        <div className="hidden lg:flex flex-col space-y-8 text-left">
            <div className="space-y-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-widest">
                    {t('login.badge')}
                </span>
                <h1 className="font-extrabold text-7xl text-primary leading-[0.9] tracking-tighter">
                    {t('login.heroTitle')} <br /><span className="text-secondary italic">{t('login.heroTitleItalic')}</span>
                </h1>
                <p className="text-lg text-on-surface-variant max-w-md font-medium leading-relaxed">
                    {t('login.heroSubtitle')}
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-[0_32px_64px_-15px_rgba(186,234,255,0.4)] border border-white/50 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-secondary text-3xl mb-3" data-icon="monitoring">monitoring</span>
                    <h3 className="font-bold text-on-surface">{t('login.liveStats')}</h3>
                    <p className="text-xs text-on-surface-variant mt-1">{t('login.liveStatsDesc')}</p>
                </div>
                <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-[0_32px_64px_-15px_rgba(186,234,255,0.4)] border border-white/50 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-primary text-3xl mb-3" data-icon="strategy">strategy</span>
                    <h3 className="font-bold text-on-surface">{t('login.tacticalHub')}</h3>
                    <p className="text-xs text-on-surface-variant mt-1">{t('login.tacticalHubDesc')}</p>
                </div>
            </div>
        </div>
    )
}

export default LoginHero
