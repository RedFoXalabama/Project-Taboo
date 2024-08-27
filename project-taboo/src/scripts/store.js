import { create } from 'zustand'

const useGameState = create((set) => ({
    gameState: "lobby", //lobby: waiting for players, playing: game in progress, end: game ended
    currentTeam: null,
    setGameState: (gameState) => set({ gameState }),
    setCurrentTeam: (currentTeam) => set({ currentTeam })
}))

const useCardWords = create((set) => ({
    cardWord: "prova",
    tabooWords: ["parola1", "parola2", "parola3", "parola4", "parola5"],
    setCardWords: (cardWord) => set({ cardWord }),
    setTabooWords: (tabooWords) => set({ tabooWords }),
}))

export { useGameState, useCardWords };
