import { useMapEvents } from 'react-leaflet'

export const useMapExecuteOnClickOutsideOf = ({
  outsideOfId,
  funcToExecute,
}: {
  outsideOfId: string
  funcToExecute: () => void
}) => {
  useMapEvents({
    click(e) {
      // @ts-ignore
      if (e.originalEvent.path.some(p => p.id === outsideOfId)) return
      funcToExecute()
    },
  })
}
