// Flash Sale Component
const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 34,
    seconds: 56
  });
  const [elementRef, isVisible] = useScrollReveal(0.1);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      ref={elementRef}
      className={`bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 rounded-2xl p-8 text-center text-white relative overflow-hidden transition-all duration-1000 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-16'
      }`}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-pink-400 to-purple-500 animate-pulse opacity-50"></div>
      
      <div className="relative z-10">
        <h3 className="text-3xl font-bold mb-2">🔥 Flash Sale!</h3>
        <p className="text-xl mb-6">Up to 50% off on selected items</p>
        
        <div className="flex justify-center gap-4 mb-6">
          <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 min-w-[60px]">
            <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
            <div className="text-sm">Hours</div>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 min-w-[60px]">
            <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
            <div className="text-sm">Minutes</div>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 min-w-[60px]">
            <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
            <div className="text-sm">Seconds</div>
          </div>
        </div>
        
        <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <a href="/user-dashboard">Shop Flash Sale</a>
        </button>
      </div>
    </div>
  );
};import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Star, Clock, Snowflake, ChefHat, Leaf, Fish, Zap } from 'lucide-react';

// Scroll Reveal Hook
const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold]);

  return [elementRef, isVisible];
};

// Mock Data
const featuredProducts = [
  {
    id: 1,
    name: "Premium Mixed Berries",
    category: "Frozen Fruits",
    price: "249",
    originalPrice: "359",
    image: "/Images/FROZEN-MIXED-BERRIES.jpg",
    rating: 4.8,
    isPopular: true,
  },
  {
    id: 2,
    name: "Frozen Sweet Corn",
    category: "vegetables",
    price: "199",
    originalPrice: "300",
    image: "/Images/frozen sweet corn.jpg",
    rating: 4.6,
    isPopular: true,
  },
  {
    id: 3,
    name: "frozen mixed vegetables",
    category: "vegetables",
    price: "149",
    originalPrice: "249",
    image:
      "/Images/frozen mixed vegetables.jpg",
    rating: 4.7,
    isPopular: false,
  },
  {
    id: 4,
    name: "frozen momos",
    category: "Ready-to-Eat",
    price: "279",
    originalPrice: "335",
    image:
      "/Images/frozen momos.jpg",
    rating: 4.9,
    isPopular: true,
  },
];

const categories = [
  {
    id: 1,
    name: "Popular Frozen Items",
    icon: Snowflake,
    gradient: "from-blue-400 to-cyan-300",
    products: 120,
  },
  {
    id: 2,
    name: "Snacks & Appetizers",
    icon: ChefHat,
    gradient: "from-purple-400 to-pink-300",
    products: 85,
  },
  {
    id: 3,
    name: "Healthy Choices",
    icon: Leaf,
    gradient: "from-green-400 to-emerald-300",
    products: 95,
  },
  {
    id: 4,
    name: "Bakery Products & Desserts",
    icon: Fish,
    gradient: "from-orange-400 to-red-300",
    products: 60,
  },
  {
    id: 5,
    name: "Quick Meals",
    icon: Zap,
    gradient: "from-yellow-400 to-orange-300",
    products: 75,
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment: "Amazing quality! The frozen berries taste as fresh as the day they were picked.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Mike Chen",
    rating: 5,
    comment: "Super fast delivery and everything arrived perfectly frozen. Will order again!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Emma Davis",
    rating: 4,
    comment: "Great selection of healthy frozen meals. Perfect for busy weeknights!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
  }
];

