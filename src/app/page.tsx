"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useGameStore } from "@/lib/store"
import PlayerList from "@/components/player-list"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { initializeDatabase, createGame } from "@/lib/db-service"

export default function Home() {
  const router = useRouter()
  const { players, addPlayer, removePlayer, updatePlayer, resetGame, setGameId, isDbInitialized, setIsDbInitialized } =
    useGameStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    // Reset game when landing on home page
    resetGame()

    // Initialize database if not already done
    const initDb = async () => {
      if (!isDbInitialized) {
        setIsInitializing(true)
        try {
          await initializeDatabase()
          setIsDbInitialized(true)
        } catch (error) {
          console.error("Failed to initialize database:", error)
        } finally {
          setIsInitializing(false)
        }
      } else {
        setIsInitializing(false)
      }
    }

    initDb()
  }, [resetGame, isDbInitialized, setIsDbInitialized])

  const handleStartGame = async () => {
    if (players.length < 2 || isLoading) return

    setIsLoading(true)

    try {
      // Create a new game in IndexedDB
      const gameId = await createGame(players)
      setGameId(gameId)
      router.push("/play")
    } catch (error) {
      console.error("Error starting game:", error)
      alert("Có lỗi xảy ra khi bắt đầu trò chơi. Vui lòng thử lại!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6 md:mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Rút Thẻ Định Mệnh 🎉</h1>
        <p className="text-gray-600">Trò chơi uống rượu vui nhộn cùng bạn bè!</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-4 md:p-6"
      >
        <h2 className="text-lg md:text-xl font-bold mb-4 text-center text-foreground">Thêm Người Chơi</h2>

        {isInitializing ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2 text-foreground">Đang khởi tạo...</span>
          </div>
        ) : (
          <>
            <PlayerList
              players={players}
              onAddPlayer={addPlayer}
              onRemovePlayer={removePlayer}
              onUpdatePlayer={updatePlayer}
              minPlayers={2}
            />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6">
              <Button
                onClick={handleStartGame}
                disabled={players.length < 2 || isLoading}
                className="w-full btn-primary text-base md:text-lg py-3 md:py-4"
              >
                {isLoading ? (
                  "Đang tải..."
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Bắt Đầu Chơi
                  </>
                )}
              </Button>
            </motion.div>
          </>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-6">
        <Button variant="link" onClick={() => router.push("/adboard")} className="text-secondary">
          Quản lý thẻ
        </Button>
      </motion.div>
    </main>
  )
}
