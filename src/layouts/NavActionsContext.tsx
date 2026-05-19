import { createContext, useContext, type ReactNode } from 'react'

interface NavActionsContextType {
    topNavActions: ReactNode
    setTopNavActions: (node: ReactNode) => void
}

const NavActionsContext = createContext<NavActionsContextType>({
    topNavActions: null,
    setTopNavActions: () => {}
})

export function useNavActions() {
    return useContext(NavActionsContext)
}

export default NavActionsContext
