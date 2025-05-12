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


  // Custom cards 1 
  // drink cards
  {
    content: "Uống 1 ngụm",
    type: "drink",
    intensity: "light",
    isDefault: true,
  },
  {
    content: "Uống 2 ngụm",
    type: "drink",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Chọn 1 người bất kỳ uống 2 ngụm",
    type: "drink",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Tự uống 1 ngụm và hát 1 câu bất kỳ",
    type: "drink",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Tất cả con trai uống 1 ngụm",
    type: "drink",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Tất cả con gái uống 1 ngụm",
    type: "drink",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Người ngồi bên phải bạn uống 3 ngụm",
    type: "drink",
    intensity: "heavy",
    isDefault: true,
  },
  {
    content: "Tự uống 3 ngụm vì quá đẹp trai/xinh gái",
    type: "drink",
    intensity: "heavy",
    isDefault: true,
  },
  {
    content: "Uống bằng tay không thuận",
    type: "drink",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Uống nhưng phải nhắm mắt và nhăn mặt",
    type: "drink",
    intensity: "light",
    isDefault: true,
  },
  {
    content: "Uống và nói câu tỏ tình ngẫu nhiên",
    type: "drink",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Người cuối cùng chạm tay lên bàn uống 2 ngụm",
    type: "drink",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Chơi oẳn tù tì với người đối diện: ai thua uống",
    type: "drink",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Người cao nhất bàn uống 2 ngụm",
    type: "drink",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Uống và đặt ra luật mới cho 3 lượt tiếp theo",
    type: "drink",
    intensity: "heavy",
    isDefault: true,
  },
  // actions card
  {
    content: "Nhảy một điệu bất kỳ 10 giây",
    type: "action",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Nói giọng trẻ con trong 1 lượt",
    type: "action",
    intensity: "light",
    isDefault: true,
  },
  {
    content: "Gọi tên 5 loại trái cây trong 5 giây",
    type: "action",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Làm biểu cảm gợi cảm nhất có thể",
    type: "action",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Giả tiếng động vật mà bạn yêu thích",
    type: "action",
    intensity: "light",
    isDefault: true,
  },
  {
    content: "Cười giả tạo trong 10 giây",
    type: "action",
    intensity: "light",
    isDefault: true,
  },
  {
    content: "Đọc bảng chữ cái ngược",
    type: "action",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Nói tên 3 người trong nhóm có nét giống celeb",
    type: "action",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Đọc rap freestyle về người bên trái",
    type: "action",
    intensity: "heavy",
    isDefault: true,
  },
  {
    content: "Nhại giọng 1 người trong nhóm – để cả nhóm đoán",
    type: "action",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Kể 1 bí mật nhỏ (có thể vô nghĩa cũng được)",
    type: "action",
    intensity: "light",
    isDefault: true,
  },
  {
    content: "Tạo dáng chụp hình “hot trend”",
    type: "action",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Làm mặt buồn như bị thất tình",
    type: "action",
    intensity: "light",
    isDefault: true,
  },
  {
    content: "Nói tên 3 loại bia trong 5 giây",
    type: "action",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Chơi “bắt chước”: làm theo người vừa chơi trước",
    type: "action",
    intensity: "light",
    isDefault: true,
  },

  // question cards
  {
    content: "Ai trong nhóm dễ bị 'crush' nhất?",
    type: "question",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Bạn đã từng thích ai trong nhóm chưa?",
    type: "question",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Nếu hoán đổi cơ thể với ai trong nhóm thì chọn ai?",
    type: "question",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Ai trong nhóm là người nhậu “gãy” đầu tiên?",
    type: "question",
    intensity: "light",
    isDefault: true,
  },
  {
    content: "Bạn nghĩ ai hay “drama” nhất nhóm?",
    type: "question",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Nếu được hôn ai đó trong nhóm, bạn chọn ai?",
    type: "question",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Bạn thà không uống rượu 1 năm hay không yêu 1 năm?",
    type: "question",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Trong nhóm, ai dễ bị troll nhất?",
    type: "question",
    intensity: "light",
    isDefault: true,
  },
  {
    content: "Hãy chấm điểm ngoại hình bản thân từ 1-10",
    type: "question",
    intensity: "light",
    isDefault: true,
  },
  {
    content: "Người bạn từng cãi nhau to nhất trong nhóm là ai?",
    type: "question",
    intensity: "heavy",
    isDefault: true,
  },
  {
    content: "Nếu phải hẹn hò 1 người cùng giới trong nhóm, chọn ai?",
    type: "question",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Ai trong nhóm có gu thời trang độc lạ nhất?",
    type: "question",
    intensity: "light",
    isDefault: true,
  },
  // skinship cards
  {
    content: "High five tất cả mọi người",
    type: "skinship",
    intensity: "light",
    isDefault: true,
  },
  {
    content: "Ôm người bên trái trong 5 giây",
    type: "skinship",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Chạm trán với người đối diện 3 giây",
    type: "skinship",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Ghé tai thì thầm 1 điều dễ thương cho người bên phải",
    type: "skinship",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Đặt tay lên vai người bạn thấy đáng tin nhất",
    type: "skinship",
    intensity: "light",
    isDefault: true,
  },
  {
    content: "Nắm tay người bạn thấy dễ thương nhất trong 5 giây",
    type: "skinship",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Hát nhỏ vào tai người ngồi xa bạn nhất",
    type: "skinship",
    intensity: "medium",
    isDefault: true,
  },
  {
    content: "Vẽ trái tim lên tay người ngồi kế bên",
    type: "skinship",
    intensity: "light",
    isDefault: true,
  },
  // DRINK - NO ESCAPE
{
  content: "Uống 3 ngụm không làm mặt xấu",
  type: "drink",
  intensity: "heavy",
  isDefault: true,
},
{
  content: "Đổ đầy ly rồi chơi oẳn tù tì – thua uống hết",
  type: "drink",
  intensity: "heavy",
  isDefault: true,
},
{
  content: "Cạn ly nếu bạn từng “say rượu mất kiểm soát”",
  type: "drink",
  intensity: "heavy",
  isDefault: true,
},
{
  content: "Đưa người kế bên chọn lượng rượu cho bạn uống",
  type: "drink",
  intensity: "medium",
  isDefault: true,
},
{
  content: "Uống đến khi cả nhóm đồng ý là “đủ rồi”",
  type: "drink",
  intensity: "heavy",
  isDefault: true,
},
{
  content: "Uống bằng cách không dùng tay",
  type: "drink",
  intensity: "heavy",
  isDefault: true,
},
{
  content: "Uống 1 ngụm mỗi khi có người nói tên bạn trong 1 vòng",
  type: "drink",
  intensity: "medium",
  isDefault: true,
},
{
  content: "Uống trong khi hát 1 bài có chữ “tình”",
  type: "drink",
  intensity: "medium",
  isDefault: true,
},
{
  content: "Cạn ly nếu bạn đang FA",
  type: "drink",
  intensity: "heavy",
  isDefault: true,
},
{
  content: "Chơi “rút thăm hình phạt”: ai thua uống 5 ngụm",
  type: "drink",
  intensity: "heavy",
  isDefault: true,
},
{
  content: "Uống rồi nói một điều mà bạn chưa từng kể với ai",
  type: "drink",
  intensity: "medium",
  isDefault: true,
},
{
  content: "Uống thay người bên trái – nhưng phải ôm người đó trước",
  type: "drink",
  intensity: "medium",
  isDefault: true,
},

