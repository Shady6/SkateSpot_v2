import React, { useRef } from 'react'
import { v4 } from 'uuid'
import { useDisablePropagationInMap } from '../../hooks/map/disablePropagationInMap'
import { useMapExecuteOnClickOutsideOf } from '../../hooks/map/useMapExecuteOnClickOutsideOf'

interface Props {
  hide?: {
    id: string
    funcToHide: () => void
  }
  style?: React.CSSProperties | undefined
  className?: string
}

export const OnTopOfMapContainer: React.FC<Props> = ({
  hide,
  style,
  children,
  className,
}) => {
  const ref = useRef<null | HTMLDivElement>(null)
  useDisablePropagationInMap({ ref })

  useMapExecuteOnClickOutsideOf({
    outsideOfId: hide ? hide.id : '_____',
    funcToExecute: hide ? hide.funcToHide : () => {},
  })

  return (
    <div
      style={style}
      ref={ref}
      id={hide?.id ?? v4()}
      className={'on-top-of-map ' + (className ?? '')}>
      {children}
    </div>
  )
}
