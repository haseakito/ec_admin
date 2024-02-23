import React from 'react'

interface BilliboardProps {
    url?: string
}

export const Billiboard: React.FC<BilliboardProps> = ({ url }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div style={{ backgroundImage: `url(${url})` }} className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover">
      </div>
    </div>
  )
}
