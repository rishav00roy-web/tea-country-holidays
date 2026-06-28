export interface Package {
  id: number
  title: string
  image: string
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
    image: "https://images.unsplash.com/photo-1609276804051-8c5e906cc430?w=800&q=80&auto=format&fit=crop", 
    duration: "5 Days / 4 Nights", 
    price: 12999, 
    theme: "Adventure", 
    category: ["Domestic", "Adventure"], 
    description: "Explore Cherrapunji falls, living root bridges, and pristine caves.",
    alt: "Meghalaya Cherrapunji Seven Sisters Falls Shillong India"
  },
  { 
    id: 2, 
    title: "Kaziranga Wild Safari", 
    image: "https://images.unsplash.com/photo-1637391783805-f1393be00fcf?w=800&q=80&auto=format&fit=crop", 
    duration: "4 Days / 3 Nights", 
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
    duration: "7 Days / 6 Nights", 
    price: 24999, 
    theme: "Pilgrimage", 
    category: ["Domestic", "Pilgrimage", "Adventure"], 
    description: "Scenic high-mountain pass travel to the historic Tawang Monastery.",
    alt: "Tawang Monastery Journey Arunachal Pradesh India travel"
  },
  { 
    id: 4, 
    title: "Darjeeling & Gangtok Retreat", 
    image: "https://images.unsplash.com/photo-1698753864905-a447aa362ec9?w=800&q=80&auto=format&fit=crop", 
    duration: "6 Days / 5 Nights", 
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
    duration: "4 Days / 3 Nights", 
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
    duration: "5 Days / 4 Nights", 
    price: 11999, 
    theme: "Honeymoon", 
    category: ["Domestic", "Honeymoon"], 
    description: "Chasing waterfalls and staying in cozy treehouses in the wettest place.",
    alt: "Meghalaya Cherrapunji Seven Sisters Falls Shillong India"
  },
  
  // 3 Rest of India packages
  { 
    id: 7, 
    title: "Goa Beach Getaway", 
    image: "https://images.unsplash.com/photo-1558894930-0e1f89b9f0ce?w=800&q=80&auto=format&fit=crop", 
    duration: "4 Days / 3 Nights", 
    price: 12999, 
    theme: "Beach", 
    category: ["Domestic", "Beach"], 
    description: "Relax on pristine sandy beaches with lively nightlife and coastal vibes.",
    alt: "Goa beach sunset travel India north south goa"
  },
  { 
    id: 8, 
    title: "Kashmir Paradise", 
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&q=80&auto=format&fit=crop", 
    duration: "6 Days / 5 Nights", 
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
    duration: "4 Days / 3 Nights", 
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
    duration: "5 Days / 4 Nights", 
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
    duration: "6 Days / 5 Nights", 
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
    duration: "6 Days / 5 Nights", 
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
    image: "https://images.unsplash.com/photo-1698574996391-73f103113f60?w=800&q=80&auto=format&fit=crop", 
    duration: "10 Days / 9 Nights", 
    price: 29999, 
    theme: "Pilgrimage", 
    category: ["Domestic", "Pilgrimage"], 
    description: "The ultimate Hindu pilgrimage circuit in Garhwal Uttarakhand, encompassing four sacred shrines.",
    alt: "Rishikesh Uttarakhand adventure yoga Ganges India"
  },
  { 
    id: 14, 
    title: "Tirupati Balaji (Andhra Pradesh)", 
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80&auto=format&fit=crop", 
    duration: "3 Days / 2 Nights", 
    price: 6999, 
    theme: "Pilgrimage", 
    category: ["Domestic", "Pilgrimage"], 
    description: "Highly revered visit to Venkateswara Temple on Tirumala Hills, Andhra Pradesh.",
    alt: "Tirupati temple Andhra Pradesh India pilgrimage"
  },
  { 
    id: 15, 
    title: "Vaishno Devi (Jammu & Kashmir)", 
    image: "https://images.unsplash.com/photo-1773965040894-330722d21ffd?w=800&q=80&auto=format&fit=crop", 
    duration: "4 Days / 3 Nights", 
    price: 7999, 
    theme: "Pilgrimage", 
    category: ["Domestic", "Pilgrimage"], 
    description: "Seek blessings at the sacred cave shrine in Trikuta Mountains, Katra J&K.",
    alt: "Srinagar Dal Lake Kashmir houseboat travel India"
  },
  { 
    id: 16, 
    title: "The Golden Temple (Punjab)", 
    image: "https://images.unsplash.com/photo-1589742953094-c1afefe5fed7?w=800&q=80&auto=format&fit=crop", 
    duration: "3 Days / 2 Nights", 
    price: 5999, 
    theme: "Pilgrimage", 
    category: ["Domestic", "Pilgrimage"], 
    description: "Visit Amritsar's Golden Temple, featuring its stunning gold facade and langar kitchen.",
    alt: "Golden Temple Amritsar Punjab India"
  },
  { 
    id: 17, 
    title: "Jagannath Temple (Odisha)", 
    image: "https://images.unsplash.com/photo-1706790574525-d218c4c52b5c?w=800&q=80&auto=format&fit=crop", 
    duration: "4 Days / 3 Nights", 
    price: 9999, 
    theme: "Pilgrimage", 
    category: ["Domestic", "Pilgrimage"], 
    description: "Revered Char Dham destination in Puri, Odisha, famous for the Rath Yatra.",
    alt: "Konark Sun Temple Odisha India heritage travel"
  },
  { 
    id: 18, 
    title: "Rameshwaram (Tamil Nadu)", 
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80&auto=format&fit=crop", 
    duration: "4 Days / 3 Nights", 
    price: 11999, 
    theme: "Pilgrimage", 
    category: ["Domestic", "Pilgrimage"], 
    description: "Critical stop on Char Dham circuit in Tamil Nadu housing Shiva's Jyotirlinga.",
    alt: "Ooty Nilgiri hills Tamil Nadu India travel"
  },
]
