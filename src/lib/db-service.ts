import { openDB, type DBSchema, type IDBPDatabase } from "idb"
import { defaultCards } from "./seed-data"
import type { Card, CardType, IntensityLevel, Player, GameHistory } from "./store"

interface GameDB extends DBSchema {
  cards: {
    key: string
    value: Card
    indexes: {
      "by-type": CardType
      "by-intensity": IntensityLevel
    }
  }
  games: {
    key: string
    value: {
      id: string
      players: Player[]
      history: GameHistory[]
      currentPlayerIndex: number
      createdAt: Date
    }
  }
}

let dbPromise: Promise<IDBPDatabase<GameDB>> | null = null
let dbInstance: IDBPDatabase<GameDB> | null = null
let usedCardIds: Set<string> = new Set()

// Initialize the database
const initDB = async (): Promise<IDBPDatabase<GameDB>> => {
  if (dbInstance) return dbInstance

  if (!dbPromise) {
    dbPromise = openDB<GameDB>("drinking-game-db", 1, {
      upgrade(db) {
        // Create cards store if it doesn't exist
        if (!db.objectStoreNames.contains("cards")) {
          const cardStore = db.createObjectStore("cards", { keyPath: "_id" })
          cardStore.createIndex("by-type", "type")
          cardStore.createIndex("by-intensity", "intensity")
        }

        // Create games store if it doesn't exist
        if (!db.objectStoreNames.contains("games")) {
          db.createObjectStore("games", { keyPath: "id" })
        }
      },
    })
  }

  try {
    const db = await dbPromise
    dbInstance = db
    return db
  } catch (error) {
    console.error("Error initializing database:", error)
    throw error
  }
}

// Seed default cards
export const seedDefaultCards = async (): Promise<void> => {
  try {
    const db = await initDB()
    const tx = db.transaction("cards", "readwrite")
    const store = tx.objectStore("cards")

    // Clear existing cards
    await store.clear()

    // Add all default cards
    for (const card of defaultCards) {
      await store.add({
        ...card,
        _id: crypto.randomUUID(),
      })
    }

    await tx.done
    console.log("Default cards seeded successfully")
  } catch (error) {
    console.error("Error seeding default cards:", error)
  }
}

// Card operations
export const getCards = async (type?: CardType, intensity?: IntensityLevel): Promise<Card[]> => {
  try {
    const db = await initDB()
    const tx = db.transaction("cards", "readonly")
    const store = tx.objectStore("cards")

    let cards: Card[]

    if (type && type !== "all") {
      cards = await store.index("by-type").getAll(type)
      if (intensity && intensity !== "all") {
        cards = cards.filter((card) => card.intensity === intensity)
      }
    } else if (intensity && intensity !== "all") {
      cards = await store.index("by-intensity").getAll(intensity)
    } else {
      cards = await store.getAll()
    }

    await tx.done
    return cards
  } catch (error) {
    console.error("Error getting cards:", error)
    return []
  }
}

export const getCard = async (id: string): Promise<Card | undefined> => {
  try {
    const db = await initDB()
    return db.get("cards", id)
  } catch (error) {
    console.error("Error getting card:", error)
    return undefined
  }
}

export const getRandomCard = async (type?: CardType, intensity?: IntensityLevel): Promise<Card | null> => {
  try {
    const cards = await getCards(type, intensity)
    if (cards.length === 0) return null

    // Lọc ra các thẻ chưa được sử dụng
    const availableCards = cards.filter(card => !usedCardIds.has(card._id))

    // Nếu tất cả thẻ đã được sử dụng, reset lại danh sách
    if (availableCards.length === 0) {
      usedCardIds.clear()
      return getRandomCard(type, intensity)
    }

    // Chọn ngẫu nhiên từ các thẻ còn lại
    const randomIndex = Math.floor(Math.random() * availableCards.length)
    const selectedCard = availableCards[randomIndex]

    // Đánh dấu thẻ đã được sử dụng
    usedCardIds.add(selectedCard._id)

    return selectedCard
  } catch (error) {
    console.error("Error getting random card:", error)
    return null
  }
}

