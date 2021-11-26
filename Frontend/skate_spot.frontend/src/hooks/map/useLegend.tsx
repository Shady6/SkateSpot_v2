import L, { Control } from 'leaflet'
import React, { useEffect } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MarkerIcon } from '../../components/map/MarkerIcon'

type MarkerData = {
  name: string
  color: string
}

export const markersData: {
  tempSpot: MarkerData
  spot: MarkerData
  selected: MarkerData
  [k: string]: MarkerData
} = {
  tempSpot: { color: '#ff640a', name: 'Temp Spot' },
  spot: { color: '#00b360', name: 'Spot' },
  selected: { color: '#1f4eb9', name: 'Selected' },
}

interface Props {
  displaySelectedMarkerLegend: boolean
  map: L.Map
}

export const useLegend = ({ displaySelectedMarkerLegend, map }: Props) => {
  useEffect(() => {
    const legend = new Control({ position: 'bottomleft' })
    legend.onAdd = () => {
      const div = L.DomUtil.create('div')
      div.innerHTML = renderToStaticMarkup(
        <div
          className='p-1'
          style={{ background: 'rgba(255,255,255, 0.5)', color: 'black' }}>
          <ul className='p-0 m-0' style={{ listStyleType: 'none' }}>
            {Object.keys(markersData)
              .filter(k => !(k === 'selected' && !displaySelectedMarkerLegend))
              .map(k => (
                <li className='mb-1' key={k}>
                  <MarkerIcon
                    className='me-1'
                    fontSize='1.5rem'
                    color={markersData[k].color}
                  />
                  <span>{markersData[k].name}</span>
                </li>
              ))}
          </ul>
        </div>
      )
      return div
    }
    map.addControl(legend)
  }, [])
}
