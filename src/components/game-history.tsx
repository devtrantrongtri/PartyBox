"use client"

import { motion } from "framer-motion"
import type { GameHistory } from "@/lib/store"
import { Heart, HelpCircle, Zap, Beer } from "lucide-react"

type GameHistoryProps = {
  history: GameHistory[]
}

export default function GameHistoryComponent({ history }: GameHistoryProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "skinship":
        return <Heart className="h-4 w-4 text-skinship" />
      case "question":
        return <HelpCircle className="h-4 w-4 text-question" />
      case "action":
        return <Zap className="h-4 w-4 text-action" />
      case "drink":
        return <Beer className="h-4 w-4 text-drink" />
      default:
        return null
    }
  }

  if (history.length === 0) {
    return <div className="text-center text-gray-500 py-4">Chưa có lịch sử. Hãy bắt đầu chơi!</div>
  }

  return (
    <div className="space-y-2 md:space-y-3 max-h-[200px] md:max-h-[300px] overflow-y-auto p-2">
      {history.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="bg-muted rounded-lg p-2 md:p-3"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-foreground">{item.player}</span>
            <span className="text-gray-500 text-xs">{new Date(item.timestamp).toLocaleTimeString()}</span>
            {getTypeIcon(item.cardType)}
          </div>
          <p className="text-sm text-foreground">{item.cardContent}</p>
        </motion.div>
      ))}
    </div>
  )
}
