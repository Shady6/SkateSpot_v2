import L from 'leaflet'
import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

export const useDisablePropagationInMap = ({
  ref,
}: {
  ref: React.MutableRefObject<HTMLElement | null>
}) => {
  const map = useMap()

  useEffect(() => {
    if (!ref.current) return
    L.DomEvent.disableScrollPropagation(ref.current)
    ref.current.onmouseenter = e => map.dragging.disable()
    ref.current.onmouseleave = e => map.dragging.enable()

    return () => {
      map.dragging.enable()
    }
  }, [ref])
}
