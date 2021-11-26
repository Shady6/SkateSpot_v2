import React from 'react'
import Countdown from 'react-countdown'

export function VerificationCountdown({ endDate }: { endDate: Date }) {
  return (
    <div className='d-flex text-sm'>
      <Countdown
        renderer={p => (
          <div>
            {p.hours < 10 && '0'}
            {p.hours}:{p.minutes < 10 && '0'}
            {p.minutes}:{p.seconds < 10 && '0'}
            {p.seconds}
          </div>
        )}
        zeroPadDays={0}
        date={Date.now() + endDate.getTime() - Date.now()}>
        <p>The verification has ended</p>
      </Countdown>
    </div>
  )
}