// ACTION - BURNING DARES
{
  content: "Nhảy sexy dance 10 giây (tự chọn nhạc)",
  type: "action",
  intensity: "heavy",
  isDefault: true,
},
{
  content: "Đọc 1 đoạn “câu thả thính” như thật",
  type: "action",
  intensity: "medium",
  isDefault: true,
},
{
  content: "Gọi điện troll người thân/bạn thân",
  type: "action",
  intensity: "medium",
  isDefault: true,
},
{
  content: "Diễn lại 1 cảnh nóng trong phim mà bạn nhớ (tự cắt nghĩa)",
  type: "action",
  intensity: "heavy",
  isDefault: true,
},
{
  content: "Lướt Facebook người bên phải, like ảnh bất kỳ",
  type: "action",
  intensity: "medium",
  isDefault: true,
},
{
  content: "Chọn người trong nhóm để... diễn cảnh tỏ tình “drama”",
  type: "action",
  intensity: "heavy",
  isDefault: true,
},
{
  content: "Khoe ảnh “xấu hổ nhất” trong điện thoại",
  type: "action",
  intensity: "heavy",
  isDefault: true,
},
{
  content: "Đọc to tin nhắn gần nhất bạn gửi trong điện thoại",
  type: "action",
  intensity: "medium",
  isDefault: true,
},
{
  content: "Giả tiếng “rên nhẹ” trong 5 giây (xấu hổ thì uống)",
  type: "action",
  intensity: "heavy",
  isDefault: true,
},
{
  content: "Tạo dáng quyến rũ rồi chụp hình group",
  type: "action",
  intensity: "medium",
  isDefault: true,
},
{
  content: "Mô tả buổi “date” lý tưởng với một người trong nhóm",
  type: "action",
  intensity: "medium",
  isDefault: true,
},
{
  content: "Làm MC giới thiệu bản thân theo phong cách show hẹn hò",
  type: "action",
  intensity: "light",
  isDefault: true,
},
{
  content: "Gọi tên 3 tư thế ngủ kỳ lạ bạn từng thấy/đã từng ngủ",
  type: "action",
  intensity: "light",
  isDefault: true,
},
{
  content: "Diễn lại cách bạn hôn gió",
  type: "action",
  intensity: "light",
  isDefault: true,
},
{
  content: "Đọc tin nhắn gần đây nhất bằng giọng sexy",
  type: "action",
  intensity: "medium",
  isDefault: true,
},
// DRINK - "EYE-OPENING"
{
  content: "Uống 3 ngụm vì bạn quá ngầu",
  type: "drink",
  intensity: "light",
  isDefault: true,
},
{
  content: "Cạn ly nếu đã từng nhắn tin \"thả thính\" ai trong nhóm",
  type: "drink",
  intensity: "heavy",
  isDefault: true,
},
{
  content: "Tự rót rượu rồi đổ vào tay, uống từ đó",
  type: "drink",
  intensity: "medium",
  isDefault: true,
},
{
  content: "Uống mỗi khi nghe ai đó cười trong vòng này",
  type: "drink",
  intensity: "medium",
  isDefault: true,
},
{
  content: "Uống 5 ngụm nếu bạn là người yêu cũ ai trong đây",
  type: "drink",
  intensity: "heavy",
  isDefault: true,
},
{
  content: "Chọn một người uống thay bạn – nhưng phải nhìn họ “say đắm”",
  type: "drink",
  intensity: "medium",
  isDefault: true,
},
{
  content: "Uống bằng miệng ống hút từ ly người khác",
  type: "drink",
  intensity: "heavy",
  isDefault: true,
},
{
  content: "Vừa uống vừa hát bài \"Tình bạn diệu kỳ\"",
  type: "drink",
  intensity: "medium",
  isDefault: true,
},
{
  content: "Uống rượu bằng môi chạm môi ly với người kế bên",
  type: "drink",
  intensity: "heavy",
  isDefault: true,
},
{
  content: "Uống hết ly nếu đang giấu chuyện gì đó với nhóm",
  type: "drink",
  intensity: "heavy",
  isDefault: true,
},
{
  content: "Uống 1 ngụm mỗi lần có người nói “không” trong 1 lượt",
  type: "drink",
  intensity: "medium",
  isDefault: true,
},
{
  content: "Gọi tên người bạn muốn cùng “say” tối nay – rồi uống 4 ngụm",
  type: "drink",
  intensity: "heavy",
  isDefault: true,
},
{
  content: "Uống đến khi ai đó trong nhóm nói “dừng lại!”",
  type: "drink",
  intensity: "heavy",
  isDefault: true,
},
{
  content: "Uống 1 ngụm rồi \"liếc mắt đưa tình\" một vòng",
  type: "drink",
  intensity: "light",
  isDefault: true,
},
{
  content: "Uống chậm và mô tả mùi vị như đang quảng cáo rượu",
  type: "drink",
  intensity: "medium",
  isDefault: true,
},

