"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
    BookOpen,
    Mic,
    BarChart3,
    ChevronDown,
    Users,
    MessageSquare,
    Lightbulb,
    Presentation,
    Target,
    Zap,
    Brain,
    Shield,
} from "lucide-react"

const softSkills = {
    leadership: {
        icon: Users,
        label: "Leadership",
        questions: [
            "Tell me about a time you led a team through a difficult project",
            "Describe a situation where you had to motivate an underperforming team member",
            "How do you handle disagreements within your team?",
            "Give an example of when you had to make a tough decision as a leader",
        ],
    },
    "conflict-resolution": {
        icon: Shield,
        label: "Conflict Resolution",
        questions: [
            "Describe a time you resolved a conflict between team members",
            "How do you handle disagreements with your manager?",
            "Tell me about a time you had to deal with a difficult stakeholder",
            "Give an example of when you turned a negative situation into a positive one",
        ],
    },
    teamwork: {
        icon: Users,
        label: "Teamwork",
        questions: [
            "Describe your ideal team environment",
            "Tell me about a successful team project you were part of",
            "How do you handle working with difficult team members?",
            "Give an example of when you helped a struggling teammate",
        ],
    },
    communication: {
        icon: MessageSquare,
        label: "Communication",
        questions: [
            "Describe a time you had to explain a complex concept to a non-technical audience",
            "Tell me about a presentation that didn't go as planned",
            "How do you ensure clear communication in remote teams?",
            "Give an example of when you had to deliver bad news",
        ],
    },
    "problem-solving": {
        icon: Lightbulb,
        label: "Problem-Solving",
        questions: [
            "Walk me through your approach to solving complex problems",
            "Describe a time you solved a problem with limited resources",
            "Tell me about an innovative solution you implemented",
            "How do you prioritize when facing multiple urgent issues?",
        ],
    },
    "presentation-skills": {
        icon: Presentation,
        label: "Presentation Skills",
        questions: [
            "Describe your most challenging presentation experience",
            "How do you prepare for important presentations?",
            "Tell me about a time you had to present to senior executives",
            "How do you handle difficult questions during presentations?",
        ],
    },
    "analytical-thinking": {
        icon: Brain,
        label: "Analytical Thinking",
        questions: [
            "Describe a time you used data to make a decision",
            "How do you approach analyzing complex problems?",
            "Tell me about a time your analysis led to unexpected insights",
            "Give an example of when you had to make a decision with incomplete information",
        ],
    },
    initiative: {
        icon: Zap,
        label: "Initiative",
        questions: [
            "Tell me about a project you started without being asked",
            "Describe a time you identified and solved a problem proactively",
            "How do you stay motivated when working independently?",
            "Give an example of when you went above and beyond your role",
        ],
    },
}

interface AppSidebarProps {
    currentPage: "prep" | "practice" | "review"
    selectedSkill: string
    onSkillSelect: (skill: string) => void
    onQuestionSelect: (question: string) => void
}

export function AppSidebar({ currentPage, selectedSkill, onSkillSelect, onQuestionSelect }: AppSidebarProps) {
    const [expandedSkills, setExpandedSkills] = useState<string[]>([selectedSkill])
    const pathname = usePathname()

    const toggleSkill = (skillKey: string) => {
        setExpandedSkills((prev) => (prev.includes(skillKey) ? prev.filter((s) => s !== skillKey) : [...prev, skillKey]))
    }

    return (
        <Sidebar className="border-r">
            <SidebarHeader className="p-4">
                <div className="flex items-center gap-2">
                    <Target className="h-6 w-6 text-primary" />
                    <h1 className="font-bold text-lg">AI Interview Coach</h1>
                </div>
            </SidebarHeader>

            <SidebarContent>
                {/* Stage Navigation */}
                <SidebarGroup>
                    <SidebarGroupLabel>Stages</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname === "/prep"}>
                                    <Link href="/prep" className="w-full justify-start">
                                        <BookOpen className="h-4 w-4" />
                                        <span>Prep</span>
                                        {pathname === "/prep" && (
                                            <Badge variant="secondary" className="ml-auto">
                                                Active
                                            </Badge>
                                        )}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname === "/practice"}>
                                    <Link href="/practice" className="w-full justify-start">
                                        <Mic className="h-4 w-4" />
                                        <span>Practice</span>
                                        {pathname === "/practice" && (
                                            <Badge variant="secondary" className="ml-auto">
                                                Active
                                            </Badge>
                                        )}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname === "/review"}>
                                    <Link href="/review" className="w-full justify-start">
                                        <BarChart3 className="h-4 w-4" />
                                        <span>Review</span>
                                        {pathname === "/review" && (
                                            <Badge variant="secondary" className="ml-auto">
                                                Active
                                            </Badge>
                                        )}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Soft Skills - Only show in Prep page */}
                {pathname === "/prep" && (
                    <SidebarGroup>
                        <SidebarGroupLabel>Soft Skills</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {Object.entries(softSkills).map(([skillKey, skill]) => (
                                    <Collapsible
                                        key={skillKey}
                                        open={expandedSkills.includes(skillKey)}
                                        onOpenChange={() => toggleSkill(skillKey)}
                                    >
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton
                                                    onClick={() => onSkillSelect(skillKey)}
                                                    isActive={selectedSkill === skillKey}
                                                    className="w-full justify-start"
                                                >
                                                    <skill.icon className="h-4 w-4" />
                                                    <span>{skill.label}</span>
                                                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {skill.questions.map((question, index) => (
                                                        <SidebarMenuSubItem key={index}>
                                                            <SidebarMenuSubButton onClick={() => onQuestionSelect(question)} className="text-xs">
                                                                {question.length > 50 ? `${question.substring(0, 50)}...` : question}
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
