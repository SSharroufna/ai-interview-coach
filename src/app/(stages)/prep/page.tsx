"use client"

import { useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Save, Lightbulb } from "lucide-react"
import Link from "next/link"

const starTemplate = {
    situation: "Describe the context or background of the situation",
    task: "Explain what you needed to accomplish or your responsibility",
    action: "Detail the specific actions you took to address the situation",
    result: "Share the outcomes and what you learned from the experience",
}

const skillTips = {
    leadership: [
        "Focus on how you inspired and guided others",
        "Highlight decision-making under pressure",
        "Show how you developed team members",
        "Demonstrate accountability for team outcomes",
    ],
    "conflict-resolution": [
        "Emphasize active listening skills",
        "Show empathy for all parties involved",
        "Highlight your problem-solving approach",
        "Focus on win-win solutions",
    ],
    teamwork: [
        "Show collaboration and support for others",
        "Highlight your role in team success",
        "Demonstrate adaptability in team dynamics",
        "Show how you contribute to team morale",
    ],
    communication: [
        "Use clear, concise language",
        "Show active listening skills",
        "Demonstrate adaptability to different audiences",
        "Highlight feedback and follow-up",
    ],
    "problem-solving": [
        "Break down your thought process step by step",
        "Show creativity and innovation",
        "Highlight research and analysis skills",
        "Demonstrate persistence and resilience",
    ],
    "presentation-skills": [
        "Show preparation and organization",
        "Highlight audience engagement techniques",
        "Demonstrate confidence under pressure",
        "Show adaptability when things go wrong",
    ],
    "analytical-thinking": [
        "Show systematic approach to analysis",
        "Highlight data-driven decision making",
        "Demonstrate pattern recognition",
        "Show how you validate assumptions",
    ],
    initiative: [
        "Show proactive problem identification",
        "Highlight self-motivation and drive",
        "Demonstrate ownership and accountability",
        "Show impact beyond your role",
    ],
}

export default function PrepPage() {
    const [selectedSkill, setSelectedSkill] = useState<string>("leadership")
    const [selectedQuestion, setSelectedQuestion] = useState<string>("")
    const [answer, setAnswer] = useState("")
    const [showTips, setShowTips] = useState(true)
    const [showStar, setShowStar] = useState(false)
    const [savedAnswers, setSavedAnswers] = useState<Record<string, string>>({})

    const handleSaveAnswer = () => {
        if (selectedQuestion && answer.trim()) {
            setSavedAnswers((prev) => ({
                ...prev,
                [selectedQuestion]: answer,
            }))
            alert("Answer saved successfully!")
        }
    }

    const currentSkillTips = skillTips[selectedSkill as keyof typeof skillTips] || []

    return (
        <LayoutWrapper currentPage="prep">
            <div className="flex-1 p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Interview Preparation Hub</h1>
                        <p className="text-muted-foreground mt-1">
                            Structure your stories and practice soft skills with detailed feedback
                        </p>
                    </div>
                    <Button asChild size="lg">
                        <Link href="/practice">Start Practice</Link>
                    </Button>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Question and Answer Form */}
                    <div className="lg:col-span-2 space-y-4">
                        {selectedQuestion ? (
                            <Card>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-2">
                                            <Badge variant="outline" className="capitalize">
                                                {selectedSkill.replace("-", " ")}
                                            </Badge>
                                            <CardTitle className="text-lg leading-relaxed">{selectedQuestion}</CardTitle>
                                        </div>
                                        {savedAnswers[selectedQuestion] && <Badge variant="secondary">Saved</Badge>}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="answer">Your Answer</Label>
                                        <Textarea
                                            id="answer"
                                            placeholder="Type your answer here... Use the STAR method for structured responses."
                                            value={answer}
                                            onChange={(e) => setAnswer(e.target.value)}
                                            className="min-h-[200px]"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button onClick={handleSaveAnswer} className="gap-2">
                                            <Save className="h-4 w-4" />
                                            Save Answer
                                        </Button>
                                        <Button variant="outline" onClick={() => setAnswer("")}>
                                            Clear
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card>
                                <CardContent className="flex items-center justify-center h-64">
                                    <div className="text-center space-y-2">
                                        <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto" />
                                        <h3 className="text-lg font-medium">Select a Question</h3>
                                        <p className="text-muted-foreground">
                                            Choose a soft skill from the sidebar and select a question to start preparing
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Tips and STAR Template */}
                    <div className="space-y-4">
                        {/* Skill-specific Tips */}
                        {currentSkillTips.length > 0 && (
                            <Collapsible open={showTips} onOpenChange={setShowTips}>
                                <Card>
                                    <CollapsibleTrigger asChild>
                                        <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                                            <CardTitle className="flex items-center justify-between text-base">
                        <span className="flex items-center gap-2">
                          <Lightbulb className="h-4 w-4" />
                          Tips for {selectedSkill.replace("-", " ")}
                        </span>
                                                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                                            </CardTitle>
                                        </CardHeader>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <CardContent className="pt-0">
                                            <ul className="space-y-2">
                                                {currentSkillTips.map((tip, index) => (
                                                    <li key={index} className="text-sm flex items-start gap-2">
                                                        <span className="text-primary mt-1">•</span>
                                                        <span>{tip}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </CollapsibleContent>
                                </Card>
                            </Collapsible>
                        )}

                        {/* STAR Template */}
                        <Collapsible open={showStar} onOpenChange={setShowStar}>
                            <Card>
                                <CollapsibleTrigger asChild>
                                    <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                                        <CardTitle className="flex items-center justify-between text-base">
                                            <span>STAR Method Template</span>
                                            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                                        </CardTitle>
                                    </CardHeader>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <CardContent className="pt-0 space-y-3">
                                        {Object.entries(starTemplate).map(([key, description]) => (
                                            <div key={key} className="space-y-1">
                                                <h4 className="font-medium text-sm capitalize text-primary">{key}</h4>
                                                <p className="text-xs text-muted-foreground">{description}</p>
                                            </div>
                                        ))}
                                    </CardContent>
                                </CollapsibleContent>
                            </Card>
                        </Collapsible>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    )
}
