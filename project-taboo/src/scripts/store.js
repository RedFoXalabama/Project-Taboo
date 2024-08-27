import { create } from 'zustand'

const useGameState = create((set) => ({
    gameState: "lobby", //lobby: waiting for players, playing: game in progress, end: game ended
    currentTeam: "red",
    setGameState: (gameState) => set({ gameState }),
    setCurrentTeam: (currentTeam) => set({ currentTeam })
}))

const useCardWords = create((set) => ({
    cardWord: "prova",
    tabooWords: ["parola1", "parola2", "parola3", "parola4", "parola5"],
    setCardWords: (cardWord) => set({ cardWord }),
    setTabooWords: (tabooWords) => set({ tabooWords }),
}))

const useTeamsScore = create((set) => ({
    redScore: 0,
    blueScore: 0,
    setRedScore: (redScore) => set({ redScore }),
    setBlueScore: (blueScore) => set({ blueScore }),
}))

export { useGameState, useCardWords, useTeamsScore};
