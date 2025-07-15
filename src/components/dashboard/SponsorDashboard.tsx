import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Building2, 
  DollarSign, 
  Users, 
  TrendingUp,
  Plus,
  Calendar,
  Star,
  FileText,
  Target,
  Clock
} from 'lucide-react'

interface SponsorDashboardProps {
  onNavigate: (tab: string) => void
}

export function SponsorDashboard({ onNavigate }: SponsorDashboardProps) {
  const [activeTrials, setActiveTrials] = useState([
    {
      id: '1',
      name: 'CARDIO-2024-001',
      indication: 'Cardiovascular',
      phase: 'Phase III',
      sites: 12,
      targetSites: 15,
      enrolled: 245,
      targetEnrollment: 300,
      budget: 2400000,
      spent: 1680000,
      status: 'enrolling',
      timeline: 18,
      completedMonths: 12
    },
    {
      id: '2',
      name: 'ONCO-2024-007',
      indication: 'Oncology',
      phase: 'Phase II',
      sites: 8,
      targetSites: 10,
      enrolled: 89,
      targetEnrollment: 120,
      budget: 1800000,
      spent: 1260000,
      status: 'active',
      timeline: 24,
      completedMonths: 16
    },
    {
      id: '3',
      name: 'NEURO-2024-003',
      indication: 'Neurology',
      phase: 'Phase I',
      sites: 3,
      targetSites: 5,
      enrolled: 24,
      targetEnrollment: 40,
      budget: 950000,
      spent: 285000,
      status: 'startup',
      timeline: 12,
      completedMonths: 3
    }
  ])

  const [vendors, setVendors] = useState([
    {
      id: '1',
      name: 'ClinData Solutions',
      service: 'Data Management',
      trials: ['CARDIO-2024-001', 'ONCO-2024-007'],
      rating: 4.8,
      cost: 125000,
      status: 'active'
    },
    {
      id: '2',
      name: 'MedImaging Corp',
      service: 'Central Imaging',
      trials: ['NEURO-2024-003'],
      rating: 4.9,
      cost: 89000,
      status: 'active'
    },
    {
      id: '3',
      name: 'BioStats Pro',
      service: 'Statistical Analysis',
      trials: ['CARDIO-2024-001'],
      rating: 4.7,
      cost: 67000,
      status: 'pending'
    }
  ])

  const [kolConsults, setKolConsults] = useState([
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      specialty: 'Cardiology',
      nextSession: '2025-07-18',
      totalSessions: 8,
      cost: 15000,
      rating: 4.9
    },
    {
      id: '2',
      name: 'Dr. Michael Rodriguez',
      specialty: 'Oncology',
      nextSession: '2025-07-22',
      totalSessions: 5,
      cost: 12500,
      rating: 4.8
    }
  ])

  const stats = [
    { title: 'Active Trials', value: '12', icon: Building2, change: '+3 this quarter', color: 'text-blue-600' },
    { title: 'Total Budget', value: '$5.15M', icon: DollarSign, change: '8 trials funded', color: 'text-green-600' },
    { title: 'Sites Enrolled', value: '23', icon: Users, change: '+5 this month', color: 'text-purple-600' },
    { title: 'Avg Completion Rate', value: '89%', icon: TrendingUp, change: 'Above industry avg', color: 'text-yellow-600' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enrolling': return 'bg-blue-100 text-blue-800'
      case 'active': return 'bg-green-100 text-green-800'
      case 'startup': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'pending': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Phase I': return 'bg-green-50 text-green-700 border-green-200'
      case 'Phase II': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'Phase III': return 'bg-purple-50 text-purple-700 border-purple-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Sponsor Dashboard</h2>
        <p className="text-gray-600">
          Manage your clinical trials, budgets, and research partnerships.
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
            <Target className="h-5 w-5 text-blue-600" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Streamline your trial management workflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 hover:border-blue-300"
              onClick={() => onNavigate('trials')}
            >
              <Plus className="h-6 w-6 text-blue-600" />
              <span className="text-sm font-medium">Create Trial</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-green-50 hover:border-green-300"
              onClick={() => onNavigate('vendors')}
            >
              <Users className="h-6 w-6 text-green-600" />
              <span className="text-sm font-medium">Hire Vendors</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-purple-50 hover:border-purple-300"
              onClick={() => onNavigate('kol')}
            >
              <Calendar className="h-6 w-6 text-purple-600" />
              <span className="text-sm font-medium">Book KOL</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-yellow-50 hover:border-yellow-300"
              onClick={() => onNavigate('earnings')}
            >
              <DollarSign className="h-6 w-6 text-yellow-600" />
              <span className="text-sm font-medium">Budget Overview</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="trials" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trials">Active Trials</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="kol">KOL Consults</TabsTrigger>
          <TabsTrigger value="budget">Budget Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="trials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Active Trials ({activeTrials.length})</span>
                <Button size="sm" onClick={() => onNavigate('trials')}>
                  Trial Builder
                </Button>
              </CardTitle>
              <CardDescription>
                Monitor progress across your clinical trial portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeTrials.map((trial) => (
                  <div key={trial.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{trial.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{trial.indication}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={getPhaseColor(trial.phase)}>
                            {trial.phase}
                          </Badge>
                          <Badge className={getStatusColor(trial.status)}>
                            {trial.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">${trial.budget.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Total Budget</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Site Enrollment</span>
                          <span className="font-medium">{trial.sites}/{trial.targetSites}</span>
                        </div>
                        <Progress value={(trial.sites / trial.targetSites) * 100} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Patient Enrollment</span>
                          <span className="font-medium">{trial.enrolled}/{trial.targetEnrollment}</span>
                        </div>
                        <Progress value={(trial.enrolled / trial.targetEnrollment) * 100} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Timeline Progress</span>
                          <span className="font-medium">{trial.completedMonths}/{trial.timeline} months</span>
                        </div>
                        <Progress value={(trial.completedMonths / trial.timeline) * 100} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Active Vendors ({vendors.length})</span>
                <Button size="sm" onClick={() => onNavigate('vendors')}>
                  Vendor Portal
                </Button>
              </CardTitle>
              <CardDescription>
                Manage your vendor relationships and services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vendors.map((vendor) => (
                  <div key={vendor.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{vendor.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{vendor.service}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getStatusColor(vendor.status)}>
                            {vendor.status}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-600">
                            <Star className="h-3 w-3 mr-1 text-yellow-500" />
                            {vendor.rating}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">${vendor.cost.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Contract Value</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Trials:</span> {vendor.trials.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kol" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>KOL Consultants ({kolConsults.length})</span>
                <Button size="sm" onClick={() => onNavigate('kol')}>
                  Book Consultation
                </Button>
              </CardTitle>
              <CardDescription>
                Schedule and manage expert consultations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {kolConsults.map((kol) => (
                  <div key={kol.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{kol.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{kol.specialty}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{kol.totalSessions} sessions completed</span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 mr-1 text-yellow-500" />
                            {kol.rating}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">${kol.cost.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Total Spent</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Next Session:</span>
                      <span className="font-medium flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(kol.nextSession).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
              <CardDescription>
                Financial performance across your trial portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">$5.15M</div>
                  <div className="text-sm text-gray-600">Total Allocated</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">$3.22M</div>
                  <div className="text-sm text-gray-600">Spent to Date</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">$1.93M</div>
                  <div className="text-sm text-gray-600">Remaining</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Budget by Trial</h4>
                {activeTrials.map((trial) => (
                  <div key={trial.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{trial.name}</h5>
                      <div className="text-right">
                        <span className="text-sm font-medium">${trial.spent.toLocaleString()}</span>
                        <span className="text-xs text-gray-500"> / ${trial.budget.toLocaleString()}</span>
                      </div>
                    </div>
                    <Progress value={(trial.spent / trial.budget) * 100} className="h-2" />
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>{Math.round((trial.spent / trial.budget) * 100)}% utilized</span>
                      <span>${(trial.budget - trial.spent).toLocaleString()} remaining</span>
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