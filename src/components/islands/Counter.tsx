import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div className="flex items-center gap-4 mt-6">
            <button
                onClick={() => setCount((c) => c - 1)}
                className="px-4 py-2 rounded-lg bg-zinc-200 hover:bg-zinc-300"
            >
                -
            </button>
            <span className="text-lg font-semibold">{count}</span>
            <button
                onClick={() => setCount((c) => c + 1)}
                className="px-4 py-2 rounded-lg bg-zinc-200 hover:bg-zinc-300"
            >
                +
            </button>
        </div>
    );
}
