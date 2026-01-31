// import api from "../api/client";
// import { useNavigate } from "react-router-dom";

// export default function Exams() {
//   const navigate = useNavigate();

//   async function submit(e) {
//     e.preventDefault();
//     const f = e.target;

//     await api.post("/onboarding/exams", {
//       ielts_status: f.ielts.value,
//       gre_status: f.gre.value,
//       sop_status: f.sop.value,
//     });

//     navigate("/dashboard");
//   }

//   return (
//     <form onSubmit={submit} className="p-8 max-w-md mx-auto">
//       <h2 className="text-xl font-bold mb-4">Exams & Readiness</h2>

//       <select name="ielts" className="input">
//         <option value="not_started">IELTS not started</option>
//         <option value="in_progress">IELTS in progress</option>
//         <option value="completed">IELTS completed</option>
//       </select>

//       <select name="gre" className="input">
//         <option value="not_started">GRE not started</option>
//         <option value="in_progress">GRE in progress</option>
//         <option value="completed">GRE completed</option>
//       </select>

//       <select name="sop" className="input">
//         <option value="not_started">SOP not started</option>
//         <option value="draft">SOP draft</option>
//         <option value="ready">SOP ready</option>
//       </select>

//       <button className="btn mt-4">Finish</button>
//     </form>
//   );
// }




import api from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Exams() {
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const f = e.target;

    await api.post("/onboarding/exams", {
      ielts_status: f.ielts.value,
      gre_status: f.gre.value,
      sop_status: f.sop.value,
    });

    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form 
        onSubmit={submit} 
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Exams & Readiness
          </h1>
          <p className="text-gray-600 text-sm">
            Track your application preparation progress
          </p>
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                IELTS Status
              </label>
              <span className="text-xs font-medium text-blue-600">English Test</span>
            </div>
            <select 
              name="ielts" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white appearance-none"
              required
            >
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress / Preparing</option>
              <option value="completed">Completed / Scored</option>
              <option value="not_required">Not Required</option>
            </select>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                GRE Status
              </label>
              <span className="text-xs font-medium text-purple-600">Graduate Test</span>
            </div>
            <select 
              name="gre" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white appearance-none"
              required
            >
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress / Preparing</option>
              <option value="completed">Completed / Scored</option>
              <option value="not_required">Not Required</option>
            </select>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                SOP Status
              </label>
              <span className="text-xs font-medium text-green-600">Document</span>
            </div>
            <select 
              name="sop" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-white appearance-none"
              required
            >
              <option value="not_started">Not Started</option>
              <option value="draft">Draft in Progress</option>
              <option value="review">Under Review</option>
              <option value="ready">Finalized & Ready</option>
            </select>
          </div>
          
          <div className="pt-4">
            <p className="text-xs text-gray-500 mb-4 text-center">
              This information will help us personalize your application timeline
            </p>
            
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Complete Onboarding & Go to Dashboard
            </button>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-2">
            Step 3 of 4
          </p>
        </div>
      </form>
    </div>
  );
}



















// import { useState } from "react";
// import api from "../api/client";
// import { useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   CheckCircle,
//   FileText,
//   BookOpen,
//   Target,
//   Clock,
//   Award,
//   Calendar,
//   Edit,
//   CheckSquare,
//   AlertCircle,
//   Sparkles,
//   TrendingUp,
//   Users,
//   Star,
//   Loader2,
//   ChevronRight,
//   GraduationCap,
//   Globe,
//   ClipboardCheck,
//   BarChart
// } from "lucide-react";

// export default function Exams() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     ielts_status: "not_started",
//     ielts_score: "",
//     ielts_target_date: "",
//     gre_status: "not_started",
//     gre_score: "",
//     gre_target_date: "",
//     sop_status: "not_started",
//     sop_notes: "",
//     lor_status: "not_started",
//     lor_count: 0,
//     resume_status: "not_started"
//   });

