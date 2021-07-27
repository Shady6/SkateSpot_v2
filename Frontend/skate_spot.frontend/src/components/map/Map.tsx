import React, { useRef } from 'react';
import { useMap } from '../../hooks/importIndex';

interface Props {
    mapClickHandler?: (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        map: L.Map
    ) => void
}

const Map: React.FC<Props> = ({ mapClickHandler }) => {

    const mapDiv = useRef<HTMLDivElement | null>(null)
    const [map, isDraggingMap, setIsDraggingMap] = useMap()

    return (
        <div
            onDrag={_ => setIsDraggingMap(true)}
            onClick={e => {
                if (!map || isDraggingMap) {
                    setIsDraggingMap(false)
                    return
                }
                mapClickHandler && mapClickHandler(e, map)
            }} ref={mapDiv} style={{ height: 600 }} id="map"></div>
    )
}

export default Map



