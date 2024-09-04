import { create } from 'zustand' //LIBRERIA PER AVERE STATI GLOBALI

//STATISTICHE DEL GIOCO
const useGameState = create((set) => ({
    gameId: {id: null, new: false },
    gameState: "lobby", //lobby: waiting for players, playing: game in progress, end: game ended
    currentTeam: "red",
    winningTeam: "",
    setGameId: (gameId) => set({ gameId }),
    setGameState: (gameState) => set({ gameState }),
    setCurrentTeam: (currentTeam) => set({ currentTeam }),
    setWinningTeam: (winningTeam) => set({ winningTeam })
}))

//PAROLE DELLA CARTA E PAROLE TABU'
const useCardWords = create((set) => ({
    cardWord: "prova",
    tabooWords: ["parola1", "parola2", "parola3", "parola4", "parola5"],
    setCardWords: (cardWord) => set({ cardWord }),
    setTabooWords: (tabooWords) => set({ tabooWords }),
}))

//PUNTEGGI DELLE SQUADRE
const useTeamsScore = create((set) => ({
    redScore: 0,
    blueScore: 0,
    setRedScore: (redScore) => set({ redScore }),
    setBlueScore: (blueScore) => set({ blueScore }),
}))

export { useGameState, useCardWords, useTeamsScore};
