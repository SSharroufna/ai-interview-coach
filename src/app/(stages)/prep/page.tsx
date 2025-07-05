"use client"

import { LayoutWrapper } from "@/components/layout-wrapper"
import WritingPanel from "./components/writing-panel"
import TipsAndMethod from "./components/tips-and-method"

export default function PrepPage() {
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

                <div className="flex items-center justify-between">
                <WritingPanel/>
                <TipsAndMethod />
                </div>
            </div>
        </LayoutWrapper>
    )
}

