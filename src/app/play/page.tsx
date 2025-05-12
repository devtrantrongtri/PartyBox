"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useGameStore, type CardType, type GameHistory } from "@/lib/store"
import CardDisplay from "@/components/card-display"
import GameHistoryComponent from "@/components/game-history"
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
  } = useGameStore()

  const [isLoading, setIsLoading] = useState(false)
  const [playCardSound] = useState(() => () => {})
  const [playSuccessSound] = useState(() => () => {})

  useEffect(() => {
    // Redirect to home if no players or game ID
    if (players.length === 0 || !gameId) {
      router.push("/")
    }
  }, [players, gameId, router])

  const handleDrawCard = async () => {
    if (isLoading || isCardFlipped) return

    setIsLoading(true)

    try {
      // Get a random card from IndexedDB
      const card = await getRandomCard()

      if (!card) {
        throw new Error("No cards found")
      }

      setCurrentCard(card)

      // Play card sound
      playCardSound()

      // Automatically flip the card when drawn
      setIsCardFlipped(true)

      // Add to history
      const historyItem: GameHistory = {
        player: players[currentPlayerIndex].name,
        cardContent: card.content,
        cardType: card.type as CardType,
        timestamp: new Date(),
      }

      addToHistory(historyItem)

      // Update game in IndexedDB
      if (gameId) {
        await updateGameHistory(gameId, historyItem)
      }

      // Trigger confetti for special cards
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
      // Update current player index in IndexedDB
      const nextPlayerIndex = (currentPlayerIndex + 1) % players.length

      if (gameId) {
        await updateGamePlayerIndex(gameId, nextPlayerIndex)
      }

      // Play success sound
      playSuccessSound()

      // Move to next player
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
      // Nếu thẻ đã lật, cho phép lật lại
      setIsCardFlipped(false)
    } else if (!isLoading) {
      // Nếu thẻ chưa lật và không đang tải, rút thẻ mới
      handleDrawCard()
    }
  }

  if (players.length === 0 || !gameId) {
    return null // Will redirect in useEffect
  }

  return (
    <main className="min-h-screen flex flex-col p-4 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <Button variant="ghost" onClick={() => router.push("/")} className="text-gray-600 p-2 md:p-4">
          <Home className="h-5 w-5" />
          <span className="hidden md:inline ml-2">Trang chủ</span>
        </Button>

        <Button variant="ghost" onClick={() => router.refresh()} className="text-gray-600 p-2 md:p-4">
          <RefreshCw className="h-5 w-5" />
          <span className="hidden md:inline ml-2">Làm mới</span>
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">Tới lượt của</h2>
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentPlayerIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-3xl md:text-4xl font-bold text-primary"
          >
            {players[currentPlayerIndex].name}
          </motion.h1>
        </AnimatePresence>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center mb-4 md:mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`card-${currentPlayerIndex}-${currentCard?._id || "empty"}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-full"
          >
            <CardDisplay card={currentCard} isFlipped={isCardFlipped} onFlip={handleCardClick} isLoading={isLoading} />
          </motion.div>
        </AnimatePresence>

        <div className="w-full max-w-md mt-4 md:mt-8">
          <Button
            onClick={handleNextPlayer}
            disabled={isLoading || !isCardFlipped}
            className="w-full btn-secondary text-base md:text-lg py-3 md:py-4"
          >
            <span>Hoàn Thành</span>
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>

      <div className="mt-2 md:mt-4">
        <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground">Lịch Sử</h3>
        <GameHistoryComponent history={gameHistory} />
      </div>
    </main>
  )
}
