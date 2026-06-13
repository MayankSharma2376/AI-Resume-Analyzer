import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { resumes } from "~/constants"; 


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume AI Checker" },
    { name: "description", content: "Smart AI Checker for Resumes" },
  ];
}

export default function Home() {
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
   <Navbar/>
<section className="main-section py-20 text-center">
  <div className="page-heading max-w-3xl mx-auto py-16">
    <h1 className="text-4xl font-bold mb-4">Refine your Resume using an AI</h1>
    <h2 className="text-xl text-gray-700">Use AI-Powered-Feedback to land jobs faster</h2>
   
  </div>

</section>



{resumes.length > 0 && (
  <section className="resume-section py-10">
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
      {resumes.map((resume: Resume, index)=>(
        <ResumeCard key={resume.id ?? index} resume={resume}/>
      ))}
    </div>
  </section>
)}

  </main>
}
