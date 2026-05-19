import { useNavigate } from 'react-router'
import { sileo } from 'sileo'
import { useTranslation } from 'react-i18next'

function useLogout() {
    const navigate = useNavigate()
    const { t } = useTranslation()

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('username')
        localStorage.removeItem('selectedTournament')
        sileo.success({ title: t('common.loggedOut') })
        navigate('/login')
    }

    return { handleLogout }
}

export default useLogout
