import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router"
import { sileo } from "sileo"



function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleLogin = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        setLoading(true)

        if (!username || !password) {
            sileo.warning({ title: "Please enter both username and password" })
            setLoading(false)
            return
        }

        try {
            const response = await axios.post(
                'https://spb-4d1b4d1e.fastapicloud.dev/login',
                { username, password },
                { headers: { 'Content-Type': 'application/json' } }
            )

            // Save token to localStorage (or context/state)
            localStorage.setItem('access_token', response.data.access_token)
            localStorage.setItem('username', username)

            // Redirect to dashboard or home page
            navigate("/home")
            sileo.success({ title: "Welcome " + username })

        } catch (error: any) {
            console.error('Login Failed:', error)
            if (error.response && error.response.status === 401) {
                sileo.warning({ title: "Invalid credentials" })
            } else {
                sileo.error({ title: "Error connecting to the server" })
            }

        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="bg-background font-body text-on-surface min-h-screen selection:bg-secondary-container selection:text-on-secondary-container">
            {/* Cloud-like Gradient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-24 -left-24 w-[600px] h-[600px] rounded-full bg-secondary-fixed/30 blur-[120px]"></div>
                <div className="absolute top-1/2 -right-48 w-[800px] h-[800px] rounded-full bg-primary-fixed/10 blur-[140px]"></div>
                <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-surface-container-low to-transparent"></div>
            </div>
            {/* Main Navigation Shell (TopNavBar - Suppressed for Login context, but following identity) */}
            <header className="fixed top-0 w-full flex justify-between items-center px-8 py-6 z-50">
                <div className="flex items-center gap-2">
                    <span className="font-headline font-black text-2xl tracking-tighter text-primary">Jacobo Xinto Futbol Pro</span>
                </div>
                <div className="hidden md:flex items-center gap-6">
                    <a className="text-sm font-label font-semibold text-secondary hover:text-primary transition-colors" href="#">Support</a>
                    <a className="text-sm font-label font-semibold text-secondary hover:text-primary transition-colors" href="#">Documentation</a>
                </div>
            </header>
            <main className="relative z-10 flex min-h-screen items-center justify-center px-6 lg:px-8">
                <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-24">
                    {/* Left Side: Editorial Content */}
                    <div className="hidden lg:flex flex-col space-y-8 text-left">
                        <div className="space-y-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-label font-bold uppercase tracking-widest">
                                Professional Edition
                            </span>
                            <h1 className="font-headline font-extrabold text-7xl text-primary leading-[0.9] tracking-tighter">
                                The Pitch is <br /><span className="text-secondary italic">Yours to Rule.</span>
                            </h1>
                            <p className="text-lg text-on-surface-variant max-w-md font-medium leading-relaxed">
                                Access the most powerful tactical suite in football management. Real-time analytics, athlete tracking, and tournament control at your fingertips.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-[0_32px_64px_-15px_rgba(186,234,255,0.4)] border border-white/50 backdrop-blur-sm">
                                <span className="material-symbols-outlined text-secondary text-3xl mb-3" data-icon="monitoring">monitoring</span>
                                <h3 className="font-headline font-bold text-on-surface">Live Stats</h3>
                                <p className="text-xs text-on-surface-variant mt-1">Real-time performance metrics</p>
                            </div>
                            <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-[0_32px_64px_-15px_rgba(186,234,255,0.4)] border border-white/50 backdrop-blur-sm">
                                <span className="material-symbols-outlined text-primary text-3xl mb-3" data-icon="strategy">strategy</span>
                                <h3 className="font-headline font-bold text-on-surface">Tactical Hub</h3>
                                <p className="text-xs text-on-surface-variant mt-1">Deep squad management</p>
                            </div>
                        </div>
                    </div>
                    {/* Right Side: Login Form */}
                    <div className="flex flex-col items-center lg:items-end">
                        <div className="w-full max-w-md p-10 lg:p-12 rounded-[40px] bg-surface-container-lowest/80 backdrop-blur-2xl shadow-[0_40px_80px_-20px_rgba(0,31,41,0.08)] border border-white">
                            <div className="mb-10 text-center lg:text-left">
                                <h2 className="font-headline font-extrabold text-4xl text-on-surface tracking-tight mb-2">Match Control</h2>
                                <p className="text-on-surface-variant font-medium">Enter your credentials to enter the arena.</p>
                            </div>
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-xs font-label font-bold text-secondary uppercase tracking-widest ml-1" htmlFor="username">Username</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline" data-icon="alternate_email">badge</span>
                                        <input className="w-full pl-12 pr-4 py-4 rounded-2xl bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 transition-all font-body text-on-surface placeholder:text-outline" id="username" name="username" placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="block text-xs font-label font-bold text-secondary uppercase tracking-widest" htmlFor="access-key">Access Key</label>
                                        <a className="text-xs font-label font-bold text-primary hover:underline" href="#">Forgot?</a>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline" data-icon="vpn_key">vpn_key</span>
                                        <input className="w-full pl-12 pr-4 py-4 rounded-2xl bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 transition-all font-body text-on-surface placeholder:text-outline" id="access-key" name="access-key" placeholder="••••••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <button className="group relative w-full py-4 px-6 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-full font-headline font-extrabold text-lg shadow-[0_20px_40px_-10px_rgba(13,99,27,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(13,99,27,0.4)] active:scale-[0.98] transition-all overflow-hidden" type="submit">
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {loading ? 'Logging in...' : 'Login'}
                                            <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
                                        </span>
                                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </main>
            {/* Footer with Grass Texture */}
            <footer className="fixed bottom-0 w-full h-24 z-10 flex items-center justify-center pointer-events-none">
                <div className="absolute inset-0 grass-texture opacity-30"></div>
                <div className="relative px-8 py-4 flex flex-col md:flex-row items-center gap-4 text-[10px] font-label font-bold text-outline uppercase tracking-[0.2em]">
                    <span>© 2026 Jacobo Xinto Football Tech</span>
                    <span className="hidden md:block opacity-30">•</span>
                    <span>Privacy Protocol</span>
                    <span className="hidden md:block opacity-30">•</span>
                    <span>Stadium Terms</span>
                </div>
            </footer>
            {/* Decorative Image Elements */}
            <div className="hidden lg:block fixed bottom-12 right-12 w-96 h-96 -z-10 opacity-20 rotate-12">
                <img alt="Football Pitch Background" className="w-full h-full object-contain mix-blend-multiply" data-alt="wide-angle cinematic shot of a pristine professional football pitch under bright stadium lights with a soft blue sky background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBadNueIZC12F9HeMH-1QHQb8c6ZSPYabDf2iyh1Vdy9CGpjtmHeGKmlZVeBlE7RSRmPbUoHi9bS812zbLi-felnv9kDTc-jnUBD24yJ3xmilybedjdUsmyUFR9CT3w6EMagZ-HBDyunvrPm9bj2jBMNTVal7GOSgKOFFYWT-48gg00rl2mBdu_JjaRPBb9wx2lgTFOWDyxBoThY_RutfEmDAZC4EznNMPN1C5b1VxPEmmiuvQ-wrAn9V2SYVj0gJ2gDSzZ4XZGRLs" />
            </div>
        </div>

    )
}

export default Login
