import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  DollarSign, 
  Briefcase, 
  Users, 
  Star,
  Plus,
  ArrowRight
} from 'lucide-react'
import type { UserRole } from '@/types'

interface DashboardOverviewProps {
  role: UserRole
  onNavigate: (tab: string) => void
}

const dashboardData = {
  professional: {
    stats: [
      { title: 'Active Gigs', value: '3', icon: Briefcase, change: '+2 this week' },
      { title: 'Total Earnings', value: '$12,450', icon: DollarSign, change: '+15% this month' },
      { title: 'Vault Revenue', value: '$2,340', icon: TrendingUp, change: '+8% this month' },
      { title: 'Rating', value: '4.8', icon: Star, change: '12 reviews' },
    ],
    quickActions: [
      { label: 'Browse Gigs', action: 'gigs', icon: Briefcase },
      { label: 'Upload to Vault', action: 'vault', icon: Plus },
      { label: 'SmartScribe™', action: 'smartscribe', icon: TrendingUp },
    ]
  },
  site: {
    stats: [
      { title: 'Active Trials', value: '8', icon: Briefcase, change: '+2 this month' },
      { title: 'Patient Enrollment', value: '156', icon: Users, change: '+23 this week' },
      { title: 'Revenue', value: '$45,200', icon: DollarSign, change: '+12% this month' },
      { title: 'Capacity', value: '78%', icon: TrendingUp, change: 'Normal' },
    ],
    quickActions: [
      { label: 'Manage Trials', action: 'trials', icon: Briefcase },
      { label: 'Toggle Capacity', action: 'overflow', icon: Users },
      { label: 'Find Staff', action: 'gigs', icon: Plus },
    ]
  },
  sponsor: {
    stats: [
      { title: 'Active Trials', value: '12', icon: Briefcase, change: '+3 this quarter' },
      { title: 'Total Budget', value: '$2.4M', icon: DollarSign, change: '6 trials funded' },
      { title: 'Sites Enrolled', value: '24', icon: Users, change: '+8 this month' },
      { title: 'Completion Rate', value: '89%', icon: TrendingUp, change: 'Above average' },
    ],
    quickActions: [
      { label: 'Create Trial', action: 'trials', icon: Plus },
      { label: 'Hire Vendors', action: 'vendors', icon: Users },
      { label: 'Book KOL', action: 'kol', icon: Star },
    ]
  },
  vendor: {
    stats: [
      { title: 'Active Services', value: '6', icon: Briefcase, change: '+1 this week' },
      { title: 'Total Revenue', value: '$28,900', icon: DollarSign, change: '+18% this month' },
      { title: 'Client Rating', value: '4.9', icon: Star, change: '28 reviews' },
      { title: 'Completion Rate', value: '96%', icon: TrendingUp, change: 'Excellent' },
    ],
    quickActions: [
      { label: 'Add Service', action: 'services', icon: Plus },
      { label: 'View Gigs', action: 'gigs', icon: Briefcase },
      { label: 'Schedule', action: 'calendar', icon: Star },
    ]
  },
  admin: {
    stats: [
      { title: 'Total Users', value: '1,247', icon: Users, change: '+89 this month' },
      { title: 'Platform Revenue', value: '$156K', icon: DollarSign, change: '+24% this month' },
      { title: 'Active Disputes', value: '3', icon: TrendingUp, change: '-2 this week' },
      { title: 'System Health', value: '99.8%', icon: Star, change: 'Excellent' },
    ],
    quickActions: [
      { label: 'User Management', action: 'users', icon: Users },
      { label: 'View Disputes', action: 'disputes', icon: TrendingUp },
      { label: 'Analytics', action: 'analytics', icon: Star },
    ]
  }
}

export function DashboardOverview({ role, onNavigate }: DashboardOverviewProps) {
  const data = dashboardData[role]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
        </h2>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your account.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-gray-400" />
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
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Get started with common tasks for your role
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                  onClick={() => onNavigate(action.action)}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your latest actions and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'New gig application received', time: '2 hours ago', type: 'success' },
              { action: 'Vault item licensed by 3 users', time: '5 hours ago', type: 'info' },
              { action: 'Payment of $1,250 processed', time: '1 day ago', type: 'success' },
              { action: 'Trial module completed', time: '2 days ago', type: 'success' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`} />
                  <span className="text-sm text-gray-900">{activity.action}</span>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4">
            View All Activity
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}