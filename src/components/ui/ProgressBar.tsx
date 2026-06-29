interface ProgressBarProps {
  value: number
  max?: number
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

function ProgressBar({
  value,
  max = 100,
  color = 'blue',
  size = 'md',
  className,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  const colors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-600',
    purple: 'bg-purple-600',
  }

  const sizes = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
  }

  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizes[size]} ${className}`}>
      <div
        className={`${colors[color]} ${sizes[size]} transition-all duration-300 ease-out`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

export default ProgressBar
