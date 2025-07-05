"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Lightbulb, Save } from "lucide-react"

const WritingPanel = () => {
    const [answer, setAnswer] = useState("")
    const selectedQuestion = "Describe a time when you had to lead a team through a challenging project."
    const selectedSkill = "leadership"

    return (
        <>
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
                            <Button className="gap-2">
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
        </>
    )
}

export default WritingPanel