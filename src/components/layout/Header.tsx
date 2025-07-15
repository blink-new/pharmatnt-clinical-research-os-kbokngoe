import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Bell, Settings, LogOut, User, RefreshCw, Shield, Building2, Briefcase, Truck } from 'lucide-react'
import blink from '@/blink/client'
import type { User as UserType, UserRole } from '@/types'

interface HeaderProps {
  user: UserType | null
  onRoleChange?: (role: UserRole) => void
}

export function Header({ user, onRoleChange }: HeaderProps) {
  const [notifications, setNotifications] = useState(0)

  const handleLogout = () => {
    blink.auth.logout()
  }

  const handleRoleSwitch = async (newRole: UserRole) => {
    if (!user) return
    
    try {
      // Update the user profile in the database
      const profiles = await blink.db.userProfiles.list({
        where: { userId: user.id },
        limit: 1
      })
      
      if (profiles.length > 0) {
        await blink.db.userProfiles.update(profiles[0].id, {
          role: newRole
        })
        
        // Trigger a role change in the parent component
        if (onRoleChange) {
          onRoleChange(newRole)
        }
        
        // Refresh the page to reload with new role
        window.location.reload()
      }
    } catch (error) {
      console.error('Error switching role:', error)
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'professional': return 'bg-blue-100 text-blue-800'
      case 'site': return 'bg-green-100 text-green-800'
      case 'sponsor': return 'bg-purple-100 text-purple-800'
      case 'vendor': return 'bg-orange-100 text-orange-800'
      case 'admin': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'professional': return User
      case 'site': return Building2
      case 'sponsor': return Briefcase
      case 'vendor': return Truck
      case 'admin': return Shield
      default: return User
    }
  }

  const roles: { id: UserRole; label: string }[] = [
    { id: 'professional', label: 'Professional' },
    { id: 'site', label: 'Site' },
    { id: 'sponsor', label: 'Sponsor' },
    { id: 'vendor', label: 'Vendor' },
    { id: 'admin', label: 'Admin' }
  ]

  return (
    <header className="border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">PT</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">PharmaTNT</h1>
          </div>
          {user && (
            <Badge className={getRoleBadgeColor(user.role)}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Badge>
          )}
        </div>

        {user && (
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Switch Role (Testing)
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {roles.map((role) => {
                      const Icon = getRoleIcon(role.id)
                      const isCurrentRole = user.role === role.id
                      return (
                        <DropdownMenuItem
                          key={role.id}
                          onClick={() => handleRoleSwitch(role.id)}
                          disabled={isCurrentRole}
                          className={isCurrentRole ? 'opacity-50' : ''}
                        >
                          <Icon className="mr-2 h-4 w-4" />
                          {role.label}
                          {isCurrentRole && (
                            <Badge variant="secondary" className="ml-auto text-xs">
                              Current
                            </Badge>
                          )}
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  )
}