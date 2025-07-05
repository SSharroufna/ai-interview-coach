import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ChevronDown, Lightbulb} from "lucide-react";
import {useState} from "react";

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

const TipsAndMethod = () => {
    const [showTips, setShowTips] = useState(true)
    const [showStar, setShowStar] = useState(false)
    const [selectedSkill, setSelectedSkill] = useState<string>("leadership")

    const currentSkillTips = skillTips[selectedSkill as keyof typeof skillTips] || []

    return (
        <>
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
        </>
    );
}

export default TipsAndMethod;