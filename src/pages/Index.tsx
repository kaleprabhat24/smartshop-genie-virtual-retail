
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { ShoppingCart, MessageCircle, Search, Scan, Mic, TrendingUp, Heart, Users, Truck, Leaf, Menu, Moon, Sun, Star, Award, Zap, Shield } from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';
import ProductCatalog from '@/components/ProductCatalog';
import SmartCart from '@/components/SmartCart';
import ARScanner from '@/components/ARScanner';
import UserPreferences from '@/components/UserPreferences';
import UserProfile from '@/components/UserProfile';
import BusinessImpact from '@/components/BusinessImpact';
import CartHistory from '@/components/CartHistory';
import CategoryFilter from '@/components/CategoryFilter';
import TopDealsCarousel from '@/components/TopDealsCarousel';
import InvoiceGenerator from '@/components/InvoiceGenerator';
import ContactSupport from '@/components/ContactSupport';
import PrivacyTrust from '@/components/PrivacyTrust';
import FloatingCartSidebar from '@/components/FloatingCartSidebar';
import PersonaOnboarding from '@/components/PersonaOnboarding';
import CartComparison from '@/components/CartComparison';
import UserDashboard from '@/components/UserDashboard';
import VirtualStore from '@/components/VirtualStore';
import GuidedTour from '@/components/GuidedTour';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPersonaOnboarding, setShowPersonaOnboarding] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Check if user has seen persona onboarding
    const hasSeenPersonaOnboarding = localStorage.getItem('hasSeenPersonaOnboarding');
    if (!hasSeenPersonaOnboarding) {
      setShowPersonaOnboarding(true);
    }
  }, []);

  const navigationItems = [
    { id: 'home', icon: ShoppingCart, label: 'Home' },
    { id: 'chat', icon: MessageCircle, label: 'AI Chat' },
    { id: 'products', icon: Search, label: 'Products' },
    { id: 'store', icon: Scan, label: 'Virtual Store' },
    { id: 'cart', icon: ShoppingCart, label: 'Cart' },
    { id: 'dashboard', icon: TrendingUp, label: 'Dashboard' },
    { id: 'impact', icon: TrendingUp, label: 'Impact' },
    { id: 'invoice', icon: Award, label: 'Invoice' },
    { id: 'contact', icon: MessageCircle, label: 'Support' }
  ];

  const languages = {
    en: { name: 'English', flag: '🇺🇸' },
    hi: { name: 'हिंदी', flag: '🇮🇳' },
    es: { name: 'Español', flag: '🇪🇸' }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatInterface />;
      case 'products':
        return <ProductCatalog />;
      case 'cart':
        return <SmartCart />;
      case 'ar':
        return <ARScanner />;
      case 'store':
        return <VirtualStore />;
      case 'preferences':
        return <UserPreferences />;
      case 'dashboard':
        return <UserDashboard />;
      case 'impact':
        return <BusinessImpact />;
      case 'invoice':
        return <InvoiceGenerator />;
      case 'contact':
        return <ContactSupport />;
      default:
        return <HomeContent setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-green-50'}`}>
      {/* Persona Onboarding Modal */}
      {showPersonaOnboarding && (
        <PersonaOnboarding onComplete={() => setShowPersonaOnboarding(false)} />
      )}

      {/* Guided Tour */}
      <GuidedTour />

      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">SmartShop Genie</h1>
                <p className="text-xs text-gray-600">AI-Powered Shopping</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.slice(0, 6).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <item.icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Controls */}
            <div className="flex items-center space-x-3">
              {/* Language Selector */}
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="text-sm bg-transparent border rounded-lg px-2 py-1"
              >
                {Object.entries(languages).map(([code, lang]) => (
                  <option key={code} value={code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>

              {/* Dark Mode Toggle */}
              <div className="flex items-center space-x-2">
                <Sun size={16} className="text-gray-600" />
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                  className="data-[state=checked]:bg-blue-600"
                />
                <Moon size={16} className="text-gray-600" />
              </div>

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden">
                    <Menu size={18} />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <nav className="flex flex-col space-y-2 mt-6">
                    {navigationItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          activeTab === item.id
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        <item.icon size={20} />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 relative">
        {renderContent()}
      </main>

      {/* Floating Cart Sidebar */}
      <FloatingCartSidebar />

      {/* Privacy & Trust Footer */}
      <PrivacyTrust />
    </div>
  );
};

const HomeContent = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  return (
    <div className="space-y-12 pb-24">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl">
        <Card className="bg-gradient-to-br from-blue-600 via-purple-700 to-green-600 text-white border-0 shadow-2xl">
          <CardContent className="p-12 text-center relative">
            <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
              <Badge className="bg-white/20 text-white px-4 py-2 text-sm font-semibold mb-6">
                🚀 Enterprise AI Technology
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                🛍️ Shop Smarter.<br />
                <span className="text-yellow-300 animate-pulse">Experience the Future of Retail.</span>
              </h1>
              <p className="text-blue-100 mb-8 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
                Powered by advanced AI algorithms, SmartShop Genie transforms your shopping experience with personalized recommendations, intelligent cart optimization, and seamless discovery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => setActiveTab('chat')} 
                  className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  🚀 Explore Your SmartShop Journey
                </Button>
                <Button 
                  onClick={() => setActiveTab('impact')} 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 rounded-full font-bold transition-all duration-300"
                >
                  📊 View Business Impact
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Deals Carousel */}
      <TopDealsCarousel />

      {/* Category Filter */}
      <CategoryFilter setActiveTab={setActiveTab} />

      {/* Cart History Section */}
      <CartHistory />

      {/* Cart Comparison */}
      <CartComparison />

      {/* Feature Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-105 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100" onClick={() => setActiveTab('chat')}>
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <MessageCircle className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">AI Shopping Assistant</h3>
            <p className="text-gray-600 leading-relaxed mb-4">Intelligent conversations with our advanced AI to find products, get recommendations, and discover personalized deals.</p>
            <Badge className="bg-blue-500 text-white px-3 py-1">Powered by ML</Badge>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-105 border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-100" onClick={() => setActiveTab('store')}>
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Scan className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Virtual Store Tour</h3>
            <p className="text-gray-600 leading-relaxed mb-4">Navigate through our virtual store layout and discover products organized just like your local Walmart.</p>
            <Badge className="bg-green-500 text-white px-3 py-1">AR Technology</Badge>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-105 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100" onClick={() => setActiveTab('dashboard')}>
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Personal Dashboard</h3>
            <p className="text-gray-600 leading-relaxed mb-4">Track your savings, health scores, and sustainability impact with beautiful analytics.</p>
            <Badge className="bg-purple-500 text-white px-3 py-1">Smart Analytics</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Innovation Showcase */}
      <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-0 shadow-xl">
        <CardContent className="p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🏆 Award-Winning Innovation</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Experience cutting-edge retail technology that's transforming the shopping industry</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Zap className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 text-lg mb-2">Real-time AI</h3>
              <p className="text-gray-600 text-sm">Instant intelligent responses</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 text-lg mb-2">Privacy First</h3>
              <p className="text-gray-600 text-sm">Local data processing only</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 text-lg mb-2">5-Star Experience</h3>
              <p className="text-gray-600 text-sm">Premium user satisfaction</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Award className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 text-lg mb-2">Enterprise Ready</h3>
              <p className="text-gray-600 text-sm">Scalable for millions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0 shadow-2xl">
        <CardContent className="p-10 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Shopping?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who've revolutionized their shopping experience with AI-powered intelligence.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Badge className="bg-white/20 text-white px-6 py-3 text-lg font-semibold rounded-full">
              🏆 Hackathon Winner
            </Badge>
            <Badge className="bg-white/20 text-white px-6 py-3 text-lg font-semibold rounded-full">
              💡 AI Excellence Award
            </Badge>
            <Badge className="bg-white/20 text-white px-6 py-3 text-lg font-semibold rounded-full">
              🚀 Future of Retail
            </Badge>
          </div>
          <Button 
            onClick={() => setActiveTab('products')} 
            className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-10 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Start Shopping Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
