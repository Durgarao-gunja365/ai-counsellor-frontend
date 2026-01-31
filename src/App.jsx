import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Academic from "./onboarding/Academic";
import StudyGoal from "./onboarding/StudyGoal";
import Budget from "./onboarding/Budget";
import Exams from "./onboarding/Exams";
import Dashboard from "./dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Universities from "./universities/Universities";
import CounsellorGuide from "./pages/CounsellorGuide";
import ShortlistedUniversities from "./pages/ShortlistedUniversities";
import SearchUniversities from "./universities/SearchUniversities";
import EditProfile from "./profile/EditProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
<Route
  path="/profile/edit"
  element={
    <ProtectedRoute>
      <EditProfile />
    </ProtectedRoute>
  }
/>
        <Route path="/onboarding/academic" element={<ProtectedRoute><Academic /></ProtectedRoute>} />
        <Route path="/onboarding/study-goal" element={<ProtectedRoute><StudyGoal /></ProtectedRoute>} />
        <Route path="/onboarding/budget" element={<ProtectedRoute><Budget /></ProtectedRoute>} />
        <Route path="/onboarding/exams" element={<ProtectedRoute><Exams /></ProtectedRoute>} />

        <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route
  path="/universities"
  element={
    <ProtectedRoute>
      <Universities />
    </ProtectedRoute>
  }
/>

<Route path="/counsellor" element={<ProtectedRoute><CounsellorGuide /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><SearchUniversities /></ProtectedRoute>} />
        <Route path="/shortlisted" element={<ProtectedRoute><ShortlistedUniversities /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
