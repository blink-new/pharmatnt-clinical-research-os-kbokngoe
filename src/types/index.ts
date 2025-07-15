export type UserRole = 'professional' | 'site' | 'sponsor' | 'vendor' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  verified: boolean
  rating: number
  createdAt: string
}

export interface Gig {
  id: string
  title: string
  type: 'cra_staffing' | 'protocol_writing' | 'budget_review' | 'fda_insight' | 'overflow_referral' | 'vendor_gig'
  description: string
  files?: string[]
  price: number
  ndaRequired: boolean
  ownerId: string
  status: 'open' | 'assigned' | 'completed' | 'cancelled'
  assignedTo?: string
  createdAt: string
  deadline?: string
}

export interface VaultItem {
  id: string
  ownerId: string
  category: 'sop' | 'feasibility' | 'template' | 'training'
  title: string
  description: string
  fileUrl: string
  version: string
  priceType: 'fixed' | 'subscription'
  price: number
  subscriptionDuration?: number
  licensesSold: number
  verifierId?: string
  approved: boolean
  createdAt: string
}

export interface Project {
  id: string
  sponsorId: string
  name: string
  description: string
  modules: ProjectModule[]
  assignedSites: string[]
  budget: number
  status: 'draft' | 'active' | 'completed' | 'cancelled'
  createdAt: string
}

export interface ProjectModule {
  id: string
  name: string
  type: 'screening' | 'econsent' | 'drug' | 'followup' | 'randomization'
  instructions: string
  price: number
  assignedTo?: string
  status: 'pending' | 'active' | 'completed'
}

export interface Payment {
  id: string
  amount: number
  fromId: string
  toId: string
  type: 'gig' | 'vault' | 'consult' | 'module'
  status: 'pending' | 'completed' | 'failed'
  timestamp: string
}

export interface Rating {
  id: string
  gigId?: string
  reviewerId: string
  ratedId: string
  score: number
  comment: string
  createdAt: string
}