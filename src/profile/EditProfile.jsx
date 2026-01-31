import { useEffect, useState } from "react";
import api from "../api/client";
import AppLayout from "../components/AppLayout";
import { 
  Save, 
  User, 
  GraduationCap, 
  BookOpen, 
  Award, 
  DollarSign, 
  Globe, 
  Briefcase, 
  Calendar,
  Loader2,
  Upload,
  X,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function EditProfile() {
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeSection, setActiveSection] = useState("academic");

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const res = await api.get("/profile");
      setProfile(res.data);
    } catch (err) {
      setError("Failed to load profile. Please try again.");
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await api.put("/profile", profile);
      setSuccess("Profile updated successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function handleChange(field, value) {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  }

  function handleCountryChange(value) {
    const countries = value.split(",").map(country => country.trim()).filter(country => country);
    setProfile(prev => ({
      ...prev,
      preferred_countries: countries
    }));
  }

  const educationLevels = [
    "High School",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "PhD",
    "Diploma",
    "Other"
  ];

  const intendedDegrees = [
    "Bachelor's",
    "Master's",
    "PhD",
    "MBA",
    "LLM",
    "MD",
    "Diploma",
    "Certificate"
  ];

  const budgetRanges = [
    "Under $20,000",
    "$20,000 - $40,000",
    "$40,000 - $60,000",
    "$60,000 - $80,000",
    "$80,000 - $100,000",
    "Over $100,000"
  ];

  const popularCountries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "Singapore",
    "Netherlands",
    "Sweden"
  ];

  if (!profile) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Profile</h3>
            <p className="text-gray-500">Fetching your profile information...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
              <p className="text-gray-600 mt-2">Update your academic and personal information</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>Last updated: Just now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-red-800">{error}</p>
            <button onClick={() => setError(null)} className="ml-auto">
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-3 animate-fadeIn">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <p className="text-emerald-800">{success}</p>
            <button onClick={() => setSuccess(null)} className="ml-auto">
              <X className="w-4 h-4 text-emerald-500" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {profile.full_name?.charAt(0) || "U"}
                  </div>
                  <button className="absolute bottom-6 right-1/4 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow">
                    <Upload className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900">{profile.full_name || "User"}</h3>
                  <p className="text-sm text-gray-500">{profile.email || "user@example.com"}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {[
                  { id: "academic", label: "Academic Info", icon: <GraduationCap className="w-4 h-4" /> },
                  { id: "financial", label: "Financial Details", icon: <DollarSign className="w-4 h-4" /> },
                  { id: "preferences", label: "Preferences", icon: <Globe className="w-4 h-4" /> },
                  { id: "additional", label: "Additional Info", icon: <Briefcase className="w-4 h-4" /> }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className={`${activeSection === item.id ? "text-emerald-500" : "text-gray-400"}`}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Profile Completion */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Profile Completion</span>
                  <span className="font-semibold text-emerald-600">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Complete all sections for better recommendations</p>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSave} className="space-y-8">
              {/* Academic Information Section */}
              {(activeSection === "academic") && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Academic Information</h2>
                      <p className="text-gray-500 text-sm">Your educational background and goals</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Education Level */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Education Level
                      </label>
                      <div className="relative">
                        <select
                          value={profile.education_level || ""}
                          onChange={(e) => handleChange("education_level", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 appearance-none bg-white"
                        >
                          <option value="">Select your education level</option>
                          {educationLevels.map((level) => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Major */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Major/Field of Study
                      </label>
                      <input
                        type="text"
                        value={profile.major || ""}
                        onChange={(e) => handleChange("major", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                        placeholder="e.g., Computer Science, Business Administration"
                      />
                    </div>

                    {/* GPA */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GPA/CGPA
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="4.0"
                          value={profile.gpa || ""}
                          onChange={(e) => handleChange("gpa", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                          placeholder="e.g., 3.75"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 text-sm">/ 4.0</span>
                        </div>
                      </div>
                    </div>

                    {/* Intended Degree */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Intended Degree
                      </label>
                      <div className="relative">
                        <select
                          value={profile.intended_degree || ""}
                          onChange={(e) => handleChange("intended_degree", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 appearance-none bg-white"
                        >
                          <option value="">Select intended degree</option>
                          {intendedDegrees.map((degree) => (
                            <option key={degree} value={degree}>{degree}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Additional Academic Info */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Academic Information
                      </label>
                      <textarea
                        value={profile.additional_info || ""}
                        onChange={(e) => handleChange("additional_info", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 h-32 resize-none"
                        placeholder="Research experience, publications, awards, etc."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Financial Details Section */}
              {(activeSection === "financial") && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Financial Details</h2>
                      <p className="text-gray-500 text-sm">Budget and funding information</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Budget Range */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget Range
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {budgetRanges.map((range) => (
                          <button
                            key={range}
                            type="button"
                            onClick={() => handleChange("budget_range", range)}
                            className={`px-4 py-3 rounded-lg border transition-all duration-200 text-sm font-medium ${
                              profile.budget_range === range
                                ? "bg-gradient-to-r from-orange-50 to-red-50 border-orange-300 text-orange-700"
                                : "border-gray-300 text-gray-700 hover:border-orange-300 hover:bg-orange-50"
                            }`}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Budget */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Minimum Budget ($)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">$</span>
                          </div>
                          <input
                            type="number"
                            value={profile.min_budget || ""}
                            onChange={(e) => handleChange("min_budget", e.target.value)}
                            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                            placeholder="0"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Maximum Budget ($)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">$</span>
                          </div>
                          <input
                            type="number"
                            value={profile.max_budget || ""}
                            onChange={(e) => handleChange("max_budget", e.target.value)}
                            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                            placeholder="100,000"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Funding Source */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Funding Source
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {["Self-funded", "Scholarship", "Loan", "Family Support", "Sponsorship"].map((source) => (
                          <label key={source} className="inline-flex items-center">
                            <input
                              type="checkbox"
                              checked={profile.funding_sources?.includes(source) || false}
                              onChange={(e) => {
                                const sources = profile.funding_sources || [];
                                const newSources = e.target.checked
                                  ? [...sources, source]
                                  : sources.filter(s => s !== source);
                                handleChange("funding_sources", newSources);
                              }}
                              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                            />
                            <span className="ml-2 text-gray-700 text-sm">{source}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Section */}
              {(activeSection === "preferences") && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Study Preferences</h2>
                      <p className="text-gray-500 text-sm">Your country and university preferences</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Preferred Countries */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Countries
                      </label>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {profile.preferred_countries?.map((country, index) => (
                            <div key={index} className="inline-flex items-center bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-sm">
                              {country}
                              <button
                                type="button"
                                onClick={() => {
                                  const newCountries = profile.preferred_countries.filter((c, i) => i !== index);
                                  handleChange("preferred_countries", newCountries);
                                }}
                                className="ml-2 text-purple-500 hover:text-purple-700"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                          {popularCountries.map((country) => (
                            <button
                              key={country}
                              type="button"
                              onClick={() => {
                                const currentCountries = profile.preferred_countries || [];
                                if (!currentCountries.includes(country)) {
                                  handleChange("preferred_countries", [...currentCountries, country]);
                                }
                              }}
                              className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
                            >
                              {country}
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          placeholder="Type and press Enter to add more countries"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const value = e.target.value.trim();
                              if (value) {
                                const currentCountries = profile.preferred_countries || [];
                                handleChange("preferred_countries", [...currentCountries, value]);
                                e.target.value = '';
                              }
                            }
                          }}
                        />
                      </div>
                    </div>

                    {/* Preferred Climate */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Climate
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {["Tropical", "Temperate", "Continental", "Polar", "Mediterranean", "Any"].map((climate) => (
                          <label key={climate} className="inline-flex items-center">
                            <input
                              type="radio"
                              name="climate"
                              checked={profile.preferred_climate === climate}
                              onChange={(e) => handleChange("preferred_climate", climate)}
                              className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                            />
                            <span className="ml-2 text-gray-700 text-sm">{climate}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* University Size */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred University Size
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {["Small (<5k)", "Medium (5k-15k)", "Large (15k-30k)", "Very Large (>30k)"].map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => handleChange("university_size", size)}
                            className={`px-4 py-3 rounded-lg border transition-all duration-200 text-sm font-medium ${
                              profile.university_size === size
                                ? "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300 text-purple-700"
                                : "border-gray-300 text-gray-700 hover:border-purple-300 hover:bg-purple-50"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Info Section */}
              {(activeSection === "additional") && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Additional Information</h2>
                      <p className="text-gray-500 text-sm">Work experience, skills, and timeline</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Work Experience */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Work Experience (Years)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max="50"
                          value={profile.work_experience || ""}
                          onChange={(e) => handleChange("work_experience", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Key Skills
                      </label>
                      <input
                        type="text"
                        value={profile.skills?.join(", ") || ""}
                        onChange={(e) => handleChange("skills", e.target.value.split(", "))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200"
                        placeholder="e.g., Python, Research, Leadership"
                      />
                    </div>

                    {/* Start Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Planned Start Date
                      </label>
                      <input
                        type="month"
                        value={profile.start_date || ""}
                        onChange={(e) => handleChange("start_date", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200"
                      />
                    </div>

                    {/* Language Proficiency */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language Proficiency
                      </label>
                      <div className="space-y-4">
                        {["English", "Spanish", "French", "German", "Chinese"].map((lang) => (
                          <div key={lang} className="flex items-center justify-between">
                            <span className="text-gray-700">{lang}</span>
                            <div className="flex space-x-2">
                              {["Beginner", "Intermediate", "Advanced", "Native"].map((level) => (
                                <label key={level} className="inline-flex items-center">
                                  <input
                                    type="radio"
                                    name={`lang_${lang}`}
                                    className="w-4 h-4 text-cyan-600 border-gray-300 focus:ring-cyan-500"
                                  />
                                  <span className="ml-1 text-gray-700 text-sm">{level}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                  <div className="text-sm text-gray-500">
                    <p>Make sure all information is accurate for better recommendations.</p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => fetchProfile()}
                      className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
                    >
                      Discard Changes
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Section Indicators */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            {["academic", "financial", "preferences", "additional"].map((section, index) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeSection === section
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                title={["Academic", "Financial", "Preferences", "Additional"][index]}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}