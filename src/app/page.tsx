"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useGameStore } from "@/lib/store"
import PlayerList from "@/components/player-list"
import { Button } from "@/components/ui/button"
import { Sparkles, Info, Users, Play, History, PlusCircle } from "lucide-react"
import { initializeDatabase, createGame } from "@/lib/db-service"

export default function Home() {
  const router = useRouter()
  const { players, addPlayer, removePlayer, updatePlayer, resetGame, setGameId, isDbInitialized, setIsDbInitialized } =
    useGameStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [showGuide, setShowGuide] = useState(true)

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
    <main className="min-h-screen flex flex-col items-center p-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6 md:mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Drinking Game Box 🎲
        </h1>
        <p className="text-xl text-gray-600">Biến mỗi buổi tụ tập thành kỷ niệm đáng nhớ!</p>
      </motion.div>

      {showGuide && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-foreground flex items-center">
              <Info className="mr-2 h-6 w-6 text-primary" />
              Hướng Dẫn Chơi
            </h2>
            <Button variant="ghost" onClick={() => setShowGuide(false)} className="text-gray-500">
              Đóng
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <Users className="h-6 w-6 text-primary mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Bắt Đầu Chơi</h3>
                  <p className="text-gray-600">
                    Thêm tên người chơi (5-10 người) và nhấn "Bắt Đầu Chơi". Mỗi người sẽ lần lượt rút thẻ và thực hiện
                    thử thách!
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Play className="h-6 w-6 text-primary mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Cách Chơi</h3>
                  <p className="text-gray-600">
                    Đến lượt bạn, nhấn "Rút Thẻ" và thực hiện thử thách trên thẻ. Có 4 loại thẻ: Câu Hỏi, Hành Động, Uống
                    Rượu, và Thân Mật.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <History className="h-6 w-6 text-primary mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Lịch Sử Chơi</h3>
                  <p className="text-gray-600">
                    Xem lại các thẻ đã rút và tạo kỷ niệm vui vẻ với bạn bè. Mỗi thẻ đều là một câu chuyện đáng nhớ!
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-primary/10 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 text-primary">Lưu Ý Quan Trọng</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Uống có trách nhiệm, vui vẻ là chính</li>
                  <li>• Tôn trọng quyết định của người chơi</li>
                  <li>• Không ép buộc nếu không thoải mái</li>
                  <li>• Cười là chính, say là phụ!</li>
                </ul>
              </div>

              <div className="bg-secondary/10 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 text-secondary">Tạo Thẻ Riêng</h3>
                <p className="text-gray-600 mb-3">
                  Bạn có ý tưởng thú vị? Hãy tạo bộ thẻ riêng của mình tại trang Adboard!
                </p>
                <Button
                  variant="outline"
                  onClick={() => router.push("/adboard")}
                  className="w-full flex items-center justify-center"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Tạo Thẻ Mới
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-4 md:p-6"
      >
        <h2 className="text-xl font-bold mb-4 text-center text-foreground">Thêm Người Chơi</h2>

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

      {!showGuide && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4"
        >
          <Button variant="link" onClick={() => setShowGuide(true)} className="text-secondary">
            Xem lại hướng dẫn
          </Button>
        </motion.div>
      )}
    </main>
  )
}
