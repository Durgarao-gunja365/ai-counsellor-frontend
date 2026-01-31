// import { useEffect, useState } from "react";
// import api from "../api/client";
// import AppLayout from "../components/AppLayout";

// export default function SearchUniversities() {
//   const [query, setQuery] = useState("");
//   const [country, setCountry] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

// async function search() {
//   if (!query && !country) {
//     alert("Enter university name or country");
//     return;
//   }

//   setLoading(true);
//   try {
//     const res = await api.get("/search/universities", {
//       params: {
//         name: query,
//         country: country
//       }
//     });
//     setResults(res.data);
//   } catch (err) {
//     alert("Failed to fetch universities");
//   } finally {
//     setLoading(false);
//   }
// }


//   async function shortlist(name) {
//     await api.post(`/universities/shortlist?university_name=${encodeURIComponent(name)}`);
//     alert("University shortlisted");
//   }

//   return (
//     <AppLayout>
//       <div className="p-8 space-y-4">
//         <h2 className="text-xl font-bold">Search Universities</h2>

//         <div className="flex gap-2">
//           <input
//             placeholder="University name"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="input"
//           />
//           <input
//             placeholder="Country"
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             className="input"
//           />
//           <button onClick={search} className="btn">
//             Search
//           </button>
//         </div>

//         {loading && <p>Searching universities...</p>}

//         <ul className="space-y-2">
//           {results.map((u, i) => (
//             <li key={i} className="border p-3 rounded flex justify-between">
//               <div>
//                 <p className="font-medium">{u.name}</p>
//                 <p className="text-sm text-gray-500">{u.country}</p>
//               </div>
//               <button
//                 onClick={() => shortlist(u.name)}
//                 className="px-3 py-1 bg-blue-100 rounded text-sm"
//               >
//                 Shortlist
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </AppLayout>
//   );
// }


import { useEffect, useState } from "react";
import api from "../api/client";
import AppLayout from "../components/AppLayout";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Globe,
  Filter,
  X,
  Bookmark,
  CheckCircle,
  Star,
  TrendingUp,
  GraduationCap,
  DollarSign,
  Users,
  Calendar,
  ChevronRight,
  Loader2,
  Eye,
  Download,
  Share2,
  Sliders,
  ArrowLeft,
  Grid,
  Home,
  Award,
  Target,
  Building2,
  Sparkles
} from "lucide-react";

