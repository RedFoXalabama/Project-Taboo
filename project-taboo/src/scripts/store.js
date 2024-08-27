import { create } from 'zustand'

const useGameState = create((set) => ({
    gameState: "lobby", //lobby: waiting for players, playing: game in progress, end: game ended
    currentTeam: null,
    setGameState: (gameState) => set({ gameState }),
    setCurrentTeam: (currentTeam) => set({ currentTeam })
}))

export default useGameState