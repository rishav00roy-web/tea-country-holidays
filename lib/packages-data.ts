export interface Package {
  id: number
  title: string
  image: string
  duration: string
  price: number
  theme: string
  category: string[]
  description: string
}

export const fallbackPackages: Package[] = [
  // 6 Northeast India packages
  { id: 1, title: "Meghalaya Explorer", image: "https://images.unsplash.com/photo-1686472886489-1d2d7e08ff9c?w=400&q=65&auto=format", duration: "5 Days / 4 Nights", price: 12999, theme: "Adventure", category: ["Domestic", "Adventure"], description: "Explore Cherrapunji falls, living root bridges, and pristine caves." },
  { id: 2, title: "Kaziranga Wild Safari", image: "https://images.unsplash.com/photo-1637391783805-f1393be00fcf?w=400&q=65&auto=format", duration: "4 Days / 3 Nights", price: 14999, theme: "Adventure", category: ["Domestic", "Adventure"], description: "Meet the one-horned rhino in Assam's famous wildlife sanctuary." },
  { id: 3, title: "Tawang Monastery Journey", image: "https://images.unsplash.com/photo-1628443266300-e8490ee38875?w=400&q=65&auto=format", duration: "7 Days / 6 Nights", price: 24999, theme: "Pilgrimage", category: ["Domestic", "Pilgrimage", "Adventure"], description: "Scenic high-mountain pass travel to the historic Tawang Monastery." },
  { id: 4, title: "Darjeeling & Gangtok Retreat", image: "https://images.unsplash.com/photo-1698753864905-a447aa362ec9?w=400&q=65&auto=format", duration: "6 Days / 5 Nights", price: 18999, theme: "Honeymoon", category: ["Domestic", "Honeymoon"], description: "Breathtaking views of Kanchenjunga, tea gardens, and peaceful lakes." },
  { id: 5, title: "Majuli Cultural Island", image: "https://images.unsplash.com/photo-1759738101670-7d50ae3f1bd2?w=400&q=65&auto=format", duration: "4 Days / 3 Nights", price: 9999, theme: "Pilgrimage", category: ["Domestic", "Pilgrimage"], description: "Experience Satras, traditional mask making, and Assamese heritage." },
  { id: 6, title: "Cherrapunji Misty Valleys", image: "https://images.unsplash.com/photo-1689089526066-c7e6e95ee265?w=400&q=65&auto=format", duration: "5 Days / 4 Nights", price: 11999, theme: "Honeymoon", category: ["Domestic", "Honeymoon"], description: "Chasing waterfalls and staying in cozy treehouses in the wettest place." },
  
  // 3 Rest of India packages
  { id: 7, title: "Goa Beach Getaway", image: "/images/photo-1512343879784-a960bf40e7f2.jpg", duration: "4 Days / 3 Nights", price: 12999, theme: "Beach", category: ["Domestic", "Beach"], description: "Relax on pristine sandy beaches with lively nightlife and coastal vibes." },
  { id: 8, title: "Kashmir Paradise", image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=400&q=65&auto=format", duration: "6 Days / 5 Nights", price: 24999, theme: "Honeymoon", category: ["Domestic", "Honeymoon", "Adventure"], description: "Explore breathtaking snow peaks, pristine lakes, and alpine meadows." },
  { id: 9, title: "Varanasi (Uttar Pradesh)", image: "https://images.unsplash.com/photo-1561359313-0639aad49ca6?w=400&q=65&auto=format", duration: "4 Days / 3 Nights", price: 8999, theme: "Pilgrimage", category: ["Domestic", "Pilgrimage"], description: "One of the oldest continuously inhabited cities and the holiest of sacred destinations on the Ganges." },
  
  // 3 International packages to make sure the "International" filter has options
  { id: 10, title: "Dubai Extravaganza", image: "https://images.unsplash.com/photo-1708361089093-beef4c4584e7?w=400&q=65&auto=format", duration: "5 Days / 4 Nights", price: 45999, theme: "International", category: ["International"], description: "Experience modern luxury, desert safaris, and futuristic skylines." },
  { id: 11, title: "Bali Escape", image: "/images/photo-1537996194471-e657df975ab4.jpg", duration: "6 Days / 5 Nights", price: 42999, theme: "International", category: ["International", "Beach", "Honeymoon"], description: "Visit sacred cliffside temples, pool villas, and serene sunsets." },
  { id: 12, title: "Thailand Adventure", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&q=65&auto=format", duration: "6 Days / 5 Nights", price: 35999, theme: "International", category: ["International", "Adventure"], description: "Enjoy exotic temples, vibrant street markets, and tropical islands." },

  // Additional 6 pilgrimage packages requested by the user
  { id: 13, title: "The Char Dham Yatra (Uttarakhand)", image: "https://images.unsplash.com/photo-1698574996391-73f103113f60?w=400&q=65&auto=format", duration: "10 Days / 9 Nights", price: 29999, theme: "Pilgrimage", category: ["Domestic", "Pilgrimage"], description: "The ultimate Hindu pilgrimage circuit in Garhwal Uttarakhand, encompassing four sacred shrines." },
  { id: 14, title: "Tirupati Balaji (Andhra Pradesh)", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=65&auto=format", duration: "3 Days / 2 Nights", price: 6999, theme: "Pilgrimage", category: ["Domestic", "Pilgrimage"], description: "Highly revered visit to Venkateswara Temple on Tirumala Hills, Andhra Pradesh." },
  { id: 15, title: "Vaishno Devi (Jammu & Kashmir)", image: "https://images.unsplash.com/photo-1773965040894-330722d21ffd?w=400&q=65&auto=format", duration: "4 Days / 3 Nights", price: 7999, theme: "Pilgrimage", category: ["Domestic", "Pilgrimage"], description: "Seek blessings at the sacred cave shrine in Trikuta Mountains, Katra J&K." },
  { id: 16, title: "The Golden Temple (Punjab)", image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=400&q=65&auto=format", duration: "3 Days / 2 Nights", price: 5999, theme: "Pilgrimage", category: ["Domestic", "Pilgrimage"], description: "Visit Amritsar's Golden Temple, featuring its stunning gold facade and langar kitchen." },
  { id: 17, title: "Jagannath Temple (Odisha)", image: "https://images.unsplash.com/photo-1706790574525-d218c4c52b5c?w=400&q=65&auto=format", duration: "4 Days / 3 Nights", price: 9999, theme: "Pilgrimage", category: ["Domestic", "Pilgrimage"], description: "Revered Char Dham destination in Puri, Odisha, famous for the Rath Yatra." },
  { id: 18, title: "Rameshwaram (Tamil Nadu)", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=65&auto=format", duration: "4 Days / 3 Nights", price: 11999, theme: "Pilgrimage", category: ["Domestic", "Pilgrimage"], description: "Critical stop on Char Dham circuit in Tamil Nadu housing Shiva's Jyotirlinga." },
]
