"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { GameHistory } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import { Heart, HelpCircle, Zap, Beer } from "lucide-react"

interface GameHistoryDisplayProps {
  history: GameHistory[]
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "skinship":
      return <Heart className="h-4 w-4 text-pink-500" />
    case "question":
      return <HelpCircle className="h-4 w-4 text-blue-500" />
    case "action":
      return <Zap className="h-4 w-4 text-orange-500" />
    case "drink":
      return <Beer className="h-4 w-4 text-red-500" />
    default:
      return null
  }
}

const getTypeClass = (type: string) => {
  switch (type) {
    case "skinship":
      return "border-pink-500"
    case "question":
      return "border-blue-500"
    case "action":
      return "border-orange-500"
    case "drink":
      return "border-red-500"
    default:
      return ""
  }
}

export default function GameHistoryDisplay({ history }: GameHistoryDisplayProps) {
  return (
    <div className="w-full max-w-md mt-4 bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Lịch sử thẻ</h3>
      <div className="space-y-2 h-[200px] overflow-y-auto pr-2">
        <AnimatePresence>
          {history.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className={`bg-gray-50 rounded-lg p-2 border-l-4 ${getTypeClass(item.cardType)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(item.cardType)}
                  <span className="font-medium text-gray-800 text-sm">{item.player}</span>
                </div>
                <Badge variant="outline" className="text-xs text-gray-500">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </Badge>
              </div>
              <p className="mt-1 text-gray-700 text-sm">{item.cardContent}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
