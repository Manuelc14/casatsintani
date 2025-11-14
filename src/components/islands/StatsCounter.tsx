import { useEffect, useState } from 'react';

interface StatsCounterProps {
    value: number;
    duration?: number;
    suffix?: string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function StatsCounter({
    value,
    duration = 1600,
    suffix = '',
}: StatsCounterProps) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        let start: number | null = null;
        let frame: number;

        const step = (timestamp: number) => {
            if (start === null) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = easeOutCubic(progress);
            setCurrent(Math.round(eased * value));
            if (progress < 1) {
                frame = requestAnimationFrame(step);
            }
        };

        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, [value, duration]);

    const formatted = current.toLocaleString('es-MX');

    return (
        <span>
            {formatted}
            {suffix}
        </span>
    );
}
