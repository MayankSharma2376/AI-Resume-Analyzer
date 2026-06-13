// In this file three workflows : 
// resumes - store candidate resume with paths and feedback structure.
// AI Response Format - defines the structure strict format that AI should return.
// prepareInstructions - generate a prompt for Ai to analyze the resume in exact format.

import { resume } from "react-dom/server";


export const resumes: Resume[] = [
    {id: "1", 
        companyName: "Google",
        jobTitle: "Frontend Developer",
        imagePath: "/images/resume_01.png",
        resumePath: "/resumes/resume-1.pdf",
        feedback: {
            overallScore: 85,
            ATS: {
                score: 90,
                tips: []
            },
            toneAndStyle: {
                score: 90,
                tips: []
            },
            content: {
                score: 90,
                tips: []
            },
            structure: {
                score: 90,
                tips: []
            },
            skills: {
                score: 90,
                tips: []
            },

        },


    },
    {id: "2", 
        companyName: "Microsoft",
        jobTitle: "Cloud Engineer",
        imagePath: "/images/resume_02.png",
        resumePath: "/resumes/resume-2.pdf",
        feedback: {
            overallScore: 50,
            ATS: {
                score: 90,
                tips: []
            },
            toneAndStyle: {
                score: 90,
                tips: []
            },
            content: {
                score: 90,
                tips: []
            },
            structure: {
                score: 90,
                tips: []
            },
            skills: {
                score: 90,
                tips: []
            },

        },


    },
    {id: "3", 
        companyName: "Apple",
        jobTitle: "iOS Developer",
        imagePath: "/images/resume_03.png",
        resumePath: "/resumes/resume-2.pdf",
        feedback: {
            overallScore: 50,
            ATS: {
                score: 90,
                tips: []
            },
            toneAndStyle: {
                score: 90,
                tips: []
            },
            content: {
                score: 90,
                tips: []
            },
            structure: {
                score: 90,
                tips: []
            },
            skills: {
                score: 90,
                tips: []
            },

        },


    },
    
    
];

// this is the formaat in which AI should provide us the feedback on a return.
// The AIRespondFormat is a string representing a Typescript Interfce
// It tells the Ai exactly what structure to use when retrieving the feedback

export const AIResponseFormat = `
interface Feedback{
    overallScore: number; // max 100
    ATS:{
        score:number, // rate us based on ATS Suitability
        tips: {
            tips: "good" | "improve";
            tip: string
        } []

    }
    toneAndStyle: {
        score:number;
        tips: {
            tips: "good" | "improve";
            tip: string
            explainantion: string

        }[]
    }
    content: {
        score:number;
        tips: {
            tips: "good" | "improve";
            tip: string
            explainantion: string

        }[]
    }
    structure: {
        score:number;
        tips: {
            tips: "good" | "improve";
            tip: string
            explainantion: string

        }[]
    }
    skills: {
        score:number;
        tips: {
            tips: "good" | "improve";
            tip: string
            explainantion: string

        }[]
    }


}`

// This function prepare instructions for the AI to analyze a response
// It take the job title, job description and AI response format, and then returns a string prompt


export const prepareInstructions = ({
    jobTitle,
    jobDescription,
    AIResponseFormat,

}:{
    jobTitle: string,
    jobDescription: string,
    AIResponseFormat: string
}) => `You are an expert in ATS (Application Tracking System) and resume analysis.
please analyze and rate this resume and support it. The rating can be low if the resume is bad Be through and detailed.
Don't be afraid to point out my mistakes of areas of improvement.
If there is a lot to improve, don't be hesitate to give low scores. This is to help the user improve.
If available, use the job description for the job user is applying to give a more detailed feedback.
If provided, take the job description into candidates before giving a response.
The Job Title : ${jobTitle}
The Job Description: ${jobDescription}
Provide the feedback using the following format: ${AIResponseFormat}
Returns the analysis in a JSON object, without any other text and without any backticks.
Do not include any other Text or Comments.`;