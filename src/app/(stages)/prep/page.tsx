"use client"

import { useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import WritingPanel from "./components/writing-panel"

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
    const [savedAnswers, setSavedAnswers] = useState<Record<string, string>>({})

    const handleSaveAnswer = (question: string, answer: string) => {
        setSavedAnswers((prev) => ({ ...prev, [question]: answer }))
    }

    const currentSkillTips = skillTips[selectedSkill as keyof typeof skillTips] || []

    return (
        <LayoutWrapper currentPage="prep">
            <div className="flex-1 p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Interview Preparation Hub</h1>
                        <p className="text-muted-foreground mt-1">
                            Structure your stories and practice soft skills with detailed feedback
                        </p>
                    </div>
                </div>

                <WritingPanel
                    selectedSkill={selectedSkill}
                    selectedQuestion={selectedQuestion}
                    setSelectedQuestion={setSelectedQuestion}
                    savedAnswers={savedAnswers}
                    handleSaveAnswer={handleSaveAnswer}
                    currentSkillTips={currentSkillTips}
                    starTemplate={starTemplate}
                />
            </div>
        </LayoutWrapper>
    )
}

