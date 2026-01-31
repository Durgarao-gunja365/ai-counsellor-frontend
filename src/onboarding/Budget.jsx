// import api from "../api/client";
// import { useNavigate } from "react-router-dom";

// export default function Budget() {
//   const navigate = useNavigate();

//   async function submit(e) {
//     e.preventDefault();
//     const f = e.target;

//     await api.post("/onboarding/budget", {
//       budget_range: f.budget.value,
//       funding_plan: f.funding.value,
//     });

//     navigate("/onboarding/exams");
//   }

//   return (
//     <form onSubmit={submit} className="p-8 max-w-md mx-auto">
//       <h2 className="text-xl font-bold mb-4">Budget</h2>

//       <input
//         name="budget"
//         placeholder="Budget range (20k-30k)"
//         className="input"
//       />
//       <select name="funding" className="input">
//         <option value="self">Self funded</option>
//         <option value="loan">Loan</option>
//         <option value="scholarship">Scholarship</option>
//       </select>

//       <button className="btn mt-4">Next</button>
//     </form>
//   );
// }





import api from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Budget() {
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const f = e.target;

    await api.post("/onboarding/budget", {
      budget_range: f.budget.value,
      funding_plan: f.funding.value,
    });

    navigate("/onboarding/exams");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form 
        onSubmit={submit} 
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Budget Information
        </h1>
        <p className="text-gray-600 mb-6 text-sm">
          Tell us about your financial planning for education
        </p>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget Range (USD)
            </label>
            <input
              name="budget"
              placeholder="e.g., 20,000k - 30,000k"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Please provide your total budget including tuition and living expenses
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Funding Plan
            </label>
            <select 
              name="funding" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white appearance-none"
              required
            >
              <option value="" disabled selected>Select funding source</option>
              <option value="self">Self Funded</option>
              <option value="loan">Loan</option>
              <option value="scholarship">Scholarship</option>
              <option value="family">Family Support</option>
              <option value="employer">Employer Sponsorship</option>
              <option value="mixed">Mixed Funding</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Select your primary source of funding
            </p>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 mt-4"
          >
            Continue to Exams
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </form>
    </div>
  );
}























// import api from "../api/client";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// export default function Budget() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   async function submit(e) {
//     e.preventDefault();
//     setLoading(true);
//     const f = e.target;

//     // Basic validation
//     if (!f.budget.value.trim()) {
//       setErrors({ budget: "Please enter a budget range" });
//       setLoading(false);
//       return;
//     }

//     try {
//       await api.post("/onboarding/budget", {
//         budget_range: f.budget.value,
//         funding_plan: f.funding.value,
//       });
//       navigate("/onboarding/exams");
//     } catch (error) {
//       console.error("Failed to save budget:", error);
//       setErrors({ form: "Failed to save. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="budget-container">
//       <form onSubmit={submit} className="budget-form">
//         <h2 className="budget-title">Budget Planning</h2>
//         <p className="budget-subtitle">Tell us about your budget and funding plan</p>
        
//         {errors.form && (
//           <div className="error-message">
//             {errors.form}
//           </div>
//         )}
        
//         <div className="form-group">
//           <label className="form-label">
//             Budget Range *
//             <span className="hint">e.g., 20k-30k or 20000-30000</span>
//           </label>
//           <input
//             name="budget"
//             placeholder="20k-30k"
//             className={`form-input ${errors.budget ? 'error' : ''}`}
//             disabled={loading}
//           />
//           {errors.budget && (
//             <div className="field-error">{errors.budget}</div>
//           )}
//         </div>
        
//         <div className="form-group">
//           <label className="form-label">Funding Plan *</label>
//           <select 
//             name="funding" 
//             className="form-select"
//             disabled={loading}
//           >
//             <option value="self">Self Funded</option>
//             <option value="loan">Education Loan</option>
//             <option value="scholarship">Scholarship/Grant</option>
//             <option value="parents">Parents/Family</option>
//             <option value="sponsor">Employer Sponsorship</option>
//             <option value="government">Government Aid</option>
//           </select>
//         </div>
        
//         <div className="form-group">
//           <label className="form-label">Additional Notes (Optional)</label>
//           <textarea 
//             name="notes" 
//             className="form-textarea"
//             placeholder="Any special considerations for your budget..."
//             rows="3"
//             disabled={loading}
//           />
//         </div>
        
//         <div className="budget-tips">
//           <div className="tip-icon">💡</div>
//           <div className="tip-content">
//             <strong>Budget Tip:</strong> Remember to include living expenses, books, and health insurance in your budget.
//           </div>
//         </div>
        
