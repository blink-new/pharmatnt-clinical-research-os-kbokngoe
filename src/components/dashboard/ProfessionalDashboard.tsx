import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  DollarSign, 
  Briefcase, 
  Star,
  Plus,
  ArrowRight,
  Clock,
  FileText,
  Zap,
  Award
} from 'lucide-react'

interface ProfessionalDashboardProps {
  onNavigate: (tab: string) => void
}

export function ProfessionalDashboard({ onNavigate }: ProfessionalDashboardProps) {
  const [activeGigs, setActiveGigs] = useState([
    {
      id: '1',
      title: 'CRA for Phase II Oncology Study',
      type: 'CRA Staffing',
      client: 'BioTech Solutions',
      deadline: '2025-08-15',
      progress: 65,
      payment: 4500,
      status: 'in_progress'
    },
    {
      id: '2',
      title: 'Protocol Review - Cardiology',
      type: 'Protocol Writing',
      client: 'CardioPharm Inc',
      deadline: '2025-07-25',
      progress: 30,
      payment: 2800,
      status: 'in_progress'
    },
    {
      id: '3',
      title: 'FDA Submission Consultation',
      type: 'FDA Insight',
      client: 'MedDevice Corp',
      deadline: '2025-07-20',
      progress: 90,
      payment: 3200,
      status: 'review'
    }
  ])

  const [vaultItems, setVaultItems] = useState([
    {
      id: '1',
      title: 'ICH-GCP Training Module',
      category: 'Training',
      licenses: 24,
      revenue: 2400,
      rating: 4.8
    },
    {
      id: '2',
      title: 'Site Initiation SOP Template',
      category: 'SOP',
      licenses: 18,
      revenue: 1800,
      rating: 4.9
    },
    {
      id: '3',
      title: 'Feasibility Assessment Tool',
      category: 'Template',
      licenses: 12,
      revenue: 960,
      rating: 4.7
    }
  ])

  const stats = [
    { title: 'Active Gigs', value: '3', icon: Briefcase, change: '+1 this week', color: 'text-blue-600' },
    { title: 'Monthly Earnings', value: '$12,450', icon: DollarSign, change: '+15% vs last month', color: 'text-green-600' },
    { title: 'Vault Revenue', value: '$5,160', icon: TrendingUp, change: '+8% this month', color: 'text-purple-600' },
    { title: 'Professional Rating', value: '4.8', icon: Star, change: '32 reviews', color: 'text-yellow-600' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'review': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'CRA Staffing': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'Protocol Writing': return 'bg-green-50 text-green-700 border-green-200'
      case 'FDA Insight': return 'bg-purple-50 text-purple-700 border-purple-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Professional Dashboard</h2>
        <p className="text-gray-600">
          Manage your gigs, track earnings, and grow your clinical research career.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-green-600 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Jump into your most common tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 hover:border-blue-300"
              onClick={() => onNavigate('gigs')}
            >
              <Briefcase className="h-6 w-6 text-blue-600" />
              <span className="text-sm font-medium">Browse Gigs</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-green-50 hover:border-green-300"
              onClick={() => onNavigate('vault')}
            >
              <Plus className="h-6 w-6 text-green-600" />
              <span className="text-sm font-medium">Upload to Vault</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-purple-50 hover:border-purple-300"
              onClick={() => onNavigate('smartscribe')}
            >
              <Zap className="h-6 w-6 text-purple-600" />
              <span className="text-sm font-medium">SmartScribe™</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-yellow-50 hover:border-yellow-300"
              onClick={() => onNavigate('earnings')}
            >
              <DollarSign className="h-6 w-6 text-yellow-600" />
              <span className="text-sm font-medium">View Earnings</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="gigs" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="gigs">Active Gigs</TabsTrigger>
          <TabsTrigger value="vault">Vault Items</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="gigs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Active Gigs ({activeGigs.length})</span>
                <Button size="sm" onClick={() => onNavigate('gigs')}>
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                Track progress on your current assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeGigs.map((gig) => (
                  <div key={gig.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{gig.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">Client: {gig.client}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={getTypeColor(gig.type)}>
                            {gig.type}
                          </Badge>
                          <Badge className={getStatusColor(gig.status)}>
                            {gig.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">${gig.payment.toLocaleString()}</p>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          Due {new Date(gig.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{gig.progress}%</span>
                      </div>
                      <Progress value={gig.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vault" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Vault Items ({vaultItems.length})</span>
                <Button size="sm" onClick={() => onNavigate('vault')}>
                  Manage Vault
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                Your licensed content and revenue performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vaultItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                        <Badge variant="outline" className="mb-2">
                          {item.category}
                        </Badge>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{item.licenses} licenses sold</span>
                          <span className="flex items-center">
                            <Star className="h-3 w-3 mr-1 text-yellow-500" />
                            {item.rating}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">${item.revenue.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Total Revenue</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest actions and achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    action: 'Completed FDA Submission Consultation', 
                    time: '2 hours ago', 
                    type: 'success',
                    icon: Award,
                    details: 'Earned $3,200'
                  },
                  { 
                    action: 'New gig application received', 
                    time: '5 hours ago', 
                    type: 'info',
                    icon: Briefcase,
                    details: 'Protocol Writing - $2,800'
                  },
                  { 
                    action: 'Vault item licensed by 3 users', 
                    time: '1 day ago', 
                    type: 'success',
                    icon: FileText,
                    details: 'ICH-GCP Training Module'
                  },
                  { 
                    action: 'SmartScribe SOP generated', 
                    time: '2 days ago', 
                    type: 'info',
                    icon: Zap,
                    details: 'Site Monitoring Checklist'
                  },
                ].map((activity, index) => {
                  const Icon = activity.icon
                  return (
                    <div key={index} className="flex items-start space-x-3 py-3 border-b last:border-b-0">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'success' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        <Icon className={`h-4 w-4 ${
                          activity.type === 'success' ? 'text-green-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.details}</p>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}