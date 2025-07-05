"use client"

import { useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
    ArrowLeft,
    BarChart3,
    TrendingUp,
    TrendingDown,
    Lightbulb,
    CheckCircle,
    AlertCircle,
    ChevronDown,
    Play,
    RefreshCw,
} from "lucide-react"
import Link from "next/link"

const mockReviewData = {
    overallScore: 78,
    metrics: {
        answerLength: {
            score: 85,
            feedback: "Good",
            description: "Your answers were well-detailed without being too lengthy",
        },
        vocabulary: { score: 72, feedback: "Average", description: "Consider using more industry-specific terminology" },
        structure: { score: 80, feedback: "Good", description: "Most answers followed the STAR method effectively" },
        skillDisplay: { score: 75, feedback: "Good", description: "You demonstrated relevant soft skills clearly" },
        roleRelevance: {
            score: 82,
            feedback: "Excellent",
            description: "Your examples were highly relevant to the target role",
        },
    },
    questions: [
        {
            id: 1,
            question:
                "Tell me about a time when you had to work with a difficult team member. How did you handle the situation?",
            skill: "Conflict Resolution",
            userAnswer:
                "In my previous role as a project manager, I had a team member who consistently missed deadlines and was resistant to feedback. I scheduled a private one-on-one meeting to understand their perspective and discovered they were overwhelmed with their workload. I worked with them to prioritize tasks and provided additional support, which improved their performance significantly.",
            aiAnalysis: {
                strengths: [
                    "Used specific example from professional experience",
                    "Showed empathy and problem-solving approach",
                    "Demonstrated positive outcome",
                ],
                weaknesses: [
                    "Could have elaborated more on the specific actions taken",
                    "Missing details about follow-up and long-term results",
                ],
                suggestions: [
                    "Add more details about the conversation and specific support provided",
                    "Mention how this experience influenced your future management style",
                    "Quantify the improvement in performance if possible",
                ],
                score: 75,
            },
        },
        {
            id: 2,
            question: "Describe a project where you had to learn a new technology quickly. What was your approach?",
            skill: "Problem-Solving",
            userAnswer:
                "When our team decided to migrate to React, I had only basic JavaScript knowledge. I created a learning plan with online courses, built small projects, and paired with experienced developers. Within 3 weeks, I was contributing to the main project and eventually became the go-to person for React questions.",
            aiAnalysis: {
                strengths: [
                    "Clear learning strategy outlined",
                    "Showed initiative and self-motivation",
                    "Demonstrated measurable progress and impact",
                ],
                weaknesses: [
                    "Could provide more specific details about the learning resources",
                    "Missing information about challenges faced during learning",
                ],
                suggestions: [
                    "Mention specific courses or resources used",
                    "Describe a particular challenge you overcame while learning",
                    "Add details about how you helped others learn React later",
                ],
                score: 82,
            },
        },
    ],
}

export default function ReviewPage() {
    const [expandedQuestions, setExpandedQuestions] = useState<number[]>([])

    const toggleQuestion = (questionId: number) => {
        setExpandedQuestions((prev) =>
            prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId],
        )
    }

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-600"
        if (score >= 60) return "text-yellow-600"
        return "text-red-600"
    }

    const getScoreBadgeVariant = (feedback: string) => {
        switch (feedback.toLowerCase()) {
            case "excellent":
                return "default"
            case "good":
                return "secondary"
            case "average":
                return "outline"
            default:
                return "destructive"
        }
    }

    return (
        <LayoutWrapper currentPage="review">
            <div className="flex-1 p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" asChild className="gap-2">
                            <Link href="/prep">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Prep
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold">Your Interview Performance Review</h1>
                            <p className="text-muted-foreground mt-1">
                                AI analysis of your responses with personalized feedback and suggestions
                            </p>
                        </div>
                    </div>
                    <Button asChild className="gap-2">
                        <Link href="/practice">
                            <RefreshCw className="h-4 w-4" />
                            Start New Practice
                        </Link>
                    </Button>
                </div>

                {/* Overall Score */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            Overall Performance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <div className="text-4xl font-bold text-primary">{mockReviewData.overallScore}%</div>
                            <div className="flex-1">
                                <Progress value={mockReviewData.overallScore} className="h-3" />
                                <p className="text-sm text-muted-foreground mt-2">
                                    Great job! You're performing well across most areas with room for improvement in vocabulary and
                                    structure.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Tabs defaultValue="metrics" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
                        <TabsTrigger value="questions">Question Breakdown</TabsTrigger>
                    </TabsList>

                    {/* Performance Metrics */}
                    <TabsContent value="metrics" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.entries(mockReviewData.metrics).map(([key, metric]) => (
                                <Card key={key}>
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-base capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</CardTitle>
                                            <Badge variant={getScoreBadgeVariant(metric.feedback)}>{metric.feedback}</Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-2xl font-bold ${getScoreColor(metric.score)}`}>{metric.score}%</span>
                                                {metric.score >= 80 ? (
                                                    <TrendingUp className="h-4 w-4 text-green-600" />
                                                ) : metric.score >= 60 ? (
                                                    <TrendingUp className="h-4 w-4 text-yellow-600" />
                                                ) : (
                                                    <TrendingDown className="h-4 w-4 text-red-600" />
                                                )}
                                            </div>
                                            <Progress value={metric.score} className="h-2" />
                                            <p className="text-sm text-muted-foreground">{metric.description}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Question Breakdown */}
                    <TabsContent value="questions" className="space-y-4">
                        {mockReviewData.questions.map((question) => (
                            <Collapsible
                                key={question.id}
                                open={expandedQuestions.includes(question.id)}
                                onOpenChange={() => toggleQuestion(question.id)}
                            >
                                <Card>
                                    <CollapsibleTrigger asChild>
                                        <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-2 flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline">{question.skill}</Badge>
                                                        <Badge variant="secondary">Score: {question.aiAnalysis.score}%</Badge>
                                                    </div>
                                                    <CardTitle className="text-base leading-relaxed">{question.question}</CardTitle>
                                                </div>
                                                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                                            </div>
                                        </CardHeader>
                                    </CollapsibleTrigger>

                                    <CollapsibleContent>
                                        <CardContent className="pt-0 space-y-6">
                                            {/* User Answer */}
                                            <div className="space-y-2">
                                                <h4 className="font-medium text-sm">Your Answer:</h4>
                                                <div className="p-4 bg-muted rounded-lg text-sm">{question.userAnswer}</div>
                                            </div>

                                            {/* AI Analysis */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {/* Strengths */}
                                                <div className="space-y-3">
                                                    <h4 className="font-medium text-sm flex items-center gap-2 text-green-600">
                                                        <CheckCircle className="h-4 w-4" />
                                                        Strengths
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {question.aiAnalysis.strengths.map((strength, index) => (
                                                            <li key={index} className="text-sm flex items-start gap-2">
                                                                <span className="text-green-500 mt-1">•</span>
                                                                <span>{strength}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Weaknesses */}
                                                <div className="space-y-3">
                                                    <h4 className="font-medium text-sm flex items-center gap-2 text-yellow-600">
                                                        <AlertCircle className="h-4 w-4" />
                                                        Areas for Improvement
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {question.aiAnalysis.weaknesses.map((weakness, index) => (
                                                            <li key={index} className="text-sm flex items-start gap-2">
                                                                <span className="text-yellow-500 mt-1">•</span>
                                                                <span>{weakness}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Suggestions */}
                                                <div className="space-y-3">
                                                    <h4 className="font-medium text-sm flex items-center gap-2 text-blue-600">
                                                        <Lightbulb className="h-4 w-4" />
                                                        Suggestions
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {question.aiAnalysis.suggestions.map((suggestion, index) => (
                                                            <li key={index} className="text-sm flex items-start gap-2">
                                                                <span className="text-blue-500 mt-1">•</span>
                                                                <span>{suggestion}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </CollapsibleContent>
                                </Card>
                            </Collapsible>
                        ))}
                    </TabsContent>
                </Tabs>

                {/* Action Buttons */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium">Ready for more practice?</h3>
                                <p className="text-sm text-muted-foreground">
                                    Continue improving your interview skills with more targeted practice sessions
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" asChild>
                                    <Link href="/prep">Review Prep Materials</Link>
                                </Button>
                                <Button asChild className="gap-2">
                                    <Link href="/practice">
                                        <Play className="h-4 w-4" />
                                        New Practice Session
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </LayoutWrapper>
    )
}
