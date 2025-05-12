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

type GameStore = {
  players: Player[]
  currentPlayerIndex: number
  gameHistory: GameHistory[]
  currentCard: Card | null
  isCardFlipped: boolean
  gameId: string | null
  isDbInitialized: boolean

  // Actions
  addPlayer: (player: Player) => void
  removePlayer: (index: number) => void
  updatePlayer: (index: number, player: Player) => void
  setPlayers: (players: Player[]) => void
  nextPlayer: () => void
  setCurrentCard: (card: Card | null) => void
  addToHistory: (history: GameHistory) => void
  resetGame: () => void
  setGameId: (id: string) => void
  setIsCardFlipped: (flipped: boolean) => void
  setIsDbInitialized: (initialized: boolean) => void
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      players: [],
      currentPlayerIndex: 0,
      gameHistory: [],
      currentCard: null,
      isCardFlipped: false,
      gameId: null,
      isDbInitialized: false,

      addPlayer: (player) => set((state) => ({ players: [...state.players, player] })),
      removePlayer: (index) =>
        set((state) => ({
          players: state.players.filter((_, i) => i !== index),
        })),
      updatePlayer: (index, player) =>
        set((state) => ({
          players: state.players.map((p, i) => (i === index ? player : p)),
        })),
      setPlayers: (players) => set({ players }),
      nextPlayer: () =>
        set((state) => ({
          currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
          isCardFlipped: false,
          currentCard: null,
        })),
      setCurrentCard: (card) => set({ currentCard: card }),
      addToHistory: (history) =>
        set((state) => ({
          gameHistory: [history, ...state.gameHistory],
        })),
      resetGame: () =>
        set({
          currentPlayerIndex: 0,
          gameHistory: [],
          currentCard: null,
          isCardFlipped: false,
        }),
      setGameId: (id) => set({ gameId: id }),
      setIsCardFlipped: (flipped) => set({ isCardFlipped: flipped }),
      setIsDbInitialized: (initialized) => set({ isDbInitialized: initialized }),
    }),
    {
      name: "drinking-game-storage",
    },
  ),
)
