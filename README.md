# 🍻 PartyBox

> Web app trò chơi nhóm, thiết kế dành riêng cho các buổi tiệc, uống rượu, và tụ họp bạn bè.

---

## 🎉 Mô tả

**PartyBox** là một ứng dụng chơi trực tiếp trên trình duyệt giúp nhóm bạn:
- Nhập tên từng người chơi
- Rút thẻ ngẫu nhiên có nội dung hài hước, bạo, skinship nhẹ, thử thách, câu hỏi...
- Lưu lịch sử người rút
- Giao diện sống động, dễ sử dụng trên điện thoại hoặc máy tính

---

## 🖼️ Screenshot

![screenshot](public/homepage.png) 
![screenshot](public/playPage.png) 

---

## 🚀 Demo

🎮 [https://party-box.vercel.app/](https://party-box.vercel.app/)

---

## 🧩 Tính năng

- 🎲 Rút thẻ ngẫu nhiên
- 📜 Ghi lại lịch sử lượt chơi
- ✍️ Giao diện tạo/cập nhật câu hỏi cho admin
- 🔊 Âm thanh & hiệu ứng animation
- 👥 Nhập tên người chơi
- 📱 Responsive cho điện thoại và desktop

---

## ⚙️ Công nghệ sử dụng

- [Next.js](https://nextjs.org/) 14
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand) — Quản lý state
- [Framer Motion](https://www.framer.com/motion/) — Animation
- [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) — Hiệu ứng ăn mừng
- [Lucide React](https://lucide.dev/) — Icon đẹp
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) (qua `idb`) — Lưu tạm cục bộ

---

## 🛠️ Cài đặt

```bash
# Clone dự án
git clone https://github.com/devtrantrongtri/PartyBox.git
cd PartyBox

# Cài dependencies
npm install

# Chạy project
npm run dev

```

## 📁 Cấu trúc dự án

```
src/
├── app/                 # Next.js app directory
│   ├── page.tsx        # Trang chủ
│   ├── play/          # Trang chơi game
│   └── adboard/       # Trang quản lý thẻ bài
├── components/         # React components
├── lib/               # Utilities và services
│   ├── db-service.ts  # IndexedDB service
│   ├── store.ts       # Zustand store
│   └── seed-data.ts   # Dữ liệu mẫu
└── styles/            # Global styles
```

## 🎨 Phát triển

### 📄 Cấu trúc dữ liệu

#### 🃏 Card
```typescript
type Card = {
  _id: string
  content: string
  type: CardType
  intensity: IntensityLevel
  isDefault: boolean
}
```

#### 🧍 Player
```typescript
type Player = {
  name: string
  avatar?: string
}
```

### 📜 Quy ước code

- Sử dụng TypeScript cho type safety
- Tuân thủ ESLint rules
- Sử dụng functional components với hooks
- Tách biệt logic và UI

## 🤝 Đóng góp

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## 📄 License

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.
