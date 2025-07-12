
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Database, Eye, Award, Zap } from 'lucide-react';

const PrivacyTrust = () => {
  const trustFeatures = [
    {
      icon: Lock,
      title: "Privacy-First AI",
      description: "All AI processing happens locally on your device"
    },
    {
      icon: Database,
      title: "Local Data Only",
      description: "Your shopping data never leaves your browser"
    },
    {
      icon: Eye,
      title: "No Tracking",
      description: "Zero third-party cookies or analytics"
    },
    {
      icon: Shield,
      title: "Secure by Design",
      description: "Built with enterprise-grade security"
    },
    {
      icon: Award,
      title: "Certified Secure",
      description: "Meets industry security standards"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "No external API calls for core features"
    }
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <Card className="border-0 bg-transparent">
          <CardContent className="p-0">
            {/* Trust Section */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">🛡️ Why Trust SmartShop Genie</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Built with privacy and security at its core, ensuring your shopping experience is both intelligent and protected
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {trustFeatures.map((feature, index) => (
                <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                  <feature.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-gray-600 leading-tight">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Footer Links */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">SmartShop Genie</p>
                    <p className="text-xs text-gray-600">AI-Powered Shopping Assistant</p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  <Badge className="bg-green-100 text-green-700">
                    🔒 100% Private
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-700">
                    🚫 No Tracking
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-700">
                    ⚡ Zero Config
                  </Badge>
                  <Badge className="bg-orange-100 text-orange-700">
                    🆓 Completely Free
                  </Badge>
                </div>

                <div className="text-center md:text-right">
                  <p className="text-sm text-gray-600">© 2024 SmartShop Genie</p>
                  <p className="text-xs text-gray-500">Built for the Future of Retail</p>
                </div>
              </div>
            </div>

            {/* Security Badges */}
            <div className="flex justify-center items-center space-x-6 mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Shield className="h-6 w-6 text-green-500 mx-auto mb-1" />
                <p className="text-xs text-gray-600">GDPR Compliant</p>
              </div>
              <div className="text-center">
                <Lock className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                <p className="text-xs text-gray-600">SSL Secured</p>
              </div>
              <div className="text-center">
                <Database className="h-6 w-6 text-purple-500 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Local Storage</p>
              </div>
              <div className="text-center">
                <Award className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Security Certified</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </footer>
  );
};

export default PrivacyTrust;
