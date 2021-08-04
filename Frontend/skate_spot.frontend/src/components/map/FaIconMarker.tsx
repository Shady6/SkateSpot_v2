import L, { DivIcon } from 'leaflet';
import React, { useEffect } from 'react';
import { Marker, useMap } from 'react-leaflet';
import { Coords } from '../../types/types';

interface Props {
    position: Coords,
    size?: number,
    color?: string,
    text?: string,
    flyToMarker?: boolean,
    onMouseEnter?: (e: L.LeafletMouseEvent) => void
    onMouseLeave?: (e: L.LeafletMouseEvent) => void
    onClick?: (e: L.LeafletMouseEvent) => void
}

const FaIconMarker: React.FC<Props> = ({
    position,
    size = 30,
    color = "rgb(0,50,255)",
    text,
    flyToMarker = false,
    onMouseEnter,
    onMouseLeave,
    onClick,
    children }) => {

    const map = useMap()

    useEffect(() => {
        if (flyToMarker) {
            map.flyTo(position, 12)
        }
    }, [position])

    return (
        <Marker
            eventHandlers={{
                mouseover: (e) => onMouseEnter && onMouseEnter(e),
                mouseout: (e) => onMouseLeave && onMouseLeave(e),
                click: (e) => onClick && onClick(e)
            }}
            position={position}
            icon={new DivIcon({
                html: `<i class="fa fa-map-marker" 
            style="font-size:${size}px;color:${color}">${text ?? ""}</i>`,
                iconSize: [size / 1.75, size],
                iconAnchor: [size / 1.75 / 2, size]
            })}>
            {children}
        </Marker>
    )
}

export default FaIconMarker