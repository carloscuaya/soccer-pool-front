import { useTranslation } from 'react-i18next'

interface LoginFormProps {
    username: string
    password: string
    showPassword: boolean
    loading: boolean
    onUsernameChange: (value: string) => void
    onPasswordChange: (value: string) => void
    onTogglePassword: () => void
    onSubmit: (e: { preventDefault: () => void }) => void
}

function LoginForm({
    username,
    password,
    showPassword,
    loading,
    onUsernameChange,
    onPasswordChange,
    onTogglePassword,
    onSubmit,
}: LoginFormProps) {
    const { t } = useTranslation()

    return (
        <div className="flex flex-col items-center lg:items-end">
            <div className="w-full max-w-md p-10 lg:p-12 rounded-[40px] bg-surface-container-lowest/80 backdrop-blur-2xl shadow-[0_40px_80px_-20px_rgba(0,31,41,0.08)] border border-white">
                <div className="mb-10 text-center lg:text-left">
                    <h2 className="font-extrabold text-4xl text-on-surface tracking-tight mb-2">{t('login.formTitle')}</h2>
                    <p className="text-on-surface-variant font-medium">{t('login.formSubtitle')}</p>
                </div>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-secondary uppercase tracking-widest ml-1" htmlFor="username">{t('login.username')}</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline" data-icon="alternate_email">badge</span>
                            <input
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 transition-all text-on-surface placeholder:text-outline"
                                id="username"
                                name="username"
                                placeholder={t('login.usernamePlaceholder')}
                                type="text"
                                value={username}
                                onChange={(e) => onUsernameChange(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                            <label className="block text-xs font-bold text-secondary uppercase tracking-widest" htmlFor="access-key">{t('login.accessKey')}</label>
                            <a className="text-xs font-bold text-primary hover:underline" href="#">{t('login.forgot')}</a>
                        </div>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline" data-icon="vpn_key">vpn_key</span>
                            <input
                                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 transition-all text-on-surface placeholder:text-outline"
                                id="access-key"
                                name="access-key"
                                placeholder="••••••••••••"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => onPasswordChange(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={onTogglePassword}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors flex items-center justify-center"
                            >
                                <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                            </button>
                        </div>
                    </div>
                    <div className="pt-4">
                        <button
                            className="group relative w-full py-4 px-6 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-full font-extrabold text-lg shadow-[0_20px_40px_-10px_rgba(13,99,27,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(13,99,27,0.4)] active:scale-[0.98] transition-all overflow-hidden"
                            type="submit"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? (
                                    <>
                                        <span className="animate-spin-y text-xl">⚽</span>
                                        {t('login.loggingIn')}
                                    </>
                                ) : (
                                    <>
                                        {t('login.login')}
                                        <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
                                    </>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm
