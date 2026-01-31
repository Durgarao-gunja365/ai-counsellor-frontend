// import api from "../api/client";
// import { useNavigate } from "react-router-dom";

// const COUNTRIES = [
//   "USA",
//   "Canada",
//   "UK",
//   "Germany",
//   "Australia",
//   "Ireland"
// ];

// export default function StudyGoal() {
//   const navigate = useNavigate();

//   async function submit(e) {
//     e.preventDefault();
//     const f = e.target;

//     const selectedCountries = Array.from(
//       f.querySelectorAll("input[name=country]:checked")
//     ).map(c => c.value);

//     await api.post("/onboarding/study-goal", {
//       intended_degree: f.degree.value,
//       field_of_study: f.field.value,
//       target_intake_year: Number(f.intake.value),
//       preferred_countries: selectedCountries,
//     });

//     navigate("/onboarding/budget");
//   }

//   return (
//     <form onSubmit={submit} className="p-8 max-w-md mx-auto space-y-3">
//       <h2 className="text-xl font-bold">Study Goal</h2>

//       <input name="degree" placeholder="Intended degree (MS/MTech)" className="input" />
//       <input name="field" placeholder="Field of study" className="input" />
//       <input name="intake" placeholder="Target intake year" className="input" />

//       <div>
//         <p className="font-medium mb-1">Preferred Countries</p>
//         {COUNTRIES.map(c => (
//           <label key={c} className="block">
//             <input type="checkbox" name="country" value={c} /> {c}
//           </label>
//         ))}
//       </div>

//       <button className="btn mt-4">Next</button>
//     </form>
//   );
// }




import api from "../api/client";
import { useNavigate } from "react-router-dom";

const COUNTRIES = [
  "USA",
  "Canada",
  "UK",
  "Germany",
  "Australia",
  "Ireland"
];

export default function StudyGoal() {
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const f = e.target;

    const selectedCountries = Array.from(
      f.querySelectorAll("input[name=country]:checked")
    ).map(c => c.value);

    await api.post("/onboarding/study-goal", {
      intended_degree: f.degree.value,
      field_of_study: f.field.value,
      target_intake_year: Number(f.intake.value),
      preferred_countries: selectedCountries,
    });

    navigate("/onboarding/budget");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form 
        onSubmit={submit} 
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Study Goals & Preferences
          </h1>
          <p className="text-gray-600 text-sm">
            Help us understand your academic aspirations
          </p>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Intended Degree
            </label>
            <input 
              name="degree" 
              placeholder="e.g., MS, MTech, MBA, PhD"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Field of Study
            </label>
            <input 
              name="field" 
              placeholder="e.g., Computer Science, Business Analytics"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Intake Year
            </label>
            <input 
              name="intake" 
              type="number"
              min="2024"
              max="2030"
              placeholder="e.g., 2025"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              When do you plan to start your studies?
            </p>
          </div>
          
          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Preferred Countries
            </label>
            <p className="text-xs text-gray-500 mb-4">
              Select all countries you're interested in (multiple selection allowed)
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {COUNTRIES.map(c => (
                <label 
                  key={c} 
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
                >
                  <input 
                    type="checkbox" 
                    name="country" 
                    value={c}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">{c}</span>
                </label>
              ))}
            </div>
            
            <div className="mt-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                <input 
                  type="checkbox" 
                  id="other-country"
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Other</span>
                <input 
                  type="text" 
                  placeholder="Specify country"
                  className="flex-1 text-sm border-0 focus:ring-0 p-0 bg-transparent outline-none"
                  disabled
                  id="other-country-input"
                  onChange={(e) => {
                    const checkbox = document.getElementById('other-country');
                    if (e.target.value.trim()) {
                      checkbox.value = e.target.value;
                    }
                  }}
                />
              </label>
            </div>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 mt-6"
          >
            Continue to Budget Planning
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-2">
            Step 2 of 4
          </p>
        </div>
      </form>
    </div>
  );
}

























// import api from "../api/client";
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// const COUNTRIES = [
//   { code: "US", name: "USA", flag: "🇺🇸" },
//   { code: "CA", name: "Canada", flag: "🇨🇦" },
//   { code: "GB", name: "UK", flag: "🇬🇧" },
//   { code: "DE", name: "Germany", flag: "🇩🇪" },
//   { code: "AU", name: "Australia", flag: "🇦🇺" },
//   { code: "IE", name: "Ireland", flag: "🇮🇪" },
//   { code: "SG", name: "Singapore", flag: "🇸🇬" },
//   { code: "NL", name: "Netherlands", flag: "🇳🇱" },
//   { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
//   { code: "FR", name: "France", flag: "🇫🇷" },
//   { code: "SE", name: "Sweden", flag: "🇸🇪" },
//   { code: "CH", name: "Switzerland", flag: "🇨🇭" }
// ];

// const DEGREES = [
//   "MS (Master of Science)",
//   "MTech (Master of Technology)",
//   "MBA (Master of Business Administration)",
//   "MEng (Master of Engineering)",
//   "PhD (Doctor of Philosophy)",
//   "Bachelors",
//   "Diploma/Certificate"
// ];

// const FIELDS = [
//   "Computer Science",
//   "Data Science",
//   "Artificial Intelligence",
//   "Business Administration",
//   "Electrical Engineering",
//   "Mechanical Engineering",
//   "Civil Engineering",
//   "Biotechnology",
//   "Medicine",
//   "Law",
//   "Finance",
//   "Design",
//   "Other"
// ];

// const INTAKE_SEASONS = ["Spring", "Fall", "Summer", "Winter"];

// export default function StudyGoal() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [formData, setFormData] = useState({
//     degree: "",
//     field: "",
//     intakeYear: "",
//     intakeSeason: "Fall",
//     countries: [],
//     searchField: "",
//     searchCountry: ""
//   });

//   const currentYear = new Date().getFullYear();
//   const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear + i);

//   useEffect(() => {
//     // Pre-fill intake year with next year as default
//     if (!formData.intakeYear) {
//       setFormData(prev => ({ ...prev, intakeYear: String(currentYear + 1) }));
//     }
//   }, [currentYear]);

//   const filteredFields = FIELDS.filter(field =>
//     field.toLowerCase().includes(formData.searchField.toLowerCase())
//   );
//   useEffect(() => {
//   api.get("/universities/preview")
//     .then(res => setPreview(res.data.universities))
// }, []);


//   const filteredCountries = COUNTRIES.filter(country =>
//     country.name.toLowerCase().includes(formData.searchCountry.toLowerCase())
//   );

//   function handleChange(e) {
//     const { name, value, type } = e.target;
    
//     if (type === 'checkbox') {
//       const { checked } = e.target;
//       setFormData(prev => ({
//         ...prev,
//         countries: checked
//           ? [...prev.countries, value]
//           : prev.countries.filter(c => c !== value)
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
    
//     // Clear error for this field
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     }
//   }

//   function validateForm() {
//     const newErrors = {};
    
//     if (!formData.degree.trim()) {
//       newErrors.degree = "Please select an intended degree";
//     }
    
//     if (!formData.field.trim()) {
//       newErrors.field = "Please select a field of study";
//     }
    
//     if (!formData.intakeYear) {
//       newErrors.intakeYear = "Please select a target intake year";
//     } else if (parseInt(formData.intakeYear) < currentYear) {
//       newErrors.intakeYear = "Target year cannot be in the past";
//     } else if (parseInt(formData.intakeYear) > currentYear + 5) {
//       newErrors.intakeYear = "Target year cannot be more than 5 years in the future";
//     }
    
//     if (formData.countries.length === 0) {
//       newErrors.countries = "Please select at least one preferred country";
//     } else if (formData.countries.length > 5) {
//       newErrors.countries = "Please select up to 5 countries only";
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
//       await api.post("/onboarding/study-goal", {
//         intended_degree: formData.degree,
//         field_of_study: formData.field,
//         target_intake_year: parseInt(formData.intakeYear),
//         intake_season: formData.intakeSeason,
//         preferred_countries: formData.countries,
//       });

//       navigate("/onboarding/budget");
//     } catch (error) {
//       console.error("Failed to save study goals:", error);
//       setErrors(prev => ({
//         ...prev,
//         form: error.response?.data?.message || "Failed to save study goals. Please try again."
//       }));
//     } finally {
//       setLoading(false);
//     }
//   }

//   function getSelectedCountryNames() {
//     return formData.countries.map(code => {
//       const country = COUNTRIES.find(c => c.code === code);
//       return country ? `${country.flag} ${country.name}` : code;
//     });
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
//         <div className="text-center">
//           <h2 className="text-3xl font-extrabold text-gray-900">
//             🎓 Study Goals
//           </h2>
//           <p className="mt-2 text-lg text-gray-600">
//             Let's plan your study abroad journey
//           </p>
//         </div>

//         <div className="mt-8 bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10">
//           <form onSubmit={submit} className="space-y-8">
//             {errors.form && (
//               <div className="rounded-md bg-red-50 p-4 border-l-4 border-red-500">
//                 <div className="flex">
//                   <div className="flex-shrink-0">
//                     <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <div className="ml-3">
//                     <p className="text-sm text-red-700">{errors.form}</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {/* Left Column */}
//               <div className="space-y-6">
//                 {/* Degree Selection */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Intended Degree *
//                   </label>
//                   <div className="relative">
//                     <select
//                       name="degree"
//                       value={formData.degree}
//                       onChange={handleChange}
//                       className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                       required
//                     >
//                       <option value="">Select a degree...</option>
//                       {DEGREES.map(degree => (
//                         <option key={degree} value={degree}>{degree}</option>
//                       ))}
//                     </select>
//                   </div>
//                   {errors.degree && (
//                     <p className="mt-2 text-sm text-red-600">{errors.degree}</p>
//                   )}
//                 </div>

