"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        router.push("/prep")
    }, [router])

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Loading AI Interview Coach...</h1>
                <p className="text-muted-foreground mt-2">Redirecting to preparation hub</p>
            </div>
        </div>
    )
}
