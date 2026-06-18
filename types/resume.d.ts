// types/resume.ts

export interface ResumeAnalysis {
  atsScore: number;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  recommendedRoles: string[];
  summary: string;
}