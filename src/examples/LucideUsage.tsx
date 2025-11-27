import React from 'react'
import { Home, Utensils } from 'lucide-react'

export const LucideUsage = () => (
  <div className="flex items-center gap-3">
    <Home className="w-5 h-5" />
    <Utensils size={20} strokeWidth={2} />
  </div>
)
