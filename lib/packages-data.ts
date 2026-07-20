export interface Package {
  id: number
  title: string
  image: string
  images?: string[]
  duration: string
  price: number
  theme: string
  category: string[]
  description: string
  alt?: string
}

export const fallbackPackages: Package[] = [
  // 6 Northeast India packages
  { 
    id: 1, 
    title: "Meghalaya Explorer", 
    image: "https://images.unsplash.com/photo-1686472886489-1d2d7e08ff9c?w=800&q=80&auto=format&fit=crop", 
    duration: "6 Nights / 5 Days", 
    price: 12999, 
    theme: "Adventure", 
    category: ["Domestic", "Adventure"], 
    description: "Explore Cherrapunji falls, living root bridges, and pristine caves.",
    alt: "Seven Sisters waterfalls cascading down lush green cliff in Cherrapunji Meghalaya India"
  },
  { 
    id: 2, 
    title: "Kaziranga Wild Safari", 
    image: "https://images.unsplash.com/photo-1637391783805-f1393be00fcf?w=800&q=80&auto=format&fit=crop", 
    duration: "6 Nights / 5 Days", 
    price: 14999, 
    theme: "Adventure", 
    category: ["Domestic", "Adventure"], 
    description: "Meet the one-horned rhino in Assam's famous wildlife sanctuary.",
    alt: "Kaziranga National Park one-horned rhino Assam India wildlife"
  },
  { 
    id: 3, 
    title: "Tawang Monastery Journey", 
    image: "https://images.unsplash.com/photo-1628443266300-e8490ee38875?w=800&q=80&auto=format&fit=crop", 
    duration: "6 Nights / 5 Days", 
    price: 24999, 
    theme: "Pilgrimage", 
    category: ["Domestic", "Pilgrimage", "Adventure"], 
    description: "Scenic high-mountain pass travel to the historic Tawang Monastery.",
    alt: "Tawang Monastery golden roof Arunachal Pradesh India travel"
  },
  { 
    id: 4, 
    title: "Darjeeling & Gangtok Retreat", 
    image: "https://images.unsplash.com/photo-1698753864905-a447aa362ec9?w=800&q=80&auto=format&fit=crop", 
    duration: "6 Nights / 5 Days", 
    price: 18999, 
    theme: "Honeymoon", 
    category: ["Domestic", "Honeymoon"], 
    description: "Breathtaking views of Kanchenjunga, tea gardens, and peaceful lakes.",
    alt: "Darjeeling tea garden West Bengal India Kanchenjunga"
  },
  { 
    id: 5, 
    title: "Majuli Cultural Island", 
    image: "https://images.unsplash.com/photo-1759738101670-7d50ae3f1bd2?w=800&q=80&auto=format&fit=crop", 
    duration: "6 Nights / 5 Days", 
    price: 9999, 
    theme: "Pilgrimage", 
    category: ["Domestic", "Pilgrimage"], 
    description: "Experience Satras, traditional mask making, and Assamese heritage.",
    alt: "Majuli River Island Assam India travel"
  },
  { 
    id: 6, 
    title: "Cherrapunji Misty Valleys", 
    image: "https://images.unsplash.com/photo-1689089526066-c7e6e95ee265?w=800&q=80&auto=format&fit=crop", 
    duration: "6 Nights / 5 Days", 
    price: 11999, 
    theme: "Honeymoon", 
    category: ["Domestic", "Honeymoon"], 
    description: "Chasing waterfalls and staying in cozy treehouses in the wettest place.",
    alt: "Misty green hills and deep forest valleys of Cherrapunji Meghalaya India"
  },
  
  // 3 Rest of India packages
  { 
    id: 7, 
    title: "Goa Beach Getaway", 
    image: "https://images.unsplash.com/photo-1558894930-0e1f89b9f0ce?w=800&q=80&auto=format&fit=crop", 
    duration: "6 Nights / 5 Days", 
    price: 12999, 
    theme: "Beach", 
    category: ["Domestic", "Beach"], 
    description: "Relax on pristine sandy beaches with lively nightlife and coastal vibes.",
    alt: "Goa beach sunset travel India north south goa"
  },
  { 
    id: 8, 
    title: "Kashmir Paradise", 
    image: "https://images.unsplash.com/photo-1614056965546-42fbe24eb36c?w=800&q=80&auto=format&fit=crop", 
    duration: "6 Nights / 5 Days", 
    price: 24999, 
    theme: "Honeymoon", 
    category: ["Domestic", "Honeymoon", "Adventure"], 
    description: "Explore breathtaking snow peaks, pristine lakes, and alpine meadows.",
    alt: "Srinagar Dal Lake Kashmir houseboat travel India"
  },
  { 
    id: 9, 
    title: "Varanasi (Uttar Pradesh)", 
    image: "https://images.unsplash.com/photo-1762513839526-c596f5e99a9a?w=800&q=80&auto=format&fit=crop", 
    duration: "6 Nights / 5 Days", 
    price: 8999, 
    theme: "Pilgrimage", 
    category: ["Domestic", "Pilgrimage"], 
    description: "One of the oldest continuously inhabited cities and the holiest of sacred destinations on the Ganges.",
    alt: "Varanasi ghats Ganges river Uttar Pradesh India"
  },
  
  // 3 International packages to make sure the "International" filter has options
  { 
    id: 10, 
    title: "Dubai Extravaganza", 
    image: "https://images.unsplash.com/photo-1708361089093-beef4c4584e7?w=800&q=80&auto=format&fit=crop", 
    duration: "6 Nights / 5 Days", 
    price: 45999, 
    theme: "International", 
    category: ["International"], 
    description: "Experience modern luxury, desert safaris, and futuristic skylines.",
    alt: "Dubai skyline luxury travel holiday"
  },
  { 
    id: 11, 
    title: "Bali Escape", 
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80&auto=format&fit=crop", 
    duration: "6 Nights / 5 Days", 
    price: 42999, 
    theme: "International", 
    category: ["International", "Beach", "Honeymoon"], 
    description: "Visit sacred cliffside temples, pool villas, and serene sunsets.",
    alt: "Bali beach sunset travel holiday"
  },
  { 
    id: 12, 
    title: "Thailand Adventure", 
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80&auto=format&fit=crop", 
    duration: "6 Nights / 5 Days", 
    price: 35999, 
    theme: "International", 
    category: ["International", "Adventure"], 
    description: "Enjoy exotic temples, vibrant street markets, and tropical islands.",
    alt: "Thailand tropical island travel adventure"
  },

  // Additional 6 pilgrimage packages requested by the user
  { 
    id: 13, 
    title: "The Char Dham Yatra (Uttarakhand)", 
    image: "https://images.unsplash.com/photo-1607406374368-809f8ec7f118?w=800&q=80&auto=format&fit=crop", 
    duration: "6 Nights / 5 Days", 
    price: 29999, 
    theme: "Pilgrimage", 
    category: ["Domestic", "Pilgrimage"], 
    description: "The ultimate Hindu pilgrimage circuit in Garhwal Uttarakhand, encompassing four sacred shrines.",
    alt: "Rishikesh Uttarakhand adventure yoga Ganges India"
  },
  { 
    id: 14, 
    title: "Tirupati Balaji (Andhra Pradesh)", 
    image: "https://images.unsplash.com/photo-1733805569204-41768c7d8c0f?w=800&q=80&auto=format&fit=crop", 
    duration: "6 Nights / 5 Days", 
    price: 6999, 
    theme: "Pilgrimage", 
    category: ["Domestic", "Pilgrimage"], 
    description: "Highly revered visit to Venkateswara Temple on Tirumala Hills, Andhra Pradesh.",
    alt: "Tirupati temple Andhra Pradesh India pilgrimage"
  },
  { 
    id: 15, 
    title: "Vaishno Devi (Jammu & Kashmir)", 
    image: "https://images.unsplash.com/photo-1719377678477-0fb3638ec482?w=800&q=80&auto=format&fit=crop", 
    duration: "6 Nights / 5 Days", 
    price: 7999, 
    theme: "Pilgrimage", 
    category: ["Domestic", "Pilgrimage"], 
    description: "Seek blessings at the sacred cave shrine in Trikuta Mountains, Katra J&K.",
    alt: "Vaishno Devi temple Jammu Kashmir India pilgrimage"
  },
  { 
    id: 16, 
    title: "The Golden Temple (Punjab)", 
    image: "https://images.unsplash.com/photo-1589742953094-c1afefe5fed7?w=800&q=80&auto=format&fit=crop", 
    duration: "6 Nights / 5 Days", 
    price: 5999, 
    theme: "Pilgrimage", 
    category: ["Domestic", "Pilgrimage"], 
    description: "Visit Amritsar's Golden Temple, featuring its stunning gold facade and langar kitchen.",
    alt: "Golden Temple Amritsar Punjab India"
  },
  { 
    id: 17, 
    title: "Jagannath Temple (Odisha)", 
    image: "https://images.unsplash.com/photo-1597505686823-233a95175f40?w=800&q=80&auto=format&fit=crop", 
    duration: "6 Nights / 5 Days", 
    price: 9999, 
    theme: "Pilgrimage", 
    category: ["Domestic", "Pilgrimage"], 
    description: "Revered Char Dham destination in Puri, Odisha, famous for the Rath Yatra.",
    alt: "Konark Sun Temple Odisha India heritage travel"
  },
  { 
    id: 18, 
    title: "Rameshwaram (Tamil Nadu)", 
    image: "https://images.unsplash.com/photo-1683665446527-0bfa0d7a8822?w=800&q=80&auto=format&fit=crop", 
    duration: "6 Nights / 5 Days", 
    price: 11999, 
    theme: "Pilgrimage", 
    category: ["Domestic", "Pilgrimage"], 
    description: "Critical stop on Char Dham circuit in Tamil Nadu housing Shiva's Jyotirlinga.",
    alt: "Ooty Nilgiri hills Tamil Nadu India travel"
  },
  { 
    id: 19, 
    title: "Himachal Pradesh Highlights", 
    image: "https://images.unsplash.com/photo-1634539132466-abaca3a2438b?w=800&q=80&auto=format&fit=crop", 
    images: [
      "https://images.unsplash.com/photo-1634539132466-abaca3a2438b?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1684991351891-018a35a91b36?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1712388429936-2abc7144083f?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1643546170636-88fca3e05819?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1733490094009-454bd67f3e2a?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1638349168333-340bccd72761?w=800&q=80&auto=format&fit=crop"
    ],
    duration: "6 Nights / 5 Days", 
    price: 26999, 
    theme: "Adventure", 
    category: ["Domestic", "Adventure", "Nature"], 
    description: "A scenic journey across Himachal's hill stations, river valleys, and pine forests covering Shimla, Kufri, Manali, Kasol, Dalhousie, and Dharamsala.",
    alt: "Himachal Pradesh Shimla Manali mountains travel India"
  },
  { 
    id: 20, 
    title: "Golden Triangle Tour", 
    image: "https://plus.unsplash.com/premium_photo-1697729441569-f706fdd1f71c?w=800&q=80&auto=format&fit=crop", 
    images: [
      "https://images.unsplash.com/photo-1592639296346-560c37a0f711?w=800&q=80&auto=format&fit=crop",
      "https://plus.unsplash.com/premium_photo-1697729441569-f706fdd1f71c?w=800&q=80&auto=format&fit=crop",
      "https://plus.unsplash.com/premium_photo-1661962305764-375ef76a3fb5?w=800&q=80&auto=format&fit=crop"
    ],
    duration: "6 Nights / 5 Days", 
    price: 15999, 
    theme: "Heritage", 
    category: ["Domestic", "Heritage"], 
    description: "Explore India's cultural crown jewels, visiting the historical landmarks of Delhi, the iconic Taj Mahal in Agra, and the royal palaces of Jaipur.",
    alt: "Taj Mahal Agra Golden Triangle tourist package India"
  },
  { 
    id: 21, 
    title: "Ranthambore, Pushkar & Jaipur", 
    image: "https://images.unsplash.com/photo-1698768335928-2f57b92537ab?w=800&q=80&auto=format&fit=crop", 
    images: [
      "https://images.unsplash.com/photo-1698768335928-2f57b92537ab?w=800&q=80&auto=format&fit=crop",
      "https://plus.unsplash.com/premium_photo-1661962305764-375ef76a3fb5?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1651447215906-ebc441bdc7ac?w=800&q=80&auto=format&fit=crop"
    ],
    duration: "6 Nights / 5 Days", 
    price: 18999, 
    theme: "Adventure", 
    category: ["Domestic", "Adventure", "Heritage"], 
    description: "A perfect mix of wildlife safari in Ranthambore, spiritual vibes in Pushkar, and royal heritage sightseeing in Jaipur.",
    alt: "Ranthambore tiger safari and Rajasthan heritage tour"
  },
  { 
    id: 22, 
    title: "Udaipur & Royal Rajasthan", 
    image: "https://images.unsplash.com/photo-1623851293886-e9b3618ae902?w=800&q=80&auto=format&fit=crop", 
    images: [
      "https://images.unsplash.com/photo-1623851293886-e9b3618ae902?w=800&q=80&auto=format&fit=crop"
    ],
    duration: "6 Nights / 5 Days", 
    price: 22999, 
    theme: "Heritage", 
    category: ["Domestic", "Heritage", "Honeymoon"], 
    description: "Explore the lake city of Udaipur, the hill station of Mount Abu, Jodhpur's blue streets, and the golden sand dunes of Jaisalmer.",
    alt: "Udaipur Lake Palace Rajasthan travel package"
  },
  { 
    id: 23, 
    title: "Delhi City Exploration", 
    image: "https://images.unsplash.com/photo-1678966432189-d58296e45ad2?w=800&q=80&auto=format&fit=crop", 
    images: [
      "https://plus.unsplash.com/premium_photo-1661919589683-f11880119fb7?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598977054780-2dc700fdc9d3?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1678966432189-d58296e45ad2?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594455615933-c19828af39b8?w=800&q=80&auto=format&fit=crop"
    ],
    duration: "6 Nights / 5 Days", 
    price: 7999, 
    theme: "Heritage", 
    category: ["Domestic", "Heritage"], 
    description: "Discover New and Old Delhi's iconic historical monuments including India Gate, Jantar Mantar, Jama Masjid, Red Fort, and Akshardham Temple.",
    alt: "India Gate New Delhi city tour sightseeing"
  },
  { 
    id: 24, 
    title: "Vibrant Gujarat Heritage", 
    image: "https://images.unsplash.com/photo-1735192683809-3fcd83233e19?w=800&q=80&auto=format&fit=crop", 
    images: [
      "https://images.unsplash.com/photo-1673183191406-5987fda2fa24?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1735192683809-3fcd83233e19?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1642841819300-20ed449c02a1?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1670406312373-6d4d1776e4aa?w=800&q=80&auto=format&fit=crop"
    ],
    duration: "6 Nights / 5 Days", 
    price: 24999, 
    theme: "Heritage", 
    category: ["Domestic", "Heritage", "Pilgrimage"], 
    description: "Visit the sacred temples of Dwarka and Somnath, see the colossal Statue of Unity, and explore the white salt desert of Kutch.",
    alt: "Gujarat Somnath Dwarka Kutch travel package India"
  },
  { 
    id: 25, 
    title: "Heart of Madhya Pradesh", 
    image: "https://images.unsplash.com/photo-1606298855672-3efb63017be8?w=800&q=80&auto=format&fit=crop", 
    images: [
      "https://images.unsplash.com/photo-1695185577116-3513f730f722?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584185438408-88532feff8d4?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606298855672-3efb63017be8?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1674500547677-6a779a7faefe?w=800&q=80&auto=format&fit=crop"
    ],
    duration: "6 Nights / 5 Days", 
    price: 19999, 
    theme: "Pilgrimage", 
    category: ["Domestic", "Pilgrimage", "Heritage"], 
    description: "Visit the Jyotirlingas in Ujjain and Omkareshwar, marvel at the Khajuraho temples, and relax in the hill station of Pachmarhi.",
    alt: "Khajuraho temples Madhya Pradesh heritage travel India"
  },
  { 
    id: 26, 
    title: "Buddhist Trail Bihar", 
    image: "https://images.unsplash.com/photo-1656663785677-bc21fcb531db?w=800&q=80&auto=format&fit=crop", 
    images: [
      "https://images.unsplash.com/photo-1656663785677-bc21fcb531db?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1728448308321-7afb65a3681c?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1736235300171-eb8aa382b594?w=800&q=80&auto=format&fit=crop"
    ],
    duration: "6 Nights / 5 Days", 
    price: 12999, 
    theme: "Pilgrimage", 
    category: ["Domestic", "Pilgrimage"], 
    description: "Walk the path of enlightenment visiting the Mahabodhi Temple in Bodh Gaya, the historic hills of Rajgir, and the ancient Nalanda University ruins.",
    alt: "Bodh Gaya Mahabodhi Temple Bihar India pilgrimage"
  },
  { 
    id: 27, 
    title: "Nagaland Cultural Heritage", 
    image: "https://images.unsplash.com/photo-1712055196088-9bc6da4ffbce?w=800&q=80&auto=format&fit=crop", 
    images: [
      "https://images.unsplash.com/photo-1635998973462-1bdda50a13df?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1712055196088-9bc6da4ffbce?w=800&q=80&auto=format&fit=crop",
      "https://upload.wikimedia.org/wikipedia/commons/9/93/Kisama_main_arena_Hornbill_Festival_2019.jpg"
    ],
    duration: "6 Nights / 5 Days", 
    price: 16999, 
    theme: "Nature", 
    category: ["Domestic", "Adventure", "Nature"], 
    description: "Trek the emerald green Dzukou Valley, explore Kohima war cemetery, and experience Hornbill festival site at Kisama.",
    alt: "Nagaland Dzukou Valley Kohima Northeast India travel"
  },
  { 
    id: 28, 
    title: "Kerala Backwaters & Hills", 
    image: "https://images.unsplash.com/photo-1593417033942-bcdf26b74700?w=800&q=80&auto=format&fit=crop", 
    images: [
      "https://images.unsplash.com/photo-1637066742971-726bee8d9f56?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1716404985743-8c0e007cb358?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593417033942-bcdf26b74700?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576236242220-f658417e04be?w=800&q=80&auto=format&fit=crop"
    ],
    duration: "6 Nights / 5 Days", 
    price: 21999, 
    theme: "Beach", 
    category: ["Domestic", "Beach", "Honeymoon"], 
    description: "Relax in the tea gardens of Munnar, search for wildlife in Thekkady, cruise the houseboats of Alleppey, and sunbathe in Kovalam.",
    alt: "Kerala backwaters houseboat Alleppey Munnar travel India"
  },
  { 
    id: 29, 
    title: "Coorg, Mysore & Hampi", 
    image: "https://plus.unsplash.com/premium_photo-1697730337612-8bd916249e30?w=800&q=80&auto=format&fit=crop", 
    images: [
      "https://images.unsplash.com/photo-1600112356915-089abb8fc71a?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560357647-62a43d9897bb?w=800&q=80&auto=format&fit=crop",
      "https://plus.unsplash.com/premium_photo-1697730337612-8bd916249e30?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1739038034791-a60471396db0?w=800&q=80&auto=format&fit=crop"
    ],
    duration: "6 Nights / 5 Days", 
    price: 23999, 
    theme: "Heritage", 
    category: ["Domestic", "Heritage", "Nature"], 
    description: "Discover misty coffee estates in Coorg and Chikmagalur, visit the royal Mysore Palace, and explore the ruins of Hampi.",
    alt: "Hampi temple ruins Karnataka India travel heritage"
  },
  { 
    id: 30, 
    title: "Maharashtra Highlights", 
    image: "https://images.unsplash.com/photo-1689172324767-f180880ccdec?w=800&q=80&auto=format&fit=crop", 
    images: [
      "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1689172324767-f180880ccdec?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1635330211074-50308f363055?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579609424835-16beba97e3c2?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1707733580929-19bf89c7ede6?w=800&q=80&auto=format&fit=crop"
    ],
    duration: "6 Nights / 5 Days", 
    price: 17999, 
    theme: "Nature", 
    category: ["Domestic", "Nature", "Heritage"], 
    description: "Tour bustling Mumbai, enjoy the monsoons of Lonavala and Mahabaleshwar, taste wine in Nasik, and seek blessings in Shirdi.",
    alt: "Lonavala waterfalls Western Ghats Maharashtra travel"
  },
  { 
    id: 31, 
    title: "Leh Ladakh Adventure", 
    image: "https://plus.unsplash.com/premium_photo-1696531220266-362a418da9b4?w=800&q=80&auto=format&fit=crop", 
    images: [
      "https://images.unsplash.com/photo-1600242466690-c1c04f081762?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593118960299-4818285df788?w=800&q=80&auto=format&fit=crop",
      "https://plus.unsplash.com/premium_photo-1696531220266-362a418da9b4?w=800&q=80&auto=format&fit=crop"
    ],
    duration: "6 Nights / 5 Days", 
    price: 29999, 
    theme: "Adventure", 
    category: ["Domestic", "Adventure", "Nature"], 
    description: "Cross high-altitude passes to the dunes of Nubra Valley and camp by the deep blue salt waters of Pangong Lake.",
    alt: "Ladakh Pangong Lake starry night Leh Nubra Valley India"
  },
]
