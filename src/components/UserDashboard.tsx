
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Heart, Leaf, DollarSign, ShoppingBag, Target, Award } from 'lucide-react';

const UserDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalSavings: 0,
    avgHealthScore: 0,
    ecoScore: 0,
    totalOrders: 0,
    currentStreak: 0
  });

  useEffect(() => {
    // Generate mock dashboard data based on cart history
    const cartHistory = JSON.parse(localStorage.getItem('smartshop-cart-history') || '[]');
    const currentCart = JSON.parse(localStorage.getItem('smartshop-cart') || '[]');
    
    // Mock calculations
    const totalSavings = cartHistory.length * 15.50 + Math.random() * 50;
    const avgHealthScore = 3.2 + (Math.random() * 1.8);
    const ecoScore = 65 + (Math.random() * 25);
    const totalOrders = cartHistory.length + 1;
    const currentStreak = Math.floor(Math.random() * 10) + 1;

    setDashboardData({
      totalSavings,
      avgHealthScore,
      ecoScore,
      totalOrders,
      currentStreak
    });
  }, []);

  const weeklyData = [
    { week: 'Week 1', savings: 12.50, health: 3.2, eco: 65 },
    { week: 'Week 2', savings: 18.75, health: 3.8, eco: 72 },
    { week: 'Week 3', savings: 22.30, health: 4.1, eco: 68 },
    { week: 'Week 4', savings: 28.90, health: 3.9, eco: 78 },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">📊 Personal Dashboard</h1>
              <p className="text-blue-100 text-lg">Track your smart shopping journey</p>
            </div>
            <div className="text-right">
              <Badge className="bg-white/20 text-white px-4 py-2 text-lg">
                🏆 Smart Shopper Level {Math.floor(dashboardData.totalOrders / 3) + 1}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">${dashboardData.totalSavings.toFixed(2)}</h3>
            <p className="text-sm text-gray-600">Total Savings</p>
            <Badge className="bg-green-500 text-white mt-2">
              +${(dashboardData.totalSavings * 0.15).toFixed(2)} this week
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{dashboardData.avgHealthScore.toFixed(1)}/5</h3>
            <p className="text-sm text-gray-600">Average Health Score</p>
            <Progress value={dashboardData.avgHealthScore * 20} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{dashboardData.ecoScore.toFixed(0)}%</h3>
            <p className="text-sm text-gray-600">Sustainability Score</p>
            <Progress value={dashboardData.ecoScore} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <Award className="h-5 w-5 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{dashboardData.totalOrders}</h3>
            <p className="text-sm text-gray-600">Smart Orders</p>
            <Badge className="bg-purple-500 text-white mt-2">
              🔥 {dashboardData.currentStreak} day streak
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <span>📈 Weekly Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {weeklyData.map((week, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-800">{week.week}</h4>
                  <Badge className="bg-blue-100 text-blue-700">
                    ${week.savings} saved
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Savings</span>
                      <span className="font-medium">${week.savings}</span>
                    </div>
                    <Progress value={(week.savings / 30) * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Health Score</span>
                      <span className="font-medium">{week.health}/5</span>
                    </div>
                    <Progress value={week.health * 20} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Eco Score</span>
                      <span className="font-medium">{week.eco}%</span>
                    </div>
                    <Progress value={week.eco} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-6 w-6 text-yellow-600" />
            <span>🏆 Achievements & Milestones</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
              <div className="text-3xl mb-2">💰</div>
              <h4 className="font-bold text-gray-800">Savings Champion</h4>
              <p className="text-sm text-gray-600">Saved over $50</p>
              <Badge className="bg-yellow-500 text-white mt-2">Unlocked</Badge>
            </div>
            
            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
              <div className="text-3xl mb-2">🌱</div>
              <h4 className="font-bold text-gray-800">Eco Warrior</h4>
              <p className="text-sm text-gray-600">70%+ sustainable choices</p>
              <Badge className="bg-green-500 text-white mt-2">Unlocked</Badge>
            </div>
            
            <div className="text-center p-4 bg-white rounded-xl shadow-sm opacity-60">
              <div className="text-3xl mb-2">🔥</div>
              <h4 className="font-bold text-gray-800">Streak Master</h4>
              <p className="text-sm text-gray-600">30-day shopping streak</p>
              <Badge className="bg-gray-400 text-white mt-2">Locked</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
