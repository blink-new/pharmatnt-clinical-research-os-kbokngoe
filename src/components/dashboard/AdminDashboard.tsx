import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  DollarSign, 
  Shield, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Settings,
  BarChart3,
  UserX,
  Flag
} from 'lucide-react'

interface AdminDashboardProps {
  onNavigate: (tab: string) => void
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [userStats, setUserStats] = useState({
    total: 1247,
    newThisMonth: 89,
    activeToday: 342,
    byRole: {
      professional: 456,
      site: 234,
      sponsor: 123,
      vendor: 189,
      admin: 12
    }
  })

  const [disputes, setDisputes] = useState([
    {
      id: '1',
      type: 'Payment Dispute',
      parties: ['Dr. Sarah Chen', 'BioTech Solutions'],
      amount: 4500,
      status: 'pending',
      priority: 'high',
      createdAt: '2025-07-14',
      description: 'Payment not released after gig completion'
    },
    {
      id: '2',
      type: 'Quality Issue',
      parties: ['MedImaging Corp', 'CardioPharm Inc'],
      amount: 12000,
      status: 'investigating',
      priority: 'medium',
      createdAt: '2025-07-12',
      description: 'Imaging quality below agreed standards'
    },
    {
      id: '3',
      type: 'Contract Breach',
      parties: ['ClinData Solutions', 'NeuroMed Corp'],
      amount: 8900,
      status: 'resolved',
      priority: 'low',
      createdAt: '2025-07-10',
      description: 'Missed delivery deadline for data management'
    }
  ])

  const [blacklistEntries, setBlacklistEntries] = useState([
    {
      id: '1',
      name: 'Fraudulent Pharma Inc',
      type: 'sponsor',
      reason: 'Non-payment of multiple gigs',
      reportedBy: 'Multiple users',
      dateAdded: '2025-06-15',
      severity: 'high',
      status: 'active'
    },
    {
      id: '2',
      name: 'Dr. John Fake',
      type: 'professional',
      reason: 'Falsified credentials',
      reportedBy: 'Site verification',
      dateAdded: '2025-06-20',
      severity: 'high',
      status: 'active'
    },
    {
      id: '3',
      name: 'Unreliable Labs LLC',
      type: 'vendor',
      reason: 'Consistent quality issues',
      reportedBy: 'Multiple sponsors',
      dateAdded: '2025-07-01',
      severity: 'medium',
      status: 'under_review'
    }
  ])

  const [systemMetrics, setSystemMetrics] = useState({
    uptime: 99.8,
    responseTime: 245,
    errorRate: 0.02,
    activeConnections: 1456,
    dailyTransactions: 2847,
    storageUsed: 78
  })

