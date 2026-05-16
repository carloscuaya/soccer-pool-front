import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router"
import { sileo } from "sileo"
import { useTranslation } from 'react-i18next'
import i18next from '@i18n/index'
import useRequiredLocalStorage from '@hooks/useRequiredLocalStorage'

function UpdatePassword() {
    const { t } = useTranslation()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const username = useRequiredLocalStorage('username', t('common.sessionExpired'), '/login')

    const navigate = useNavigate()

    const currentLang = i18next.language

    const toggleLanguage = () => {
        const next = currentLang === 'es' ? 'en' : 'es'
        i18next.changeLanguage(next)
        localStorage.setItem('lang', next)
    }

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!password || !confirmPassword) {
            sileo.warning({ title: t('updatePassword.warnFillFields') })
            return
        }

        if (password !== confirmPassword) {
            sileo.warning({ title: t('updatePassword.warnNoMatch') })
            return
        }

        if (password.length < 6) {
            sileo.warning({ title: t('updatePassword.warnTooShort') })
            return
        }

        setLoading(true)

        try {
            await axios.put(
                'https://spb-4d1b4d1e.fastapicloud.dev/users/password',
                { "username": username, "newPassword": password },
                { headers: { 'Content-Type': 'application/json' } }
            )

            sileo.success({ title: t('updatePassword.successUpdated') })
            navigate("/home")

        } catch (error: unknown) {
            console.error('Update Failed:', error)
            sileo.error({ title: t('updatePassword.errUpdate') })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-background text-on-surface min-h-screen selection:bg-secondary-container selection:text-on-secondary-container">
            {/* Cloud-like Gradient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-24 -left-24 w-[600px] h-[600px] rounded-full bg-secondary-fixed/30 blur-[120px]"></div>
                <div className="absolute top-1/2 -right-48 w-[800px] h-[800px] rounded-full bg-primary-fixed/10 blur-[140px]"></div>
                <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-surface-container-low to-transparent"></div>
            </div>

            {/* Main Header */}
            <header className="fixed top-0 w-full flex justify-between items-center px-8 py-6 z-50">
                <div className="flex items-center gap-2">
                    <span className="font-black text-2xl tracking-tighter text-primary">{t('common.appName')}</span>
                </div>
                <button onClick={toggleLanguage} className="text-xs font-bold text-secondary border border-secondary/30 rounded-full px-3 py-1 hover:bg-secondary/10 transition-colors">
                    {currentLang === 'es' ? 'EN' : 'ES'}
                </button>
            </header>

            <main className="relative z-10 flex min-h-screen items-center justify-center px-6 lg:px-8">
                <div className="w-full max-w-md p-10 lg:p-12 rounded-[40px] bg-surface-container-lowest/80 backdrop-blur-2xl shadow-[0_40px_80px_-20px_rgba(0,31,41,0.08)] border border-white">
                    <div className="mb-10 text-center">
                        <span className="material-symbols-outlined text-5xl text-secondary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>lock_reset</span>
                        <h2 className="font-extrabold text-3xl text-on-surface tracking-tight mb-2">{t('updatePassword.title')}</h2>
                        <p className="text-on-surface-variant font-medium text-sm">{t('updatePassword.subtitle')}</p>
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-secondary uppercase tracking-widest ml-1" htmlFor="new-password">{t('updatePassword.newPassword')}</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline" data-icon="vpn_key">vpn_key</span>
                                <input
                                    className="w-full pl-12 pr-12 py-4 rounded-2xl bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 transition-all text-on-surface placeholder:text-outline"
                                    id="new-password"
                                    placeholder="••••••••••••"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors flex items-center justify-center"
                                >
                                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-secondary uppercase tracking-widest ml-1" htmlFor="confirm-password">{t('updatePassword.confirmPassword')}</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline" data-icon="password">password</span>
                                <input
                                    className="w-full pl-12 pr-12 py-4 rounded-2xl bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 transition-all text-on-surface placeholder:text-outline"
                                    id="confirm-password"
                                    placeholder="••••••••••••"
                                    type={showPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button className="group relative w-full py-4 px-6 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-full font-extrabold text-lg shadow-[0_20px_40px_-10px_rgba(13,99,27,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(13,99,27,0.4)] active:scale-[0.98] transition-all overflow-hidden" type="submit" disabled={loading}>
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {loading ? t('updatePassword.updating') : t('updatePassword.secureAccount')}
                                    <span className="material-symbols-outlined" data-icon="check_circle">check_circle</span>
                                </span>
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default UpdatePassword
