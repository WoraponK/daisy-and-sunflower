'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Volume2, VolumeX } from 'lucide-react'

import DaisyAndSunFlowerPNG from '@/images/daisy-and-sunflower.png'
import { images_together as images } from '@/assets/images'
import { ThreeDMarquee } from '@/components/ui/3d-marquee'
import { TimerDisplay } from '@/components/TimerDisplay'

const Home = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    const audio = audioRef.current
    if (audio && !isPlaying) {
      audio.volume = 0.4
      audio.muted = false
      audio.play()
      setIsMuted(false)
      setIsPlaying(true)
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const audio = audioRef.current
    if (audio) {
      audio.muted = !audio.muted
      setIsMuted(audio.muted)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const handleEnded = () => setIsPlaying(false)
      audio.addEventListener('ended', handleEnded)
      return () => audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <div
      onClick={handlePlay}
      className="relative mx-auto flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4"
    >
      <audio ref={audioRef} src="/music/romantic-music.mp3" loop controls={false} />

      <button onClick={toggleMute} className="absolute top-6 right-6 z-30 text-white transition hover:scale-110">
        {isMuted ? <VolumeX size={32} /> : <Volume2 size={32} />}
      </button>

      <div className="z-20">
        <motion.div
          className="text-center text-4xl"
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
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
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeInOut' }}
        >
          <h1>
            <span className="text-zinc-300">ตั้งแต่</span>
            <span className="underline">ดอกเดซี่</span>
            <span className="text-zinc-300">และ</span>
            <span className="text-sunflower underline">ดอกทานตะวัน</span>
            <span className="text-zinc-300">ได้พบกัน</span>
          </h1>
          <p className="text-zinc-300">ก็เป็นเวลา</p>
          <TimerDisplay />
        </motion.div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 h-full w-full bg-black/70" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 aspect-video h-[1920px] scale-150 opacity-30"
        images={images}
      />
    </div>
  )
}

export default Home
