import { useState } from 'react'
import { isAxiosError } from 'axios'
import { login as apiLogin, getUser } from '@api/users'
import { useNavigate } from 'react-router'
import { sileo } from 'sileo'
import { useTranslation } from 'react-i18next'
import useLanguageToggle from '@hooks/useLanguageToggle'
import LoginBackground from '@components/login/LoginBackground'
import LoginHero from '@components/login/LoginHero'
import LoginForm from '@components/login/LoginForm'
import LoginFooter from '@components/login/LoginFooter'

function Login() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { currentLang, toggleLanguage } = useLanguageToggle()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        setLoading(true)

        if (!username || !password) {
            sileo.warning({ title: t('login.warnCredentials') })
            setLoading(false)
            return
        }

        try {
            const response = await apiLogin(username, password)
            localStorage.setItem('access_token', response.data.access_token)
            localStorage.setItem('username', username)

            const userResponse = await getUser(username)
            if (userResponse.data && userResponse.data.hasUpdatedPassword === false) {
                navigate('/update-password')
                sileo.warning({ title: t('login.warnUpdatePassword') })
            } else {
                navigate('/home')
                sileo.success({ title: t('login.welcomeUser', { username }) })
            }
        } catch (error: unknown) {
            console.error('Login Failed:', error)
            if (isAxiosError(error) && error.response?.status === 401) {
                sileo.warning({ title: t('login.errInvalidCredentials') })
            } else {
                sileo.error({ title: t('login.errServer') })
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-background text-on-surface min-h-screen selection:bg-secondary-container selection:text-on-secondary-container">
            <LoginBackground />
            <header className="fixed top-0 w-full flex justify-between items-center px-8 py-6 z-50">
                <span className="font-black text-2xl tracking-tighter text-primary">{t('common.appName')}</span>
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-6">
                        <a className="text-sm font-semibold text-secondary hover:text-primary transition-colors" href="#">{t('login.support')}</a>
                        <a className="text-sm font-semibold text-secondary hover:text-primary transition-colors" href="#">{t('login.documentation')}</a>
                    </div>
                    <button onClick={toggleLanguage} className="text-xs font-bold text-secondary border border-secondary/30 rounded-full px-3 py-1 hover:bg-secondary/10 transition-colors">
                        {currentLang === 'es' ? 'EN' : 'ES'}
                    </button>
                </div>
            </header>
            <main className="relative z-10 flex min-h-screen items-center justify-center px-6 lg:px-8">
                <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-24">
                    <LoginHero />
                    <LoginForm
                        username={username}
                        password={password}
                        showPassword={showPassword}
                        loading={loading}
                        onUsernameChange={setUsername}
                        onPasswordChange={setPassword}
                        onTogglePassword={() => setShowPassword(p => !p)}
                        onSubmit={handleLogin}
                    />
                </div>
            </main>
            <LoginFooter />
            <div className="hidden lg:block fixed bottom-12 right-12 w-96 h-96 z-0 opacity-20 rotate-12">
                <img alt="Football Pitch Background" className="w-full h-full object-contain" src={`${import.meta.env.BASE_URL}/soccer-field.png`} />
            </div>
        </div>
    )
}

export default Login
