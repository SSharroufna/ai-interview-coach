"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Brain, Code, ArrowRight } from "lucide-react"

const categories = [
    {
        id: "general",
        title: "General Interview Questions",
        description: "Common questions asked in most job interviews",
        icon: Users,
        color: "bg-blue-500",
    },
    {
        id: "behavioral",
        title: "Behavioral Questions",
        description: "Situational questions using the STAR method",
        icon: Brain,
        color: "bg-green-500",
    },
    {
        id: "technical",
        title: "Technical / Role-Specific Questions",
        description: "Technical questions for your specific role",
        icon: Code,
        color: "bg-purple-500",
    },
]

export default function LandingPage() {
    const router = useRouter()
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    const handleStartInterview = () => {
        if (selectedCategory) {
            router.push(`/session/${selectedCategory}`)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">AI-Powered Interview Coach</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Practice your interview skills with our AI coach. Get real-time feedback and improve your confidence.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-8 text-center">Choose Your Interview Category</h2>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {categories.map((category) => {
                            const Icon = category.icon
                            return (
                                <Card
                                    key={category.id}
                                    className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                                        selectedCategory === category.id
                                            ? "ring-2 ring-blue-400 bg-slate-700"
                                            : "bg-slate-800 hover:bg-slate-700"
                                    }`}
                                    onClick={() => setSelectedCategory(category.id)}
                                >
                                    <CardHeader className="text-center">
                                        <div
                                            className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                                        >
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                        <CardTitle className="text-white">{category.title}</CardTitle>
                                        <CardDescription className="text-slate-300">{category.description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            )
                        })}
                    </div>

                    <div className="text-center">
                        <Button
                            onClick={handleStartInterview}
                            disabled={!selectedCategory}
                            size="lg"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                        >
                            Start Interview Session
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
