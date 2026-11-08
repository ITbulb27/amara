import { useEffect, useState } from 'react'

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 640 : false,
  )

  useEffect(() => {
    function updateIsMobile() {
      setIsMobile(window.innerWidth <= 640)
    }

    window.addEventListener('resize', updateIsMobile)
    return () => window.removeEventListener('resize', updateIsMobile)
  }, [])

  return isMobile
}
