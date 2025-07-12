
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Mail, Phone, Clock, CheckCircle, Headphones, Star } from 'lucide-react';

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our AI-powered support team",
      availability: "24/7 Available",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed help via email",
      availability: "Response within 2 hours",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our experts",
      availability: "Mon-Fri 9AM-6PM",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const faqItems = [
    {
      question: "How does the AI shopping assistant work?",
      answer: "Our AI uses advanced machine learning to understand your preferences and provide personalized product recommendations."
    },
    {
      question: "Is my data secure?",
      answer: "Yes! All data is processed locally on your device. We never share your personal information with third parties."
    },
    {
      question: "How accurate are the product recommendations?",
      answer: "Our AI has a 95% satisfaction rate based on user feedback and continuously learns from your shopping patterns."
    },
    {
      question: "Can I use SmartShop Genie offline?",
      answer: "Yes! Most features work offline using cached data, though some real-time features require an internet connection."
    }
  ];

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Message Sent Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for contacting us. Our support team will get back to you within 2 hours.
            </p>
            <Badge className="bg-green-500 text-white px-4 py-2">
              Ticket #SSG-{Date.now().toString().slice(-6)}
            </Badge>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0 shadow-2xl">
        <CardContent className="p-8 text-center">
          <Headphones className="h-16 w-16 mx-auto mb-4 text-white" />
          <h1 className="text-4xl font-bold mb-4">💬 Contact & Support</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Need help? Our expert support team is here to assist you with SmartShop Genie
          </p>
        </CardContent>
      </Card>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {supportOptions.map((option, index) => (
          <Card key={index} className="hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <option.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{option.title}</h3>
              <p className="text-gray-600 mb-3">{option.description}</p>
              <Badge className="bg-blue-100 text-blue-700">
                <Clock size={12} className="mr-1" />
                {option.availability}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-6 w-6 text-blue-600" />
              <span>Send us a Message</span>
            </CardTitle>
            <p className="text-gray-600">Fill out the form below and we'll get back to you shortly</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <Input
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="What can we help you with?"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your question or issue in detail..."
                  rows={5}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-full"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-6 w-6 text-green-600" />
              <span>Frequently Asked Questions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">{faq.question}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Customer Satisfaction */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">⭐ Customer Satisfaction</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-green-600">98%</div>
              <p className="text-gray-600">Customer Satisfaction</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">2min</div>
              <p className="text-gray-600">Average Response Time</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">24/7</div>
              <p className="text-gray-600">AI Support Available</p>
            </div>
          </div>
          
          <div className="flex justify-center items-center space-x-2 mt-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-gray-600 font-medium">4.9/5 from 10,000+ users</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactSupport;
