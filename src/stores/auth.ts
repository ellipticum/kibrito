import { create, StateCreator } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'

interface IState {
    accessToken: string | null
    refreshToken: string | null
    setTokens: (accessToken: string, refreshToken: string) => void
    clearTokens: () => void
}

type Persist = (
    config: StateCreator<IState>,
    options: PersistOptions<IState>
) => StateCreator<IState>

const useAuthStore = create<IState>(
    (persist as Persist)(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
            clearTokens: () => set({ accessToken: null, refreshToken: null })
        }),
        {
            name: 'auth'
        }
    )
)

export default useAuthStore
