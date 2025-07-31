import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Snowflake } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your message has been sent! We will reply soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
      {/* Header Section */}
      <div className="relative py-20 px-4">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Snowflake className="w-16 h-16 text-blue-200 animate-pulse" />
          </div>
          <h1 className="text-5xl font-bold mb-4 text-blue-100">
            Contact Us
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Ready to connect with FrozenFresh? Use the details below to get in touch with us.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="backdrop-blur-md bg-white bg-opacity-10 rounded-2xl p-8 border border-white border-opacity-20">
              <h2 className="text-3xl font-bold mb-8 text-blue-100">
                Get In Touch
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 bg-opacity-50 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-blue-200" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-100 mb-2">Address</h3>
                    <p className="text-blue-200 leading-relaxed">
                      123 Frozen Valley Street,<br />
                      Cold Storage District,<br />
                      Mumbai, Maharashtra 400001
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 bg-opacity-50 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-blue-200" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-100 mb-2">Phone Numbers</h3>
                    <p className="text-blue-200">Customer Care: +91 98765 43210</p>
                    <p className="text-blue-200">Orders: +91 98765 43211</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 bg-opacity-50 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-blue-200" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-100 mb-2">Email</h3>
                    <p className="text-blue-200">info@frozenfresh.com</p>
                    <p className="text-blue-200">orders@frozenfresh.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 bg-opacity-50 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-blue-200" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-100 mb-2">Working Hours</h3>
                    <p className="text-blue-200">Monday - Friday: 9:00 AM - 8:00 PM</p>
                    <p className="text-blue-200">Saturday: 9:00 AM - 6:00 PM</p>
                    <p className="text-blue-200">Sunday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="backdrop-blur-md bg-white bg-opacity-10 rounded-2xl p-8 border border-white border-opacity-20">
              <h3 className="text-2xl font-bold mb-6 text-blue-100">Quick Links</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="text-left p-3 rounded-lg bg-blue-600 bg-opacity-30 hover:bg-opacity-50 transition-all duration-300 text-blue-100">
                  Track Order
                </button>
                <button className="text-left p-3 rounded-lg bg-blue-600 bg-opacity-30 hover:bg-opacity-50 transition-all duration-300 text-blue-100">
                  Return Policy
                </button>
                <button className="text-left p-3 rounded-lg bg-blue-600 bg-opacity-30 hover:bg-opacity-50 transition-all duration-300 text-blue-100">
                  FAQ
                </button>
                <button className="text-left p-3 rounded-lg bg-blue-600 bg-opacity-30 hover:bg-opacity-50 transition-all duration-300 text-blue-100">
                  Support
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="backdrop-blur-md bg-white bg-opacity-10 rounded-2xl p-8 border border-white border-opacity-20">
            <h2 className="text-3xl font-bold mb-8 text-blue-100">
              Send Us a Message
            </h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                >
                  <option value="" className="bg-blue-900">Select subject</option>
                  <option value="order" className="bg-blue-900">Order Related</option>
                  <option value="product" className="bg-blue-900">Product Inquiry</option>
                  <option value="delivery" className="bg-blue-900">Delivery Issue</option>
                  <option value="complaint" className="bg-blue-900">Complaint</option>
                  <option value="feedback" className="bg-blue-900">Feedback</option>
                  <option value="other" className="bg-blue-900">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm resize-none"
                  placeholder="Write your message here..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-16 text-center">
          <div className="backdrop-blur-md bg-red-600 bg-opacity-20 rounded-2xl p-8 border border-red-400 border-opacity-30 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-red-200 mb-4">
              Emergency Contact
            </h3>
            <p className="text-red-100 mb-4">
              For urgent delivery or quality issues, call immediately:
            </p>
            <div className="text-3xl font-bold text-red-100">
              📞 +91 98765 99999
            </div>
            <p className="text-red-200 text-sm mt-2">
              24/7 Emergency Helpline
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}