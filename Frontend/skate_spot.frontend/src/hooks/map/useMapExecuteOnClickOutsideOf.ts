import { LeafletMouseEvent } from 'leaflet'
import { useMapEvents } from 'react-leaflet'

export const useMapExecuteOnClickOutsideOf = ({
  outsideOfIds,
  funcToExecute,
}: {
  outsideOfIds: string[]
  funcToExecute: (e: LeafletMouseEvent) => void
}) => {
  useMapEvents({
    click(e) {
      if (
        // @ts-ignore
        e.originalEvent.path
          // @ts-ignore
          .map(x => x.id)
          // @ts-ignore
          .some(x => outsideOfIds.indexOf(x) !== -1)
      )
        return
      funcToExecute(e)
    },
  })
}
