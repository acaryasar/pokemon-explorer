interface AvatarProps {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  fallback?: string
}

function Avatar({
  src,
  alt = 'Avatar',
  size = 'md',
  className,
  fallback,
}: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl',
  }

  if (!src) {
    return (
      <div
        className={`${sizes[size]} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold ${className}`}
      >
        {fallback || alt.charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizes[size]} rounded-full object-cover border-2 border-white shadow-lg ${className}`}
    />
  )
}

export default Avatar
