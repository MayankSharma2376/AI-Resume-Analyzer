import { useEffect } from "react";
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import { resumes } from "../constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "../../lib/puter";
import { useNavigate } from "react-router";





export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume AI Checker" },
    { name: "description", content: "Smart AI Checker for Resumes" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  // Handle Redirection - redirect to auth if not authenticated
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated, navigate]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover bg-center bg-no-repeat min-h-screen">
      {/* Navbar */}
      
      <div className="sticky top-0 z-50 backdrop-blur-sm bg-white/80 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <Navbar />
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="main-section py-8 md:py-12 text-center">
        <div className="page-heading py-4 md:py-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            Refine your Resume using AI
          </h1>
          <h2 className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Use AI-powered feedback to land jobs faster. Get instant, actionable insights to improve your resume.
          </h2>
        </div>
      </section>

      {/* Resume Cards Section */}
      {resumes.length > 0 ? (
        <section className="resume-section pt-16 md:pt-20 pb-12 md:pb-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="mb-10 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
                Your Resumes
              </h2>
              <p className="text-gray-600">
                {resumes.length} {resumes.length === 1 ? 'resume' : 'resumes'} analyzed
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {resumes.map((resume: Resume, index) => (
                <ResumeCard key={resume.id ?? index} resume={resume} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="resume-section pt-16 md:pt-20 pb-12 md:pb-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="max-w-md mx-auto text-center">
              <div className="bg-white rounded-3xl p-12 shadow-lg border border-gray-100">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-pink-100 rounded-full flex items-center justify-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-12 w-12 text-blue-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  No Resumes Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Upload your first resume to get AI-powered feedback and improve your chances of landing your dream job.
                </p>
                <a 
                  href="/upload" 
                  className="primary-button w-fit mx-auto px-8 py-3 inline-flex items-center gap-2"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9m-5-9v8m0 0l-3-3m3 3l3-3" 
                    />
                  </svg>
                  Upload Your First Resume
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}