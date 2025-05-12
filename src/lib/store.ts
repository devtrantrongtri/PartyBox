import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Player = {
  name: string
  avatar?: string
}

export type CardType = "skinship" | "question" | "action" | "drink" | "all"
export type IntensityLevel = "light" | "medium" | "heavy" | "all"

export type Card = {
  _id: string
  content: string
  type: CardType
  intensity: IntensityLevel
  isDefault: boolean
}

export type GameHistory = {
  player: string
  cardContent: string
  cardType: CardType
  timestamp: Date
}

interface GameState {
  players: Player[]
  currentPlayerIndex: number
  gameHistory: GameHistory[]
  currentCard: Card | null
  isCardFlipped: boolean
  gameId: string | null
  isDbInitialized: boolean
  gameMode: IntensityLevel | "random"
}

interface GameStore extends GameState {
  addPlayer: (name: string) => void
  removePlayer: (index: number) => void
  nextPlayer: () => void
  setCurrentCard: (card: Card | null) => void
  setIsCardFlipped: (isFlipped: boolean) => void
  addToHistory: (historyItem: GameHistory) => void
  resetGame: () => void
  setGameId: (id: string | null) => void
  setIsDbInitialized: (initialized: boolean) => void
  setGameMode: (mode: IntensityLevel | "random") => void
}

export const useGameStore = create<GameStore>((set) => ({
  players: [],
  currentPlayerIndex: 0,
  gameHistory: [],
  currentCard: null,
  isCardFlipped: false,
  gameId: null,
  isDbInitialized: false,
  gameMode: "random",

  addPlayer: (name) =>
    set((state) => ({
      players: [...state.players, { name, id: crypto.randomUUID() }],
    })),

  removePlayer: (index) =>
    set((state) => ({
      players: state.players.filter((_, i) => i !== index),
    })),

  nextPlayer: () =>
    set((state) => ({
      currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
    })),

  setCurrentCard: (card) =>
    set({
      currentCard: card,
    }),

  setIsCardFlipped: (isFlipped) =>
    set({
      isCardFlipped: isFlipped,
    }),

  addToHistory: (historyItem) =>
    set((state) => ({
      gameHistory: [historyItem, ...state.gameHistory],
    })),

  resetGame: () =>
    set({
      players: [],
      currentPlayerIndex: 0,
      gameHistory: [],
      currentCard: null,
      isCardFlipped: false,
      gameId: null,
      gameMode: "random",
    }),

  setGameId: (id) =>
    set({
      gameId: id,
    }),

  setIsDbInitialized: (initialized) =>
    set({
      isDbInitialized: initialized,
    }),

  setGameMode: (mode) =>
    set({
      gameMode: mode,
    }),
}))