//                 {/* Field of Study */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Field of Study *
//                   </label>
//                   <input
//                     type="text"
//                     name="searchField"
//                     value={formData.searchField}
//                     onChange={handleChange}
//                     placeholder="Search or type your field..."
//                     className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 mb-2"
//                   />
//                   <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-2">
//                     {filteredFields.map(field => (
//                       <div
//                         key={field}
//                         className={`flex items-center p-3 rounded-lg mb-1 cursor-pointer transition duration-150 ${formData.field === field ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}
//                         onClick={() => {
//                           setFormData(prev => ({ ...prev, field, searchField: '' }));
//                           if (errors.field) setErrors(prev => ({ ...prev, field: '' }));
//                         }}
//                       >
//                         <div className={`w-4 h-4 rounded-full border-2 mr-3 ${formData.field === field ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}></div>
//                         <span className="font-medium">{field}</span>
//                       </div>
//                     ))}
//                   </div>
//                   {errors.field && (
//                     <p className="mt-2 text-sm text-red-600">{errors.field}</p>
//                   )}
//                 </div>

//                 {/* Intake Selection */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Intake Year *
//                     </label>
//                     <select
//                       name="intakeYear"
//                       value={formData.intakeYear}
//                       onChange={handleChange}
//                       className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                     >
//                       <option value="">Select year...</option>
//                       {yearOptions.map(year => (
//                         <option key={year} value={year}>{year}</option>
//                       ))}
//                     </select>
//                     {errors.intakeYear && (
//                       <p className="mt-2 text-sm text-red-600">{errors.intakeYear}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Intake Season
//                     </label>
//                     <select
//                       name="intakeSeason"
//                       value={formData.intakeSeason}
//                       onChange={handleChange}
//                       className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                     >
//                       {INTAKE_SEASONS.map(season => (
//                         <option key={season} value={season}>{season}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Column - Countries */}
//               <div>
//                 <div className="flex justify-between items-center mb-4">
//                   <label className="block text-sm font-semibold text-gray-700">
//                     Preferred Countries *
//                   </label>
//                   <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
//                     {formData.countries.length} selected
//                   </span>
//                 </div>
                
//                 <input
//                   type="text"
//                   name="searchCountry"
//                   value={formData.searchCountry}
//                   onChange={handleChange}
//                   placeholder="Search countries..."
//                   className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 mb-4"
//                 />

//                 <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-xl p-3">
//                   <div className="grid grid-cols-2 gap-3">
//                     {filteredCountries.map(country => (
//                       <label
//                         key={country.code}
//                         className={`flex items-center p-3 rounded-lg border cursor-pointer transition duration-150 ${formData.countries.includes(country.code) ? 'bg-blue-50 border-blue-300' : 'border-gray-200 hover:border-gray-300'}`}
//                       >
//                         <input
//                           type="checkbox"
//                           name="country"
//                           value={country.code}
//                           checked={formData.countries.includes(country.code)}
//                           onChange={handleChange}
//                           className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                         />
//                         <span className="ml-3 text-sm font-medium text-gray-700">
//                           <span className="text-lg mr-2">{country.flag}</span>
//                           {country.name}
//                         </span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
                
//                 {errors.countries && (
//                   <p className="mt-2 text-sm text-red-600">{errors.countries}</p>
//                 )}

//                 {/* Selected Countries Preview */}
//                 {formData.countries.length > 0 && (
//                   <div className="mt-6 p-4 bg-blue-50 rounded-xl">
//                     <p className="text-sm font-medium text-blue-800 mb-2">
//                       Selected countries:
//                     </p>
//                     <div className="flex flex-wrap gap-2">
//                       {getSelectedCountryNames().map((country, index) => (
//                         <span
//                           key={index}
//                           className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-blue-700 border border-blue-200"
//                         >
//                           {country}
//                           <button
//                             type="button"
//                             onClick={() => handleChange({
//                               target: {
//                                 type: 'checkbox',
//                                 name: 'country',
//                                 value: formData.countries[index],
//                                 checked: false
//                               }
//                             })}
//                             className="ml-2 text-blue-500 hover:text-blue-700"
//                           >
//                             ×
//                           </button>
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Progress Bar */}
//             <div className="pt-6 border-t border-gray-200">
//               <div className="flex justify-between text-sm text-gray-600 mb-2">
//                 <span>Step 2 of 5</span>
//                 <span>Study Goals</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-center justify-between pt-6">
//               <button
//                 type="button"
//                 onClick={() => navigate("/onboarding/academic")}
//                 className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
//                 disabled={loading}
//               >
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//                 Back
//               </button>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="inline-flex items-center px-8 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
//               >
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     Continue to Budget
//                     <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Help Text */}
//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-500">
//             Need help deciding? <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">View country guides</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }