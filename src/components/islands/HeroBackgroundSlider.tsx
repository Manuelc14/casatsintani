import { useEffect, useState } from 'react'

const defaultImages = [
    '/assets/hero-bg-1.png',
    '/assets/hero-bg-2.jpg',
    '/assets/hero-bg-3.png',
]

type HeroBackgroundSliderProps = {
    images?: string[]
    intervalMs?: number
}

export default function HeroBackgroundSlider({
    images = defaultImages,
    intervalMs = 7000,
}: HeroBackgroundSliderProps) {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (images.length <= 1) return
        const id = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length)
        }, intervalMs)
        return () => clearInterval(id)
    }, [images.length, intervalMs])

    return (
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
            {images.map((src, index) => (
                <div
                    key={src}
                    className={`absolute inset-0 transform-gpu transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                        }`}
                >
                    <img
                        src={src}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />
                    <div className="pointer-events-none absolute inset-0 opacity-[0.15] [background:radial-gradient(90rem_60rem_at_0%_0%,theme(colors.brand.400),transparent_60%)]" />
                </div>
            ))}
        </div>
    )
}