export default function SearchUniversities() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shortlisted, setShortlisted] = useState(new Set());
  const [filters, setFilters] = useState({
    minRanking: "",
    maxRanking: "",
    minTuition: "",
    maxTuition: "",
    acceptanceRange: "",
    scholarshipAvailable: false,
    publicPrivate: "all"
  });
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [popularCountries, setPopularCountries] = useState([]);

  // Navigation functions
  const goBack = () => navigate(-1);
  const goToDashboard = () => navigate("/dashboard");
  const goToHome = () => navigate("/");

  // Fetch popular countries on mount
  useEffect(() => {
    fetchPopularCountries();
  }, []);

  async function fetchPopularCountries() {
    try {
      // This would come from your API
      const countries = [
        "United States", "United Kingdom", "Canada", "Australia",
        "Germany", "France", "Netherlands", "Switzerland",
        "Japan", "Singapore", "China", "South Korea"
      ];
      setPopularCountries(countries);
    } catch (err) {
      console.error("Failed to fetch countries:", err);
    }
  }

  // Debounced search for suggestions
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 2) {
        fetchSuggestions();
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  async function fetchSuggestions() {
    try {
      // Mock suggestions - replace with actual API call
      const mockSuggestions = [
        "Harvard University",
        "Stanford University",
        "MIT",
        "University of Cambridge",
        "University of Oxford",
        "University of Toronto",
        "University of Melbourne",
        "ETH Zurich"
      ].filter(name => name.toLowerCase().includes(query.toLowerCase()));
      
      setSuggestions(mockSuggestions);
    } catch (err) {
      console.error("Failed to fetch suggestions:", err);
    }
  }

  async function search() {
    if (!query && !country && !filters.minRanking && !filters.maxRanking) {
      alert("Please enter at least one search criteria");
      return;
    }

    setLoading(true);
    try {
      // Build query params
      const params = {
        name: query,
        country: country,
        min_ranking: filters.minRanking,
        max_ranking: filters.maxRanking,
        min_tuition: filters.minTuition,
        max_tuition: filters.maxTuition,
        acceptance_rate: filters.acceptanceRange,
        scholarship_available: filters.scholarshipAvailable,
        public_private: filters.publicPrivate
      };

      const res = await api.get("/search/universities", { params });
      
      // Add mock data for demonstration
      const universities = res.data.map((uni, index) => ({
        ...uni,
        id: uni.id || index,
        ranking: 50 + Math.floor(Math.random() * 950),
        acceptance_rate: `${Math.floor(5 + Math.random() * 40)}%`,
        tuition_fee: `$${Math.floor(10000 + Math.random() * 40000)}`,
        scholarship_available: Math.random() > 0.5,
        location: uni.country || "Unknown",
        website: "https://example.edu",
        deadline: "2024-12-15",
        match_score: 70 + Math.floor(Math.random() * 30)
      }));

      setResults(universities);
    } catch (err) {
      alert("Failed to fetch universities");
    } finally {
      setLoading(false);
    }
  }

  async function shortlistUniversity(name) {
    try {
      await api.post(`/universities/shortlist?university_name=${encodeURIComponent(name)}`);
      
      // Add to shortlisted set
      setShortlisted(prev => new Set([...prev, name]));
      
      // Show success toast
      const event = new CustomEvent('toast', {
        detail: { message: `${name} added to shortlist`, type: 'success' }
      });
      window.dispatchEvent(event);
    } catch (err) {
      alert("Failed to shortlist university");
    }
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      search();
    }
  }

  function clearFilters() {
    setFilters({
      minRanking: "",
      maxRanking: "",
      minTuition: "",
      maxTuition: "",
      acceptanceRange: "",
      scholarshipAvailable: false,
      publicPrivate: "all"
    });
    setCountry("");
    setQuery("");
  }

  function handleCountrySelect(selectedCountry) {
    setCountry(selectedCountry);
    setShowFilters(false);
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Navigation Bar */}
        {/* <div className="mb-8">
          <div className="flex items-center justify-between bg-white rounded-2xl shadow-md border border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={goBack}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-lg hover:from-gray-200 hover:to-gray-100 transition-all duration-200 border border-gray-300 hover:border-gray-400 group"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
                <span className="font-medium">Back</span>
              </button>
              
              <button
                onClick={goToDashboard}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 border border-blue-200 hover:border-blue-300 group"
              >
                <Grid className="w-5 h-5 text-blue-600 group-hover:text-blue-800" />
                <span className="font-medium">Dashboard</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <h1 className="text-xl font-bold text-gray-900">University Search</h1>
                <p className="text-sm text-gray-500">Find and compare universities worldwide</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl mb-6">
            <Search className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Search <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Universities</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find your perfect university match with advanced search and filtering
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Search Criteria</h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-lg hover:from-gray-200 hover:to-gray-100 transition-all duration-200"
              >
                <Sliders className="w-5 h-5" />
                <span className="font-medium">Advanced Filters</span>
              </button>
            </div>
            <p className="text-gray-600">Enter university name, country, or use filters to find matches</p>
          </div>

          {/* Main Search Bar */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by university name (e.g., Harvard, Stanford, MIT)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="block w-full pl-10 pr-3 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            />
            
            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(suggestion);
                      setSuggestions([]);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <span className="font-medium">{suggestion}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Country Quick Select */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <Globe className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-700">Popular Countries</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularCountries.map((countryName) => (
                <button
                  key={countryName}
                  onClick={() => handleCountrySelect(countryName)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    country === countryName
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                  }`}
                >
                  {countryName}
                </button>
              ))}
            </div>
          </div>

          {/* Country Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or enter any country
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Country (e.g., United States, Canada, Germany)"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                onKeyPress={handleKeyPress}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Advanced Filters</h3>
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  <X className="w-4 h-4" />
                  <span>Clear All</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Ranking Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University Ranking
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minRanking}
                      onChange={(e) => setFilters(prev => ({ ...prev, minRanking: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxRanking}
                      onChange={(e) => setFilters(prev => ({ ...prev, maxRanking: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Tuition Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tuition Fee ($)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minTuition}
                      onChange={(e) => setFilters(prev => ({ ...prev, minTuition: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxTuition}
                      onChange={(e) => setFilters(prev => ({ ...prev, maxTuition: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Acceptance Rate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Acceptance Rate
                  </label>
                  <select
                    value={filters.acceptanceRange}
                    onChange={(e) => setFilters(prev => ({ ...prev, acceptanceRange: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Any</option>
                    <option value="<10">Less than 10%</option>
                    <option value="10-20">10% - 20%</option>
                    <option value="20-30">20% - 30%</option>
                    <option value=">30">More than 30%</option>
                  </select>
                </div>

                {/* Scholarship */}
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={filters.scholarshipAvailable}
                      onChange={(e) => setFilters(prev => ({ ...prev, scholarshipAvailable: e.target.checked }))}
                      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                    <span className="text-sm text-gray-700">Scholarship Available</span>
                  </label>
                </div>

                {/* Public/Private */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University Type
                  </label>
                  <select
                    value={filters.publicPrivate}
                    onChange={(e) => setFilters(prev => ({ ...prev, publicPrivate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="all">All Types</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Search Button */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {results.length > 0 && (
                <span>Found {results.length} universities</span>
              )}
            </div>
            <button
              onClick={search}
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Search Universities</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {results.length > 0 ? (
          <div className="space-y-6">
            {/* Results Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Search Results <span className="text-emerald-600">({results.length})</span>
                </h2>
                <p className="text-gray-600">Universities matching your criteria</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">Export Results</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {results.map((university) => (
                <div
                  key={university.id}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* University Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{university.name}</h3>
                          {shortlisted.has(university.name) && (
                            <span className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Shortlisted
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-gray-600 mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{university.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          #{university.ranking}
                        </div>
                        <div className="text-xs text-gray-500">Global Rank</div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{university.tuition_fee}</div>
                        <div className="text-xs text-gray-500 flex items-center justify-center">
                          <DollarSign className="w-3 h-3 mr-1" />
                          Tuition
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{university.acceptance_rate}</div>
                        <div className="text-xs text-gray-500 flex items-center justify-center">
                          <Users className="w-3 h-3 mr-1" />
                          Acceptance
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">
                          {university.scholarship_available ? "Available" : "Limited"}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center justify-center">
                          <Award className="w-3 h-3 mr-1" />
                          Scholarship
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* University Details */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {/* Match Score */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-700">Match Score</span>
                          <span className="font-bold text-emerald-600">{university.match_score}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${university.match_score}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3 pt-4 border-t border-gray-100">
                        <button
                          onClick={() => shortlistUniversity(university.name)}
                          disabled={shortlisted.has(university.name)}
                          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                            shortlisted.has(university.name)
                              ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                              : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:opacity-90"
                          }`}
                        >
                          {shortlisted.has(university.name) ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              <span>Shortlisted</span>
                            </>
                          ) : (
                            <>
                              <Bookmark className="w-4 h-4" />
                              <span>Add to Shortlist</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => window.open(university.website, '_blank')}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Results Footer */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Found what you're looking for?</h3>
                  <p className="text-sm text-gray-600">Compare universities or get personalized recommendations</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => navigate('/counsellor')}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all font-medium"
                  >
                    Get AI Recommendations
                  </button>
                  <button
                    onClick={() => navigate('/shortlisted')}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    View Shortlisted
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : loading ? (
          // Loading State
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Searching Universities</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Finding the best matches for your criteria...
            </p>
          </div>
        ) : (
          // Empty State
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Yet</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Enter search criteria above to find universities that match your preferences
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setShowFilters(true)}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all"
              >
                <span className="flex items-center justify-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <span>Try Advanced Filters</span>
                </span>
              </button>
              <button
                onClick={() => navigate('/counsellor')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Get AI Recommendations
              </button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}