'use client'

import React from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="overflow-x-hidden">{children}</div>
}

export default MainLayout
