function LoginBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-24 -left-24 w-[600px] h-[600px] rounded-full bg-secondary-fixed/30 blur-[60px]"></div>
            <div className="absolute top-1/2 -right-48 w-[800px] h-[800px] rounded-full bg-primary-fixed/10 blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-surface-container-low to-transparent"></div>
        </div>
    )
}

export default LoginBackground
