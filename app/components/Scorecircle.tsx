import React from 'react'

const Scorecircle = ({ score = 75 }: { score?: number }) => {
  const radius = 50
  const stroke = 8
  const normalizedRadius = radius - stroke / 2
  const circumference = 2 * Math.PI * normalizedRadius
  const progress = score / 100
  const strokeDashoffset = circumference - progress * circumference

  return (
    <div className="relative w-[100px] h-[100px]">
      <svg height="100%" width="100%" viewBox="0 0 200 200" className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r={normalizedRadius}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="transparent"
        />
        <defs>
          <linearGradient id="grad" x1="1" y1="0" x2="2" y2="1">
            <stop offset="0" stopColor="#FF97AD" />
            <stop offset="100%" stopColor="#5171FF" />
          </linearGradient>
        </defs>
        {/* Progress circle */}
        <circle
          cx="100"
          cy="100"
          r={normalizedRadius}
          stroke="url(#grad)"
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>

      {/* Centered text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-semibold text-sm">{score}/100</span>
      </div>
    </div>
  )
}

export default Scorecircle
