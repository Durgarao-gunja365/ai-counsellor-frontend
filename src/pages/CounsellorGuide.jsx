import { useState } from "react";
import api from "../api/client";
import { useNavigate } from "react-router-dom"; // Added import
import { 
  Sparkles, 
  Brain, 
  Search, 
  Globe, 
  GraduationCap, 
  Award, 
  DollarSign,
  Target,
  Zap,
  Star,
  BookmarkPlus,
  TrendingUp,
  ChevronRight,
  Loader2,
  CheckCircle,
  Filter,
  MapPin,
  Users,
  Calendar,
  BookOpen,
  Lightbulb,
  MessageSquare,
  Download,
  Share2,
  AlertCircle,
  ArrowLeft, // Added for back button
  Home, // Added for home button
  Grid // Added for dashboard button
} from "lucide-react";
import AppLayout from "../components/AppLayout";

export default function CounsellorGuide() {
  const navigate = useNavigate(); // Hook for navigation
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("dream");
  const [formData, setFormData] = useState({
    education_level: "",
    major: "",
    gpa: "",
    budget_range: "",
    intended_degree: "",
    preferred_countries: ""
  });

  const educationLevels = [
    "High School",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "PhD",
    "Diploma/Certificate"
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
    "Switzerland"
  ];

  // Navigation functions
  const goBack = () => {
    navigate(-1); // Go back to previous page
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  // const goToHome = () => {
  //   navigate("/");
  // };

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/counsellor/guide", {
        education_level: formData.education_level,
        major: formData.major,
        gpa: Number(formData.gpa),
        budget_range: formData.budget_range,
        intended_degree: formData.intended_degree,
        preferred_countries: formData.preferred_countries.split(",").map(c => c.trim()).filter(c => c)
      });

      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to get recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(field, value) {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }

  function handleCountrySelect(country) {
    const current = formData.preferred_countries.split(",").map(c => c.trim()).filter(c => c);
    if (!current.includes(country)) {
      const newCountries = [...current, country].join(", ");
      handleInputChange("preferred_countries", newCountries);
    }
  }

  async function handleShortlist(universityName) {
    try {
      await api.post(`/universities/shortlist?university_name=${encodeURIComponent(universityName)}`);
      
      // Update local state to show shortlisted status
      setResult(prev => {
        const updated = { ...prev };
        Object.keys(updated.universities).forEach(category => {
          updated.universities[category] = updated.universities[category].map(u => 
            typeof u === 'string' 
              ? { name: u, shortlisted: u === universityName ? true : false }
              : u.name === universityName 
                ? { ...u, shortlisted: true }
                : u
          );
        });
        return updated;
      });
    } catch (err) {
      alert("Failed to shortlist university");
    }
  }

  function clearForm() {
    setFormData({
      education_level: "",
      major: "",
      gpa: "",
      budget_range: "",
      intended_degree: "",
      preferred_countries: ""
    });
    setResult(null);
    setError(null);
  }

  return (
    <AppLayout>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Bar with Back Button */}
       

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            AI <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Counsellor Guide</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized university recommendations based on your profile and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="w-6 h-6 text-white" />
                    <h2 className="text-2xl font-bold text-white">Tell us about yourself</h2>
                  </div>
                  <button
                    onClick={clearForm}
                    className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm"
                  >
                    Clear Form
                  </button>
                </div>
                <p className="text-blue-100 mt-2">
                  Fill in your details for personalized AI recommendations
                </p>
              </div>

              {/* Form Content */}
              <form onSubmit={submit} className="p-6">
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Education Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-4 h-4 text-blue-500" />
                        <span>Current Education Level</span>
                      </div>
                    </label>
                    <div className="relative">
                      <select
                        name="education"
                        value={formData.education_level}
                        onChange={(e) => handleInputChange("education_level", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none bg-white"
                      >
                        <option value="">Select education level</option>
                        {educationLevels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Major */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-blue-500" />
                        <span>Major / Field of Study</span>
                      </div>
                    </label>
                    <input
                      type="text"
                      name="major"
                      value={formData.major}
                      onChange={(e) => handleInputChange("major", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="e.g., Computer Science, Business"
                    />
                  </div>

                  {/* GPA */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-blue-500" />
                        <span>GPA / CGPA</span>
                      </div>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="10.0"
                        name="gpa"
                        value={formData.gpa}
                        onChange={(e) => handleInputChange("gpa", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="e.g., 3.75"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">/ 10.0</span>
                      </div>
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-blue-500" />
                        <span>Budget Range</span>
                      </div>
                    </label>
                    <div className="relative">
                      <select
                        name="budget"
                        value={formData.budget_range}
                        onChange={(e) => handleInputChange("budget_range", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none bg-white"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map(range => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Intended Degree */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span>Intended Degree</span>
                      </div>
                    </label>
                    <div className="relative">
                      <select
                        name="degree"
                        value={formData.intended_degree}
                        onChange={(e) => handleInputChange("intended_degree", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none bg-white"
                      >
                        <option value="">Select intended degree</option>
                        {intendedDegrees.map(degree => (
                          <option key={degree} value={degree}>{degree}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Preferred Countries */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-blue-500" />
                        <span>Preferred Countries</span>
                      </div>
                    </label>
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="countries"
                        value={formData.preferred_countries}
                        onChange={(e) => handleInputChange("preferred_countries", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="Type country names or select below"
                      />
                      
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Popular destinations:</p>
                        <div className="flex flex-wrap gap-2">
                          {popularCountries.map(country => (
                            <button
                              key={country}
                              type="button"
                              onClick={() => handleCountrySelect(country)}
                              className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-lg transition-colors border border-gray-200 hover:border-blue-300"
                            >
                              {country}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Analyzing your profile...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        <span>Get AI Recommendations</span>
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Stats & Tips Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* AI Stats Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">AI Analysis</h3>
                    <p className="text-sm text-gray-600">Powered by advanced algorithms</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Universities analyzed</span>
                    <span className="font-bold text-gray-900">5,000+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Success rate</span>
                    <span className="font-bold text-green-600">94%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Average scholarship</span>
                    <span className="font-bold text-blue-600">$12,500</span>
                  </div>
                </div>
              </div>

              {/* Tips Card */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <Lightbulb className="w-6 h-6" />
                  <h3 className="font-bold">Tips for Best Results</h3>
                </div>
                <ul className="space-y-3 text-emerald-100">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Be specific about your budget range</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Include relevant work experience if any</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Select 2-3 countries for focused results</span>
                  </li>
                </ul>
              </div>

              {/* Quick Action Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => navigate('/chat')}
                    className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5 text-gray-500" />
                      <span className="font-medium text-gray-700">Chat with AI Counsellor</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                  </button>
                  <button 
                    onClick={() => navigate('/shortlisted')}
                    className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <Download className="w-5 h-5 text-gray-500" />
                      <span className="font-medium text-gray-700">View Shortlisted</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                  </button>
                  <button 
                    onClick={() => navigate('/profile')}
                    className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <Share2 className="w-5 h-5 text-gray-500" />
                      <span className="font-medium text-gray-700">Update Profile</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="mt-12 animate-fadeIn">
            {/* Results Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Your Personalized Recommendations</h2>
                  <p className="text-blue-100">
                    Based on your profile, here are the universities that match your criteria
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors flex items-center space-x-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Dashboard</span>
                  </button>
                  <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                    Export PDF
                  </button>
                </div>
              </div>
            </div>

            {/* AI Insight */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">AI Insight</h3>
                  <p className="text-gray-600">Analysis of your profile and recommendations</p>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 leading-relaxed">{result.reasoning}</p>
                </div>
              </div>
            </div>

            {/* University Categories Tabs */}
            <div className="mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  {[
                    { id: "dream", label: "Dream Schools", color: "from-purple-500 to-pink-500", icon: <Star className="w-4 h-4" /> },
                    { id: "target", label: "Target Schools", color: "from-blue-500 to-cyan-500", icon: <Target className="w-4 h-4" /> },
                    { id: "safe", label: "Safe Schools", color: "from-emerald-500 to-teal-500", icon: <CheckCircle className="w-4 h-4" /> }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? `border-gradient-to-r ${tab.color} text-gray-900`
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <span className={activeTab === tab.id ? `bg-gradient-to-r ${tab.color} bg-clip-text text-transparent` : ""}>
                        {tab.icon}
                      </span>
                      <span>{tab.label}</span>
                      {result.universities[tab.id] && (
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          tab.id === "dream" ? "bg-purple-100 text-purple-700" :
                          tab.id === "target" ? "bg-blue-100 text-blue-700" :
                          "bg-emerald-100 text-emerald-700"
                        }`}>
                          {result.universities[tab.id].length}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Universities Grid */}
              <div className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {result.universities[activeTab]?.map((uni, index) => {
                    const university = typeof uni === 'string' ? { name: uni, shortlisted: false } : uni;
                    return (
                      <UniversityCard
                        key={university.name}
                        university={university}
                        index={index}
                        category={activeTab}
                        onShortlist={handleShortlist}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Need more help?</h3>
                  <p className="text-gray-600">
                    Our AI counsellor is ready to answer any questions about your recommendations
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button 
                    onClick={goBack}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center space-x-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Go Back</span>
                  </button>
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all font-medium"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </AppLayout>
  );
}

function UniversityCard({ university, index, category, onShortlist }) {
  const [isShortlisting, setIsShortlisting] = useState(false);
  const [shortlisted, setShortlisted] = useState(university.shortlisted);

  const categoryColors = {
    dream: { gradient: "from-purple-500 to-pink-500", bg: "bg-purple-50", text: "text-purple-700" },
    target: { gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-50", text: "text-blue-700" },
    safe: { gradient: "from-emerald-500 to-teal-500", bg: "bg-emerald-50", text: "text-emerald-700" }
  };

  const mockData = {
    ranking: 50 + (index * 10),
    acceptance: 20 + (index * 5),
    tuition: `$${20000 + (index * 5000)}`,
    location: ["USA", "Canada", "UK", "Australia", "Germany"][index % 5],
    deadline: "2024-12-15"
  };

  async function handleShortlist() {
    setIsShortlisting(true);
    try {
      await onShortlist(university.name);
      setShortlisted(true);
    } catch (err) {
      // Error is handled in parent
    } finally {
      setIsShortlisting(false);
    }
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
      {/* Card Header */}
      <div className={`p-6 border-b border-gray-100`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className={`inline-block px-3 py-1 ${categoryColors[category].bg} ${categoryColors[category].text} text-xs font-semibold rounded-full mb-2`}>
              {category === "dream" ? "Dream School" : category === "target" ? "Target School" : "Safe School"}
            </span>
            <h3 className="text-xl font-bold text-gray-900">{university.name}</h3>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">#{mockData.ranking}</div>
            <div className="text-xs text-gray-500">Global Rank</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{mockData.tuition}</div>
              <div className="text-xs text-gray-500">Tuition</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{mockData.acceptance}%</div>
              <div className="text-xs text-gray-500">Acceptance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{mockData.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Dec 15, 2024</span>
            </div>
          </div>

          {/* Match Score */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">Match Score</span>
              <span className="font-bold text-blue-600">{85 + (index * 3)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${categoryColors[category].gradient} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${85 + (index * 3)}%` }}
              ></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={handleShortlist}
              disabled={shortlisted || isShortlisting}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                shortlisted
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                  : `bg-gradient-to-r ${categoryColors[category].gradient} text-white hover:opacity-90`
              }`}
            >
              {isShortlisting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Shortlisting...</span>
                </>
              ) : shortlisted ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Shortlisted</span>
                </>
              ) : (
                <>
                  <BookmarkPlus className="w-4 h-4" />
                  <span>Add to Shortlist</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}