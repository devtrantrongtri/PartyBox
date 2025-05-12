import type { CardType, IntensityLevel } from "./store"

type SeedCard = {
  content: string
  type: CardType
  intensity: IntensityLevel
  isDefault: boolean
}

export const defaultCards: SeedCard[] = [
  // Skinship cards
  {
    content: "Nắm tay người bên phải trong 2 lượt tiếp theo",
    type: "skinship",
    intensity: "light",
    isDefault: true,
  },
  {
    content: "Ôm người đối diện trong 5 giây",
    type: "skinship",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Hôn má người bên trái",
    type: "skinship",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Ngồi trên đùi người chơi do bạn chọn trong 1 lượt",
    type: "skinship",
    intensity: "heavy",
    isDefault: true,
  },

  // Question cards
  {
    content: "Bạn đã từng thích ai trong nhóm này chưa?",
    type: "question",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Điều gì khiến bạn cảm thấy hấp dẫn nhất ở người khác giới?",
    type: "question",
    intensity: "light",
    isDefault: true,
  },
  {
    content: "Bạn đã từng nói dối ai trong nhóm này chưa?",
    type: "question",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Kể về lần say nhất của bạn",
    type: "question",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Bạn đã từng làm gì mà không muốn gia đình biết?",
    type: "question",
    intensity: "heavy",
    isDefault: true,
  },

  // Action cards
  {
    content: "Nhảy một điệu ngẫu hứng trong 15 giây",
    type: "action",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Hát một đoạn bài hát yêu thích của bạn",
    type: "action",
    intensity: "light",
    isDefault: true,
  },
  {
    content: "Bắt chước một người trong nhóm cho đến khi mọi người đoán được",
    type: "action",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Làm 10 cái hít đất (hoặc 5 nếu quá khó)",
    type: "action",
    intensity: "heavy",
    isDefault: true,
  },

  // Drink cards
  {
    content: "Uống một ngụm",
    type: "drink",
    intensity: "light",
    isDefault: true,
  },
  {
    content: "Uống cạn ly của bạn",
    type: "drink",
    intensity: "heavy",
    isDefault: true,
  },
  {
    content: "Chọn một người cùng uống với bạn",
    type: "drink",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Tất cả mọi người cùng uống",
    type: "drink",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Người chơi có tóc dài nhất phải uống",
    type: "drink",
    intensity: "medium",
    isDefault: true,
  },
]
