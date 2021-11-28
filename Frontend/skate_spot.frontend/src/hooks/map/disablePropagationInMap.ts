import L from 'leaflet'
import { useEffect } from 'react'

export const useDisablePropagationInMap = ({
  ref,
}: {
  ref: React.MutableRefObject<HTMLElement | null>
}) => {
  useEffect(() => {
    if (!ref.current) return
    L.DomEvent.disableScrollPropagation(ref.current)
    L.DomEvent.disableClickPropagation(ref.current)
  }, [ref])
}
