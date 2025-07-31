export const mockProducts = [
  {
    id: 1,
    name: "Frozen Margherita Pizza",
    price: 299,
    category: "Veg",
    image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Delicious frozen margherita pizza with fresh mozzarella and basil",
    inStock: true,
    rating: 4.5,
    reviews: 45,
    nutrition: {
      calories: 280,
      protein: "12g",
      carbs: "35g",
      fat: "8g"
    }
  },
  {
    id: 2,
    name: "Chicken Nuggets",
    price: 249,
    category: "Non-Veg",
    image: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Crispy chicken nuggets made from premium chicken breast",
    inStock: true,
    rating: 4.3,
    reviews: 32,
    nutrition: {
      calories: 320,
      protein: "18g",
      carbs: "15g",
      fat: "22g"
    }
  },
  {
    id: 3,
    name: "Vegetable Spring Rolls",
    price: 189,
    category: "Snacks",
    image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Crispy vegetable spring rolls with mixed vegetables",
    inStock: false,
    rating: 4.1,
    reviews: 28,
    nutrition: {
      calories: 220,
      protein: "6g",
      carbs: "30g",
      fat: "8g"
    }
  },
  {
    id: 4,
    name: "Fish Fingers",
    price: 329,
    category: "Non-Veg",
    image: "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Premium fish fingers with crispy coating",
    inStock: true,
    rating: 4.6,
    reviews: 52,
    nutrition: {
      calories: 290,
      protein: "20g",
      carbs: "18g",
      fat: "16g"
    }
  },
  {
    id: 5,
    name: "Frozen French Fries",
    price: 149,
    category: "Snacks",
    image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Golden crispy french fries, perfect for snacking",
    inStock: true,
    rating: 4.2,
    reviews: 38,
    nutrition: {
      calories: 365,
      protein: "4g",
      carbs: "63g",
      fat: "12g"
    }
  },
  {
    id: 6,
    name: "Vegetable Burger Patty",
    price: 199,
    category: "Veg",
    image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Healthy vegetable burger patty made with fresh vegetables",
    inStock: true,
    rating: 4.0,
    reviews: 25,
    nutrition: {
      calories: 250,
      protein: "10g",
      carbs: "25g",
      fat: "12g"
    }
  }
];

export const mockOrders = [
  {
    id: 1,
    userId: 2,
    items: [
      { id: 1, name: "Frozen Margherita Pizza", price: 299, quantity: 2 },
      { id: 2, name: "Chicken Nuggets", price: 249, quantity: 1 }
    ],
    total: 847,
    status: "Delivered",
    orderDate: "2024-01-15T10:30:00Z",
    deliveryAddress: "123 Main St, City, State 12345"
  },
  {
    id: 2,
    userId: 2,
    items: [
      { id: 4, name: "Fish Fingers", price: 329, quantity: 1 },
      { id: 5, name: "Frozen French Fries", price: 149, quantity: 2 }
    ],
    total: 627,
    status: "Shipped",
    orderDate: "2024-01-20T14:15:00Z",
    deliveryAddress: "123 Main St, City, State 12345"
  }
];

export const productReviews = {
  1: [
    { id: 1, userName: "John D.", rating: 5, comment: "Amazing pizza! Tastes just like fresh.", date: "2024-01-10" },
    { id: 2, userName: "Sarah M.", rating: 4, comment: "Good quality, quick delivery.", date: "2024-01-12" }
  ],
  2: [
    { id: 3, userName: "Mike R.", rating: 4, comment: "Kids love these nuggets!", date: "2024-01-08" }
  ]
};