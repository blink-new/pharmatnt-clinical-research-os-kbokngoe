import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { RoleSelection } from '@/components/onboarding/RoleSelection'
import { DashboardOverview } from '@/components/dashboard/DashboardOverview'
import { Toaster } from '@/components/ui/toaster'
import blink from '@/blink/client'
import type { User, UserRole } from '@/types'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showRoleSelection, setShowRoleSelection] = useState(false)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      if (state.user) {
        // Check if user has completed role selection
        checkUserProfile(state.user)
      } else {
        setUser(null)
        setShowRoleSelection(false)
      }
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const checkUserProfile = async (authUser: any) => {
    try {
      // Try to get user profile from database
      const profiles = await blink.db.userProfiles.list({
        where: { userId: authUser.id },
        limit: 1
      })

      if (profiles.length > 0) {
        const profile = profiles[0]
        setUser({
          id: authUser.id,
          email: authUser.email,
          name: authUser.displayName || authUser.email,
          role: profile.role,
          avatar: authUser.avatar,
          verified: profile.verified || false,
          rating: profile.rating || 0,
          createdAt: profile.createdAt || new Date().toISOString()
        })
        setShowRoleSelection(false)
      } else {
        // User needs to complete role selection
        setShowRoleSelection(true)
      }
    } catch (error) {
      console.error('Error checking user profile:', error)
      setShowRoleSelection(true)
    }
  }

  const handleRoleSelect = async (role: UserRole) => {
    try {
      const authUser = await blink.auth.me()
      
      // Create user profile in database
      await blink.db.userProfiles.create({
        userId: authUser.id,
        role: role,
        verified: false,
        rating: 0,
        createdAt: new Date().toISOString()
      })

      // Update local user state
      setUser({
        id: authUser.id,
        email: authUser.email,
        name: authUser.displayName || authUser.email,
        role: role,
        avatar: authUser.avatar,
        verified: false,
        rating: 0,
        createdAt: new Date().toISOString()
      })
      
      setShowRoleSelection(false)
    } catch (error) {
      console.error('Error saving user role:', error)
    }
  }

  const handleRoleChange = async (newRole: UserRole) => {
    if (user) {
      setUser({
        ...user,
        role: newRole
      })
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return user ? (
          <DashboardOverview role={user.role} onNavigate={setActiveTab} />
        ) : null
      case 'gigs':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Gigs Marketplace</h2>
            <p className="text-gray-600">Coming soon - Browse and manage gigs</p>
          </div>
        )
      case 'vault':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Vault Licensing</h2>
            <p className="text-gray-600">Coming soon - Upload and license SOPs, templates, and training materials</p>
          </div>
        )
      case 'smartscribe':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">SmartScribe™ System</h2>
            <p className="text-gray-600">Coming soon - AI-powered SOP generation from your workflows</p>
          </div>
        )
      case 'trials':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Trial Management</h2>
            <p className="text-gray-600">Coming soon - Modular trial builder and management</p>
          </div>
        )
      case 'vendors':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Vendor Portal</h2>
            <p className="text-gray-600">Coming soon - Hire and manage vendors for your studies</p>
          </div>
        )
      case 'earnings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Earnings Dashboard</h2>
            <p className="text-gray-600">Coming soon - Track your earnings and payments</p>
          </div>
        )
      default:
        return user ? (
          <DashboardOverview role={user.role} onNavigate={setActiveTab} />
        ) : null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">PT</span>
          </div>
          <p className="text-gray-600">Loading PharmaTNT...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">PT</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to PharmaTNT</h1>
          <p className="text-gray-600 mb-6">Please sign in to continue</p>
          <button 
            onClick={() => blink.auth.login()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  if (showRoleSelection) {
    return <RoleSelection onRoleSelect={handleRoleSelect} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onRoleChange={handleRoleChange} />
      <div className="flex h-[calc(100vh-73px)]">
        <Sidebar role={user.role} activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}

export default App