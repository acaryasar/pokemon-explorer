import { useEffect, useRef, useState } from 'react'

export function useAudio(src: string, loop: boolean = true) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    audioRef.current = new Audio(src)
    audioRef.current.loop = loop

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [src, loop])

  const play = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        console.error('Audio play failed:', error)
      }
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const toggle = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  return { play, pause, toggle, isPlaying }
}