// Hero Section Component
const HeroSection = () => {
  const [snowflakes, setSnowflakes] = useState([]);
  const scrollY = useParallax();

  useEffect(() => {
    const generateSnowflakes = () => {
      const flakes = [];
      for (let i = 0; i < 50; i++) {
        flakes.push({
          id: i,
          left: Math.random() * 100,
          animationDuration: Math.random() * 3 + 2,
          opacity: Math.random() * 0.6 + 0.4,
          size: Math.random() * 4 + 2
        });
      }
      setSnowflakes(flakes);
    };
    generateSnowflakes();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 overflow-hidden">
      {/* Animated Snowflakes */}
      <div className="absolute inset-0 pointer-events-none">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute text-white opacity-60 animate-pulse"
            style={{
              left: `${flake.left}%`,
              animation: `fall ${flake.animationDuration}s linear infinite`,
              opacity: flake.opacity,
              fontSize: `${flake.size}px`
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* Hero Content with Parallax Effect */}
      <div 
        className="relative z-10 container mx-auto px-6 pt-32 pb-20"
        style={{
          transform: `translateY(${scrollY * 0.3}px) translateZ(0)`,
        }}
      >
        <div className="text-center">
          <div 
            className="inline-block mb-6"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          >
            <div className="relative">
              <Snowflake className="w-16 h-16 text-cyan-300 animate-spin mx-auto mb-4" style={{animationDuration: '4s'}} />
              <div className="absolute inset-0 w-16 h-16 bg-cyan-300 rounded-full blur-xl opacity-30 animate-pulse mx-auto"></div>
            </div>
          </div>
          
          <h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            style={{
              transform: `translateY(${scrollY * 0.4}px)`,
            }}
          >
            <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Frozen Fresh
            </span>
            <br />
            <span className="text-white">Goodness Delivered</span>
          </h1>
          
          <p 
            className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          >
            Premium quality frozen foods delivered to your doorstep. From farm-fresh fruits to gourmet meals.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{
              transform: `translateY(${scrollY * 0.6}px)`,
            }}
          >
            <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
              <span className="relative z-10 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <a href="/user-dashboard">
                Shop Now
                </a>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            </button>
            
            <button className="px-8 py-4 border-2 border-cyan-300 text-cyan-300 font-semibold rounded-full text-lg transition-all duration-300 hover:bg-cyan-300 hover:text-blue-900 hover:scale-105">
              View Categories
            </button>
          </div>
        </div>
      </div>

      {/* Floating Ice Crystals */}
      <div className="absolute bottom-10 left-10 opacity-20">
        <div className="w-32 h-32 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full blur-3xl animate-bounce" style={{animationDuration: '3s'}}></div>
      </div>
      <div className="absolute top-20 right-20 opacity-15">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-300 to-cyan-400 rounded-full blur-2xl animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
      </div>
    </div>
  );
};

// Parallax Hook for Hero Content
const useParallax = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
};

// Product Carousel Component
const ProductCarousel = ({ products, title, subtitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [elementRef, isVisible] = useScrollReveal(0.1);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const itemsPerView = isMobile ? 1 : 3; // Show 1 on mobile, 3 on desktop
  const maxIndex = Math.max(0, products.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Auto-slide every 4 seconds
    
    return () => clearInterval(interval);
  }, [currentIndex, maxIndex]);

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div 
          ref={elementRef}
          className={`relative transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                width: `${(products.length * 100) / itemsPerView}%`
              }}
            >
              {products.map((product) => (
                <div key={product.id} className="flex-shrink-0 px-4" style={{ width: `${100 / products.length}%` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md border border-white/30 text-white p-2 md:p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 z-10"
          >
            <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md border border-white/30 text-white p-2 md:p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 z-10"
          >
            <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-cyan-400 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [elementRef, isVisible] = useScrollReveal(0.1);

  return (
    <div 
      ref={elementRef}
      className={`group relative transition-all duration-1000 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-16'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 transition-all duration-500 hover:scale-105 ${
          isHovered ? 'shadow-2xl shadow-cyan-500/25 transform rotate-1' : 'shadow-xl'
        }`}
        style={{
          transform: isHovered ? 'perspective(1000px) rotateX(5deg) rotateY(5deg)' : 'none'
        }}
      >
        {/* Popular Badge */}
        {product.isPopular && (
          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
            🔥 Popular
          </div>
        )}

        {/* Product Image */}
        <div className="relative overflow-hidden rounded-xl mb-4">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-cyan-300 text-sm font-medium">{product.category}</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-white text-sm">{product.rating}</span>
            </div>
          </div>
          
          <h3 className="text-white font-semibold text-lg">{product.name}</h3>
          
          <div className="flex items-center gap-2">
            <span className="text-cyan-300 font-bold text-xl">{product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm">{product.originalPrice}</span>
            )}
          </div>
          
          <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:from-cyan-400 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/30">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Category Card Component
const CategoryCard = ({ category }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [elementRef, isVisible] = useScrollReveal(0.1);
  const Icon = category.icon;

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsBlinking(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsBlinking(false);
  };

  // Mobile touch handlers
  const handleTouchStart = () => {
    setIsTouched(true);
    setIsBlinking(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsTouched(false);
      setIsBlinking(false);
    }, 300); // Keep effect for 300ms after touch
  };

  return (
    <div 
      ref={elementRef}
      className={`group relative cursor-pointer transition-all duration-1000 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-16'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className={`relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 md:p-4 text-center transition-all duration-500 ${
          (isHovered || isTouched) ? 'transform scale-105 shadow-2xl shadow-cyan-500/30' : 'hover:scale-105'
        }`}
        style={{
          transform: (isHovered || isTouched) ? 'perspective(1000px) rotateX(-3deg) rotateY(3deg)' : 'none'
        }}
      >
        {/* Icon with Gradient Background */}
        <div className={`inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r ${category.gradient} mb-2 md:mb-3 group-hover:animate-bounce`}>
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
        
        <h3 className="text-white font-semibold text-sm md:text-base mb-1">{category.name}</h3>
        <p className="text-cyan-200 text-xs">{category.products} Products</p>
        
        {/* Blinking Light Effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} rounded-xl transition-all duration-300 -z-10 ${
          isBlinking ? 'opacity-30 animate-pulse' : 'opacity-0'
        }`}></div>
        
        {/* Additional Blinking Lights - Mobile Optimized */}
        {isBlinking && (
          <>
            <div className={`absolute -top-1 -left-1 w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r ${category.gradient} rounded-full animate-ping`}></div>
            <div className={`absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r ${category.gradient} rounded-full animate-ping`} style={{animationDelay: '0.2s'}}></div>
            <div className={`absolute -bottom-1 -left-1 w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r ${category.gradient} rounded-full animate-ping`} style={{animationDelay: '0.4s'}}></div>
            <div className={`absolute -bottom-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r ${category.gradient} rounded-full animate-ping`} style={{animationDelay: '0.6s'}}></div>
          </>
        )}
      </div>
    </div>
  );
};

