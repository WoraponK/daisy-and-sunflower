'use client'

// Lib
import React, { useEffect, useState } from 'react'
import { intervalToDuration } from 'date-fns'
import Image from 'next/image'
import { motion } from 'motion/react'

// Images
import DaisyAndSunFlowerPNG from '@/images/daisy-and-sunflower.png'
import { images_together as images } from '@/assets/images'

// Includew in project
import { formatSecondPad } from '@/lib/other'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { ThreeDMarquee } from '@/components/ui/3d-marquee'

const Home = () => {
  const [metDate] = useState(new Date('2023-08-03T00:00:00'))
  const [duration, setDuration] = useState(intervalToDuration({ start: metDate, end: new Date() }))

  useEffect(() => {
    const interval = setInterval(() => {
      const current = new Date()
      setDuration(intervalToDuration({ start: metDate, end: current }))
    }, 1000)

    return () => clearInterval(interval)
  }, [metDate])

  return (
    <div className="relative mx-auto flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <div className="z-20">
        <motion.div
          className="text-center text-4xl"
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
        >
          <Image
            src={DaisyAndSunFlowerPNG.src}
            alt="Daisy and sunflower"
            width={500}
            height={500}
            loading="lazy"
            className="mx-auto brightness-105"
          />
        </motion.div>
        <motion.div
          className="z-20 -translate-y-8 space-y-4 text-center text-3xl text-white"
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
            duration: 0.8,
            ease: 'easeInOut',
          }}
        >
          <h1>ตั้งแต่ดอกเดซี่และดอกทานตะวันได้พบกัน</h1>
          <p>
            <span className="text-sunflower">{duration.years}</span> ปี{' '}
            <span className="text-sunflower">{duration.months}</span> เดือน{' '}
            <span className="text-sunflower">{duration.days}</span> วัน
          </p>
          <p>
            <span className="text-sunflower">{formatSecondPad(duration.hours)}</span>:
            <span className="text-sunflower">{formatSecondPad(duration.minutes)}</span>:
            <span className="text-sunflower">{formatSecondPad(duration.seconds)}</span>
          </p>
        </motion.div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 h-full w-full bg-black/50" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 aspect-video h-[1920px] scale-150 opacity-30"
        images={images}
      />
    </div>
  )
}

export default Home
