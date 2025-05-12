"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useGameStore, type CardType, type GameHistory } from "@/lib/store"
import CardDisplay from "@/components/card-display"
import { Button } from "@/components/ui/button"
import { ArrowRight, Home, RefreshCw } from "lucide-react"
import confetti from "canvas-confetti"
import { getRandomCard, updateGameHistory, updateGamePlayerIndex } from "@/lib/db-service"

export default function PlayPage() {
  const router = useRouter()
  const {
    players,
    currentPlayerIndex,
    gameHistory,
    currentCard,
    isCardFlipped,
    gameId,
    nextPlayer,
    setCurrentCard,
    addToHistory,
    setIsCardFlipped,
    resetGame,
  } = useGameStore()

  const [isLoading, setIsLoading] = useState(false)
  const [playCardSound] = useState(() => () => {})
  const [playSuccessSound] = useState(() => () => {})

  useEffect(() => {
    if (players.length === 0 || !gameId) {
      router.push("/")
    }
  }, [players, gameId, router])

  const handleDrawCard = async () => {
    if (isLoading || isCardFlipped) return

    setIsLoading(true)

    try {
      const card = await getRandomCard()

      if (!card) {
        throw new Error("No cards found")
      }

      setCurrentCard(card)
      playCardSound()
      setIsCardFlipped(true)

      const historyItem: GameHistory = {
        player: players[currentPlayerIndex].name,
        cardContent: card.content,
        cardType: card.type as CardType,
        timestamp: new Date(),
      }

      addToHistory(historyItem)

      if (gameId) {
        await updateGameHistory(gameId, historyItem)
      }

      if (card.type === "skinship" || card.intensity === "heavy") {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      }
    } catch (error) {
      console.error("Error drawing card:", error)
      alert("Có lỗi xảy ra khi rút thẻ. Vui lòng thử lại!")
    } finally {
      setIsLoading(false)
    }
  }

  const handleNextPlayer = async () => {
    if (isLoading) return

    setIsLoading(true)

    try {
      const nextPlayerIndex = (currentPlayerIndex + 1) % players.length

      if (gameId) {
        await updateGamePlayerIndex(gameId, nextPlayerIndex)
      }

      playSuccessSound()
      nextPlayer()
    } catch (error) {
      console.error("Error updating player:", error)
      alert("Có lỗi xảy ra khi chuyển người chơi. Vui lòng thử lại!")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCardClick = () => {
    if (isCardFlipped) {
      setIsCardFlipped(false)
    } else if (!isLoading) {
      handleDrawCard()
    }
  }

  const handleRefresh = () => {
    resetGame() // Reset game state
    router.push("/") // Redirect to home page
  }

  if (players.length === 0 || !gameId) {
    return null
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex flex-col p-4 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={() => router.push("/")} className="text-gray-700 hover:text-gray-900 p-2 md:p-4">
          <Home className="h-5 w-5" />
          <span className="hidden md:inline ml-2">Trang chủ</span>
        </Button>

        <Button variant="ghost" onClick={handleRefresh} className="text-gray-700 hover:text-gray-900 p-2 md:p-4">
          <RefreshCw className="h-5 w-5" />
          <span className="hidden md:inline ml-2">Chơi lại</span>
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700">Tới lượt của</h2>
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentPlayerIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-3xl md:text-4xl font-bold text-amber-600"
          >
            {players[currentPlayerIndex].name}
          </motion.h1>
        </AnimatePresence>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`card-${currentPlayerIndex}-${currentCard?._id || "empty"}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-full max-w-sm"
          >
            <CardDisplay card={currentCard} isFlipped={isCardFlipped} onFlip={handleCardClick} isLoading={isLoading} />
          </motion.div>
        </AnimatePresence>

        {currentCard && isCardFlipped && (
          <div className="w-full max-w-md mt-8">
            <Button
              onClick={handleNextPlayer}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <span>Hoàn Thành</span>
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
