"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import type { Card, CardType, IntensityLevel } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Heart, HelpCircle, Zap, Beer, Plus, Pencil, Trash2, Home, Search, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getCards, addCard, updateCard, deleteCard } from "@/lib/db-service"

export default function AdminPage() {
  const router = useRouter()
  const [cards, setCards] = useState<Card[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentCard, setCurrentCard] = useState<Card | null>(null)
  const [formData, setFormData] = useState({
    content: "",
    type: "question" as CardType,
    intensity: "medium" as IntensityLevel,
  })
  const [filterType, setFilterType] = useState<CardType>("all")
  const [filterIntensity, setFilterIntensity] = useState<IntensityLevel>("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchCards()
  }, [filterType, filterIntensity])

  const fetchCards = async () => {
    setIsLoading(true)
    try {
      // Get cards from IndexedDB
      const type = filterType !== "all" ? filterType : undefined
      const intensity = filterIntensity !== "all" ? filterIntensity : undefined

      const fetchedCards = await getCards(type, intensity)
      setCards(fetchedCards)
    } catch (error) {
      console.error("Error fetching cards:", error)
      alert("Có lỗi xảy ra khi tải danh sách thẻ. Vui lòng thử lại!")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenDialog = (card?: Card) => {
    if (card) {
      setCurrentCard(card)
      setFormData({
        content: card.content,
        type: card.type,
        intensity: card.intensity,
      })
    } else {
      setCurrentCard(null)
      setFormData({
        content: "",
        type: "question",
        intensity: "medium",
      })
    }

    setIsDialogOpen(true)
  }

  const handleOpenDeleteDialog = (card: Card) => {
    setCurrentCard(card)
    setIsDeleteDialogOpen(true)
  }

  const handleSubmit = async () => {
    try {
      if (currentCard) {
        // Update existing card in IndexedDB
        await updateCard(currentCard._id, formData)
      } else {
        // Create new card in IndexedDB
        await addCard({
          ...formData,
          isDefault: false,
        })
      }

      setIsDialogOpen(false)
      fetchCards()
    } catch (error) {
      console.error("Error saving card:", error)
      alert("Có lỗi xảy ra khi lưu thẻ. Vui lòng thử lại!")
    }
  }

  const handleDelete = async () => {
    if (!currentCard) return

    try {
      // Delete card from IndexedDB
      await deleteCard(currentCard._id)
      setIsDeleteDialogOpen(false)
      fetchCards()
    } catch (error) {
      console.error("Error deleting card:", error)
      alert("Có lỗi xảy ra khi xóa thẻ. Vui lòng thử lại!")
    }
  }

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
        return "border-skinship"
      case "question":
        return "border-question"
      case "action":
        return "border-action"
      case "drink":
        return "border-drink"
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

  const filteredCards = cards.filter((card) => card.content.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <main className="min-h-screen p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <Button variant="ghost" onClick={() => router.push("/")} className="text-gray-600 p-2 md:p-4">
          <Home className="h-5 w-5" />
          <span className="hidden md:inline ml-2">Trang chủ</span>
        </Button>

        <h1 className="text-xl md:text-2xl font-bold text-foreground">Quản Lý Thẻ</h1>

        <Button onClick={() => handleOpenDialog()} className="btn-primary p-2 md:p-4">
          <Plus className="h-5 w-5" />
          <span className="hidden md:inline ml-2">Thêm Thẻ</span>
        </Button>
      </div>

      <div className="mb-4 md:mb-6 space-y-3 md:space-y-4">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm thẻ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Button
            variant="outline"
            onClick={() => {
              setFilterType("all")
              setFilterIntensity("all")
              setSearchQuery("")
            }}
            disabled={filterType === "all" && filterIntensity === "all" && !searchQuery}
            className="md:w-auto w-full"
          >
            Xóa bộ lọc
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">Lọc:</span>
          </div>

          <Select value={filterType} onValueChange={(value) => setFilterType(value as CardType)}>
            <SelectTrigger className="h-8 w-auto">
              <SelectValue placeholder="Loại thẻ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại</SelectItem>
              <SelectItem value="skinship">Skinship</SelectItem>
              <SelectItem value="question">Câu Hỏi</SelectItem>
              <SelectItem value="action">Hành Động</SelectItem>
              <SelectItem value="drink">Uống</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterIntensity} onValueChange={(value) => setFilterIntensity(value as IntensityLevel)}>
            <SelectTrigger className="h-8 w-auto">
              <SelectValue placeholder="Mức độ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả mức độ</SelectItem>
              <SelectItem value="light">Nhẹ Nhàng</SelectItem>
              <SelectItem value="medium">Vừa Phải</SelectItem>
              <SelectItem value="heavy">Nặng Đô</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <AnimatePresence>
            {filteredCards.map((card) => (
              <motion.div
                key={card._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className={`bg-white rounded-lg shadow-md p-3 md:p-4 border-l-4 ${getTypeClass(card.type)}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(card.type)}
                    <span className="font-medium text-foreground">
                      {card.type === "skinship" && "Skinship"}
                      {card.type === "question" && "Câu Hỏi"}
                      {card.type === "action" && "Hành Động"}
                      {card.type === "drink" && "Uống"}
                    </span>
                  </div>

                  <Badge variant="outline" className="text-foreground">
                    {getIntensityLabel(card.intensity)}
                  </Badge>
                </div>

                <p className="text-gray-800 mb-3 md:mb-4 text-foreground">{card.content}</p>

                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(card)} disabled={card.isDefault}>
                    <Pencil className="h-4 w-4 mr-1" />
                    <span className="hidden md:inline">Sửa</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleOpenDeleteDialog(card)}
                    disabled={card.isDefault}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    <span className="hidden md:inline">Xóa</span>
                  </Button>
                </div>

                {card.isDefault && (
                  <div className="mt-2">
                    <Badge variant="secondary">Mặc định</Badge>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredCards.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-500">
              Không tìm thấy thẻ nào. Hãy thêm thẻ mới hoặc thay đổi bộ lọc.
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Card Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-foreground">{currentCard ? "Chỉnh Sửa Thẻ" : "Thêm Thẻ Mới"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nội dung</label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Nhập nội dung thẻ..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Loại thẻ</label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value as CardType })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="skinship">Skinship</SelectItem>
                    <SelectItem value="question">Câu Hỏi</SelectItem>
                    <SelectItem value="action">Hành Động</SelectItem>
                    <SelectItem value="drink">Uống</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Mức độ</label>
                <Select
                  value={formData.intensity}
                  onValueChange={(value) => setFormData({ ...formData, intensity: value as IntensityLevel })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Nhẹ Nhàng 😊</SelectItem>
                    <SelectItem value="medium">Vừa Phải 😏</SelectItem>
                    <SelectItem value="heavy">Nặng Đô 🔥</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSubmit} disabled={!formData.content.trim()} className="btn-primary">
              {currentCard ? "Cập Nhật" : "Thêm Thẻ"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-foreground">Xác Nhận Xóa</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <p className="text-foreground">Bạn có chắc chắn muốn xóa thẻ này?</p>
            <p className="font-medium mt-2 text-foreground">{currentCard?.content}</p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
