"use client"

import type React from "react"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Target, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LayoutWrapperProps {
    children: React.ReactNode
    currentPage: "prep" | "practice" | "review"
}

export function LayoutWrapper({ children, currentPage }: LayoutWrapperProps) {
    const [selectedSkill, setSelectedSkill] = useState<string>("leadership")
    const [selectedQuestion, setSelectedQuestion] = useState<string>("")

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full">
                <AppSidebar
                    currentPage={currentPage}
                    selectedSkill={selectedSkill}
                    onSkillSelect={setSelectedSkill}
                    onQuestionSelect={setSelectedQuestion}
                />
                <SidebarInset className="flex-1">
                    <div className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
                        <SidebarTrigger className="h-8 w-8 p-1 hover:bg-muted rounded-md transition-colors border" />
                        <Button variant="ghost" size="sm" className="lg:hidden">
                            <Menu className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-primary" />
                            <span className="font-semibold">AI Interview Coach</span>
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto">{children}</div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}
