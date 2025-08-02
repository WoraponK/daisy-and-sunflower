'use client'

import { useEffect, useState } from 'react'
import { intervalToDuration } from 'date-fns'
import { formatSecondPad } from '@/lib/other'

const metDate = new Date('2023-08-03T00:00:00')

export const TimerDisplay = () => {
  const [duration, setDuration] = useState(() => intervalToDuration({ start: metDate, end: new Date() }))

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(intervalToDuration({ start: metDate, end: new Date() }))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <p>
        <span className="text-sunflower">{duration.years ?? 0}</span> ปี{' '}
        <span className="text-sunflower">{duration.months ?? 0}</span> เดือน{' '}
        <span className="text-sunflower">{duration.days ?? 0}</span> วัน
      </p>
      <p>
        <span className="text-sunflower">{formatSecondPad(duration.hours)}</span>:
        <span className="text-sunflower">{formatSecondPad(duration.minutes)}</span>:
        <span className="text-sunflower">{formatSecondPad(duration.seconds)}</span>
      </p>
    </>
  )
}