//   const totalSteps = 3;

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleNextStep = () => {
//     if (currentStep < totalSteps) {
//       setCurrentStep(prev => prev + 1);
//     }
//   };

//   const handlePrevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(prev => prev - 1);
//     } else {
//       navigate(-1);
//     }
//   };

//   const validateStep = () => {
//     switch (currentStep) {
//       case 1:
//         return true; // Always valid
//       case 2:
//         return true; // Always valid
//       case 3:
//         return true; // Always valid
//       default:
//         return false;
//     }
//   };

//   async function submit(e) {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await api.post("/onboarding/exams", {
//         ielts_status: formData.ielts_status,
//         gre_status: formData.gre_status,
//         sop_status: formData.sop_status,
//         ielts_score: formData.ielts_score || null,
//         gre_score: formData.gre_score || null,
//         target_ielts_date: formData.ielts_target_date || null,
//         target_gre_date: formData.gre_target_date || null,
//         lor_status: formData.lor_status,
//         resume_status: formData.resume_status,
//         notes: formData.sop_notes || ""
//       });

//       // Show success animation
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 800);

//     } catch (error) {
//       alert("Failed to save exam status. Please try again.");
//       setLoading(false);
//     }
//   }

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-8">
//             <div>
//               <div className="flex items-center space-x-3 mb-6">
//                 <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
//                   <Globe className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900">English Proficiency</h3>
//                   <p className="text-gray-600">IELTS / TOEFL / PTE Test Status</p>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 {/* Test Status */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-4">
//                     IELTS / English Test Status
//                   </label>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     {[
//                       { value: "not_started", label: "Not Started", icon: <Clock className="w-5 h-5" /> },
//                       { value: "in_progress", label: "In Progress", icon: <TrendingUp className="w-5 h-5" /> },
//                       { value: "completed", label: "Completed", icon: <Award className="w-5 h-5" /> }
//                     ].map((option) => (
//                       <button
//                         key={option.value}
//                         type="button"
//                         onClick={() => handleInputChange("ielts_status", option.value)}
//                         className={`p-4 rounded-xl border transition-all duration-200 flex flex-col items-center ${
//                           formData.ielts_status === option.value
//                             ? "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-300 ring-2 ring-blue-100"
//                             : "border-gray-300 hover:border-blue-300 hover:bg-blue-50"
//                         }`}
//                       >
//                         <div className={`mb-2 ${formData.ielts_status === option.value ? "text-blue-500" : "text-gray-400"}`}>
//                           {option.icon}
//                         </div>
//                         <span className="font-medium text-gray-900">{option.label}</span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Score Input */}
//                 {formData.ielts_status !== "not_started" && (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Target / Current Score
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <Target className="h-5 w-5 text-gray-400" />
//                         </div>
//                         <input
//                           type="text"
//                           placeholder="e.g., 7.5 or 105"
//                           value={formData.ielts_score}
//                           onChange={(e) => handleInputChange("ielts_score", e.target.value)}
//                           className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Target Test Date
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <Calendar className="h-5 w-5 text-gray-400" />
//                         </div>
//                         <input
//                           type="date"
//                           value={formData.ielts_target_date}
//                           onChange={(e) => handleInputChange("ielts_target_date", e.target.value)}
//                           className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Tips */}
//                 <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
//                   <div className="flex items-start space-x-3">
//                     <Sparkles className="w-5 h-5 text-blue-500 mt-0.5" />
//                     <div>
//                       <p className="text-sm text-blue-800 font-medium">English Test Tips</p>
//                       <ul className="text-sm text-blue-700 mt-1 space-y-1">
//                         <li>• Most universities require 6.5+ IELTS or 90+ TOEFL</li>
//                         <li>• Schedule your test 2-3 months before application deadlines</li>
//                         <li>• Allow time for retakes if needed</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="space-y-8">
//             <div>
//               <div className="flex items-center space-x-3 mb-6">
//                 <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
//                   <BarChart className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900">Standardized Tests</h3>
//                   <p className="text-gray-600">GRE / GMAT / SAT Test Status</p>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 {/* Test Status */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-4">
//                     GRE / GMAT Status
//                   </label>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     {[
//                       { value: "not_started", label: "Not Required", icon: <CheckSquare className="w-5 h-5" /> },
//                       { value: "in_progress", label: "In Progress", icon: <TrendingUp className="w-5 h-5" /> },
//                       { value: "completed", label: "Completed", icon: <Award className="w-5 h-5" /> }
//                     ].map((option) => (
//                       <button
//                         key={option.value}
//                         type="button"
//                         onClick={() => handleInputChange("gre_status", option.value)}
//                         className={`p-4 rounded-xl border transition-all duration-200 flex flex-col items-center ${
//                           formData.gre_status === option.value
//                             ? "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300 ring-2 ring-purple-100"
//                             : "border-gray-300 hover:border-purple-300 hover:bg-purple-50"
//                         }`}
//                       >
//                         <div className={`mb-2 ${formData.gre_status === option.value ? "text-purple-500" : "text-gray-400"}`}>
//                           {option.icon}
//                         </div>
//                         <span className="font-medium text-gray-900">{option.label}</span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Score Input */}
//                 {formData.gre_status !== "not_started" && (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Target / Current Score
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <Target className="h-5 w-5 text-gray-400" />
//                         </div>
//                         <input
//                           type="text"
//                           placeholder="e.g., 320 (GRE) or 700 (GMAT)"
//                           value={formData.gre_score}
//                           onChange={(e) => handleInputChange("gre_score", e.target.value)}
//                           className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Target Test Date
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <Calendar className="h-5 w-5 text-gray-400" />
//                         </div>
//                         <input
//                           type="date"
//                           value={formData.gre_target_date}
//                           onChange={(e) => handleInputChange("gre_target_date", e.target.value)}
//                           className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Tips */}
//                 <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
//                   <div className="flex items-start space-x-3">
//                     <Sparkles className="w-5 h-5 text-purple-500 mt-0.5" />
//                     <div>
//                       <p className="text-sm text-purple-800 font-medium">GRE/GMAT Tips</p>
//                       <ul className="text-sm text-purple-700 mt-1 space-y-1">
//                         <li>• Top universities require 320+ GRE or 700+ GMAT</li>
//                         <li>• Prepare for 3-6 months before your target test date</li>
//                         <li>• Consider test-optional universities if scores are low</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="space-y-8">
//             <div>
//               <div className="flex items-center space-x-3 mb-6">
//                 <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
//                   <FileText className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900">Application Documents</h3>
//                   <p className="text-gray-600">SOP, LORs, Resume Status</p>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 {/* SOP Status */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-4">
//                     Statement of Purpose (SOP)
//                   </label>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     {[
//                       { value: "not_started", label: "Not Started", icon: <Clock className="w-5 h-5" /> },
//                       { value: "draft", label: "Draft Ready", icon: <Edit className="w-5 h-5" /> },
//                       { value: "ready", label: "Finalized", icon: <CheckCircle className="w-5 h-5" /> }
//                     ].map((option) => (
//                       <button
//                         key={option.value}
//                         type="button"
//                         onClick={() => handleInputChange("sop_status", option.value)}
//                         className={`p-4 rounded-xl border transition-all duration-200 flex flex-col items-center ${
//                           formData.sop_status === option.value
//                             ? "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-300 ring-2 ring-emerald-100"
//                             : "border-gray-300 hover:border-emerald-300 hover:bg-emerald-50"
//                         }`}
//                       >
//                         <div className={`mb-2 ${formData.sop_status === option.value ? "text-emerald-500" : "text-gray-400"}`}>
//                           {option.icon}
//                         </div>
//                         <span className="font-medium text-gray-900">{option.label}</span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* SOP Notes */}
//                 {formData.sop_status !== "not_started" && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       SOP Notes / Requirements
//                     </label>
//                     <textarea
//                       placeholder="Any specific requirements or notes about your SOP..."
//                       value={formData.sop_notes}
//                       onChange={(e) => handleInputChange("sop_notes", e.target.value)}
//                       rows="3"
//                       className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
//                     />
//                   </div>
//                 )}

