interface Job {
    // represent a job posting using key details
    title: string;
    description: string;
    location: string;
    requiredSkills: string[]
}


// representing a candidate's resuem and associated evaluation feedback

interface Resume {
    id: string;
    companyName: string;
    jobTitle: string;
    imagePath: string;
    resumePath: string
    feedback: feedback

}

// represent detailed evaluation feedback for a resume

interface Feedback {
    overallScore: number;


    ATS: {
        score: number;
        tips: {
            type: "good" | "improve"
            tip: string
        }[]
    }

    // evaluating the type and section of resume

    toneAndStyle: {
        score: number;
        tips: {
            type: "good" | "improve"
            tip: string
            explainantion: string
        }[]
    }

    content: {
        score: number;
        tips: {
            type: "good" | "improve"
            tip: string
            explainantion: string
        }[]
    }
    structure: {
        score: number;
        tips: {
            type: "good" | "improve"
            tip: string
            explainantion: string
        }[]
    }
    skills: {
        score: number;
        tips: {
            type: "good" | "improve"
            tip: string
            explainantion: string
        }[]
    }









}