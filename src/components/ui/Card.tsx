import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function Card({ children, className, hover = false }: CardProps) {
  const baseStyles = 'bg-white rounded-xl shadow-lg border border-gray-200'
  const hoverStyles = hover ? 'hover:shadow-xl transition-shadow duration-200' : ''

  return (
    <div className={cn(baseStyles, hoverStyles, className)}>
      {children}
    </div>
  )
}

export default Card