// Testimonial Carousel Component
const TestimonialCarousel = ({ testimonials, title, subtitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [elementRef, isVisible] = useScrollReveal(0.1);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const itemsPerView = isMobile ? 1 : 2; // Show 1 on mobile, 2 on desktop
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Auto-slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [currentIndex, maxIndex]);

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div 
          ref={elementRef}
          className={`relative max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                width: `${(testimonials.length * 100) / itemsPerView}%`
              }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-shrink-0 px-4" style={{ width: `${100 / testimonials.length}%` }}>
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md border border-white/30 text-white p-2 md:p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 z-10"
          >
            <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md border border-white/30 text-white p-2 md:p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 z-10"
          >
            <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-cyan-400 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
const TestimonialCard = ({ testimonial }) => {
  const [elementRef, isVisible] = useScrollReveal(0.1);

  return (
    <div 
      ref={elementRef}
      className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 transition-all duration-1000 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-16'
      }`}
    >
      <div className="flex items-center gap-4 mb-4">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name}
          className="w-12 h-12 rounded-full border-2 border-cyan-300"
        />
        <div>
          <h4 className="text-white font-semibold">{testimonial.name}</h4>
          <div className="flex items-center gap-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-cyan-100 italic">"{testimonial.comment}"</p>
    </div>
  );
};



// Main Homepage Component
const FrozenFoodHomepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Categories Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Shop by <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">Category</span>
            </h2>
            <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
              Discover our wide range of premium frozen foods, carefully selected for quality and taste.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <div
                key={category.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <ProductCarousel 
        products={featuredProducts}
        title={<><span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">Featured</span> Products</>}
        subtitle="Our most popular and highest-rated frozen foods, loved by customers worldwide."
      />

      {/* Flash Sale Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <FlashSale />
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialCarousel 
        testimonials={testimonials}
        title={<>What Our <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">Customers</span> Say</>}
        subtitle="Real reviews from real customers who love our frozen food quality and service."
      />

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">Frozen?</span>
            </h2>
            <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us for their frozen food needs. Free delivery on orders over $50!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
                <a href="/user-dashboard">
                  Start Shopping
                </a>
              </button>
              <button className="px-8 py-4 border-2 border-cyan-300 text-cyan-300 font-semibold rounded-full text-lg transition-all duration-300 hover:bg-cyan-300 hover:text-blue-900 hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
};

export default FrozenFoodHomepage;