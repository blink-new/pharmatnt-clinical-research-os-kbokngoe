import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  User, 
  Building2, 
  Briefcase, 
  Truck, 
  Shield,
  CheckCircle
} from 'lucide-react'
import type { UserRole } from '@/types'

interface RoleSelectionProps {
  onRoleSelect: (role: UserRole) => void
}

const roles = [
  {
    id: 'professional' as UserRole,
    title: 'Professional',
    description: 'CRA, CRC, PM, Writer, Statistician',
    icon: User,
    features: ['Post & apply to gigs', 'Upload vault items', 'SmartScribe™ SOP generation', 'KOL consultations'],
    color: 'blue'
  },
  {
    id: 'site' as UserRole,
    title: 'Site',
    description: 'Clinic, Academic, Research Site',
    icon: Building2,
    features: ['Manage trials', 'Toggle overflow/understaffing', 'Hire professionals', 'Track patient flow'],
    color: 'green'
  },
  {
    id: 'sponsor' as UserRole,
    title: 'Sponsor',
    description: 'Biotech, Pharma, CRO',
    icon: Briefcase,
    features: ['Create trials', 'Modular trial builder', 'Hire vendors', 'Budget management'],
    color: 'purple'
  },
  {
    id: 'vendor' as UserRole,
    title: 'Vendor',
    description: 'Labs, IRT, Imaging, DCT',
    icon: Truck,
    features: ['List services', 'Get hired into studies', 'Manage deliverables', 'Track earnings'],
    color: 'orange'
  },
  {
    id: 'admin' as UserRole,
    title: 'Admin',
    description: 'Platform Administrator',
    icon: Shield,
    features: ['Manage users', 'Handle disputes', 'Ethics registry', 'System analytics'],
    color: 'red'
  }
]

export function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">PT</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to PharmaTNT</h1>
          <p className="text-gray-600">Choose your role to get started with the clinical research platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {roles.map((role) => {
            const Icon = role.icon
            const isSelected = selectedRole === role.id
            
            return (
              <Card 
                key={role.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg bg-${role.color}-100`}>
                      <Icon className={`h-6 w-6 text-${role.color}-600`} />
                    </div>
                    {isSelected && (
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <CardTitle className="text-lg">{role.title}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {role.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Button 
            onClick={handleContinue}
            disabled={!selectedRole}
            size="lg"
            className="px-8"
          >
            Continue as {selectedRole && roles.find(r => r.id === selectedRole)?.title}
          </Button>
        </div>
      </div>
    </div>
  )
}