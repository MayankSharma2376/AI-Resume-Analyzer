import React from 'react'
import { Link } from 'react-router'
import Scorecircle from './Scorecircle';

interface Resume{
  id: string;
  companyName: string;
  jobTitle?: string;
  imagePath: string;
  resumePath: string;
  feedback?: {overallScore?: number}
}

const ResumeCard = ({resume}: {resume: Resume}) => {
  const {id, companyName, jobTitle, imagePath, resumePath, feedback} = resume
  return (
    <Link to={`/resume/${resume.id}`} className='resume-card block bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-100 animate-in fade-in duration-1000'>
      <div className='resume-card-header'>
        <div className='flex flex-col gap-2'>
          {companyName && <h2 className='text-black font-bold break-words'>{companyName}</h2>}
          {jobTitle && <h3 className='text-lg break-words text-gray-300'>{jobTitle}</h3>}
          {companyName && jobTitle && <h2 className='text-black font-bold'></h2>}
        </div>
        <div className='flex-shrink-0'>
          <Scorecircle score={feedback?.overallScore}/>
        </div>

      </div>

      {imagePath && (
        <div className='gradient-border animate-in fade-in duration-1000'>
          <img src={imagePath} alt="resume" className='w-full max-h-[600px] object-contain' loading='lazy'style={{imageRendering: "auto"}}/>
        </div>
      )}
        {/* <div className='flex flex-col gap2'>
            <h2 className='text-black font-bold break-words'>{companyName}</h2>
        </div>
        <h3 className='text-xl font-semibold'>{jobTitle || "N/A"}</h3>
        <div className='flex-shrink-0'>
          <Scorecircle score={feedback?.overallScore ?? 0}/>
        </div>
        <div className='gradiennt-border animate-in fade-in duration-1000'>
          <div className='w-full h-full'>
            <img src={imagePath} alt='resume' className='w-fill h-[350px] max-sm:h-[200px] object-cover object-top'/>
          </div>
        </div> */}
    </Link>

  )
}

export default ResumeCard