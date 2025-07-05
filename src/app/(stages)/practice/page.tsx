"use client"

import { useState, useEffect } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Mic, MicOff, FileText, Play, SkipForward, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const mockQuestions = [
    {
        id: 1,
        category: "Behavioral",
        question:
            "Tell me about a time when you had to work with a difficult team member. How did you handle the situation?",
        skill: "Conflict Resolution",
    },
    {
        id: 2,
        category: "Behavioral",
        question: "Describe a project where you had to learn a new technology quickly. What was your approach?",
        skill: "Problem-Solving",
    },
    {
        id: 3,
        category: "Behavioral",
        question:
            "Give me an example of when you had to present a complex idea to stakeholders. How did you ensure they understood?",
        skill: "Communication",
    },
    {
        id: 4,
        category: "Behavioral",
        question: "Tell me about a time you took initiative on a project that wasn't assigned to you.",
        skill: "Initiative",
    },
    {
        id: 5,
        category: "Behavioral",
        question: "Describe a situation where you had to make a decision with incomplete information.",
        skill: "Analytical Thinking",
    },
]

type PracticePhase = "setup" | "loading" | "interview" | "complete"

export default function PracticePage() {
    const router = useRouter()
    const [phase, setPhase] = useState<PracticePhase>("setup")
    const [interviewType, setInterviewType] = useState<string>("behavioral")
    const [targetRole, setTargetRole] = useState("")
    const [targetCompany, setTargetCompany] = useState("")
    const [noCompany, setNoCompany] = useState(false)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState<Record<number, string>>({})
    const [isRecording, setIsRecording] = useState(false)
    const [inputMode, setInputMode] = useState<"text" | "voice">("text")
    const [loadingProgress, setLoadingProgress] = useState(0)

    // Simulate loading progress
    useEffect(() => {
        if (phase === "loading") {
            const interval = setInterval(() => {
                setLoadingProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval)
                        setPhase("interview")
                        return 100
                    }
                    return prev + 10
                })
            }, 200)
            return () => clearInterval(interval)
        }
    }, [phase])

    const handleStartPractice = () => {
        setLoadingProgress(0)
        setPhase("loading")
    }

    const handleNextQuestion = () => {
        if (currentQuestionIndex < mockQuestions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1)
        } else {
            setPhase("complete")
            setTimeout(() => router.push("/review"), 1000)
        }
    }

    const handleSkipQuestion = () => {
        handleNextQuestion()
    }

    const handleAnswerChange = (value: string) => {
        setAnswers((prev) => ({
            ...prev,
            [mockQuestions[currentQuestionIndex].id]: value,
        }))
    }

    const toggleRecording = () => {
        setIsRecording(!isRecording)
    }

    const currentQuestion = mockQuestions[currentQuestionIndex]
    const progress = ((currentQuestionIndex + 1) / mockQuestions.length) * 100

    if (phase === "setup") {
        return (
            <LayoutWrapper currentPage="practice">
                <div className="flex-1 p-6 space-y-6">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" asChild className="gap-2">
                            <Link href="/prep">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Prep
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold">AI-Led Mock Interview</h1>
                            <p className="text-muted-foreground mt-1">Practice with tailored questions for your role and skills</p>
                        </div>
                    </div>

                    <Card className="max-w-2xl mx-auto">
                        <CardHeader>
                            <CardTitle>What Would You Like to Practice?</CardTitle>
                            <CardDescription>
                                Select your interview focus and provide role details for personalized questions
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Interview Type Selection */}
                            <div className="space-y-3">
                                <Label className="text-base font-medium">Interview Type</Label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {[
                                        { id: "general", label: "📝 General", desc: "Mixed questions" },
                                        { id: "behavioral", label: "🗣️ Behavioral", desc: "STAR method focus" },
                                        { id: "technical", label: "💻 Technical", desc: "Role-specific skills" },
                                    ].map((type) => (
                                        <Card
                                            key={type.id}
                                            className={`cursor-pointer transition-colors ${
                                                interviewType === type.id ? "ring-2 ring-primary" : "hover:bg-muted/50"
                                            }`}
                                            onClick={() => setInterviewType(type.id)}
                                        >
                                            <CardContent className="p-4 text-center">
                                                <div className="text-lg font-medium">{type.label}</div>
                                                <div className="text-sm text-muted-foreground">{type.desc}</div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* Role and Company */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="practice-role">For Which Role?</Label>
                                    <Input
                                        id="practice-role"
                                        placeholder="e.g., Software Engineer, Product Manager"
                                        value={targetRole}
                                        onChange={(e) => setTargetRole(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="practice-company">For Which Company?</Label>
                                    <Input
                                        id="practice-company"
                                        placeholder="e.g., Google, Microsoft (Optional)"
                                        value={targetCompany}
                                        onChange={(e) => setTargetCompany(e.target.value)}
                                        disabled={noCompany}
                                    />
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="no-company-practice"
                                            checked={noCompany}
                                            onCheckedChange={(checked) => {
                                                setNoCompany(checked as boolean)
                                                if (checked) setTargetCompany("")
                                            }}
                                        />
                                        <Label htmlFor="no-company-practice" className="text-sm text-muted-foreground">
                                            I don't have a company in mind yet
                                        </Label>
                                    </div>
                                </div>
                            </div>

                            <Button onClick={handleStartPractice} size="lg" className="w-full gap-2" disabled={!targetRole.trim()}>
                                <Play className="h-4 w-4" />
                                Start Practice Session
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </LayoutWrapper>
        )
    }

    if (phase === "loading") {
        return (
            <LayoutWrapper currentPage="practice">
                <div className="flex-1 flex items-center justify-center p-6">
                    <Card className="w-full max-w-md">
                        <CardContent className="p-8 text-center space-y-6">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold">Preparing Your Interview Session...</h2>
                                <p className="text-muted-foreground">Curating tailored questions for your role and selected skills</p>
                            </div>

                            <div className="space-y-2">
                                <Progress value={loadingProgress} className="w-full" />
                                <p className="text-sm text-muted-foreground">{loadingProgress}% Complete</p>
                            </div>

                            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>This usually takes 10-15 seconds</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </LayoutWrapper>
        )
    }

    if (phase === "complete") {
        return (
            <LayoutWrapper currentPage="practice">
                <div className="flex-1 flex items-center justify-center p-6">
                    <Card className="w-full max-w-md">
                        <CardContent className="p-8 text-center space-y-6">
                            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold">Interview Complete!</h2>
                                <p className="text-muted-foreground">
                                    Great job! Let's review your performance and get personalized feedback.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </LayoutWrapper>
        )
    }

    return (
        <LayoutWrapper currentPage="practice">
            <div className="flex-1 p-6 space-y-6">
                {/* Header with Progress */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">Interview Practice</h1>
                        <Badge variant="outline">
                            Question {currentQuestionIndex + 1} of {mockQuestions.length}
                        </Badge>
                    </div>
                    <Progress value={progress} className="w-full" />
                </div>

                {/* Question Card */}
                <Card className="max-w-4xl mx-auto">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary">{currentQuestion.category}</Badge>
                                    <Badge variant="outline">{currentQuestion.skill}</Badge>
                                </div>
                                <CardTitle className="text-xl leading-relaxed">{currentQuestion.question}</CardTitle>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Input Mode Toggle */}
                        <div className="flex items-center gap-4">
                            <Label className="text-sm font-medium">Answer via:</Label>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant={inputMode === "text" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setInputMode("text")}
                                    className="gap-2"
                                >
                                    <FileText className="h-4 w-4" />
                                    Text
                                </Button>
                                <Button
                                    variant={inputMode === "voice" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setInputMode("voice")}
                                    className="gap-2"
                                >
                                    <Mic className="h-4 w-4" />
                                    Voice
                                </Button>
                            </div>
                        </div>

                        {/* Answer Input */}
                        {inputMode === "text" ? (
                            <div className="space-y-2">
                                <Label htmlFor="interview-answer">Your Answer</Label>
                                <Textarea
                                    id="interview-answer"
                                    placeholder="Take your time to structure your response using the STAR method..."
                                    value={answers[currentQuestion.id] || ""}
                                    onChange={(e) => handleAnswerChange(e.target.value)}
                                    className="min-h-[200px]"
                                />
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-lg">
                                    <div className="text-center space-y-4">
                                        <Button
                                            size="lg"
                                            variant={isRecording ? "destructive" : "default"}
                                            onClick={toggleRecording}
                                            className="gap-2"
                                        >
                                            {isRecording ? (
                                                <>
                                                    <MicOff className="h-5 w-5" />
                                                    Stop Recording
                                                </>
                                            ) : (
                                                <>
                                                    <Mic className="h-5 w-5" />
                                                    Start Recording
                                                </>
                                            )}
                                        </Button>
                                        <p className="text-sm text-muted-foreground">
                                            {isRecording ? "Recording your response..." : "Click to start voice recording"}
                                        </p>
                                        {isRecording && (
                                            <div className="flex items-center justify-center gap-1">
                                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-75"></div>
                                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-150"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {answers[currentQuestion.id] && (
                                    <div className="p-4 bg-muted rounded-lg">
                                        <Label className="text-sm font-medium">Transcribed Answer:</Label>
                                        <p className="mt-2 text-sm">{answers[currentQuestion.id]}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="flex items-center justify-between pt-4">
                            <Button variant="outline" onClick={handleSkipQuestion} className="gap-2 bg-transparent">
                                <SkipForward className="h-4 w-4" />
                                Skip Question
                            </Button>

                            <Button
                                onClick={handleNextQuestion}
                                className="gap-2"
                                disabled={inputMode === "text" && !answers[currentQuestion.id]?.trim()}
                            >
                                {currentQuestionIndex === mockQuestions.length - 1 ? "Finish Interview" : "Next Question"}
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </LayoutWrapper>
    )
}
