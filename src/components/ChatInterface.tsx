
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, Send, Bot, User } from 'lucide-react';
import { products, searchProducts } from '@/data/products';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  products?: string[];
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: Message = {
      id: '1',
      text: "Hi! I'm your SmartShop Genie! 🧞‍♂️ I can help you find products, suggest alternatives, and make your shopping experience amazing! What are you looking for today?",
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const simulateVoiceInput = () => {
    const voiceCommands = [
      "I'm looking for healthy breakfast options",
      "Show me organic products",
      "Find me something under $5",
      "I need protein-rich foods",
      "What dairy-free alternatives do you have?",
      "Show me fresh fruits",
      "I want to eat healthier"
    ];
    const randomCommand = voiceCommands[Math.floor(Math.random() * voiceCommands.length)];
    setInputText(randomCommand);
  };

  const generateBotResponse = (userMessage: string): Message => {
    const lowercaseMessage = userMessage.toLowerCase();
    let response = "";
    let productIds: string[] = [];

    // Smart response logic
    if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi')) {
      response = "Hello! Great to see you! I'm here to help you find the perfect products. What can I help you with today? 😊";
    } else if (lowercaseMessage.includes('healthy') || lowercaseMessage.includes('health')) {
      const healthyProducts = products.filter(p => p.healthScore >= 4);
      productIds = healthyProducts.slice(0, 3).map(p => p.id);
      response = "Here are some healthy options I found for you! These products have high health scores and great nutritional value. 🥗";
    } else if (lowercaseMessage.includes('organic')) {
      const organicProducts = products.filter(p => p.tags.includes('organic'));
      productIds = organicProducts.slice(0, 3).map(p => p.id);
      response = "I found some amazing organic products for you! These are all certified organic and environmentally friendly. 🌱";
    } else if (lowercaseMessage.includes('cheap') || lowercaseMessage.includes('budget') || lowercaseMessage.includes('under')) {
      const budgetProducts = products.filter(p => p.price < 5).sort((a, b) => a.price - b.price);
      productIds = budgetProducts.slice(0, 3).map(p => p.id);
      response = "Here are some great budget-friendly options! These products offer excellent value for money. 💰";
    } else if (lowercaseMessage.includes('protein')) {
      const proteinProducts = products.filter(p => p.nutrients?.protein && p.nutrients.protein > 10);
      productIds = proteinProducts.slice(0, 3).map(p => p.id);
      response = "Perfect! Here are some high-protein options to fuel your day! 💪";
    } else if (lowercaseMessage.includes('dairy-free') || lowercaseMessage.includes('vegan')) {
      const dairyFreeProducts = products.filter(p => p.tags.includes('vegan') || p.tags.includes('dairy-free'));
      productIds = dairyFreeProducts.slice(0, 3).map(p => p.id);
      response = "I found some excellent dairy-free and vegan options for you! 🌱";
    } else if (lowercaseMessage.includes('fruit') || lowercaseMessage.includes('produce')) {
      const fruits = products.filter(p => p.category === 'Produce');
      productIds = fruits.slice(0, 3).map(p => p.id);
      response = "Fresh and delicious! Here are some of our best produce options. 🍎🍌";
    } else {
      // General search
      const searchResults = searchProducts(userMessage);
      if (searchResults.length > 0) {
        productIds = searchResults.slice(0, 3).map(p => p.id);
        response = `I found ${searchResults.length} products matching your search! Here are the top recommendations. 🔍`;
      } else {
        response = "I didn't find exact matches, but let me suggest some popular items that might interest you! You can also try searching for specific categories like 'organic', 'healthy', or specific food types. 😊";
        productIds = products.slice(0, 3).map(p => p.id);
      }
    }

    return {
      id: Date.now().toString(),
      text: response,
      sender: 'bot',
      timestamp: new Date(),
      products: productIds.length > 0 ? productIds : undefined
    };
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen max-h-[80vh] flex flex-col bg-white rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Bot className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold">SmartShop AI Assistant</h3>
            <p className="text-sm text-blue-100">Always here to help! 🤖</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(80vh - 140px)' }}>
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.sender === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              <div className="flex items-center space-x-2 mb-1">
                {message.sender === 'bot' ? (
                  <Bot size={16} className="text-blue-600" />
                ) : (
                  <User size={16} className="text-white" />
                )}
                <span className="text-xs opacity-75">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm">{message.text}</p>
              
              {/* Product Recommendations */}
              {message.products && (
                <div className="mt-3 space-y-2">
                  {message.products.map(productId => {
                    const product = products.find(p => p.id === productId);
                    if (!product) return null;
                    
                    return (
                      <Card key={productId} className="bg-white border">
                        <CardContent className="p-3">
                          <div className="flex space-x-3">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm text-gray-800">{product.name}</h4>
                              <p className="text-xs text-gray-600">${product.price}</p>
                              <div className="flex space-x-1 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  ⭐ {product.rating}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  ❤️ {product.healthScore}/5
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <Bot size={16} className="text-blue-600" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-gray-50 rounded-b-lg">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={simulateVoiceInput}
            className="flex-shrink-0"
          >
            <Mic size={16} />
          </Button>
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about products..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm">
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