//                 {/* LOR Status */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-4">
//                     Letters of Recommendation (LOR)
//                   </label>
//                   <div className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       {[
//                         { value: "not_started", label: "Not Started", icon: <Clock className="w-5 h-5" /> },
//                         { value: "requested", label: "Requested", icon: <Users className="w-5 h-5" /> },
//                         { value: "received", label: "Received", icon: <CheckCircle className="w-5 h-5" /> }
//                       ].map((option) => (
//                         <button
//                           key={option.value}
//                           type="button"
//                           onClick={() => handleInputChange("lor_status", option.value)}
//                           className={`p-4 rounded-xl border transition-all duration-200 flex flex-col items-center ${
//                             formData.lor_status === option.value
//                               ? "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-300 ring-2 ring-blue-100"
//                               : "border-gray-300 hover:border-blue-300 hover:bg-blue-50"
//                           }`}
//                         >
//                           <div className={`mb-2 ${formData.lor_status === option.value ? "text-blue-500" : "text-gray-400"}`}>
//                             {option.icon}
//                           </div>
//                           <span className="font-medium text-gray-900">{option.label}</span>
//                         </button>
//                       ))}
//                     </div>
                    
//                     <div className="flex items-center space-x-4">
//                       <label className="text-sm text-gray-700">Number of LORs required:</label>
//                       <div className="flex space-x-2">
//                         {[2, 3, 4].map(num => (
//                           <button
//                             key={num}
//                             type="button"
//                             onClick={() => handleInputChange("lor_count", num)}
//                             className={`w-10 h-10 rounded-lg flex items-center justify-center ${
//                               formData.lor_count === num
//                                 ? "bg-emerald-500 text-white"
//                                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                             }`}
//                           >
//                             {num}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Resume Status */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-4">
//                     Resume / CV Status
//                   </label>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     {[
//                       { value: "not_started", label: "Not Started", icon: <Clock className="w-5 h-5" /> },
//                       { value: "draft", label: "Draft Ready", icon: <Edit className="w-5 h-5" /> },
//                       { value: "ready", label: "Finalized", icon: <CheckCircle className="w-5 h-5" /> }
//                     ].map((option) => (
//                       <button
//                         key={option.value}
//                         type="button"
//                         onClick={() => handleInputChange("resume_status", option.value)}
//                         className={`p-4 rounded-xl border transition-all duration-200 flex flex-col items-center ${
//                           formData.resume_status === option.value
//                             ? "bg-gradient-to-r from-orange-50 to-red-50 border-orange-300 ring-2 ring-orange-100"
//                             : "border-gray-300 hover:border-orange-300 hover:bg-orange-50"
//                         }`}
//                       >
//                         <div className={`mb-2 ${formData.resume_status === option.value ? "text-orange-500" : "text-gray-400"}`}>
//                           {option.icon}
//                         </div>
//                         <span className="font-medium text-gray-900">{option.label}</span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Tips */}
//                 <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
//                   <div className="flex items-start space-x-3">
//                     <ClipboardCheck className="w-5 h-5 text-emerald-500 mt-0.5" />
//                     <div>
//                       <p className="text-sm text-emerald-800 font-medium">Document Preparation Tips</p>
//                       <ul className="text-sm text-emerald-700 mt-1 space-y-1">
//                         <li>• Start requesting LORs 2-3 months before deadlines</li>
//                         <li>• Customize SOP for each university</li>
//                         <li>• Keep resume to 1-2 pages max</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       {/* Progress Bar */}
//       <div className="bg-white shadow-sm">
//         <div className="max-w-4xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between mb-4">
//             <button
//               onClick={handlePrevStep}
//               className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               <ArrowLeft className="w-5 h-5" />
//               <span className="font-medium">Back</span>
//             </button>
//             <div className="text-sm text-gray-500">
//               Step {currentStep} of {totalSteps}
//             </div>
//           </div>
          
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
//               style={{ width: `${(currentStep / totalSteps) * 100}%` }}
//             ></div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-2xl mb-6">
//             <ClipboardCheck className="w-10 h-10 text-white" />
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-3">
//             Exam <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent">Readiness</span>
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Track your test preparation and document readiness for applications
//           </p>
//         </div>

