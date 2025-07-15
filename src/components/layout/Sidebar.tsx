import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  Briefcase, 
  Vault, 
  Building2, 
  Users, 
  Calendar, 
  DollarSign, 
  Settings,
  FileText,
  Shield,
  Zap
} from 'lucide-react'
import type { UserRole } from '@/types'

interface SidebarProps {
  role: UserRole
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigationItems = {
  professional: [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'gigs', label: 'Gigs Marketplace', icon: Briefcase },
    { id: 'vault', label: 'Vault Licensing', icon: Vault },
    { id: 'smartscribe', label: 'SmartScribe™', icon: Zap },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ],
  site: [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'trials', label: 'Trial Management', icon: FileText },
    { id: 'gigs', label: 'Gigs Marketplace', icon: Briefcase },
    { id: 'overflow', label: 'Overflow/Capacity', icon: Users },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
  ],
  sponsor: [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'trials', label: 'Trial Builder', icon: Building2 },
    { id: 'gigs', label: 'Gigs Marketplace', icon: Briefcase },
    { id: 'vendors', label: 'Vendor Portal', icon: Users },
    { id: 'kol', label: 'KOL Consults', icon: Calendar },
    { id: 'vault', label: 'Vault Licensing', icon: Vault },
    { id: 'earnings', label: 'Budget & Payments', icon: DollarSign },
  ],
  vendor: [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'services', label: 'Service Listings', icon: Briefcase },
    { id: 'gigs', label: 'Active Gigs', icon: FileText },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ],
  admin: [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'disputes', label: 'Disputes', icon: Shield },
    { id: 'blacklist', label: 'Ethics Registry', icon: Shield },
    { id: 'analytics', label: 'Analytics', icon: DollarSign },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ]
}

export function Sidebar({ role, activeTab, onTabChange }: SidebarProps) {
  const items = navigationItems[role] || []

  return (
    <div className="w-64 bg-white border-r h-full">
      <nav className="p-4 space-y-2">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start',
                activeTab === item.id && 'bg-blue-600 text-white hover:bg-blue-700'
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          )
        })}
      </nav>
    </div>
  )
}