"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, RotateCcw, Download, Star, TrendingUp, AlertCircle } from "lucide-react"


const mockSessionData = {
    category: "technical" ,
    messages: [
        { role: "user", content: "What is the difference between var, let, and const?" },
        { role: "ai", content: "Var is function-scoped, let and const are block-scoped. Const is immutable." },
        { role: "user", content: "Explain closures in JavaScript." },
        { role: "ai", content: "Closures are functions that retain access to their outer scope even after the scope has closed." },
    ],
    completedAt: new Date().toISOString(),
};

const mockOverallScore = 85
const mockUserResponses = mockSessionData.messages.filter((msg) => msg.role === "user")

export default function Results() {
    const router = useRouter()

    const categoryTitles = {
        general: "General Interview Questions",
        behavioral: "Behavioral Questions",
        technical: "Technical Questions",
    }

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-400"
        if (score >= 60) return "text-yellow-400"
        return "text-red-400"
    }

    const getScoreLabel = (score: number) => {
        if (score >= 80) return "Excellent"
        if (score >= 60) return "Good"
        return "Needs Improvement"
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Interview Results</h1>
                        <p className="text-slate-300">{mockSessionData.category}</p>
                    </div>
                    <Button
                        onClick={() => router.push("/")}
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Button>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Overall Score */}
                    <Card className="bg-slate-800 border-slate-700">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                                Overall Score
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center">
                                <div className={`text-4xl font-bold mb-2 ${getScoreColor(mockOverallScore)}`}>{mockOverallScore}%</div>
                                <Badge
                                    variant="secondary"
                                    className={`mb-4 ${mockOverallScore >= 80 ? "bg-green-600" : mockOverallScore >= 60 ? "bg-yellow-600" : "bg-red-600"}`}
                                >
                                    {getScoreLabel(mockOverallScore)}
                                </Badge>
                                <Progress value={mockOverallScore} className="mb-4" />
                                <p className="text-sm text-slate-400">Based on response quality, clarity, and completeness</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Key Metrics */}
                    <Card className="bg-slate-800 border-slate-700">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
                                Session Metrics
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Questions Answered:</span>
                                <span className="font-semibold">{mockUserResponses.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Average Response Length:</span>
                                <span className="font-semibold">
                                    {Math.round(mockUserResponses.reduce((acc, msg) => acc + msg.content.length, 0) / mockUserResponses.length)} chars
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Session Duration:</span>
                                <span className="font-semibold">~{mockUserResponses.length * 2} minutes</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Completion Rate:</span>
                                <span className="font-semibold text-green-400">100%</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Key Insights */}
                    <Card className="bg-slate-800 border-slate-700">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <AlertCircle className="w-5 h-5 mr-2 text-purple-400" />
                                Key Insights
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="p-3 bg-green-900/30 rounded-lg border border-green-700">
                                <h4 className="font-semibold text-green-400 mb-1">Strengths</h4>
                                <p className="text-sm text-slate-300">
                                    Consistent response quality and good engagement throughout the session.
                                </p>
                            </div>
                            <div className="p-3 bg-yellow-900/30 rounded-lg border border-yellow-700">
                                <h4 className="font-semibold text-yellow-400 mb-1">Areas to Improve</h4>
                                <p className="text-sm text-slate-300">
                                    Consider providing more specific examples and quantifiable results.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Detailed Conversation Review */}
                <Card className="bg-slate-800 border-slate-700 mt-6">
                    <CardHeader>
                        <CardTitle>Conversation Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {mockSessionData.messages.map((message, index) => (
                                <div key={index} className={`${message.role === "user" ? "ml-8" : "mr-8"}`}>
                                    <div
                                        className={`p-4 rounded-lg ${
                                            message.role === "user" ? "bg-blue-900/30 border border-blue-700" : "bg-slate-700"
                                        }`}
                                    >
                                        <div className="text-sm font-medium mb-2 flex items-center">
                                            {message.role === "user" ? (
                                                <>
                                                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                                                    Your Response
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                                    AI Feedback
                                                </>
                                            )}
                                        </div>
                                        <div className="text-slate-100 whitespace-pre-wrap">{message.content}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4 mt-8">
                    <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Start New Session
                    </Button>
                    <Button
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                        onClick={() => {
                            const dataStr = JSON.stringify(mockSessionData, null, 2)
                            const dataBlob = new Blob([dataStr], { type: "application/json" })
                            const url = URL.createObjectURL(dataBlob)
                            const link = document.createElement("a")
                            link.href = url
                            link.download = `interview-results-${new Date().toISOString().split("T")[0]}.json`
                            link.click()
                        }}
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export Results
                    </Button>
                </div>
            </div>
        </div>
    )
}