//         {/* Step Indicator */}
//         <div className="flex justify-center mb-12">
//           <div className="flex items-center space-x-8">
//             {[1, 2, 3].map((step) => (
//               <div key={step} className="flex flex-col items-center">
//                 <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
//                   currentStep >= step
//                     ? step === 1 ? "bg-gradient-to-r from-blue-500 to-cyan-500" :
//                       step === 2 ? "bg-gradient-to-r from-purple-500 to-pink-500" :
//                       "bg-gradient-to-r from-emerald-500 to-teal-500"
//                     : "bg-gray-200 text-gray-400"
//                 } text-white shadow-lg`}>
//                   {currentStep > step ? (
//                     <CheckCircle className="w-6 h-6" />
//                   ) : (
//                     <span className="font-bold">{step}</span>
//                   )}
//                 </div>
//                 <span className={`mt-2 text-sm font-medium ${
//                   currentStep >= step ? "text-gray-900" : "text-gray-400"
//                 }`}>
//                   {step === 1 ? "English Tests" : step === 2 ? "GRE/GMAT" : "Documents"}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <form onSubmit={submit}>
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
//             {/* Current Step Content */}
//             <div className="p-8">
//               {renderStepContent()}
//             </div>

//             {/* Action Buttons */}
//             <div className="border-t border-gray-200 p-8">
//               <div className="flex justify-between items-center">
//                 <div>
//                   {currentStep > 1 && (
//                     <button
//                       type="button"
//                       onClick={handlePrevStep}
//                       className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
//                     >
//                       <ArrowLeft className="w-5 h-5" />
//                       <span className="font-medium">Previous</span>
//                     </button>
//                   )}
//                 </div>

