import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Snowflake, 
  Truck, 
  Shield, 
  CreditCard, 
  Package, 
  Clock, 
  Phone, 
  Mail, 
  MessageCircle,
  HelpCircle,
  Star
} from 'lucide-react';

const FrozenFoodFAQs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const categories = [
    { id: 'all', name: 'All Questions', icon: <HelpCircle className="w-5 h-5" /> },
    { id: 'orders', name: 'Orders & Delivery', icon: <Truck className="w-5 h-5" /> },
    { id: 'products', name: 'Products & Quality', icon: <Snowflake className="w-5 h-5" /> },
    { id: 'payment', name: 'Payment & Returns', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'account', name: 'Account & Support', icon: <Shield className="w-5 h-5" /> }
  ];

  const faqs = [
    // Orders & Delivery
    {
      id: 1,
      category: 'orders',
      question: 'How do you ensure products stay frozen during delivery?',
      answer: 'We use advanced cold chain technology with insulated packaging and dry ice to maintain temperatures below -18°C throughout the delivery process. Our delivery vehicles are temperature-controlled, and we provide real-time temperature monitoring for every shipment.'
    },
    {
      id: 2,
      category: 'orders',
      question: 'What are your delivery timings and areas?',
      answer: 'We deliver 7 days a week between 6 AM to 10 PM across 25+ major cities in India. Same-day delivery is available for orders placed before 2 PM, and we offer flexible time slots including early morning and late evening deliveries to suit your convenience.'
    },
    {
      id: 3,
      category: 'orders',
      question: 'Can I track my frozen food delivery in real-time?',
      answer: 'Yes! Once your order is dispatched, you\'ll receive a tracking link via SMS and email. You can monitor your delivery in real-time, including the temperature of your frozen items throughout the journey.'
    },
    {
      id: 4,
      category: 'orders',
      question: 'What happens if I\'m not available during delivery?',
      answer: 'If you\'re unavailable, our delivery partner will attempt to contact you. We can reschedule the delivery for the same day or next day at no extra cost. However, due to the frozen nature of products, we cannot hold items for more than 24 hours.'
    },

    // Products & Quality
    {
      id: 5,
      category: 'products',
      question: 'How do you maintain the quality and freshness of frozen foods?',
      answer: 'All our products are stored in HACCP-certified warehouses at -25°C. We follow strict quality control measures, including regular temperature monitoring, batch testing, and first-in-first-out inventory management to ensure maximum freshness and nutritional value.'
    },
    {
      id: 6,
      category: 'products',
      question: 'What is the shelf life of your frozen products?',
      answer: 'Our frozen products typically have a shelf life of 6-18 months when stored properly at -18°C or below. Each product displays clear expiry dates, and we guarantee at least 75% shelf life remaining when delivered to you.'
    },
    {
      id: 7,
      category: 'products',
      question: 'Are your products free from preservatives and artificial additives?',
      answer: 'We offer a wide range of preservative-free and organic options. All our products are clearly labeled with ingredients and nutritional information. We partner with certified suppliers who follow international food safety standards.'
    },
    {
      id: 8,
      category: 'products',
      question: 'Do you offer gluten-free and vegan frozen food options?',
      answer: 'Absolutely! We have dedicated sections for gluten-free, vegan, keto-friendly, and other dietary preference products. Use our advanced filters to easily find products that match your dietary requirements.'
    },

    // Payment & Returns
    {
      id: 9,
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major payment methods including credit/debit cards, UPI, net banking, digital wallets (Paytm, PhonePe, Google Pay), and cash on delivery. All online transactions are secured with 256-bit SSL encryption.'
    },
    {
      id: 10,
      category: 'payment',
      question: 'What is your return and refund policy for frozen foods?',
      answer: 'Due to the perishable nature of frozen foods, we accept returns only if products are damaged, defective, or delivered in a thawed condition. Refunds are processed within 3-5 business days, and we also offer store credit or replacement options.'
    },
    {
      id: 11,
      category: 'payment',
      question: 'Do you offer any discounts or loyalty programs?',
      answer: 'Yes! We have a FreshFreeze Rewards program where you earn points on every purchase. We also offer seasonal discounts, bulk order discounts, and special offers for first-time customers. Subscribe to our newsletter for exclusive deals.'
    },

    // Account & Support
    {
      id: 12,
      category: 'account',
      question: 'How do I create an account and manage my orders?',
      answer: 'Simply click on "Sign Up" and create your account using email or phone number. Once logged in, you can view order history, track deliveries, manage addresses, set delivery preferences, and access exclusive member benefits.'
    },
    {
      id: 13,
      category: 'account',
      question: 'Is my personal and payment information secure?',
      answer: 'Absolutely! We use industry-standard security measures including SSL encryption, secure payment gateways, and comply with data protection regulations. Your information is never shared with third parties without your consent.'
    },
    {
      id: 14,
      category: 'account',
      question: 'How can I contact customer support?',
      answer: 'Our customer support team is available 24/7 through multiple channels: live chat on website, WhatsApp at +91-XXXXXXXXX, email at support@freshfreeze.com, or call our helpline. We typically respond within 30 minutes.'
    },
    {
      id: 15,
      category: 'account',
      question: 'Can I schedule recurring deliveries for regular items?',
      answer: 'Yes! Our subscription service allows you to set up recurring deliveries for your favorite items. Choose from weekly, bi-weekly, or monthly deliveries with the flexibility to modify, pause, or cancel anytime.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const contactOptions = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      description: '+91-XXXXXXXXX',
      action: 'Available 24/7'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Support',
      description: 'support@freshfreeze.com',
      action: 'Response within 2 hours'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Live Chat',
      description: 'Chat with our experts',
      action: 'Instant response'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <HelpCircle className="w-4 h-4 text-white opacity-10" />
            </div>
          ))}
        </div>

        <div className="relative z-10 container mx-auto max-w-4xl text-center">
          <div className="animate-fade-in-up">
            <HelpCircle className="w-20 h-20 text-white mx-auto mb-6 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-200 to-pink-200 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Find answers to all your questions about our frozen food delivery service, 
              quality standards, and customer policies.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 px-6 bg-white shadow-lg">
        <div className="container mx-auto max-w-6xl">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:outline-none text-lg transition-all duration-300"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon}
                <span className="hidden sm:inline">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div 
            data-animate 
            id="faqs-title"
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible['faqs-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              {filteredFAQs.length} Question{filteredFAQs.length !== 1 ? 's' : ''} Found
            </h2>
            {searchTerm && (
              <p className="text-gray-600">
                Showing results for "{searchTerm}"
              </p>
            )}
          </div>

          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div
                key={faq.id}
                data-animate
                id={`faq-${faq.id}`}
                className={`transition-all duration-1000 delay-${index * 100} ${
                  isVisible[`faq-${faq.id}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-6 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 rounded-2xl"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-800 pr-4">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0">
                        {openFAQ === faq.id ? (
                          <ChevronUp className="w-6 h-6 text-indigo-500 transform transition-transform duration-300" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-400 transform transition-transform duration-300" />
                        )}
                      </div>
                    </div>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openFAQ === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-6">
                      <div className="h-px bg-gradient-to-r from-indigo-200 to-purple-200 mb-4"></div>
                      <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">No questions found</h3>
              <p className="text-gray-400">Try adjusting your search terms or category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <div 
            data-animate 
            id="contact-title"
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible['contact-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
              Still Need Help?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our customer support team is here to assist you 24/7 with any questions or concerns.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactOptions.map((option, index) => (
              <div
                key={index}
                data-animate
                id={`contact-${index}`}
                className={`transition-all duration-1000 delay-${index * 200} ${
                  isVisible[`contact-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full text-white mb-6">
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{option.title}</h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <span className="inline-block bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">
                    {option.action}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-indigo-900 to-purple-900">
        <div className="container mx-auto max-w-4xl text-center">
          <div 
            data-animate 
            id="tips"
            className={`transition-all duration-1000 ${
              isVisible.tips ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Star className="w-16 h-16 text-yellow-400 mx-auto mb-8" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Pro Tips for Best Experience
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <Package className="w-8 h-8 text-white mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Storage Tips</h3>
                <p className="text-gray-200 text-sm">Keep frozen items at -18°C or below and use within recommended timeframes for best quality.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <Clock className="w-8 h-8 text-white mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Order Timing</h3>
                <p className="text-gray-200 text-sm">Place orders before 2 PM for same-day delivery or schedule for your preferred time slot.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FrozenFoodFAQs;