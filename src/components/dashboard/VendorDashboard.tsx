import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Briefcase, 
  DollarSign, 
  Star, 
  TrendingUp,
  Plus,
  Calendar,
  Clock,
  CheckCircle,
  Building2,
  Users
} from 'lucide-react'

interface VendorDashboardProps {
  onNavigate: (tab: string) => void
}

export function VendorDashboard({ onNavigate }: VendorDashboardProps) {
  const [services, setServices] = useState([
    {
      id: '1',
      name: 'Central ECG Reading',
      category: 'Cardiac Safety',
      price: 450,
      priceType: 'per_reading',
      activeContracts: 8,
      totalRevenue: 125000,
      rating: 4.9,
      turnaroundTime: '24 hours',
      status: 'active'
    },
    {
      id: '2',
      name: 'Clinical Data Management',
      category: 'Data Services',
      price: 8500,
      priceType: 'monthly',
      activeContracts: 3,
      totalRevenue: 89000,
      rating: 4.8,
      turnaroundTime: '48 hours',
      status: 'active'
    },
    {
      id: '3',
      name: 'Medical Translation',
      category: 'Regulatory',
      price: 0.25,
      priceType: 'per_word',
      activeContracts: 12,
      totalRevenue: 67000,
      rating: 4.7,
      turnaroundTime: '72 hours',
      status: 'active'
    }
  ])

  const [activeGigs, setActiveGigs] = useState([
    {
      id: '1',
      title: 'ECG Analysis for CARDIO-2024-001',
      client: 'CardioPharm Inc',
      service: 'Central ECG Reading',
      deadline: '2025-07-25',
      progress: 75,
      payment: 12500,
      status: 'in_progress',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Data Management - Phase II Oncology',
      client: 'BioTech Solutions',
      service: 'Clinical Data Management',
      deadline: '2025-08-15',
      progress: 45,
      payment: 25500,
      status: 'in_progress',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Protocol Translation (Spanish)',
      client: 'Global Pharma Corp',
      service: 'Medical Translation',
      deadline: '2025-07-20',
      progress: 90,
      payment: 3200,
      status: 'review',
      priority: 'high'
    }
  ])

  const [upcomingSchedule, setUpcomingSchedule] = useState([
    {
      id: '1',
      title: 'ECG Review Session',
      client: 'CardioPharm Inc',
      date: '2025-07-18',
      time: '10:00 AM',
      duration: '2 hours',
      type: 'review'
    },
    {
      id: '2',
      title: 'Data Lock Meeting',
      client: 'BioTech Solutions',
      date: '2025-07-19',
      time: '2:00 PM',
      duration: '1 hour',
      type: 'meeting'
    },
    {
      id: '3',
      title: 'Translation Delivery',
      client: 'Global Pharma Corp',
      date: '2025-07-20',
      time: '9:00 AM',
      duration: '30 minutes',
      type: 'delivery'
    }
  ])

  const stats = [
    { title: 'Active Services', value: '6', icon: Briefcase, change: '+1 this month', color: 'text-blue-600' },
    { title: 'Monthly Revenue', value: '$28,900', icon: DollarSign, change: '+18% vs last month', color: 'text-green-600' },
    { title: 'Client Rating', value: '4.8', icon: Star, change: '47 reviews', color: 'text-yellow-600' },
    { title: 'Completion Rate', value: '96%', icon: TrendingUp, change: 'Excellent performance', color: 'text-purple-600' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'review': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'active': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'review': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'meeting': return 'bg-green-50 text-green-700 border-green-200'
      case 'delivery': return 'bg-purple-50 text-purple-700 border-purple-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Vendor Dashboard</h2>
        <p className="text-gray-600">
          Manage your services, track performance, and grow your vendor business.
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
            <Building2 className="h-5 w-5 text-blue-600" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Manage your vendor operations efficiently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 hover:border-blue-300"
              onClick={() => onNavigate('services')}
            >
              <Plus className="h-6 w-6 text-blue-600" />
              <span className="text-sm font-medium">Add Service</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-green-50 hover:border-green-300"
              onClick={() => onNavigate('gigs')}
            >
              <Briefcase className="h-6 w-6 text-green-600" />
              <span className="text-sm font-medium">View Gigs</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-purple-50 hover:border-purple-300"
              onClick={() => onNavigate('calendar')}
            >
              <Calendar className="h-6 w-6 text-purple-600" />
              <span className="text-sm font-medium">Schedule</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-yellow-50 hover:border-yellow-300"
              onClick={() => onNavigate('earnings')}
            >
              <DollarSign className="h-6 w-6 text-yellow-600" />
              <span className="text-sm font-medium">Earnings</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="gigs" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="gigs">Active Gigs</TabsTrigger>
          <TabsTrigger value="services">My Services</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="gigs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Active Gigs ({activeGigs.length})</span>
                <Button size="sm" onClick={() => onNavigate('gigs')}>
                  Browse More Gigs
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
                          <Badge variant="outline">{gig.service}</Badge>
                          <Badge className={getStatusColor(gig.status)}>
                            {gig.status.replace('_', ' ')}
                          </Badge>
                          <Badge className={getPriorityColor(gig.priority)}>
                            {gig.priority} priority
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

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Service Offerings ({services.length})</span>
                <Button size="sm" onClick={() => onNavigate('services')}>
                  Manage Services
                </Button>
              </CardTitle>
              <CardDescription>
                Your available services and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{service.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{service.category}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getStatusColor(service.status)}>
                            {service.status}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-600">
                            <Star className="h-3 w-3 mr-1 text-yellow-500" />
                            {service.rating}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">${service.totalRevenue.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Total Revenue</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Price:</span>
                        <span className="font-medium ml-1">
                          ${service.price} {service.priceType.replace('_', ' ')}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Active Contracts:</span>
                        <span className="font-medium ml-1">{service.activeContracts}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Turnaround:</span>
                        <span className="font-medium ml-1">{service.turnaroundTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Upcoming Schedule</span>
                <Button size="sm" onClick={() => onNavigate('calendar')}>
                  View Full Calendar
                </Button>
              </CardTitle>
              <CardDescription>
                Your upcoming meetings, reviews, and deliveries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingSchedule.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">Client: {item.client}</p>
                        <Badge className={getTypeColor(item.type)}>
                          {item.type}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{new Date(item.date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">{item.time}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Duration:</span> {item.duration}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Your service quality and business performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Service Quality</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Overall Rating</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium">4.8/5.0</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">On-Time Delivery</span>
                      <span className="font-medium">96%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Client Satisfaction</span>
                      <span className="font-medium">98%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Repeat Clients</span>
                      <span className="font-medium">78%</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Business Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Monthly Revenue</span>
                      <span className="font-medium text-green-600">$28,900</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Active Contracts</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Avg Contract Value</span>
                      <span className="font-medium">$4,200</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Growth Rate</span>
                      <span className="font-medium text-green-600">+18%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Service Performance</h4>
                {services.map((service) => (
                  <div key={service.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{service.name}</h5>
                      <div className="flex items-center text-sm">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        <span>{service.rating}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>Revenue: ${service.totalRevenue.toLocaleString()}</div>
                      <div>Contracts: {service.activeContracts}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}