//                 <div className="flex items-center space-x-4">
//                   <div className="text-sm text-gray-500 hidden sm:block">
//                     {currentStep < totalSteps ? (
//                       <span>Step {currentStep} of {totalSteps}</span>
//                     ) : (
//                       <span>Ready to complete!</span>
//                     )}
//                   </div>

//                   {currentStep < totalSteps ? (
//                     <button
//                       type="button"
//                       onClick={handleNextStep}
//                       disabled={!validateStep()}
//                       className={`px-8 py-3 font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center space-x-3 ${
//                         currentStep === 1 ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white" :
//                         currentStep === 2 ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white" :
//                         "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
//                       }`}
//                     >
//                       <span>Continue</span>
//                       <ChevronRight className="w-5 h-5" />
//                     </button>
//                   ) : (
//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center space-x-3"
//                     >
//                       {loading ? (
//                         <>
//                           <Loader2 className="w-5 h-5 animate-spin" />
//                           <span>Saving...</span>
//                         </>
//                       ) : (
//                         <>
//                           <span>Complete Onboarding</span>
//                           <CheckCircle className="w-5 h-5" />
//                         </>
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>

//         {/* Completion Statistics */}
//         <div className="mt-8 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-2xl p-8 text-white">
//           <div className="flex items-start space-x-4">
//             <Sparkles className="w-8 h-8 flex-shrink-0" />
//             <div>
//               <h3 className="text-xl font-bold mb-2">Why Track Readiness?</h3>
//               <p className="opacity-90 mb-4">
//                 Students who track their exam and document progress are 3x more likely to:
//               </p>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
//                   <div className="text-2xl font-bold">89%</div>
//                   <p className="text-sm opacity-90">Meet application deadlines</p>
//                 </div>
//                 <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
//                   <div className="text-2xl font-bold">76%</div>
//                   <p className="text-sm opacity-90">Achieve target test scores</p>
//                 </div>
//                 <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
//                   <div className="text-2xl font-bold">94%</div>
//                   <p className="text-sm opacity-90">Get admission offers</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Next Steps Preview */}
//         <div className="mt-8 bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
//           <h3 className="text-xl font-bold text-gray-900 mb-6">Next Steps After Onboarding</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="border border-gray-200 rounded-xl p-6">
//               <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
//                 <Target className="w-6 h-6 text-white" />
//               </div>
//               <h4 className="font-bold text-gray-900 mb-2">Personalized Timeline</h4>
//               <p className="text-gray-600 text-sm">Get a customized application timeline based on your readiness</p>
//             </div>
//             <div className="border border-gray-200 rounded-xl p-6">
//               <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
//                 <BookOpen className="w-6 h-6 text-white" />
//               </div>
//               <h4 className="font-bold text-gray-900 mb-2">Study Resources</h4>
//               <p className="text-gray-600 text-sm">Access curated IELTS/GRE prep materials and practice tests</p>
//             </div>
//             <div className="border border-gray-200 rounded-xl p-6">
//               <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
//                 <GraduationCap className="w-6 h-6 text-white" />
//               </div>
//               <h4 className="font-bold text-gray-900 mb-2">University Matches</h4>
//               <p className="text-gray-600 text-sm">Discover universities matching your profile and goals</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }