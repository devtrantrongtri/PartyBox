"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Player } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, UserPlus, User } from "lucide-react"

type PlayerListProps = {
  players: Player[]
  onAddPlayer: (player: Player) => void
  onRemovePlayer: (index: number) => void
  onClearPlayers: () => void
  minPlayers?: number
}

export default function PlayerList({
  players,
  onAddPlayer,
  onRemovePlayer,
  onClearPlayers,
  minPlayers = 2,
}: PlayerListProps) {
  const [newPlayerName, setNewPlayerName] = useState("")

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      onAddPlayer({ name: newPlayerName.trim() })
      setNewPlayerName("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddPlayer()
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Input
          type="text"
          placeholder="Tên người chơi mới..."
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          onKeyPress={handleKeyPress}
          className="input-primary"
        />
        <Button onClick={handleAddPlayer} disabled={!newPlayerName.trim()} className="btn-primary">
          <UserPlus className="h-5 w-5" />
        </Button>
        {players.length > 0 && (
          <Button onClick={onClearPlayers} variant="outline" className="ml-2 text-red-600 border-red-300 hover:bg-red-50">
            Xóa hết
          </Button>
        )}
      </div>

      <AnimatePresence>
        {players.map((player, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 mb-2"
          >
            <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 flex-1">
              <User className="h-5 w-5 text-secondary" />
              <span className="font-medium text-foreground">{player.name}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemovePlayer(index)}
              disabled={players.length <= minPlayers}
              className="text-gray-500 hover:text-red-500"
            >
              <X className="h-5 w-5" />
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>

      {players.length < minPlayers && (
        <p className="text-sm text-red-500 mt-2">Cần ít nhất {minPlayers} người chơi để bắt đầu</p>
      )}
    </div>
  )
}