//         <div className="form-actions">
//           <button 
//             type="button" 
//             className="btn-secondary"
//             onClick={() => navigate(-1)}
//             disabled={loading}
//           >
//             Back
//           </button>
//           <button 
//             type="submit" 
//             className={`btn-primary ${loading ? 'loading' : ''}`}
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <span className="spinner"></span>
//                 Saving...
//               </>
//             ) : (
//               'Continue to Exams'
//             )}
//           </button>
//         </div>
//       </form>
      
//       <style jsx>{`
//         .budget-container {
//           min-height: 100vh;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 20px;
//         }
        
//         .budget-form {
//           background: white;
//           border-radius: 16px;
//           padding: 40px;
//           width: 100%;
//           max-width: 480px;
//           box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
//           animation: slideUp 0.5s ease;
//         }
        
//         @keyframes slideUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .budget-title {
//           font-size: 28px;
//           font-weight: 700;
//           color: #1a202c;
//           margin-bottom: 8px;
//           text-align: center;
//         }
        
//         .budget-subtitle {
//           color: #718096;
//           text-align: center;
//           margin-bottom: 32px;
//           font-size: 16px;
//         }
        
//         .form-group {
//           margin-bottom: 24px;
//         }
        
//         .form-label {
//           display: block;
//           font-weight: 600;
//           color: #2d3748;
//           margin-bottom: 8px;
//           font-size: 14px;
//         }
        
//         .hint {
//           display: block;
//           font-weight: normal;
//           color: #a0aec0;
//           font-size: 12px;
//           margin-top: 2px;
//         }
        
//         .form-input,
//         .form-select,
//         .form-textarea {
//           width: 100%;
//           padding: 12px 16px;
//           border: 2px solid #e2e8f0;
//           border-radius: 8px;
//           font-size: 16px;
//           transition: all 0.2s;
//           background: white;
//           color: #2d3748;
//         }
        
//         .form-input:focus,
//         .form-select:focus,
//         .form-textarea:focus {
//           outline: none;
//           border-color: #667eea;
//           box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
//         }
        
//         .form-input.error {
//           border-color: #fc8181;
//         }
        
//         .form-input.error:focus {
//           border-color: #fc8181;
//           box-shadow: 0 0 0 3px rgba(252, 129, 129, 0.1);
//         }
        
//         .form-textarea {
//           resize: vertical;
//           min-height: 80px;
//           font-family: inherit;
//         }
        
//         .error-message {
//           background: #fed7d7;
//           color: #9b2c2c;
//           padding: 12px 16px;
//           border-radius: 8px;
//           margin-bottom: 24px;
//           font-size: 14px;
//           border-left: 4px solid #fc8181;
//         }
        
//         .field-error {
//           color: #e53e3e;
//           font-size: 14px;
//           margin-top: 4px;
//         }
        
//         .budget-tips {
//           background: #ebf8ff;
//           border: 1px solid #bee3f8;
//           border-radius: 8px;
//           padding: 16px;
//           margin: 24px 0;
//           display: flex;
//           align-items: flex-start;
//           gap: 12px;
//         }
        
//         .tip-icon {
//           font-size: 20px;
//           flex-shrink: 0;
//         }
        
//         .tip-content {
//           color: #2c5282;
//           font-size: 14px;
//           line-height: 1.5;
//         }
        
//         .form-actions {
//           display: flex;
//           gap: 16px;
//           margin-top: 32px;
//         }
        
//         .btn-primary,
//         .btn-secondary {
//           flex: 1;
//           padding: 14px 24px;
//           border-radius: 8px;
//           font-weight: 600;
//           font-size: 16px;
//           cursor: pointer;
//           transition: all 0.2s;
//           border: none;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 8px;
//         }
        
//         .btn-primary {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//         }
        
//         .btn-primary:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 10px 20px rgba(102, 126, 234, 0.2);
//         }
        
//         .btn-primary:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }
        
//         .btn-secondary {
//           background: #edf2f7;
//           color: #4a5568;
//         }
        
//         .btn-secondary:hover:not(:disabled) {
//           background: #e2e8f0;
//         }
        
//         .btn-secondary:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }
        
//         .spinner {
//           width: 16px;
//           height: 16px;
//           border: 2px solid rgba(255, 255, 255, 0.3);
//           border-radius: 50%;
//           border-top-color: white;
//           animation: spin 1s ease-in-out infinite;
//         }
        
//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }
        
//         .loading {
//           position: relative;
//           color: transparent;
//         }
        
//         .loading .spinner {
//           position: absolute;
//         }
        
//         @media (max-width: 640px) {
//           .budget-form {
//             padding: 24px;
//             margin: 16px;
//           }
          
//           .budget-title {
//             font-size: 24px;
//           }
          
//           .form-actions {
//             flex-direction: column;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }