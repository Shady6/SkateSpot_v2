import React, { useEffect, useRef } from 'react'
import { v4 } from 'uuid'
import { useDisablePropagationInMap } from '../../hooks/map/disablePropagationInMap'
import { useMapExecuteOnClickOutsideOf } from '../../hooks/map/useMapExecuteOnClickOutsideOf'
import { LeafletMouseEvent } from 'leaflet'

interface Props {
  hide?: {
    mainContainerId: string
    dontHideOnIds: string[]
    funcToHide: (e: LeafletMouseEvent) => void
  }
  style?: React.CSSProperties | undefined
  className?: string
  setRefCurrent?: (element: HTMLElement | SVGElement | null) => void
}

export const OnTopOfMapContainer: React.FC<Props> = ({
  hide,
  style,
  children,
  className,
  setRefCurrent,
}) => {
  const ref = useRef<null | HTMLDivElement>(null)
  useDisablePropagationInMap({ ref })

  useMapExecuteOnClickOutsideOf({
    outsideOfIds: hide ? [hide.mainContainerId, ...hide.dontHideOnIds] : [],
    funcToExecute: hide ? e => hide.funcToHide(e) : () => {},
  })

  useEffect(() => {
    if (ref.current && setRefCurrent) setRefCurrent(ref.current)
  }, [ref])

  return (
    <div
      style={style}
      ref={ref}
      id={hide?.mainContainerId ?? v4()}
      className={'on-top-of-map ' + (className ?? '')}>
      {children}
    </div>
  )
}
