// import api from "../api/client";
// import { useNavigate } from "react-router-dom";

// export default function Academic() {
//   const navigate = useNavigate();

//   async function submit(e) {
//     e.preventDefault();
//     const f = e.target;
//     await api.post("/onboarding/academic", {
//       education_level: f.level.value,
//       major: f.major.value,
//       graduation_year: f.year.value,
//       gpa: f.gpa.value,
//     });
//     navigate("/onboarding/study-goal");
//   }

//   return (
//     <form onSubmit={submit} className="p-8">
//       <input name="level" placeholder="Education level" />
//       <input name="major" placeholder="Major" />
//       <input name="year" placeholder="Graduation year" />
//       <input name="gpa" placeholder="GPA" />
//       <button>Next</button>
//     </form>
//   );
// }








import api from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Academic() {
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const f = e.target;
    await api.post("/onboarding/academic", {
      education_level: f.level.value,
      major: f.major.value,
      graduation_year: f.year.value,
      gpa: f.gpa.value,
    });
    navigate("/onboarding/study-goal");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form 
        onSubmit={submit} 
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Academic Information
        </h1>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Education Level
            </label>
            <input 
              name="level" 
              placeholder="e.g., Bachelor's, Master's, PhD"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Major
            </label>
            <input 
              name="major" 
              placeholder="e.g., Computer Science, Business"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Graduation Year
            </label>
            <input 
              name="year" 
              type="number"
              placeholder="e.g., 2024"
              min="1900"
              max="2100"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GPA
            </label>
            <input 
              name="gpa" 
              type="number"
              step="0.01"
              min="0"
              max="10.0"
              placeholder="e.g., 3.75"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 mt-2"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}












// import api from "../api/client";
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// const EDUCATION_LEVELS = [
//   { value: "high_school", label: "High School / Secondary School" },
//   { value: "diploma", label: "Diploma / Certificate" },
//   { value: "bachelors", label: "Bachelor's Degree" },
//   { value: "masters", label: "Master's Degree" },
//   { value: "phd", label: "PhD / Doctorate" },
//   { value: "postdoc", label: "Postdoctoral" },
//   { value: "associate", label: "Associate Degree" },
//   { value: "professional", label: "Professional Certificate" }
// ];

// const GPA_SCALES = [
//   { value: "4.0", label: "4.0 Scale (US)" },
//   { value: "10.0", label: "10.0 Scale" },
//   { value: "100", label: "Percentage (%)" },
//   { value: "UK", label: "UK Classification" },
//   { value: "EU", label: "European ECTS" }
// ];

// const POPULAR_MAJORS = [
//   "Computer Science", "Electrical Engineering", "Mechanical Engineering",
//   "Business Administration", "Medicine", "Law", "Psychology", "Biology",
//   "Chemistry", "Physics", "Mathematics", "Economics", "Finance",
//   "Architecture", "Civil Engineering", "Data Science", "Artificial Intelligence",
//   "Biotechnology", "Environmental Science", "Political Science", "History",
//   "English Literature", "Fine Arts", "Music", "Pharmacy", "Nursing"
// ];

// export default function Academic() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [formData, setFormData] = useState({
//     level: "",
//     major: "",
//     year: "",
//     gpa: "",
//     gpaScale: "4.0",
//     institution: "",
//     country: "",
//     researchExperience: false,
//     publications: 0,
//     awards: "",
//     transcript: null,
//     searchMajor: ""
//   });

//   const currentYear = new Date().getFullYear();
//   const yearOptions = Array.from({ length: 60 }, (_, i) => currentYear - i);

//   // Calculate GPA percentage if needed
//   const [gpaPercentage, setGpaPercentage] = useState(null);
  
//   useEffect(() => {
//     if (formData.gpa && formData.gpaScale === "4.0") {
//       const percentage = (parseFloat(formData.gpa) / 4.0) * 100;
//       setGpaPercentage(percentage.toFixed(1));
//     } else {
//       setGpaPercentage(null);
//     }
//   }, [formData.gpa, formData.gpaScale]);

//   const filteredMajors = POPULAR_MAJORS.filter(major =>
//     major.toLowerCase().includes(formData.searchMajor.toLowerCase())
//   );

//   function handleChange(e) {
//     const { name, value, type, checked, files } = e.target;
    
//     if (type === 'checkbox') {
//       setFormData(prev => ({ ...prev, [name]: checked }));
//     } else if (type === 'file') {
//       setFormData(prev => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     }
//   }

//   function validateForm() {
//     const newErrors = {};
    
//     if (!formData.level) {
//       newErrors.level = "Please select your education level";
//     }
    
//     if (!formData.major.trim()) {
//       newErrors.major = "Please enter your major";
//     }
    
//     if (!formData.year) {
//       newErrors.year = "Please select graduation year";
//     } else if (parseInt(formData.year) > currentYear + 5) {
//       newErrors.year = "Graduation year cannot be more than 5 years in the future";
//     }
    
//     if (formData.gpa) {
//       const gpaNum = parseFloat(formData.gpa);
//       if (formData.gpaScale === "4.0" && (gpaNum < 0 || gpaNum > 4.0)) {
//         newErrors.gpa = "GPA must be between 0.0 and 4.0";
//       } else if (formData.gpaScale === "10.0" && (gpaNum < 0 || gpaNum > 10.0)) {
//         newErrors.gpa = "GPA must be between 0.0 and 10.0";
//       } else if (formData.gpaScale === "100" && (gpaNum < 0 || gpaNum > 100)) {
//         newErrors.gpa = "Percentage must be between 0 and 100";
//       }
//     }
    
//     return newErrors;
//   }

//   async function submit(e) {
//     e.preventDefault();
//     setLoading(true);
//     setErrors({});

//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       setLoading(false);
//       return;
//     }

//     try {
//       const payload = {
//         education_level: formData.level,
//         major: formData.major,
//         graduation_year: formData.year,
//         gpa: formData.gpa,
//         gpa_scale: formData.gpaScale,
//         institution: formData.institution || null,
//         country: formData.country || null,
//         research_experience: formData.researchExperience,
//         publications: formData.publications,
//         awards: formData.awards || null,
//       };

//       // If there's a transcript file, we need to upload it separately
//       if (formData.transcript) {
//         const transcriptFormData = new FormData();
//         transcriptFormData.append('transcript', formData.transcript);
//         await api.post("/onboarding/upload-transcript", transcriptFormData, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//         });
//       }

//       await api.post("/onboarding/academic", payload);
//       navigate("/onboarding/study-goal");
//     } catch (error) {
//       console.error("Failed to save academic information:", error);
//       setErrors(prev => ({
//         ...prev,
//         form: error.response?.data?.message || "Failed to save academic information. Please try again."
//       }));
//     } finally {
//       setLoading(false);
//     }
//   }

//   function getGPALabel() {
//     switch (formData.gpaScale) {
//       case "4.0": return "GPA (out of 4.0)";
//       case "10.0": return "GPA (out of 10.0)";
//       case "100": return "Percentage (%)";
//       case "UK": return "UK Classification";
//       case "EU": return "ECTS Grade";
//       default: return "GPA";
//     }
//   }

//   function getGPAPlaceholder() {
//     switch (formData.gpaScale) {
//       case "4.0": return "e.g., 3.8";
//       case "10.0": return "e.g., 9.2";
//       case "100": return "e.g., 85";
//       case "UK": return "e.g., First Class, 2:1";
//       case "EU": return "e.g., A, B, C";
//       default: return "Enter your grade";
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col">
//       {/* Progress Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
//                 <span className="text-white font-bold">1</span>
//               </div>
//               <h1 className="text-lg font-semibold text-gray-800">Academic Background</h1>
//             </div>
//             <div className="text-sm text-gray-600">
//               Step 1 of 5
//             </div>
//           </div>
//           <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
//             <div className="bg-blue-600 h-2 rounded-full" style={{ width: '20%' }}></div>
//           </div>
//         </div>
//       </div>

//       <div className="flex-1 container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto">
//           <div className="mb-8 text-center">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">
//               📚 Your Academic Journey
//             </h2>
//             <p className="text-gray-600">
//               Tell us about your educational background and achievements
//             </p>
//           </div>

//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <form onSubmit={submit} className="p-6 md:p-8">
//               {errors.form && (
//                 <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
//                   <div className="flex">
//                     <svg className="h-5 w-5 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                     </svg>
//                     <div className="ml-3">
//                       <p className="text-sm text-red-700">{errors.form}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {/* Left Column */}
//                 <div className="space-y-6">
//                   {/* Education Level */}
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Highest Education Level *
//                     </label>
//                     <select
//                       name="level"
//                       value={formData.level}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                       required
//                     >
//                       <option value="">Select your education level</option>
//                       {EDUCATION_LEVELS.map(level => (
//                         <option key={level.value} value={level.value}>
//                           {level.label}
//                         </option>
//                       ))}
//                     </select>
//                     {errors.level && (
//                       <p className="mt-2 text-sm text-red-600">{errors.level}</p>
//                     )}
//                   </div>

//                   {/* Major */}
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Major / Field of Study *
//                     </label>
//                     <input
//                       type="text"
//                       name="searchMajor"
//                       value={formData.searchMajor}
//                       onChange={handleChange}
//                       placeholder="Search for your major..."
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 mb-2"
//                     />
//                     <div className="mb-2">
//                       <input
//                         type="text"
//                         name="major"
//                         value={formData.major}
//                         onChange={handleChange}
//                         placeholder="Or type your major here"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                       />
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                       {filteredMajors.slice(0, 8).map(major => (
//                         <button
//                           key={major}
//                           type="button"
//                           onClick={() => {
//                             setFormData(prev => ({ 
//                               ...prev, 
//                               major, 
//                               searchMajor: '' 
//                             }));
//                             if (errors.major) setErrors(prev => ({ ...prev, major: '' }));
//                           }}
//                           className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition duration-150"
//                         >
//                           {major}
//                         </button>
//                       ))}
//                     </div>
//                     {errors.major && (
//                       <p className="mt-2 text-sm text-red-600">{errors.major}</p>
//                     )}
//                   </div>

//                   {/* Institution & Country */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         Institution
//                       </label>
//                       <input
//                         type="text"
//                         name="institution"
//                         value={formData.institution}
//                         onChange={handleChange}
//                         placeholder="University name"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         Country
//                       </label>
//                       <input
//                         type="text"
//                         name="country"
//                         value={formData.country}
//                         onChange={handleChange}
//                         placeholder="Study location"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right Column */}
//                 <div className="space-y-6">
//                   {/* Graduation Year & GPA */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         Graduation Year *
//                       </label>
//                       <select
//                         name="year"
//                         value={formData.year}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                       >
//                         <option value="">Select year</option>
//                         {yearOptions.map(year => (
//                           <option key={year} value={year}>{year}</option>
//                         ))}
//                       </select>
//                       {errors.year && (
//                         <p className="mt-2 text-sm text-red-600">{errors.year}</p>
//                       )}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         GPA Scale
//                       </label>
//                       <select
//                         name="gpaScale"
//                         value={formData.gpaScale}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                       >
//                         {GPA_SCALES.map(scale => (
//                           <option key={scale.value} value={scale.value}>
//                             {scale.label}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   {/* GPA Input */}
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       {getGPALabel()}
//                     </label>
//                     <input
//                       type="text"
//                       name="gpa"
//                       value={formData.gpa}
//                       onChange={handleChange}
//                       placeholder={getGPAPlaceholder()}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                     />
//                     {gpaPercentage && formData.gpa && (
//                       <p className="mt-2 text-sm text-gray-600">
//                         ≈ {gpaPercentage}% (Converted)
//                       </p>
//                     )}
//                     {errors.gpa && (
//                       <p className="mt-2 text-sm text-red-600">{errors.gpa}</p>
//                     )}
//                   </div>

//                   {/* Research & Publications */}
//                   {/* <div className="space-y-4">
//                     <div className="flex items-center">
//                       <input
//                         type="checkbox"
//                         name="researchExperience"
//                         checked={formData.researchExperience}
//                         onChange={handleChange}
//                         className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                       />
//                       <label className="ml-2 text-sm font-medium text-gray-700">
//                         Research Experience
//                       </label>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         Publications
//                       </label>
//                       <div className="flex items-center space-x-2">
//                         <button
//                           type="button"
//                           onClick={() => setFormData(prev => ({ 
//                             ...prev, 
//                             publications: Math.max(0, prev.publications - 1) 
//                           }))}
//                           className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50"
//                         >
//                           -
//                         </button>
//                         <input
//                           type="number"
//                           name="publications"
//                           value={formData.publications}
//                           onChange={handleChange}
//                           min="0"
//                           className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setFormData(prev => ({ 
//                             ...prev, 
//                             publications: prev.publications + 1 
//                           }))}
//                           className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50"
//                         >
//                           +
//                         </button>
//                         <span className="text-sm text-gray-600 ml-2">research papers</span>
//                       </div>
//                     </div>
//                   </div> */}

//                   {/* Awards & Transcript */}
//                   {/* <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Awards & Honors
//                     </label>
//                     <textarea
//                       name="awards"
//                       value={formData.awards}
//                       onChange={handleChange}
//                       placeholder="List any awards, scholarships, or honors received"
//                       rows="2"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                     />
//                   </div> */}

//                   {/* <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Upload Transcript (Optional)
//                     </label>
//                     <div className="flex items-center space-x-4">
//                       <label className="cursor-pointer">
//                         <div className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition duration-200">
//                           <input
//                             type="file"
//                             name="transcript"
//                             onChange={handleChange}
//                             accept=".pdf,.jpg,.jpeg,.png"
//                             className="hidden"
//                           />
//                           <span className="text-sm text-gray-600">
//                             {formData.transcript 
//                               ? formData.transcript.name 
//                               : "Choose file (PDF or image)"}
//                           </span>
//                         </div>
//                       </label>
//                       {formData.transcript && (
//                         <button
//                           type="button"
//                           onClick={() => setFormData(prev => ({ ...prev, transcript: null }))}
//                           className="text-sm text-red-600 hover:text-red-800"
//                         >
//                           Remove
//                         </button>
//                       )}
//                     </div>
//                     <p className="mt-1 text-xs text-gray-500">
//                       Max file size: 5MB
//                     </p>
//                   </div> */}
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between">
//                 <button
//                   type="button"
//                   onClick={() => navigate("/onboarding")}
//                   className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
//                   disabled={loading}
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center"
//                 >
//                   {loading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       Continue to Study Goals
//                       <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                       </svg>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Help Section */}
//           <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//               <div className="text-blue-600 text-lg mb-2">🎓</div>
//               <h4 className="font-semibold text-gray-900 mb-2">Why This Matters</h4>
//               <p className="text-sm text-gray-600">
//                 Your academic background helps us match you with universities that align with your qualifications.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//               <div className="text-blue-600 text-lg mb-2">📊</div>
//               <h4 className="font-semibold text-gray-900 mb-2">GPA Conversion</h4>
//               <p className="text-sm text-gray-600">
//                 Don't worry about conversions. We'll automatically adjust for different grading systems.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//               <div className="text-blue-600 text-lg mb-2">🔒</div>
//               <h4 className="font-semibold text-gray-900 mb-2">Your Data is Safe</h4>
//               <p className="text-sm text-gray-600">
//                 All information is encrypted and stored securely. We never share your academic records.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }