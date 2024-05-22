import { create, StateCreator } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'

interface IState {
    language: string
    setLanguage: (language: string) => void
}

type Persist = (
    config: StateCreator<IState>,
    options: PersistOptions<IState>
) => StateCreator<IState>

const useLanguageStore = create<IState>((set) => ({
    language: 'en',
    setLanguage: (language) => set({ language })
}))

export default useLanguageStore
