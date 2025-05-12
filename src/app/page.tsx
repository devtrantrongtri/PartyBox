"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useGameStore } from "@/lib/store"
import PlayerList from "@/components/player-list"
import { Button } from "@/components/ui/button"
import { Sparkles, Info, Users, Play, History, PlusCircle } from "lucide-react"
import { initializeDatabase, createGame } from "@/lib/db-service"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { IntensityLevel } from "@/lib/store"

export default function Home() {
  const router = useRouter()
  const { players, addPlayer, removePlayer, resetGame, setGameId, isDbInitialized, setIsDbInitialized, setGameMode } =
    useGameStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [showGuide, setShowGuide] = useState(true)
  const [selectedMode, setSelectedMode] = useState<IntensityLevel | "random">("random")

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
      // Set game mode before creating game
      setGameMode(selectedMode)
      
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
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-amber-300 to-emerald-700 bg-clip-text text-transparent">
          Drinking Game Box 🎲
        </h1>
        {/* <p className="text-xl text-gray-600">Biến mỗi buổi tụ tập thành kỷ niệm đáng nhớ!</p> */}
      </motion.div>

      {showGuide && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full bg-white rounded-xl shadow-lg p-2 mb-3"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Info className="mr-2 h-6 w-6 text-amber-300" />
              Hướng Dẫn Chơi
            </h2>
            <Button variant="ghost" onClick={() => setShowGuide(false)} className="text-gray-500">
              Đóng
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <Users className="h-6 w-6 text-amber-300 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Bắt Đầu Chơi</h3>
                  <p className="text-gray-600">
                    Thêm tên người chơi (5-10 người) và nhấn &quot;Bắt Đầu Chơi&quot;. Mỗi người sẽ lần lượt rút thẻ và thực hiện
                    thử thách!
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Play className="h-6 w-6 text-amber-300 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Cách Chơi</h3>
                  <p className="text-gray-600">
                    Đến lượt bạn, nhấn &quot;Rút Thẻ&quot; và thực hiện thử thách trên thẻ. Có 4 loại thẻ: Câu Hỏi, Hành Động, Uống
                    Rượu, và Thân Mật.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <History className="h-6 w-6 text-amber-300 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Lịch Sử Chơi</h3>
                  <p className="text-gray-600">
                    Xem lại các thẻ đã rút và tạo kỷ niệm vui vẻ với bạn bè. Mỗi thẻ đều là một câu chuyện đáng nhớ!
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-amber-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 text-amber-600">Lưu Ý Quan Trọng</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Uống có trách nhiệm, vui vẻ là chính</li>
                  <li>• Tôn trọng quyết định của người chơi</li>
                  <li>• Không ép buộc nếu không thoải mái</li>
                  <li>• Cười là chính, say là phụ!</li>
                </ul>
              </div>

              <div className="bg-emerald-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 text-emerald-700">Tạo Thẻ Riêng</h3>
                <p className="text-gray-600 mb-3">
                  Bạn có ý tưởng thú vị? Hãy tạo bộ thẻ riêng của mình tại trang Adboard!
                </p>
                <Button
                  variant="outline"
                  onClick={() => router.push("/adboard")}
                  className="w-full flex items-center justify-center border-emerald-700 text-emerald-700 hover:bg-emerald-50"
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
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Thêm Người Chơi</h2>

        {isInitializing ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-300"></div>
            <span className="ml-2 text-gray-800">Đang khởi tạo...</span>
          </div>
        ) : (
          <>
            <PlayerList
              players={players}
              onAddPlayer={addPlayer}
              onRemovePlayer={removePlayer}
              onClearPlayers={() => {
                console.log("Clearing all players...");
                // Loop through players and remove each one
                for (let i = players.length - 1; i >= 0; i--) {
                  removePlayer(i);
                }
              }}
              minPlayers={2}
            />

            <div className="mt-6 space-y-4">
              <div className="bg-amber-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 text-amber-600">Chọn Chế Độ Chơi</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Chọn mức độ thử thách phù hợp với nhóm của bạn
                </p>
                <Select value={selectedMode} onValueChange={(value) => setSelectedMode(value as IntensityLevel | "random")}>
                  <SelectTrigger className="w-full bg-white border-gray-200 focus:border-amber-300 focus:ring-amber-300">
                    <SelectValue placeholder="Chọn chế độ chơi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="random">🎲 Ngẫu Nhiên - Tất cả mức độ</SelectItem>
                    <SelectItem value="light">😊 Nhẹ Nhàng - Thử thách đơn giản</SelectItem>
                    <SelectItem value="medium">😏 Vừa Phải - Thử thách trung bình</SelectItem>
                    <SelectItem value="heavy">🔥 Nặng Đô - Thử thách khó</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <Button
                  onClick={handleStartGame}
                  disabled={players.length < 2 || isLoading}
                  className="w-full bg-amber-300 hover:bg-amber-400 text-gray-800 font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
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
            </div>
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
          <Button variant="link" onClick={() => setShowGuide(true)} className="text-emerald-700 hover:text-emerald-800">
            Xem lại hướng dẫn
          </Button>
        </motion.div>
      )}
    </main>
  )
}
