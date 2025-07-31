import React, { useState, useEffect } from 'react';
import { Snowflake, Users, Award, Truck, Heart, Star, Shield, Clock } from 'lucide-react';

const FrozenFoodAboutUs = () => {
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

  const features = [
    {
      icon: <Snowflake className="w-12 h-12" />,
      title: "Premium Quality",
      description: "We maintain the highest standards of quality with advanced freezing technology to preserve freshness and nutritional value."
    },
    {
      icon: <Truck className="w-12 h-12" />,
      title: "Fast Delivery",
      description: "Temperature-controlled delivery ensures your frozen foods reach you in perfect condition, maintaining the cold chain."
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Food Safety",
      description: "HACCP certified facilities and rigorous quality checks ensure every product meets international food safety standards."
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Customer First",
      description: "Our dedicated customer service team is available 24/7 to assist you with orders, queries, and support."
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "500+", label: "Products" },
    { number: "25+", label: "Cities Covered" },
    { number: "99.8%", label: "Quality Score" }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Health & Nutrition",
      description: "Committed to providing nutritious frozen foods that support healthy lifestyles"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description: "Striving for perfection in every aspect of our service and product quality"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Convenience",
      description: "Making meal planning easier with our wide range of ready-to-cook options"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <Snowflake className="w-4 h-4 text-white opacity-20" />
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-200 to-pink-200 bg-clip-text text-transparent">
                FreshFreeze
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light max-w-2xl mx-auto">
              Revolutionizing the way you experience frozen foods with premium quality, 
              convenience, and unmatched freshness delivered to your doorstep.
            </p>
            <button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              Discover Our Story
            </button>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <div 
            data-animate 
            id="story" 
            className={`text-center transition-all duration-1000 ${
              isVisible.story ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Founded in 2019, FreshFreeze began with a simple mission: to make high-quality frozen foods 
              accessible to everyone. What started as a small venture has grown into India's most trusted 
              frozen food e-commerce platform, serving over 50,000 satisfied customers across 25+ cities.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div 
                key={index}
                data-animate 
                id={`stat-${index}`}
                className={`text-center transition-all duration-1000 delay-${index * 100} ${
                  isVisible[`stat-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-900 to-purple-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose FreshFreeze?
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              We're not just another frozen food company. We're your partners in convenient, 
              healthy, and delicious meal solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                data-animate 
                id={`feature-${index}`}
                className={`transition-all duration-1000 delay-${index * 200} ${
                  isVisible[`feature-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
                  <div className="text-white mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-200 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-pink-50 to-orange-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at FreshFreeze
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                data-animate 
                id={`value-${index}`}
                className={`transition-all duration-1000 delay-${index * 200} ${
                  isVisible[`value-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full text-white mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-indigo-900">
        <div className="container mx-auto max-w-4xl text-center">
          <div 
            data-animate 
            id="mission"
            className={`transition-all duration-1000 ${
              isVisible.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Star className="w-16 h-16 text-yellow-400 mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Our Mission
            </h2>
            <p className="text-xl text-gray-200 leading-relaxed mb-8">
              "To revolutionize the frozen food industry by providing premium quality, 
              nutritious, and convenient meal solutions that fit perfectly into modern lifestyles, 
              while maintaining the highest standards of food safety and customer satisfaction."
            </p>
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Join Our Journey
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience the FreshFreeze Difference?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of satisfied customers who have made the smart choice for their frozen food needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Shop Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:scale-105">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FrozenFoodAboutUs;