  const stats = [
    { title: 'Total Users', value: '1,247', icon: Users, change: '+89 this month', color: 'text-blue-600' },
    { title: 'Platform Revenue', value: '$156K', icon: DollarSign, change: '+24% this month', color: 'text-green-600' },
    { title: 'Active Disputes', value: '3', icon: Shield, change: '-2 this week', color: 'text-yellow-600' },
    { title: 'System Health', value: '99.8%', icon: TrendingUp, change: 'Excellent', color: 'text-purple-600' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'investigating': return 'bg-blue-100 text-blue-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'active': return 'bg-red-100 text-red-800'
      case 'under_review': return 'bg-orange-100 text-orange-800'
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
        <p className="text-gray-600">
          Monitor platform health, manage users, and oversee system operations.
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
            <Settings className="h-5 w-5 text-blue-600" />
            Admin Actions
          </CardTitle>
          <CardDescription>
            Quick access to critical admin functions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 hover:border-blue-300"
              onClick={() => onNavigate('users')}
            >
              <Users className="h-6 w-6 text-blue-600" />
              <span className="text-sm font-medium">User Management</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-yellow-50 hover:border-yellow-300"
              onClick={() => onNavigate('disputes')}
            >
              <Shield className="h-6 w-6 text-yellow-600" />
              <span className="text-sm font-medium">View Disputes</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-red-50 hover:border-red-300"
              onClick={() => onNavigate('blacklist')}
            >
              <UserX className="h-6 w-6 text-red-600" />
              <span className="text-sm font-medium">Ethics Registry</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-green-50 hover:border-green-300"
              onClick={() => onNavigate('analytics')}
            >
              <BarChart3 className="h-6 w-6 text-green-600" />
              <span className="text-sm font-medium">Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
          <TabsTrigger value="blacklist">Ethics Registry</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>
                  Breakdown of users by role
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(userStats.byRole).map(([role, count]) => (
                    <div key={role} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          role === 'professional' ? 'bg-blue-500' :
                          role === 'site' ? 'bg-green-500' :
                          role === 'sponsor' ? 'bg-purple-500' :
                          role === 'vendor' ? 'bg-orange-500' :
                          'bg-red-500'
                        }`} />
                        <span className="text-sm font-medium capitalize">{role}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold">{count}</span>
                        <span className="text-xs text-gray-500 ml-1">
                          ({Math.round((count / userStats.total) * 100)}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest platform events and alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      action: 'New dispute filed', 
                      time: '2 hours ago', 
                      type: 'warning',
                      icon: AlertTriangle,
                      details: 'Payment dispute - $4,500'
                    },
                    { 
                      action: 'User verification completed', 
                      time: '4 hours ago', 
                      type: 'success',
                      icon: CheckCircle,
                      details: 'Dr. Sarah Chen - Professional'
                    },
                    { 
                      action: 'Blacklist entry added', 
                      time: '1 day ago', 
                      type: 'error',
                      icon: Flag,
                      details: 'Unreliable Labs LLC - Quality issues'
                    },
                    { 
                      action: 'System maintenance completed', 
                      time: '2 days ago', 
                      type: 'info',
                      icon: Settings,
                      details: 'Database optimization - 99.8% uptime'
                    },
                  ].map((activity, index) => {
                    const Icon = activity.icon
                    return (
                      <div key={index} className="flex items-start space-x-3 py-2">
                        <div className={`p-2 rounded-full ${
                          activity.type === 'success' ? 'bg-green-100' :
                          activity.type === 'warning' ? 'bg-yellow-100' :
                          activity.type === 'error' ? 'bg-red-100' :
                          'bg-blue-100'
                        }`}>
                          <Icon className={`h-4 w-4 ${
                            activity.type === 'success' ? 'text-green-600' :
                            activity.type === 'warning' ? 'text-yellow-600' :
                            activity.type === 'error' ? 'text-red-600' :
                            'text-blue-600'
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
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>User Management</span>
                <Button size="sm" onClick={() => onNavigate('users')}>
                  Advanced Management
                </Button>
              </CardTitle>
              <CardDescription>
                Overview of platform users and recent registrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{userStats.total}</div>
                  <div className="text-sm text-gray-600">Total Users</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{userStats.newThisMonth}</div>
                  <div className="text-sm text-gray-600">New This Month</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{userStats.activeToday}</div>
                  <div className="text-sm text-gray-600">Active Today</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">User Distribution by Role</h4>
                {Object.entries(userStats.byRole).map(([role, count]) => (
                  <div key={role} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${
                        role === 'professional' ? 'bg-blue-500' :
                        role === 'site' ? 'bg-green-500' :
                        role === 'sponsor' ? 'bg-purple-500' :
                        role === 'vendor' ? 'bg-orange-500' :
                        'bg-red-500'
                      }`} />
                      <span className="font-medium capitalize">{role}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">{count} users</span>
                      <div className="text-xs text-gray-500">
                        {Math.round((count / userStats.total) * 100)}% of total
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disputes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Active Disputes ({disputes.filter(d => d.status !== 'resolved').length})</span>
                <Button size="sm" onClick={() => onNavigate('disputes')}>
                  Manage All Disputes
                </Button>
              </CardTitle>
              <CardDescription>
                Current disputes requiring admin attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {disputes.map((dispute) => (
                  <div key={dispute.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{dispute.type}</h4>
                        <p className="text-sm text-gray-600 mb-2">{dispute.description}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getStatusColor(dispute.status)}>
                            {dispute.status.replace('_', ' ')}
                          </Badge>
                          <Badge className={getPriorityColor(dispute.priority)}>
                            {dispute.priority} priority
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-red-600">${dispute.amount.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Disputed Amount</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Parties:</span> {dispute.parties.join(' vs ')}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Filed: {new Date(dispute.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blacklist" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Ethics Registry ({blacklistEntries.length})</span>
                <Button size="sm" onClick={() => onNavigate('blacklist')}>
                  Manage Registry
                </Button>
              </CardTitle>
              <CardDescription>
                Flagged users and entities for ethics violations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {blacklistEntries.map((entry) => (
                  <div key={entry.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{entry.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{entry.reason}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="capitalize">{entry.type}</Badge>
                          <Badge className={getStatusColor(entry.status)}>
                            {entry.status.replace('_', ' ')}
                          </Badge>
                          <Badge className={getSeverityColor(entry.severity)}>
                            {entry.severity} severity
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(entry.dateAdded).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">Date Added</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Reported by:</span> {entry.reportedBy}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Health Metrics</CardTitle>
              <CardDescription>
                Real-time platform performance and status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{systemMetrics.uptime}%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{systemMetrics.responseTime}ms</div>
                  <div className="text-sm text-gray-600">Avg Response Time</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{systemMetrics.errorRate}%</div>
                  <div className="text-sm text-gray-600">Error Rate</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{systemMetrics.activeConnections}</div>
                  <div className="text-sm text-gray-600">Active Connections</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{systemMetrics.dailyTransactions}</div>
                  <div className="text-sm text-gray-600">Daily Transactions</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{systemMetrics.storageUsed}%</div>
                  <div className="text-sm text-gray-600">Storage Used</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">System Status</h4>
                <div className="space-y-3">
                  {[
                    { service: 'API Gateway', status: 'operational', uptime: 99.9 },
                    { service: 'Database', status: 'operational', uptime: 99.8 },
                    { service: 'File Storage', status: 'operational', uptime: 99.7 },
                    { service: 'Payment Processing', status: 'operational', uptime: 99.9 },
                    { service: 'Email Service', status: 'degraded', uptime: 98.5 },
                  ].map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          service.status === 'operational' ? 'bg-green-500' :
                          service.status === 'degraded' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`} />
                        <span className="font-medium">{service.service}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium capitalize">{service.status}</span>
                        <div className="text-xs text-gray-500">{service.uptime}% uptime</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}