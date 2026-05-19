import { useTranslation } from 'react-i18next'

function LoginFooter() {
    const { t } = useTranslation()

    return (
        <footer className="fixed bottom-0 w-full h-24 z-10 flex items-center justify-center pointer-events-none">
            <div className="absolute inset-0 grass-texture opacity-30"></div>
            <div className="relative px-8 py-4 flex flex-col md:flex-row items-center gap-4 text-[10px] font-bold text-outline uppercase tracking-[0.2em]">
                <span>{t('login.footer')}</span>
                <span className="hidden md:block opacity-30">•</span>
                <span>{t('login.privacy')}</span>
                <span className="hidden md:block opacity-30">•</span>
                <span>{t('login.terms')}</span>
            </div>
        </footer>
    )
}

export default LoginFooter
