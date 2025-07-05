"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ChevronDown, Lightbulb, Save } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

type WritingPanelProps = {
    selectedSkill: string
    selectedQuestion: string
    setSelectedQuestion: (q: string) => void
    savedAnswers: Record<string, string>
    handleSaveAnswer: (question: string, answer: string) => void
    currentSkillTips: string[]
    starTemplate: Record<string, string>
}

const WritingPanel = ({
                          selectedSkill,
                          selectedQuestion,
                          setSelectedQuestion,
                          savedAnswers,
                          handleSaveAnswer,
                          currentSkillTips,
                          starTemplate,
                      }: WritingPanelProps) => {
    const [answer, setAnswer] = useState("")
    const [showTips, setShowTips] = useState(true)
    const [showStar, setShowStar] = useState(false)

    return (
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
                                <Button onClick={() => handleSaveAnswer(selectedQuestion, answer)} className="gap-2">
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
                                        <ChevronDown className={`h-4 w-4 transition-transform ${showTips ? "rotate-180" : ""}`} />
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

                <Collapsible open={showStar} onOpenChange={setShowStar}>
                    <Card>
                        <CollapsibleTrigger asChild>
                            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                                <CardTitle className="flex items-center justify-between text-base">
                                    <span>STAR Method Template</span>
                                    <ChevronDown className={`h-4 w-4 transition-transform ${showStar ? "rotate-180" : ""}`} />
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
    )
}

export default WritingPanel
