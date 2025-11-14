import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="mt-6 flex items-center gap-4">
      <button
        onClick={() => setCount((c) => c - 1)}
        className="rounded-lg bg-zinc-200 px-4 py-2 hover:bg-zinc-300"
      >
        -
      </button>
      <span className="text-lg font-semibold">{count}</span>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="rounded-lg bg-zinc-200 px-4 py-2 hover:bg-zinc-300"
      >
        +
      </button>
    </div>
  )
}
