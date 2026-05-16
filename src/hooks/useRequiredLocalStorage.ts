import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { sileo } from 'sileo'

function useRequiredLocalStorage(key: string, errorMessage: string, redirectTo: string): string | null {
    const navigate = useNavigate()
    const [value] = useState<string | null>(() => localStorage.getItem(key))

    useEffect(() => {
        if (!value) {
            sileo.error({ title: errorMessage })
            navigate(redirectTo)
        }
    }, [navigate, value, errorMessage, redirectTo])

    return value
}

export default useRequiredLocalStorage
