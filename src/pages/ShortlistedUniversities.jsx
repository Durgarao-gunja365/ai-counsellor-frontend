import { useEffect, useState } from "react";
import api from "../api/client";
import AppLayout from "../components/AppLayout";
import { 
  Lock, 
  Trash2, 
  Star, 
  MapPin, 
  Globe, 
  Trophy, 
  Award, 
  TrendingUp,
  DollarSign,
  Users,
  BookOpen,
  ChevronRight,
  Filter,
  Search,
  Download,
  Share2,
  Loader2,
  AlertCircle,
  CheckCircle,
  X,
  Eye,
  Bookmark,
  Calendar,
  GraduationCap
} from "lucide-react";

export default function ShortlistedUniversities() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [showLockModal, setShowLockModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [sortBy, setSortBy] = useState("match_score");

  const loadShortlisted = () => {
    setLoading(true);
    api.get("/universities/shortlisted")
      .then(res => {
        // Add mock data for demonstration
        const universities = res.data.map((uni, index) => ({
          ...uni,
          rank: index + 1,
          match_score: 85 + Math.random() * 15,
          tuition_fee: `$${Math.floor(20000 + Math.random() * 30000)}`,
          acceptance_rate: `${Math.floor(15 + Math.random() * 35)}%`,
          scholarship_amount: `$${Math.floor(5000 + Math.random() * 15000)}`,
          location: ["New York", "California", "London", "Toronto", "Sydney"][index % 5],
          website: "https://example.edu",
          deadline: "2024-12-15"
        }));
        setList(universities);
      })
      .catch(err => {
        console.error("Failed to load shortlisted universities:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadShortlisted();
  }, []);

  async function lockUniversity(name) {
    try {
      await api.post(`/universities/lock?university_name=${encodeURIComponent(name)}`);
      
      // Update local state
      setList(prev => prev.map(uni => 
        uni.university_name === name 
          ? { ...uni, is_locked: true } 
          : { ...uni, is_locked: false }
      ));
      
      setShowLockModal(false);
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to lock university");
    }
  }

  async function removeUniversity(name) {
    try {
      await api.delete(
        `/universities/remove?university_name=${encodeURIComponent(name)}`
      );
      
      // Remove from local state
      setList(prev => prev.filter(uni => uni.university_name !== name));
      
      setShowRemoveModal(false);
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to remove university");
    }
  }

  const handleLockClick = (university) => {
    setSelectedUniversity(university);
    setShowLockModal(true);
  };

  const handleRemoveClick = (university) => {
    setSelectedUniversity(university);
    setShowRemoveModal(true);
  };

  const filteredList = list.filter(uni => {
    const matchesSearch = uni.university_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         uni.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountries.length === 0 || 
                          selectedCountries.some(country => 
                            uni.location.toLowerCase().includes(country.toLowerCase())
                          );
    return matchesSearch && matchesCountry;
  });

  const sortedList = [...filteredList].sort((a, b) => {
    switch (sortBy) {
      case "match_score":
        return b.match_score - a.match_score;
      case "rank":
        return a.rank - b.rank;
      case "tuition":
        const aFee = parseInt(a.tuition_fee.replace(/[^0-9]/g, ''));
        const bFee = parseInt(b.tuition_fee.replace(/[^0-9]/g, ''));
        return aFee - bFee;
      default:
        return b.match_score - a.match_score;
    }
  });

  const countries = ["USA", "UK", "Canada", "Australia", "Germany", "France"];

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Universities</h3>
            <p className="text-gray-500">Fetching your shortlisted universities...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shortlisted Universities</h1>
              <p className="text-gray-600 mt-2">
                Your personalized list of recommended universities
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-medium">Share List</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Export PDF</span>
              </button> */}
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Shortlisted</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{list.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Bookmark className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-600 font-medium">Average Match Score</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {list.length > 0 
                    ? Math.round(list.reduce((acc, uni) => acc + uni.match_score, 0) / list.length)
                    : 0}%
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Final Choice</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {list.filter(uni => uni.is_locked).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Avg. Scholarship</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  ${list.length > 0 
                    ? Math.round(list.reduce((acc, uni) => {
                        const amount = parseInt(uni.scholarship_amount?.replace(/[^0-9]/g, '') || 0);
                        return acc + amount;
                      }, 0) / list.length)
                    : 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search universities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="match_score">Sort by: Match Score</option>
                  <option value="rank">Sort by: Ranking</option>
                  <option value="tuition">Sort by: Tuition Fee</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-gray-500" />
                <div className="flex flex-wrap gap-2">
                  {countries.map(country => (
                    <button
                      key={country}
                      onClick={() => {
                        if (selectedCountries.includes(country)) {
                          setSelectedCountries(prev => prev.filter(c => c !== country));
                        } else {
                          setSelectedCountries(prev => [...prev, country]);
                        }
                      }}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                        selectedCountries.includes(country)
                          ? "bg-blue-100 text-blue-700 border border-blue-300"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                      }`}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Universities Grid */}
        {sortedList.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm || selectedCountries.length > 0 
                ? "No matching universities found" 
                : "No universities shortlisted yet"}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              {searchTerm || selectedCountries.length > 0 
                ? "Try adjusting your search filters to find more universities."
                : "Start exploring universities and add them to your shortlist for comparison."}
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCountries([]);
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedList.map((uni) => (
              <div
                key={uni.id}
                className={`bg-white rounded-xl shadow-sm border transition-all duration-300 hover:shadow-lg ${
                  uni.is_locked 
                    ? "border-emerald-500 ring-1 ring-emerald-200" 
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                {/* University Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{uni.university_name}</h3>
                        {uni.is_locked && (
                          <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-semibold rounded-full">
                            <Trophy className="w-3 h-3 mr-1" />
                            Final Choice
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{uni.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        #{uni.rank}
                      </div>
                      <div className="text-xs text-gray-500">Global Rank</div>
                    </div>
                  </div>

                  {/* Match Score Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">Match Score</span>
                      <span className="font-bold text-blue-600">{uni.match_score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${uni.match_score}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{uni.tuition_fee}</div>
                      <div className="text-xs text-gray-500 flex items-center justify-center">
                        <DollarSign className="w-3 h-3 mr-1" />
                        Tuition
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{uni.acceptance_rate}</div>
                      <div className="text-xs text-gray-500 flex items-center justify-center">
                        <Users className="w-3 h-3 mr-1" />
                        Acceptance
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{uni.scholarship_amount}</div>
                      <div className="text-xs text-gray-500 flex items-center justify-center">
                        <Award className="w-3 h-3 mr-1" />
                        Scholarship
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    {/* <div className="flex items-center space-x-4">
                      <button
                        onClick={() => window.open(uni.website, '_blank')}
                        className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        <Globe className="w-4 h-4 mr-1" />
                        Visit Website
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-gray-800 text-sm font-medium">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </button>
                    </div> */}
                    
                    <div className="flex items-center space-x-3">
                      {!uni.is_locked ? (
                        <>
                          <button
                            onClick={() => handleLockClick(uni)}
                            className="flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all text-sm font-medium"
                          >
                            <Lock className="w-4 h-4 mr-1" />
                            Set as Final
                          </button>
                          <button
                            onClick={() => handleRemoveClick(uni)}
                            className="flex items-center p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove from shortlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-lg text-sm font-medium border border-emerald-200">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Final Choice
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Deadline */}
                  {uni.deadline && (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Application Deadline: </span>
                      <span className="font-medium ml-1">{new Date(uni.deadline).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        {sortedList.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Compare Universities</h4>
                <p className="text-sm text-gray-600">Select up to 3 universities to compare side by side</p>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all flex items-center justify-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Compare Selected
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Lock University Modal */}
      {showLockModal && selectedUniversity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-fadeIn">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Set as Final Choice</h3>
              <p className="text-gray-600">
                You are about to set <span className="font-semibold">{selectedUniversity.university_name}</span> as your final university choice.
              </p>
            </div>
            
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-emerald-800 font-medium">What happens next?</p>
                  <ul className="text-xs text-emerald-700 mt-1 space-y-1">
                    <li>• This university will be marked as your final choice</li>
                    <li>• You'll receive personalized application guidance</li>
                    <li>• Other universities will be moved to backup list</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowLockModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => lockUniversity(selectedUniversity.university_name)}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center justify-center"
              >
                <Lock className="w-5 h-5 mr-2" />
                Confirm Lock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove University Modal */}
      {showRemoveModal && selectedUniversity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-fadeIn">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Remove University</h3>
              <p className="text-gray-600">
                Are you sure you want to remove <span className="font-semibold">{selectedUniversity.university_name}</span> from your shortlist?
              </p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-red-800 font-medium">This action cannot be undone</p>
                  <p className="text-xs text-red-700 mt-1">
                    The university will be removed from your shortlist and you'll need to re-add it if you change your mind.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowRemoveModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => removeUniversity(selectedUniversity.university_name)}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 transition-all flex items-center justify-center"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Remove University
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}