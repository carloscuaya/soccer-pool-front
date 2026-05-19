import { useTranslation } from 'react-i18next'
import i18next from '@i18n/index'

function useLanguageToggle() {
    useTranslation() // subscribes to i18n changes so the consuming component re-renders on language switch
    const currentLang = i18next.language

    const toggleLanguage = () => {
        const next = currentLang === 'es' ? 'en' : 'es'
        i18next.changeLanguage(next)
        localStorage.setItem('lang', next)
    }

    return { currentLang, toggleLanguage }
}

export default useLanguageToggle
