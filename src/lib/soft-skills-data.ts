import {Brain, Lightbulb, LucideIcon, MessageSquare, Presentation, Shield, Users, Zap} from "lucide-react";

export interface SoftSkill {
    icon: LucideIcon
    label: string
    questions: string[]
}

    export const SKILLS_DATA: Record<string, SoftSkill> = {
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
export default SKILLS_DATA;