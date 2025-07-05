"use client"

import { useState, useMemo } from "react"
import Link from "next/link"

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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

import { BookOpen, Mic, BarChart3, ChevronDown, Target } from "lucide-react"
import { SKILLS_DATA } from "@/lib/soft-skills-data"
import clsx from "clsx"

interface AppSidebarProps {
    currentPage: "prep" | "practice" | "review"
    selectedSkill: string
    onSkillSelect: (skill: string) => void
    onQuestionSelect: (question: string) => void
}

export function AppSidebar({
                               currentPage,
                               selectedSkill,
                               onSkillSelect,
                               onQuestionSelect,
                           }: AppSidebarProps) {
    const [expandedSkills, setExpandedSkills] = useState<string[]>([selectedSkill])

    const skillEntries = useMemo(() => Object.entries(SKILLS_DATA), [])

    const toggleSkill = (skillKey: string) =>
        setExpandedSkills((prev) =>
            prev.includes(skillKey) ? prev.filter((s) => s !== skillKey) : [...prev, skillKey]
        )

    const stages = [
        { path: "/prep", label: "Prep", icon: BookOpen },
        { path: "/practice", label: "Practice", icon: Mic },
        { path: "/review", label: "Review", icon: BarChart3 },
    ]

    return (
        <Sidebar className="border-r text-[16px]">
            <SidebarHeader className="p-4">
                <div className="flex items-center gap-2">
                    <Target className="h-6 w-6 text-primary" />
                    <h1 className="font-bold text-xl">AI Interview Coach</h1>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[14px] font-semibold">Stages</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {stages.map(({ path, label, icon: Icon }) => (
                                <SidebarMenuItem key={path}>
                                    <SidebarMenuButton asChild>
                                        <Link href={path} className="w-full justify-start flex items-center gap-2">
                                            <Icon className="h-5 w-5" />
                                            <span className="text-[16px]">{label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {currentPage === "prep" && (
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-[14px] font-semibold">Soft Skills</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {skillEntries.map(([skillKey, skillValue]) => (
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
                                                    className="w-full justify-start flex items-center gap-2"
                                                >
                                                    <skillValue.icon className="h-5 w-5" />
                                                    <span className="text-[16px]">{skillValue.label}</span>
                                                    <ChevronDown
                                                        className={clsx(
                                                            "ml-auto h-4 w-4 transition-transform",
                                                            { "rotate-180": expandedSkills.includes(skillKey) }
                                                        )}
                                                    />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>

                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {skillValue.questions.map((question, index) => (
                                                        <SidebarMenuSubItem key={index}>
                                                            <SidebarMenuSubButton
                                                                onClick={() => onQuestionSelect(question)}
                                                                className="text-[14px]"
                                                            >
                                                                {question.length > 60
                                                                    ? `${question.substring(0, 60)}...`
                                                                    : question}
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
