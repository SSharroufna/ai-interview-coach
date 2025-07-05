"use client"

import { useChat } from "ai/react"
import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Send, RotateCcw } from "lucide-react"

export default function InterviewSession() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const category = searchParams.get("category") || "general"

    const [isListening, setIsListening] = useState(false)
    const [questionCount, setQuestionCount] = useState(0)
    const [sessionComplete, setSessionComplete] = useState(false)
    const recognitionRef = useRef<any>(null)

    const { messages, input, handleInputChange, handleSubmit, setInput, isLoading } = useChat({
        api: "/api/chat",
        body: { category, questionCount },
        onFinish: () => {
            setQuestionCount((prev) => prev + 1)
            if (questionCount >= 4) {
                setSessionComplete(true)
            }
        },
    })

    const categoryTitles = {
        general: "General Interview Questions",
        behavioral: "Behavioral Questions",
        technical: "Technical Questions",
    }

    useEffect(() => {
        if (messages.length === 0) {
            // Start the interview with the first question
            handleSubmit(new Event("submit") as any)
        }
    }, [])

    useEffect(() => {
        if ("webkitSpeechRecognition" in window) {
            recognitionRef.current = new (window as any).webkitSpeechRecognition()
            recognitionRef.current.continuous = false
            recognitionRef.current.interimResults = false

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript
                setInput(transcript)
                setIsListening(false)
            }

            recognitionRef.current.onerror = () => {
                setIsListening(false)
            }
        }
    }, [setInput])

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop()
            setIsListening(false)
        } else {
            recognitionRef.current?.start()
            setIsListening(true)
        }
    }

    const handleCompleteSession = () => {
        // Store session data in localStorage for results page
        const sessionData = {
            category,
            messages: messages.filter((m) => m.role !== "system"),
            completedAt: new Date().toISOString(),
        }
        localStorage.setItem("interviewSession", JSON.stringify(sessionData))
        router.push("/results")
    }

    const progress = Math.min((questionCount / 5) * 100, 100)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold">Interview Session</h1>
                            <p className="text-slate-300">{categoryTitles[category as keyof typeof categoryTitles]}</p>
                        </div>
                        <Badge variant="secondary" className="bg-slate-700">
                            Question {questionCount}/5
                        </Badge>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Chat Messages */}
                <Card className="bg-slate-800 border-slate-700 mb-6">
                    <CardContent className="p-6">
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                            {messages.map((message, index) => (
                                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div
                                        className={`max-w-[80%] p-4 rounded-lg ${
                                            message.role === "user" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-100"
                                        }`}
                                    >
                                        <div className="text-sm font-medium mb-1">{message.role === "user" ? "You" : "AI Interviewer"}</div>
                                        <div className="whitespace-pre-wrap">{message.content}</div>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-700 text-slate-100 p-4 rounded-lg">
                                        <div className="text-sm font-medium mb-1">AI Interviewer</div>
                                        <div className="flex items-center space-x-2">
                                            <div className="animate-pulse">Thinking...</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Input Area */}
                {!sessionComplete ? (
                    <Card className="bg-slate-800 border-slate-700">
                        <CardContent className="p-4">
                            <form onSubmit={handleSubmit} className="flex space-x-2">
                                <Input
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Type your response or use voice input..."
                                    className="flex-1 bg-slate-700 border-slate-600 text-white"
                                    disabled={isLoading}
                                />
                                <Button
                                    type="button"
                                    onClick={toggleListening}
                                    variant={isListening ? "destructive" : "secondary"}
                                    size="icon"
                                    className="shrink-0"
                                >
                                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                                </Button>
                                <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="bg-slate-800 border-slate-700">
                        <CardHeader>
                            <CardTitle className="text-center text-green-400">Session Complete!</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center space-y-4">
                            <p className="text-slate-300">Great job! You've completed your interview practice session.</p>
                            <div className="flex justify-center space-x-4">
                                <Button onClick={handleCompleteSession} className="bg-green-600 hover:bg-green-700">
                                    View Results
                                </Button>
                                <Button
                                    onClick={() => router.push("/")}
                                    variant="outline"
                                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                                >
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    New Session
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