export const addCard = async (card: Omit<Card, "_id">): Promise<Card> => {
  try {
    const db = await initDB()
    const newCard: Card = {
      ...card,
      _id: crypto.randomUUID(),
    }

    await db.add("cards", newCard)
    return newCard
  } catch (error) {
    console.error("Error adding card:", error)
    throw error
  }
}

export const updateCard = async (id: string, card: Partial<Card>): Promise<Card | null> => {
  try {
    const db = await initDB()
    const existingCard = await db.get("cards", id)

    if (!existingCard) return null
    if (existingCard.isDefault) {
      // Don't allow updating default cards
      return existingCard
    }

    const updatedCard = {
      ...existingCard,
      ...card,
    }

    await db.put("cards", updatedCard)
    return updatedCard
  } catch (error) {
    console.error("Error updating card:", error)
    return null
  }
}

export const deleteCard = async (id: string): Promise<boolean> => {
  try {
    const db = await initDB()
    const existingCard = await db.get("cards", id)

    if (!existingCard) return false
    if (existingCard.isDefault) return false // Don't allow deleting default cards

    await db.delete("cards", id)
    return true
  } catch (error) {
    console.error("Error deleting card:", error)
    return false
  }
}

// Game operations
export const createGame = async (players: Player[]): Promise<string> => {
  try {
    const db = await initDB()
    const gameId = crypto.randomUUID()

    await db.add("games", {
      id: gameId,
      players,
      history: [],
      currentPlayerIndex: 0,
      createdAt: new Date(),
    })

    return gameId
  } catch (error) {
    console.error("Error creating game:", error)
    throw error
  }
}

export const getGame = async (id: string) => {
  try {
    const db = await initDB()
    return db.get("games", id)
  } catch (error) {
    console.error("Error getting game:", error)
    return null
  }
}

export const updateGameHistory = async (gameId: string, historyItem: GameHistory): Promise<boolean> => {
  try {
    const db = await initDB()
    const game = await db.get("games", gameId)

    if (!game) return false

    game.history = [historyItem, ...game.history]
    await db.put("games", game)

    return true
  } catch (error) {
    console.error("Error updating game history:", error)
    return false
  }
}

export const updateGamePlayerIndex = async (gameId: string, index: number): Promise<boolean> => {
  try {
    const db = await initDB()
    const game = await db.get("games", gameId)

    if (!game) return false

    game.currentPlayerIndex = index
    await db.put("games", game)

    return true
  } catch (error) {
    console.error("Error updating game player index:", error)
    return false
  }
}

// Fallback to localStorage if IndexedDB is not available
const fallbackStorage = {
  getItem: (key: string) => {
    try {
      return localStorage.getItem(key)
    } catch (e) {
      console.error("localStorage error:", e)
      return null
    }
  },
  setItem: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value)
      return true
    } catch (e) {
      console.error("localStorage error:", e)
      return false
    }
  },
}

// Check if IndexedDB is available
export const isIndexedDBAvailable = (): boolean => {
  try {
    return typeof indexedDB !== "undefined"
  } catch {
    return false
  }
}

// Initialize the database
export const initializeDatabase = async (): Promise<void> => {
  try {
    if (isIndexedDBAvailable()) {
      await initDB()
      await seedDefaultCards()
      console.log("IndexedDB initialized successfully")
    } else {
      console.warn("IndexedDB not available, falling back to localStorage")
      // Seed default cards to localStorage
      const existingCards = fallbackStorage.getItem("drinking-game-cards")
      if (!existingCards) {
        const cards = defaultCards.map((card) => ({
          ...card,
          _id: crypto.randomUUID(),
        }))
        fallbackStorage.setItem("drinking-game-cards", JSON.stringify(cards))
      }
    }
  } catch (error) {
    console.error("Error initializing database:", error)
  }
}

export const resetCardHistory = (): void => {
  usedCardIds.clear()
}
