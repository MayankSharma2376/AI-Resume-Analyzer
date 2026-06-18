import React, { type FormEvent, useState } from 'react'
import Navbar from '~/components/Navbar'
import FileUploader from './FileUploader'
import { getPuterAPI } from '../../lib/puter'
import { useNavigate } from 'react-router'

const Upload = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [statusText, setStatusText] = useState("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [companyName, setCompany] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const navigate = useNavigate()

  const handleFileSelect = (file: File | null) => {
    setResumeFile(file)
  }

  const handleSubmit = async (
  e: FormEvent<HTMLFormElement>
) => {

  e.preventDefault();

  if (!resumeFile) {
    setStatusText("Please upload a resume");
    return;
  }

  try {

    setIsProcessing(true);

    const { fs, ai } = getPuterAPI();

    setStatusText("Uploading resume...");

    const uploadedFiles =
      await fs.upload([resumeFile]);

    const uploadedFile =
      Array.isArray(uploadedFiles)
        ? uploadedFiles[0]
        : uploadedFiles;

    const resumePath = uploadedFile.path;
    console.log("Resume Path : ", resumePath)

    setStatusText("Analyzing resume...");
    const prompt = `
Read the attached resume.

Tell me:
1. Candidate Name
2. Skills
3. Education

Return plain text only.
`;
//     const prompt = `
//     You are an expert ATS Resume Analyzer.
//     Read the attached resume file carefully.
//     Analyze the resume content and compare it against:

// Company:
// ${companyName}

// Job Title:
// ${jobTitle}

// Job Description:
// ${jobDescription}

// Return ONLY valid JSON.

// {
//   "atsScore":0,
//   "summary":"",
//   "strengths":[],
//   "weaknesses":[],
//   "missingSkills":[],
//   "recommendedRoles":[]
// }
// `;

    const response =
      await ai.feedback(
        resumePath,
        prompt
      );

    console.log("Full Response : ", response);
    console.log("CONTENT:", response?.message?.content)
    
    const cleanedContent = rawContent.replace(/```json/g, "")
    .replace(/```/g, "")
    .trim()

    const analysis = JSON.parse(cleanedContent)
    localStorage.setItem("resume-analysis", JSON.stringify(analysis))

    // localStorage.setItem(
    //   "resume-analysis",
    //   JSON.stringify(response)
    // );

    navigate("/results");

  } catch (error) {

    console.error(error);

    setStatusText(
      "Analysis failed"
    );

    setIsProcessing(false);
  }
};

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   if (!resumeFile) {
  //     setStatusText("Please upload a resume file before submitting.")
  //     return
  //   }
  //   setIsProcessing(true)
  //   setStatusText("Processing your resume...")
  //   // TODO: add actual upload logic here (e.g., send resumeFile to backend)
  //   console.log("Submitting with file:", resumeFile)
  // }

  return (
    <main className='bg-[url("/images/bg-main.svg")] bg-cover bg-center bg-no-repeat min-h-screen'>
      <Navbar />
      <section className='main-section'>
        <div className='page-heading py-16 text-center'>
          <h1>Smart AI Feedback for your dream job</h1>

          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" alt="Scanning resume" className="mx-auto" />
            </>
          ) : (
            <h2>Upload your resume for an ATS Score and improvement tips.</h2>
          )}

          {!isProcessing && (
            <form id='upload-form' onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 items-center">
              <div className='form-div flex flex-col gap-2'>
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e)=> setCompany(e.target.value)}
                  name='company-name'
                  placeholder='Company Name'
                  id='company-name'
                  className="border rounded px-3 py-2"
                />
              </div>
              <div className='form-div flex flex-col gap-2'>
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e)=>setJobTitle(e.target.value)}
                  name='job-title'
                  placeholder='Job Title'
                  id='job-title'
                  className="border rounded px-3 py-2"
                />
              </div>
              <div className='form-div flex flex-col gap-2'>
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  rows={5}
                  name='job-description'
                  value={jobDescription}
                  onChange={(e)=>setJobDescription(e.target.value)}
                  placeholder='Job Description'
                  id='job-description'
                  className="border rounded px-3 py-2"
                />
              </div>
              <div className='form-div flex flex-col gap-2 w-full'>
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
                {resumeFile && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected file: <strong>{resumeFile.name}</strong>
                  </p>
                )}
              </div>

              <button type="submit" className="primary-button px-6 py-2 rounded bg-blue-600 text-white">
                Analyze your Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}

export default Upload
