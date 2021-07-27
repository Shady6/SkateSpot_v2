import { useEffect, useState } from 'react';
import L from 'leaflet'

export const useMap = ():
    [L.Map | null, boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
    const [map, setMap] = useState<L.Map | null>(null)
    const [isDraggingMap, setIsDraggingMap] = useState(false)

    useEffect(() => {
        const map = L.map('map').setView([51.505, -0.09], 2)
        setMap(map)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        map.on("dragstart", () => setIsDraggingMap(true))
    }, [])

    return [map, isDraggingMap, setIsDraggingMap]
}
