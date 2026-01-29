import type { FoodCategoryIntro } from '@/types';

/**
 * Food category introductions database
 * Contains detailed information about Singapore's popular food categories
 */
export const foodIntroductions: FoodCategoryIntro[] = [
  {
    id: 'intro-bak-kut-teh',
    categoryId: 'bak-kut-teh',
    name: '肉骨茶',
    nameEn: 'Bak Kut Teh',
    description:
      '肉骨茶是新加坡最具代表性的美食之一，源自早期華人勞工的平民料理。以豬肋排為主食材，搭配濃郁的中藥湯底，香氣四溢，營養豐富。新加坡版本偏向清淡的胡椒風味，與馬來西亞的藥材濃湯風格截然不同。',
    highlights: [
      '濃郁的胡椒與蒜香湯底',
      '軟嫩入味的豬肋排',
      '搭配油條或白飯享用',
      '新加坡獨特的清淡風味',
    ],
    priceRange: {
      min: '$',
      max: '$$',
      typical: '$',
      description: '一人約 S$8-15',
    },
    image: '/img/胡椒味肉骨茶包.jpeg',
    popularDishes: ['排骨肉骨茶', '豬腳肉骨茶', '豬肝肉骨茶'],
    tips: [
      '推薦搭配油條吸飽湯汁',
      '早餐時段最道地',
      '可加辣椒與醬油提味',
      '湯底可無限續',
    ],
    bestTime: '早餐或午餐',
    categoryGroup: 'breakfast',
  },
  {
    id: 'intro-hainanese-chicken-rice',
    categoryId: 'hainanese-chicken-rice',
    name: '海南雞飯',
    nameEn: 'Hainanese Chicken Rice',
    description:
      '海南雞飯是新加坡的國民美食，也是遊客必吃的招牌料理。起源自中國海南島，經過新加坡的改良後成為獨特風味。嫩滑的雞肉搭配香氣撲鼻的雞油飯，佐以三種特製醬料，簡單卻令人回味無窮。',
    highlights: [
      '皮滑肉嫩的白斬雞',
      '香濃的雞油飯',
      '三種特製醬料：薑蓉、辣椒醬、黑醬油',
      '清爽的黃瓜片與香菜',
    ],
    priceRange: {
      min: '$',
      max: '$$',
      typical: '$',
      description: '一人約 S$5-12',
    },
    image: '/img/天天.jpeg',
    popularDishes: ['白雞飯', '燒雞飯', '雞腿飯', '雞翅飯'],
    tips: [
      '三種醬料混合最美味',
      '記得點碗雞湯',
      '白雞最能品嚐原味',
      '小販中心的通常最道地',
    ],
    bestTime: '午餐或晚餐',
    categoryGroup: 'rice',
  },
  {
    id: 'intro-laksa',
    categoryId: 'laksa',
    name: '叻沙',
    nameEn: 'Laksa',
    description:
      '叻沙是新加坡的經典娘惹料理，融合了中華與馬來的烹飪精髓。濃郁的椰漿咖哩湯頭搭配米粉，加入鮮蝦、魚餅、豆芽等配料，香辣可口。Katong Laksa 更是以剪刀剪斷粉條而聞名，方便食用。',
    highlights: [
      '濃郁的椰漿咖哩湯底',
      '香辣開胃的獨特風味',
      '豐富的海鮮配料',
      'Katong 風格用剪刀剪粉',
    ],
    priceRange: {
      min: '$',
      max: '$$',
      typical: '$',
      description: '一碗約 S$5-10',
    },
    image: '/img/328.jpeg',
    popularDishes: ['海鮮叻沙', '雞肉叻沙', 'Katong Laksa'],
    tips: [
      '加入參巴辣椒提味',
      '擠檸檬汁增添清爽',
      '趁熱享用最美味',
      'Katong 區有最正宗的叻沙',
    ],
    bestTime: '午餐或晚餐',
    categoryGroup: 'noodles',
  },
  {
    id: 'intro-seafood',
    categoryId: 'seafood',
    name: '海鮮',
    nameEn: 'Seafood',
    description:
      '新加坡的海鮮料理世界聞名，尤其是辣椒螃蟹、黑胡椒螃蟹等招牌菜式。新鮮的海鮮搭配獨特的醬料烹調，呈現出豐富的南洋風味。East Coast、Clarke Quay 等地都有著名的海鮮餐廳。',
    highlights: [
      '新鮮優質的海鮮食材',
      '辣椒螃蟹是必吃招牌',
      '多樣化的烹調方式',
      '適合家庭聚餐或宴客',
    ],
    priceRange: {
      min: '$$',
      max: '$$$$',
      typical: '$$$',
      description: '一人約 S$30-80',
    },
    image: '/img/珍寶海鮮.jpeg',
    popularDishes: ['辣椒螃蟹', '黑胡椒螃蟹', '麥片蝦', '清蒸魚', '炒蜆'],
    tips: [
      '辣椒螃蟹要配炸饅頭沾醬',
      '建議多人共享較划算',
      '晚餐時段建議預約',
      'East Coast 海鮮中心選擇多',
    ],
    bestTime: '晚餐',
    categoryGroup: 'seafood',
  },
  {
    id: 'intro-noodles',
    categoryId: 'noodles',
    name: '麵食',
    nameEn: 'Noodles',
    description:
      '新加坡的麵食種類繁多，從福建炒麵、蝦麵、雲吞麵到 Hokkien Mee，每一種都有獨特的風味。麵食文化反映了新加坡多元族群的飲食傳統，是小販中心最常見的料理類型之一。',
    highlights: [
      '種類豐富多樣',
      '價格實惠親民',
      '快速方便的選擇',
      '各有特色的湯底與配料',
    ],
    priceRange: {
      min: '$',
      max: '$$',
      typical: '$',
      description: '一碗約 S$4-10',
    },
    image: '/img/545 蝦麵.jpeg',
    popularDishes: ['福建炒麵', '蝦麵', '雲吞麵', '魚圓麵', '板麵'],
    tips: [
      '可選擇乾撈或湯麵',
      '加辣提升風味',
      '小販中心的最道地',
      '混合不同麵條更豐富',
    ],
    bestTime: '午餐或晚餐',
    categoryGroup: 'noodles',
  },
  {
    id: 'intro-dim-sum',
    categoryId: 'dim-sum',
    name: '點心',
    nameEn: 'Dim Sum',
    description:
      '新加坡的點心文化源自廣東，從傳統茶樓到現代餐廳都能找到精緻的港式點心。蒸籠裡的蝦餃、燒賣、叉燒包，搭配一壺熱茶，是週末早午茶的經典選擇。',
    highlights: [
      '精緻的港式點心',
      '豐富的選擇種類',
      '適合家人朋友聚會',
      '傳統推車或點單服務',
    ],
    priceRange: {
      min: '$$',
      max: '$$$',
      typical: '$$',
      description: '一人約 S$15-30',
    },
    image: '/img/喜園.jpeg',
    popularDishes: ['蝦餃', '燒賣', '叉燒包', '腸粉', '鳳爪', '蘿蔔糕'],
    tips: [
      '週末早茶時段最熱鬧',
      '建議多人分享',
      '搭配普洱茶解膩',
      '可使用點心卡自由選擇',
    ],
    bestTime: '早午餐',
    categoryGroup: 'dim-sum',
  },
  {
    id: 'intro-brunch',
    categoryId: 'brunch',
    name: '早午餐',
    nameEn: 'Brunch',
    description:
      '新加坡的早午餐文化融合了西式與本地特色，從傳統的 Kaya Toast 套餐到現代的 Brunch Café 應有盡有。咖椰吐司配半熟蛋是最經典的新加坡式早餐，配上一杯濃郁的南洋咖啡，開啟美好的一天。',
    highlights: [
      '傳統與現代風格並存',
      '咖椰吐司是必吃經典',
      '舒適的用餐環境',
      '適合悠閒的週末時光',
    ],
    priceRange: {
      min: '$',
      max: '$$$',
      typical: '$$',
      description: '一人約 S$8-25',
    },
    image: '/img/亞坤 Kaya toast.jpeg',
    popularDishes: ['咖椰吐司套餐', '班尼迪克蛋', '鬆餅', '法式吐司', '阿華田吐司'],
    tips: [
      '咖椰吐司要配半熟蛋',
      'Kopi C 是經典搭配',
      'Ya Kun 是老字號名店',
      '週末建議早點前往',
    ],
    bestTime: '早餐或早午餐',
    categoryGroup: 'breakfast',
  },
  {
    id: 'intro-coffee',
    categoryId: 'coffee',
    name: '咖啡',
    nameEn: 'Coffee / Kopi',
    description:
      '新加坡的咖啡文化獨樹一格，從傳統的南洋咖啡店到精品咖啡館都各有特色。Kopi（黑咖啡）、Kopi C（淡奶咖啡）、Kopi O（黑咖啡加糖）等點法充滿地方特色，是體驗新加坡生活的重要一環。',
    highlights: [
      '獨特的南洋咖啡風味',
      '豐富的點法文化',
      '從傳統到精品應有盡有',
      '適合工作或社交',
    ],
    priceRange: {
      min: '$',
      max: '$$$',
      typical: '$',
      description: '一杯約 S$2-8',
    },
    image: '/img/Killiney-Kopitiam.jpeg',
    popularDishes: ['Kopi', 'Kopi C', 'Kopi O', 'Teh (奶茶)', 'Yuan Yang (鴛鴦)'],
    tips: [
      '學會基本的 Kopi 點法',
      '傳統咖啡店價格實惠',
      '精品咖啡館環境更佳',
      'Kopitiam 是連鎖品牌',
    ],
    bestTime: '全天',
    categoryGroup: 'beverage',
  },
  {
    id: 'intro-wonton',
    categoryId: 'wonton',
    name: '雲吞',
    nameEn: 'Wonton Noodles',
    description:
      '雲吞麵是新加坡華人社群的經典麵食，源自廣東飲食文化。Q彈的雲吞餃包裹著鮮蝦肉餡，搭配爽滑的麵條，淋上濃郁的醬汁或清湯，是小販中心最受歡迎的選擇之一。',
    highlights: ['皮薄餡多的鮮蝦雲吞', 'Q彈爽口的麵條', '可選乾撈或湯麵', '價格實惠份量足'],
    priceRange: {
      min: '$',
      max: '$$',
      typical: '$',
      description: '一碗約 S$4-8',
    },
    image: '/img/興記肉脞麵.jpeg',
    popularDishes: ['鮮蝦雲吞麵', '叉燒雲吞麵', '水餃麵'],
    tips: ['乾撈配辣椒最對味', '加醋提鮮', '小販中心的最道地', '可加點叉燒或滷蛋'],
    bestTime: '午餐或晚餐',
    categoryGroup: 'noodles',
  },
  {
    id: 'intro-chicken-rice',
    categoryId: 'chicken-rice',
    name: '海南雞飯',
    nameEn: 'Hainanese Chicken Rice',
    description:
      '海南雞飯是新加坡的國民美食，也是遊客必吃的招牌料理。起源自中國海南島，經過新加坡的改良後成為獨特風味。嫩滑的雞肉搭配香氣撲鼻的雞油飯，佐以三種特製醬料，簡單卻令人回味無窮。',
    highlights: [
      '皮滑肉嫩的白斬雞',
      '香濃的雞油飯',
      '三種特製醬料：薑蓉、辣椒醬、黑醬油',
      '清爽的黃瓜片與香菜',
    ],
    priceRange: {
      min: '$',
      max: '$$',
      typical: '$',
      description: '一人約 S$5-12',
    },
    image: '/img/東風發海南雞飯.jpeg',
    popularDishes: ['白雞飯', '燒雞飯', '雞腿飯', '雞翅飯'],
    tips: [
      '三種醬料混合最美味',
      '記得點碗雞湯',
      '白雞最能品嚐原味',
      '小販中心的通常最道地',
    ],
    bestTime: '午餐或晚餐',
    categoryGroup: 'rice',
  },
  {
    id: 'intro-nasi-lemak',
    categoryId: 'nasi-lemak',
    name: '椰漿飯',
    nameEn: 'Nasi Lemak',
    description:
      '椰漿飯是馬來西亞與新加坡的傳統美食，以椰漿煮成的香飯為主，搭配參巴辣醬、炸江魚仔、花生、黃瓜片和煎蛋。可以加上炸雞、咖哩或沙嗲，是豐盛又美味的一餐。',
    highlights: ['香濃的椰漿飯', '辣香的參巴醬', '豐富的配菜選擇', '馬來風味十足'],
    priceRange: {
      min: '$',
      max: '$$',
      typical: '$',
      description: '一份約 S$4-10',
    },
    image: '/img/nasi-lemak.jpg',
    popularDishes: ['炸雞椰漿飯', '咖哩椰漿飯', '沙嗲椰漿飯', '魚椰漿飯'],
    tips: ['參巴醬是靈魂', '加顆煎蛋更豐盛', '早餐時段最道地', '香蕉葉包裝最傳統'],
    bestTime: '早餐或午餐',
    categoryGroup: 'rice',
  },
  {
    id: 'intro-duck-rice',
    categoryId: 'duck-rice',
    name: '鴨肉飯',
    nameEn: 'Braised Duck Rice',
    description:
      '鴨肉飯是新加坡潮州風味的經典料理，以滷汁慢燉的鴨肉為主，肉質軟嫩入味。搭配白飯或粥，淋上濃郁的滷汁，再配上滷蛋、豆腐和酸菜，是溫暖人心的美食。',
    highlights: ['軟嫩入味的滷鴨肉', '濃郁的潮州滷汁', '可配飯或配粥', '溫暖的家常風味'],
    priceRange: {
      min: '$',
      max: '$$',
      typical: '$',
      description: '一份約 S$5-10',
    },
    image: '/img/明發.jpeg',
    popularDishes: ['滷鴨飯', '滷鴨粥', '鴨腿飯', '鴨雜湯'],
    tips: ['滷汁要多淋一些', '配粥適合當早餐', '滷蛋和豆腐也很香', '可外帶當便當'],
    bestTime: '午餐或晚餐',
    categoryGroup: 'rice',
  },
  {
    id: 'intro-satay',
    categoryId: 'satay',
    name: '沙嗲',
    nameEn: 'Satay',
    description:
      '沙嗲是新加坡與馬來西亞的經典烤肉串，以醃製的雞肉、牛肉或羊肉串在炭火上烤製，香氣四溢。搭配濃郁的花生醬、黃瓜、洋蔥和馬來飯糰（Ketupat），是街頭美食的最佳代表。',
    highlights: ['炭烤香氣十足', '濃郁的花生醬', '多種肉類選擇', '適合宵夜或聚餐'],
    priceRange: {
      min: '$',
      max: '$$',
      typical: '$',
      description: '一串約 S$0.80-1.50',
    },
    image: '/img/老巴剎 .jpeg',
    popularDishes: ['雞肉沙嗲', '牛肉沙嗲', '羊肉沙嗲'],
    tips: [
      '花生醬要多沾',
      '搭配馬來飯糰最道地',
      '點10串起較划算',
      'Lau Pa Sat 沙嗲街很有名',
    ],
    bestTime: '晚餐或宵夜',
    categoryGroup: 'other',
  },
  {
    id: 'intro-prata',
    categoryId: 'prata',
    name: '印度煎餅',
    nameEn: 'Roti Prata',
    description:
      '印度煎餅是新加坡印度社群帶來的美食，薄脆香酥的餅皮搭配咖哩沾醬，是深受各族群喜愛的料理。從原味到各種創意口味，24小時都能找到供應的店家。',
    highlights: ['酥脆香Q的餅皮', '多樣化的口味選擇', '搭配咖哩或糖享用', '24小時都能吃到'],
    priceRange: {
      min: '$',
      max: '$$',
      typical: '$',
      description: '一片約 S$1.50-4',
    },
    image: '/img/面煎糕 印度米粉.jpeg',
    popularDishes: ['原味煎餅', '雞蛋煎餅', '芝士煎餅', '香蕉煎餅', '洋蔥煎餅'],
    tips: [
      '原味配咖哩最經典',
      '甜的配糖或煉乳',
      '現點現煎最好吃',
      '宵夜時段最對味',
    ],
    bestTime: '早餐、宵夜或全天',
    categoryGroup: 'breakfast',
  },
  {
    id: 'intro-chilli-crab',
    categoryId: 'chilli-crab',
    name: '辣椒螃蟹',
    nameEn: 'Chilli Crab',
    description:
      '辣椒螃蟹是新加坡最具代表性的海鮮料理，也是國菜之一。新鮮螃蟹搭配香辣微甜的番茄辣椒醬，醬汁濃郁鮮美。搭配炸饅頭沾著醬汁享用，是來新加坡必吃的美食體驗。',
    highlights: [
      '新加坡國菜代表',
      '香辣微甜的獨特醬汁',
      '新鮮的斯里蘭卡螃蟹',
      '配炸饅頭沾醬是絕配',
    ],
    priceRange: {
      min: '$$$',
      max: '$$$$',
      typical: '$$$',
      description: '一隻約 S$60-120',
    },
    image: '/img/辣椒螃蟹泡麵.jpeg',
    popularDishes: ['辣椒螃蟹', '黑胡椒螃蟹', '奶油螃蟹'],
    tips: [
      '一定要點炸饅頭沾醬',
      '建議多人分享',
      '提前預約較保險',
      'Jumbo、No Signboard 都很有名',
    ],
    bestTime: '晚餐',
    categoryGroup: 'seafood',
  },
  {
    id: 'intro-douhua',
    categoryId: 'douhua',
    name: '豆花',
    nameEn: 'Douhua / Tau Huay',
    description:
      '豆花是新加坡常見的傳統甜品，口感滑嫩細緻。可以選擇熱的或冰的，搭配糖水、薑汁糖水或黑糖漿享用。是消暑解渴、清爽健康的甜點選擇。',
    highlights: ['口感滑嫩細緻', '健康養生甜品', '冷熱皆宜', '價格實惠'],
    priceRange: {
      min: '$',
      max: '$',
      typical: '$',
      description: '一碗約 S$1.50-3',
    },
    image: '/img/老伴豆花.jpeg',
    popularDishes: ['糖水豆花', '薑汁豆花', '黑糖豆花', '豆漿'],
    tips: ['熱的適合早餐', '冰的適合消暑', '可配油條', '小販中心最便宜'],
    bestTime: '早餐或甜點',
    categoryGroup: 'dessert',
  },
  {
    id: 'intro-fried-radish-cake',
    categoryId: 'fried-radish-cake',
    name: '炒蘿蔔糕',
    nameEn: 'Fried Carrot Cake',
    description:
      '炒蘿蔔糕是新加坡經典的小販美食，以白蘿蔔製成的蘿蔔糕切塊後與蛋、菜脯一起炒製。分為白的和黑的兩種，黑的會加入甜醬油，各有風味。是早餐或宵夜的熱門選擇。',
    highlights: [
      '外酥內軟的口感',
      '白黑兩種風味選擇',
      '菜脯增添香氣',
      '新加坡特色小販美食',
    ],
    priceRange: {
      min: '$',
      max: '$',
      typical: '$',
      description: '一份約 S$3-6',
    },
    image: '/img/炒粿條.jpeg',
    popularDishes: ['白炒蘿蔔糕', '黑炒蘿蔔糕'],
    tips: [
      '白的清爽，黑的香甜',
      '可以點半黑半白',
      '加辣椒更提味',
      '小販中心最道地',
    ],
    bestTime: '早餐或宵夜',
    categoryGroup: 'other',
  },
  {
    id: 'intro-scissor-cut',
    categoryId: 'scissor-cut',
    name: '剪刀剪',
    nameEn: 'Scissor Cut Curry Rice',
    description:
      '剪刀剪咖哩飯是新加坡獨特的印度風味料理，因為用剪刀剪食材而得名。白飯上鋪滿各種咖哩配菜，包括炸雞、馬鈴薯、蔬菜等，再淋上濃郁的咖哩汁，豐盛又美味。',
    highlights: [
      '獨特的剪刀剪食材方式',
      '豐富多樣的配菜選擇',
      '濃郁的咖哩醬汁',
      '份量十足價格實惠',
    ],
    priceRange: {
      min: '$',
      max: '$$',
      typical: '$',
      description: '一份約 S$4-8',
    },
    image: '/img/新剪刀剪 .webp',
    popularDishes: ['炸雞剪刀剪', '素食剪刀剪', '綜合剪刀剪'],
    tips: [
      '配菜自己選擇',
      '咖哩汁可以要求多一些',
      '適合大食量的人',
      'Little India 區最道地',
    ],
    bestTime: '午餐或晚餐',
    categoryGroup: 'rice',
  },
  {
    id: 'intro-indian',
    categoryId: 'indian',
    name: '印度料理',
    nameEn: 'Indian Cuisine',
    description:
      '新加坡的印度料理豐富多樣，從北印的坦都里烤雞到南印的香蕉葉飯，應有盡有。Little India 區域集中了大量優質的印度餐廳，是體驗正宗印度風味的最佳去處。',
    highlights: [
      '豐富的印度料理選擇',
      '香料濃郁風味獨特',
      '素食選擇眾多',
      'Little India 是美食集中地',
    ],
    priceRange: {
      min: '$',
      max: '$$$',
      typical: '$$',
      description: '一人約 S$8-25',
    },
    image: '/img/興記咖喱雞米粉麵.jpeg',
    popularDishes: ['香蕉葉飯', 'Biryani', 'Tandoori', 'Masala', 'Naan'],
    tips: [
      '用手抓著吃最道地',
      '搭配印度奶茶',
      '素食選項很豐富',
      '週末去 Little India 最熱鬧',
    ],
    bestTime: '午餐或晚餐',
    categoryGroup: 'international',
  },
];

/**
 * Get food introduction by category ID
 */
export function getFoodIntroByCategory(categoryId: string): FoodCategoryIntro | undefined {
  return foodIntroductions.find((intro) => intro.categoryId === categoryId);
}

/**
 * Get food introduction by category name
 */
export function getFoodIntroByName(categoryName: string): FoodCategoryIntro | undefined {
  return foodIntroductions.find((intro) => intro.name === categoryName);
}

/**
 * Get all food introductions by category group
 */
export function getFoodIntrosByGroup(group: string): FoodCategoryIntro[] {
  return foodIntroductions.filter((intro) => intro.categoryGroup === group);
}

/**
 * Get all available food introductions
 */
export function getAllFoodIntros(): FoodCategoryIntro[] {
  return foodIntroductions;
}
