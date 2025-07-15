import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { 
  Users, 
  DollarSign, 
  Briefcase, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building2,
  UserPlus,
  Activity
} from 'lucide-react'

interface SiteDashboardProps {
  onNavigate: (tab: string) => void
}

export function SiteDashboard({ onNavigate }: SiteDashboardProps) {
  const [overflowMode, setOverflowMode] = useState(false)
  const [understaffed, setUnderstaffed] = useState(true)
  
  const [activeTrials, setActiveTrials] = useState([
    {
      id: '1',
      name: 'CARDIO-2024-001',
      sponsor: 'CardioPharm Inc',
      phase: 'Phase III',
      enrolled: 45,
      target: 60,
      status: 'enrolling',
      revenue: 125000,
      startDate: '2024-03-15'
    },
    {
      id: '2',
      name: 'ONCO-2024-007',
      sponsor: 'BioTech Solutions',
      phase: 'Phase II',
      enrolled: 28,
      target: 30,
      status: 'active',
      revenue: 89000,
      startDate: '2024-01-20'
    },
    {
      id: '3',
      name: 'NEURO-2024-003',
      sponsor: 'NeuroMed Corp',
      phase: 'Phase I',
      enrolled: 12,
      target: 20,
      status: 'screening',
      revenue: 67000,
      startDate: '2024-06-01'
    }
  ])

  const [staffingNeeds, setStaffingNeeds] = useState([
    {
      id: '1',
      role: 'Clinical Research Coordinator',
      urgency: 'high',
      trials: ['CARDIO-2024-001', 'ONCO-2024-007'],
      budget: 4500,
      deadline: '2025-07-25'
    },
    {
      id: '2',
      role: 'Data Manager',
      urgency: 'medium',
      trials: ['NEURO-2024-003'],
      budget: 3200,
      deadline: '2025-08-01'
    }
  ])

  const stats = [
    { title: 'Active Trials', value: '8', icon: Briefcase, change: '+2 this month', color: 'text-blue-600' },
    { title: 'Patient Enrollment', value: '156', icon: Users, change: '+23 this week', color: 'text-green-600' },
    { title: 'Monthly Revenue', value: '$281K', icon: DollarSign, change: '+12% vs last month', color: 'text-purple-600' },
    { title: 'Capacity Utilization', value: '78%', icon: TrendingUp, change: 'Optimal range', color: 'text-yellow-600' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enrolling': return 'bg-blue-100 text-blue-800'
      case 'active': return 'bg-green-100 text-green-800'
      case 'screening': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Site Dashboard</h2>
        <p className="text-gray-600">
          Manage your clinical trials, patient enrollment, and site capacity.
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

      {/* Capacity Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              Capacity Management
            </CardTitle>
            <CardDescription>
              Toggle overflow and understaffing modes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Overflow Mode</h4>
                <p className="text-sm text-gray-600">Auto-post referral gigs when at capacity</p>
              </div>
              <Switch
                checked={overflowMode}
                onCheckedChange={setOverflowMode}
              />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Understaffed Alert</h4>
                <p className="text-sm text-gray-600">Auto-post staffing gigs when needed</p>
              </div>
              <Switch
                checked={understaffed}
                onCheckedChange={setUnderstaffed}
              />
            </div>
            {(overflowMode || understaffed) && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  {overflowMode && understaffed ? 'Both modes active' : 
                   overflowMode ? 'Overflow mode active' : 'Understaffed alerts active'}
                  - Gigs will be auto-posted as needed
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Staffing Alerts
            </CardTitle>
            <CardDescription>
              Current staffing needs and urgent requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {staffingNeeds.map((need) => (
                <div key={need.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{need.role}</h4>
                    <Badge className={getUrgencyColor(need.urgency)}>
                      {need.urgency} priority
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Needed for: {need.trials.join(', ')}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-600 font-medium">${need.budget.toLocaleString()}</span>
                    <span className="text-gray-500">Due: {new Date(need.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onNavigate('gigs')}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Post Staffing Gig
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="trials" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trials">Active Trials</TabsTrigger>
          <TabsTrigger value="enrollment">Enrollment Status</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="trials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Active Trials ({activeTrials.length})</span>
                <Button size="sm" onClick={() => onNavigate('trials')}>
                  Manage All Trials
                </Button>
              </CardTitle>
              <CardDescription>
                Overview of your current clinical trials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeTrials.map((trial) => (
                  <div key={trial.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{trial.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">Sponsor: {trial.sponsor}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline">{trial.phase}</Badge>
                          <Badge className={getStatusColor(trial.status)}>
                            {trial.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">${trial.revenue.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Revenue</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Enrollment Progress</span>
                        <span className="font-medium">{trial.enrolled}/{trial.target} patients</span>
                      </div>
                      <Progress value={(trial.enrolled / trial.target) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enrollment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enrollment Performance</CardTitle>
              <CardDescription>
                Patient enrollment metrics across all trials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">85</div>
                  <div className="text-sm text-gray-600">Total Enrolled</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">23</div>
                  <div className="text-sm text-gray-600">This Week</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">110</div>
                  <div className="text-sm text-gray-600">Target Remaining</div>
                </div>
              </div>
              <div className="space-y-3">
                {activeTrials.map((trial) => (
                  <div key={trial.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{trial.name}</h4>
                      <p className="text-sm text-gray-600">{trial.phase}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{trial.enrolled}/{trial.target}</div>
                      <div className="text-xs text-gray-500">
                        {Math.round((trial.enrolled / trial.target) * 100)}% complete
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
                Latest updates from your trials and site operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    action: 'New patient enrolled in CARDIO-2024-001', 
                    time: '1 hour ago', 
                    type: 'success',
                    icon: Users,
                    details: 'Patient #45 - Screening complete'
                  },
                  { 
                    action: 'Staffing gig posted for CRC position', 
                    time: '3 hours ago', 
                    type: 'info',
                    icon: UserPlus,
                    details: 'Budget: $4,500 - Due July 25'
                  },
                  { 
                    action: 'Trial ONCO-2024-007 reached enrollment target', 
                    time: '1 day ago', 
                    type: 'success',
                    icon: CheckCircle,
                    details: '30/30 patients enrolled'
                  },
                  { 
                    action: 'Overflow mode activated', 
                    time: '2 days ago', 
                    type: 'info',
                    icon: Activity,
                    details: 'Capacity at 95% - Referral gigs posted'
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