// ACTION - RIDICULOUSLY FUNNY
{
  content: "Bắt chước động tác quyến rũ của một idol",
  type: "action",
  intensity: "medium",
  isDefault: true,
},
{
  content: "Diễn cảnh “tỏ tình bị từ chối” – càng lố càng tốt",
  type: "action",
  intensity: "medium",
  isDefault: true,
},
{
  content: "Tạo dáng chụp ảnh sexy rồi đưa người bên trái chụp",
  type: "action",
  intensity: "medium",
  isDefault: true,
},
{
  content: "Nhắn tin cho người lạ: “Tối nay em rảnh lắm 😘”",
  type: "action",
  intensity: "heavy",
  isDefault: true,
},
{
  content: "Nói một lời yêu say đắm với người cùng giới",
  type: "action",
  intensity: "heavy",
  isDefault: true,
},
{
  content: "Hát một câu bất kỳ bằng tông giọng vịt Donald",
  type: "action",
  intensity: "light",
  isDefault: true,
},
{
  content: "Đọc 1 status Facebook cũ bất kỳ (năm 2015-2018 càng tốt)",
  type: "action",
  intensity: "medium",
  isDefault: true,
},
{
  content: "Giả tiếng người yêu khi ghen tuông 5 giây",
  type: "action",
  intensity: "light",
  isDefault: true,
},
{
  content: "Diễn lại cảnh nóng... bằng giọng thuyết minh truyền hình",
  type: "action",
  intensity: "heavy",
  isDefault: true,
},
{
  content: "Tạo 1 bài thơ có tên 3 người trong nhóm",
  type: "action",
  intensity: "medium",
  isDefault: true,
},
{
  content: "Nhảy freestyle theo nhạc người bên phải chọn",
  type: "action",
  intensity: "medium",
  isDefault: true,
},
{
  content: "Nói \"Anh/em yêu mọi người!\" thật tình cảm, rồi ôm gấu",
  type: "action",
  intensity: "light",
  isDefault: true,
},
{
  content: "Gọi điện cho người yêu cũ, hỏi: “Dạo này khoẻ không?” (không làm thì uống)",
  type: "action",
  intensity: "heavy",
  isDefault: true,
},
{
  content: "Cởi phụ kiện/áo khoác và trao cho người cùng giới",
  type: "action",
  intensity: "medium",
  isDefault: true,
},
{
  content: "Dùng miệng cầm vật bất kỳ đưa cho người đối diện",
  type: "action",
  intensity: "heavy",
  isDefault: true,
},
  
]
