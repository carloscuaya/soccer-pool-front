import { useState, type ReactNode } from 'react'
import { Outlet } from 'react-router'
import { useTranslation } from 'react-i18next'
import useRequiredLocalStorage from '@hooks/useRequiredLocalStorage'
import TopNavBar from '@components/TopNavBar'
import BottomNavBar from '@components/BottomNavBar'
import NavActionsContext from './NavActionsContext'

function AuthenticatedLayout() {
    const { t } = useTranslation()
    useRequiredLocalStorage('username', t('common.sessionExpired'), '/login')
    const [topNavActions, setTopNavActions] = useState<ReactNode>(null)

    return (
        <NavActionsContext.Provider value={{ topNavActions, setTopNavActions }}>
            <div className="bg-background text-on-surface selection:bg-secondary-container selection:text-on-secondary-container min-h-screen">
                <TopNavBar />
                <Outlet />
                <BottomNavBar />
            </div>
        </NavActionsContext.Provider>
    )
}

export default AuthenticatedLayout
