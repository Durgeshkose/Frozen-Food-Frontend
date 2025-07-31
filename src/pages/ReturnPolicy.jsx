import React, { useState } from 'react';
import { Shield, Clock, RefreshCw, AlertTriangle, CheckCircle, Package, Thermometer, Phone } from 'lucide-react';

export default function ReturnPolicy() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: Shield },
    { id: 'eligibility', title: 'Return Eligibility', icon: CheckCircle },
    { id: 'process', title: 'Return Process', icon: RefreshCw },
    { id: 'timeframes', title: 'Time Limits', icon: Clock },
    { id: 'conditions', title: 'Special Conditions', icon: Thermometer },
    { id: 'contact', title: 'Support', icon: Phone }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
      {/* Header Section */}
      <div className="relative py-20 px-4">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Shield className="w-16 h-16 text-blue-200 animate-pulse" />
          </div>
          <h1 className="text-5xl font-bold mb-4 text-blue-100">
            Return Policy
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Your satisfaction is our priority. Learn about our hassle-free return process for frozen food products.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="backdrop-blur-md bg-white bg-opacity-10 rounded-2xl p-6 border border-white border-opacity-20">
          <div className="flex flex-wrap gap-4 justify-center">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-blue-600 bg-opacity-70 text-white shadow-lg'
                      : 'bg-blue-600 bg-opacity-30 text-blue-200 hover:bg-opacity-50'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{section.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        
        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="backdrop-blur-md bg-white bg-opacity-10 rounded-2xl p-8 border border-white border-opacity-20">
            <h2 className="text-3xl font-bold mb-8 text-blue-100 flex items-center">
              <Shield className="w-8 h-8 mr-3" />
              Return Policy Overview
            </h2>
            
            <div className="space-y-6">
              <div className="bg-blue-600 bg-opacity-30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-100 mb-3">Our Commitment</h3>
                <p className="text-blue-200 leading-relaxed">
                  At FrozenFresh, we understand that frozen food quality is paramount. We offer a comprehensive return policy 
                  to ensure you receive the freshest, highest-quality frozen products. If you're not completely satisfied with 
                  your purchase, we're here to make it right.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-600 bg-opacity-20 rounded-lg p-6 border border-green-400 border-opacity-30">
                  <h4 className="text-lg font-semibold text-green-200 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    What We Accept
                  </h4>
                  <ul className="text-green-100 space-y-2">
                    <li>• Damaged or defective products</li>
                    <li>• Temperature-compromised items</li>
                    <li>• Wrong items delivered</li>
                    <li>• Quality issues upon delivery</li>
                  </ul>
                </div>

                <div className="bg-red-600 bg-opacity-20 rounded-lg p-6 border border-red-400 border-opacity-30">
                  <h4 className="text-lg font-semibold text-red-200 mb-3 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Important Notes
                  </h4>
                  <ul className="text-red-100 space-y-2">
                    <li>• Returns must be reported within 24 hours</li>
                    <li>• Products must remain frozen</li>
                    <li>• Original packaging required</li>
                    <li>• Photo evidence may be needed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Eligibility Section */}
        {activeSection === 'eligibility' && (
          <div className="backdrop-blur-md bg-white bg-opacity-10 rounded-2xl p-8 border border-white border-opacity-20">
            <h2 className="text-3xl font-bold mb-8 text-blue-100 flex items-center">
              <CheckCircle className="w-8 h-8 mr-3" />
              Return Eligibility Criteria
            </h2>
            
            <div className="space-y-8">
              <div className="bg-blue-600 bg-opacity-30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-100 mb-4">Eligible Returns</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-100">Quality Issues</h4>
                        <p className="text-blue-200 text-sm">Freezer burn, ice crystals, unusual odor or taste</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-100">Temperature Damage</h4>
                        <p className="text-blue-200 text-sm">Products received thawed or partially thawed</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-100">Wrong Items</h4>
                        <p className="text-blue-200 text-sm">Received different products than ordered</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-100">Packaging Damage</h4>
                        <p className="text-blue-200 text-sm">Torn, punctured, or damaged packaging</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-100">Missing Items</h4>
                        <p className="text-blue-200 text-sm">Items missing from your order</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-100">Expiry Issues</h4>
                        <p className="text-blue-200 text-sm">Products near or past expiration date</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-600 bg-opacity-20 rounded-lg p-6 border border-red-400 border-opacity-30">
                <h3 className="text-xl font-semibold text-red-200 mb-4">Non-Eligible Returns</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-red-100">• Products consumed or used</p>
                    <p className="text-red-100">• Items returned after 24 hours</p>
                    <p className="text-red-100">• Customer preference changes</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-red-100">• Products without original packaging</p>
                    <p className="text-red-100">• Items thawed by customer negligence</p>
                    <p className="text-red-100">• Special order or custom items</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Process Section */}
        {activeSection === 'process' && (
          <div className="backdrop-blur-md bg-white bg-opacity-10 rounded-2xl p-8 border border-white border-opacity-20">
            <h2 className="text-3xl font-bold mb-8 text-blue-100 flex items-center">
              <RefreshCw className="w-8 h-8 mr-3" />
              Return Process Steps
            </h2>
            
            <div className="space-y-6">
              <div className="relative">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 rounded-full p-3 text-white font-bold text-lg min-w-12 text-center">1</div>
                  <div className="flex-1 bg-blue-600 bg-opacity-30 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-blue-100 mb-3">Contact Us Immediately</h3>
                    <p className="text-blue-200 mb-4">
                      Report the issue within 24 hours of delivery through any of these channels:
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-blue-700 bg-opacity-50 rounded-lg p-4 text-center">
                        <Phone className="w-6 h-6 mx-auto mb-2 text-blue-200" />
                        <p className="text-blue-100 font-medium">Phone</p>
                        <p className="text-blue-200 text-sm">+91 98765 43210</p>
                      </div>
                      <div className="bg-blue-700 bg-opacity-50 rounded-lg p-4 text-center">
                        <Package className="w-6 h-6 mx-auto mb-2 text-blue-200" />
                        <p className="text-blue-100 font-medium">Email</p>
                        <p className="text-blue-200 text-sm">returns@frozenfresh.com</p>
                      </div>
                      <div className="bg-blue-700 bg-opacity-50 rounded-lg p-4 text-center">
                        <RefreshCw className="w-6 h-6 mx-auto mb-2 text-blue-200" />
                        <p className="text-blue-100 font-medium">WhatsApp</p>
                        <p className="text-blue-200 text-sm">+91 98765 43211</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 rounded-full p-3 text-white font-bold text-lg min-w-12 text-center">2</div>
                <div className="flex-1 bg-blue-600 bg-opacity-30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-100 mb-3">Provide Details</h3>
                  <p className="text-blue-200 mb-4">Share the following information with our support team:</p>
                  <ul className="text-blue-200 space-y-2">
                    <li>• Order number and delivery date</li>
                    <li>• Description of the issue</li>
                    <li>• Photos of damaged/defective products</li>
                    <li>• Preferred resolution (refund/replacement)</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 rounded-full p-3 text-white font-bold text-lg min-w-12 text-center">3</div>
                <div className="flex-1 bg-blue-600 bg-opacity-30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-100 mb-3">Return Authorization</h3>
                  <p className="text-blue-200 mb-4">
                    Our team will review your request and provide a Return Authorization Number (RAN) within 2-4 hours. 
                    This number is required for processing your return.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 rounded-full p-3 text-white font-bold text-lg min-w-12 text-center">4</div>
                <div className="flex-1 bg-blue-600 bg-opacity-30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-100 mb-3">Product Collection</h3>
                  <p className="text-blue-200 mb-4">
                    Keep the products frozen until our delivery partner arrives for collection. Collection will be 
                    scheduled within 24-48 hours of authorization.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-600 rounded-full p-3 text-white font-bold text-lg min-w-12 text-center">5</div>
                <div className="flex-1 bg-green-600 bg-opacity-30 rounded-lg p-6 border border-green-400 border-opacity-30">
                  <h3 className="text-xl font-semibold text-green-100 mb-3">Resolution</h3>
                  <p className="text-green-200 mb-4">
                    Once we receive and verify the returned products, we'll process your refund or send a replacement 
                    within 3-5 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Timeframes Section */}
        {activeSection === 'timeframes' && (
          <div className="backdrop-blur-md bg-white bg-opacity-10 rounded-2xl p-8 border border-white border-opacity-20">
            <h2 className="text-3xl font-bold mb-8 text-blue-100 flex items-center">
              <Clock className="w-8 h-8 mr-3" />
              Return Timeframes
            </h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-orange-600 bg-opacity-20 rounded-lg p-6 border border-orange-400 border-opacity-30">
                  <h3 className="text-xl font-semibold text-orange-200 mb-4 flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-2" />
                    Critical Timeline
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-orange-100">Report Issue:</span>
                      <span className="text-orange-100 font-bold">Within 24 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-orange-100">Temperature Check:</span>
                      <span className="text-orange-100 font-bold">Upon delivery</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-orange-100">Photo Evidence:</span>
                      <span className="text-orange-100 font-bold">Same day</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-orange-700 bg-opacity-30 rounded">
                    <p className="text-orange-100 text-sm">
                      <strong>Important:</strong> Returns not reported within 24 hours cannot be processed due to food safety regulations.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-600 bg-opacity-30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-100 mb-4 flex items-center">
                    <Clock className="w-6 h-6 mr-2" />
                    Processing Times
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Return Authorization:</span>
                      <span className="text-blue-100 font-bold">2-4 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Collection Scheduling:</span>
                      <span className="text-blue-100 font-bold">24-48 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Refund Processing:</span>
                      <span className="text-blue-100 font-bold">3-5 business days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Replacement Delivery:</span>
                      <span className="text-blue-100 font-bold">1-2 business days</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-600 bg-opacity-20 rounded-lg p-6 border border-green-400 border-opacity-30">
                <h3 className="text-xl font-semibold text-green-200 mb-4">Refund Methods & Timeline</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <h4 className="font-medium text-green-100 mb-2">UPI/Digital Wallet</h4>
                    <p className="text-green-200 text-sm">Instant to 24 hours</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-medium text-green-100 mb-2">Bank Transfer</h4>
                    <p className="text-green-200 text-sm">2-5 business days</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-medium text-green-100 mb-2">Credit/Debit Card</h4>
                    <p className="text-green-200 text-sm">5-7 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Special Conditions Section */}
        {activeSection === 'conditions' && (
          <div className="backdrop-blur-md bg-white bg-opacity-10 rounded-2xl p-8 border border-white border-opacity-20">
            <h2 className="text-3xl font-bold mb-8 text-blue-100 flex items-center">
              <Thermometer className="w-8 h-8 mr-3" />
              Special Conditions for Frozen Foods
            </h2>
            
            <div className="space-y-8">
              <div className="bg-blue-600 bg-opacity-30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-100 mb-4 flex items-center">
                  <Thermometer className="w-6 h-6 mr-2" />
                  Temperature Requirements
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-blue-100 mb-3">Acceptable Temperature Range</h4>
                    <ul className="text-blue-200 space-y-2">
                      <li>• Frozen products: -18°C to -15°C</li>
                      <li>• Ice cream: -20°C to -18°C</li>
                      <li>• Frozen vegetables: -18°C to -12°C</li>
                      <li>• Frozen meat: -18°C to -15°C</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-100 mb-3">Temperature Check Process</h4>
                    <ul className="text-blue-200 space-y-2">
                      <li>• Check immediately upon delivery</li>
                      <li>• Use food thermometer if available</li>
                      <li>• Look for ice crystals or frost</li>
                      <li>• Report if products feel soft</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-600 bg-opacity-20 rounded-lg p-6 border border-purple-400 border-opacity-30">
                <h3 className="text-xl font-semibold text-purple-200 mb-4">Packaging & Storage Requirements</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-purple-100 mb-3">Original Packaging</h4>
                    <ul className="text-purple-200 space-y-2">
                      <li>• Keep products in original sealed packaging</li>
                      <li>• Do not remove labels or stickers</li>
                      <li>• Maintain insulated packaging when possible</li>
                      <li>• Keep dry ice packaging intact</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-100 mb-3">Storage Until Collection</h4>
                    <ul className="text-purple-200 space-y-2">
                      <li>• Store in freezer at -18°C or below</li>
                      <li>• Keep separate from other foods</li>
                      <li>• Do not refreeze if thawed</li>
                      <li>• Maintain until collection</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-600 bg-opacity-20 rounded-lg p-6 border border-yellow-400 border-opacity-30">
                <h3 className="text-xl font-semibold text-yellow-200 mb-4">Quality Assessment Criteria</h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <h4 className="font-medium text-yellow-100 mb-2">Visual Inspection</h4>
                      <p className="text-yellow-200 text-sm">Ice crystals, freezer burn, discoloration, packaging damage</p>
                    </div>
                    <div className="text-center">
                      <h4 className="font-medium text-yellow-100 mb-2">Texture Check</h4>
                      <p className="text-yellow-200 text-sm">Firmness, consistency, ice formation, separation</p>
                    </div>
                    <div className="text-center">
                      <h4 className="font-medium text-yellow-100 mb-2">Odor Assessment</h4>
                      <p className="text-yellow-200 text-sm">Unusual smells, off-odors, rancid smell</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Support Section */}
        {activeSection === 'contact' && (
          <div className="backdrop-blur-md bg-white bg-opacity-10 rounded-2xl p-8 border border-white border-opacity-20">
            <h2 className="text-3xl font-bold mb-8 text-blue-100 flex items-center">
              <Phone className="w-8 h-8 mr-3" />
              Return Support & Contact
            </h2>
            
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-600 bg-opacity-30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-100 mb-4">Primary Return Support</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-blue-200" />
                      <div>
                        <p className="text-blue-100 font-medium">Returns Hotline</p>
                        <p className="text-blue-200">+91 98765 43210</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Package className="w-5 h-5 text-blue-200" />
                      <div>
                        <p className="text-blue-100 font-medium">Email Support</p>
                        <p className="text-blue-200">returns@frozenfresh.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RefreshCw className="w-5 h-5 text-blue-200" />
                      <div>
                        <p className="text-blue-100 font-medium">WhatsApp</p>
                        <p className="text-blue-200">+91 98765 43211</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-600 bg-opacity-20 rounded-lg p-6 border border-green-400 border-opacity-30">
                  <h3 className="text-xl font-semibold text-green-200 mb-4">Support Hours</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-green-100">Monday - Friday:</span>
                      <span className="text-green-100 font-medium">8:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-100">Saturday:</span>
                      <span className="text-green-100 font-medium">8:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-100">Sunday:</span>
                      <span className="text-green-100 font-medium">10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="mt-4 p-3 bg-green-700 bg-opacity-30 rounded">
                      <p className="text-green-100 text-sm">
                        <strong>Emergency:</strong> 24/7 support for temperature-related issues
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-600 bg-opacity-20 rounded-lg p-6 border border-red-400 border-opacity-30">
                <h3 className="text-xl font-semibold text-red-200 mb-4 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2" />
                  Emergency Return Support
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-red-100 mb-2">24/7 Emergency Line</h4>
                    <p className="text-red-200 text-2xl font-bold">+91 98765 99999</p>
                    <p className="text-red-200 text-sm mt-2">For critical temperature failures or food safety concerns</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-100 mb-2">What Qualifies as Emergency</h4>
                    <ul className="text-red-200 space-y-1">
                      <li>• All products delivered completely thawed</li>
                      <li>• Suspected food contamination</li>
                      <li>• Packaging leak with potential health risk</li>
                      <li>• Temperature above 0°C upon delivery</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600 bg-opacity-30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-100 mb-4">Quick Return Form</h3>
                <p className="text-blue-200 mb-4">
                  Fill out this quick form to expedite your return request:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Order Number"
                    className="px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <select className="px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="" className="bg-blue-900">Return Reason</option>
                    <option value="quality" className="bg-blue-900">Quality Issue</option>
                    <option value="temperature" className="bg-blue-900">Temperature Problem</option>
                    <option value="wrong" className="bg-blue-900">Wrong Item</option>
                    <option value="damaged" className="bg-blue-900">Damaged Packaging</option>
                  </select>
                </div>
                <textarea
                  placeholder="Describe the issue in detail..."
                  rows={3}
                  className="w-full mt-4 px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
                <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                  <RefreshCw className="w-5 h-5" />
                  <span>Submit Return Request</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}