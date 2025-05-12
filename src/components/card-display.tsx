"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import type { Card } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import { Heart, HelpCircle, Zap, Beer } from "lucide-react"

type CardDisplayProps = {
  card: Card | null
  isFlipped: boolean
  onFlip: () => void
  isLoading?: boolean
}

export default function CardDisplay({ card, isFlipped, onFlip, isLoading = false }: CardDisplayProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "skinship":
        return <Heart className="h-5 w-5 text-skinship" />
      case "question":
        return <HelpCircle className="h-5 w-5 text-question" />
      case "action":
        return <Zap className="h-5 w-5 text-action" />
      case "drink":
        return <Beer className="h-5 w-5 text-drink" />
      default:
        return null
    }
  }

  const getTypeClass = (type: string) => {
    switch (type) {
      case "skinship":
        return "card-skinship"
      case "question":
        return "card-question"
      case "action":
        return "card-action"
      case "drink":
        return "card-drink"
      default:
        return ""
    }
  }

  const getIntensityLabel = (intensity: string) => {
    switch (intensity) {
      case "light":
        return "😊 Nhẹ Nhàng"
      case "medium":
        return "😏 Vừa Phải"
      case "heavy":
        return "🔥 Nặng Đô"
      default:
        return ""
    }
  }

  return (
    <div className="card-container mx-auto">
      <div
        className={`card ${isFlipped ? "flipped" : ""} ${isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer hover:shadow-xl transition-shadow"}`}
        onClick={isLoading ? undefined : onFlip}
      >
        <motion.div
          className="card-face card-front"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            <Image 
              src="/placeholder.svg?height=100&width=100" 
              alt="Card Back" 
              width={100}
              height={100}
              className="w-24 h-24 mb-4"
            />
          </motion.div>
          <h3 className="text-2xl font-bold text-center mb-2 text-foreground">Rút Thẻ Định Mệnh</h3>
          <p className="text-center text-gray-600">{isLoading ? "Đang tải..." : "Nhấn để rút thẻ"}</p>
        </motion.div>

        <motion.div
          className={`card-face card-back ${card ? getTypeClass(card.type) : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {card && (
            <>
              <div className="flex justify-between w-full mb-4">
                <Badge variant="outline" className="flex items-center gap-1 text-foreground">
                  {getTypeIcon(card.type)}
                  {card.type === "skinship" && "Skinship"}
                  {card.type === "question" && "Câu Hỏi"}
                  {card.type === "action" && "Hành Động"}
                  {card.type === "drink" && "Uống"}
                </Badge>
                <Badge variant="outline" className="text-foreground">
                  {getIntensityLabel(card.intensity)}
                </Badge>
              </div>
              <div className="text-xl font-medium text-center my-4 text-foreground">{card.content}</div>
              <p className="text-sm text-center text-gray-600 mt-auto">Nhấn để lật lại</p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
