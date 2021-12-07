import { useEffect } from 'react'

export const useOverflowHidden = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])
}
