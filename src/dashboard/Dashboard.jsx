// import { useEffect, useState } from "react";
// import api from "../api/client";
// import StageIndicator from "../components/StageIndicator";
// import Card from "../components/Card";
// import AppLayout from "../components/AppLayout";
// import AIExplanationPanel from "../components/AIExplanationPanel";
// import ProgressBar from "../components/ProgressBar";

// export default function Dashboard() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     api.get("/dashboard")
//       .then(res => setData(res.data))
//       .catch(err => {
//   if (!err.response) {
//     console.error("Network / CORS error", err);
//     return;
//   }

//   if (err.response.status === 401) {
//     window.location.href = "/login";
//   } else if (err.response.status === 403) {
//     window.location.href = "/onboarding/academic";
//   }
// });


//   }, []);

//   if (!data) {
//     return (
//       <AppLayout>
//         <p className="p-8">Loading dashboard...</p>
//       </AppLayout>
//     );
//   }

//   return (
//     <AppLayout>
//       <div className="p-8 space-y-6">

//         {/* Stage Indicator */}
//         <StageIndicator current={data.stage} />

//         {/* Profile + Strength */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//           <Card title="Profile Summary">
//             <p><b>Education:</b> {data.profile.education_level}</p>
//             <p><b>Major:</b> {data.profile.major}</p>
//             <p><b>Budget:</b> {data.profile.budget_range}</p>
//             <p><b>Target Degree:</b> {data.profile.intended_degree}</p>
//           </Card>

//           <Card title="Profile Strength">
//             {data.profile_strength ? (
//               <p className="text-lg font-semibold capitalize">
//                 {data.profile_strength}
//               </p>
//             ) : (
//               <p className="text-gray-500">
//                 Complete exams & SOP to calculate strength.
//               </p>
//             )}
//           </Card>

//         </div>

//         {/* Locked University */}
//         {data.locked_university && (
//           <Card title="Final Decision">
//             🎓 <b>{data.locked_university}</b> has been locked.
//           </Card>
//         )}

//         {/* AI Counsellor */}
//         <Card title="AI Counsellor">
//           <AIExplanationPanel />
//         </Card>

//         {/* AI Tasks */}
//         <Card title="Application Progress">
//   <ProgressBar value={data.progress} />
//   <p className="text-sm text-gray-600 mt-1">
//     {data.progress}% completed
//   </p>
// </Card>

// <Card title="AI To-Do List">
//   {data.tasks.length > 0 ? (
//     <ul className="space-y-2">
//       {data.tasks.map(task => (
//         <li
//           key={task.id}
//           className="flex items-center gap-2"
//         >
//           <input
//             type="checkbox"
//             checked={task.is_completed}
//             onChange={async () => {
//               await api.post(`/tasks/${task.id}/toggle`);
//               const res = await api.get("/dashboard");
//               setData(res.data);
//             }}
//           />
//           <span
//             className={task.is_completed ? "line-through text-gray-400" : ""}
//           >
//             {task.title}
//           </span>
//         </li>
//       ))}
//     </ul>
//   ) : (
//     <p className="text-gray-500">
//       Tasks will appear after you lock a university.
//     </p>
//   )}
// </Card>

//       </div>
//     </AppLayout>
//   );
// }


import { useEffect, useState } from "react";
import api from "../api/client";
import StageIndicator from "../components/StageIndicator";
import Card from "../components/Card";
import AppLayout from "../components/AppLayout";
import AIExplanationPanel from "../components/AIExplanationPanel";
import ProgressBar from "../components/ProgressBar";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);
  

  async function fetchDashboardData() {
    try {
      setLoading(true);
      const res = await api.get("/dashboard");
      setData(res.data);
    } catch (err) {
      if (!err.response) {
        console.error("Network / CORS error", err);
        return;
      }

      if (err.response.status === 401) {
        window.location.href = "/login";
      } else if (err.response.status === 403) {
        window.location.href = "/onboarding/academic";
      }
    } finally {
      setLoading(false);
    }
  }

  async function toggleTask(taskId) {
    try {
      await api.post(`/tasks/${taskId}/toggle`);
      // Refresh tasks
      const res = await api.get("/dashboard");
      setData(res.data);
    } catch (error) {
      console.error("Failed to toggle task:", error);
    }
  }

  async function refreshDashboard() {
    setRefreshing(true);
    await fetchDashboardData();
    setTimeout(() => setRefreshing(false), 500);
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="loading-screen">
          <div className="spinner"></div>
          <p className="loading-text">Loading your dashboard...</p>
        </div>
        <style jsx>{`
          .loading-screen {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 70vh;
            gap: 20px;
          }
          
          .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(102, 126, 234, 0.1);
            border-radius: 50%;
            border-top-color: #667eea;
            animation: spin 1s linear infinite;
          }
          
          .loading-text {
            color: #718096;
            font-size: 18px;
            font-weight: 500;
          }
          
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </AppLayout>
    );
  }

  const { profile, profile_strength, locked_university, tasks, progress } = data;

  return (
    <AppLayout>
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Application Dashboard</h1>
            <p className="dashboard-subtitle">
              Track your progress and complete application tasks
            </p>
          </div>
          <button 
            className={`refresh-btn ${refreshing ? 'refreshing' : ''}`}
            onClick={refreshDashboard}
            disabled={refreshing}
          >
            {refreshing ? (
              <span className="refresh-spinner"></span>
            ) : (
              <span className="refresh-icon">↻</span>
            )}
            Refresh
          </button>
        </div>

        {/* Stage Indicator */}
        <div className="stage-indicator-wrapper">
          <StageIndicator current={data.stage} />
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-grid">
          {/* Profile Summary Card */}
          <div className="dashboard-card profile-card fade-in">
            <div className="card-header">
              <div className="card-icon">👤</div>
              <h3 className="card-title">Profile Summary</h3>
            </div>
            <div className="profile-details">
              <div className="detail-item">
                <span className="detail-label">Education</span>
                <span className="detail-value">{profile.education_level}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Major</span>
                <span className="detail-value">{profile.major}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Budget</span>
                <span className="detail-value budget-highlight">{profile.budget_range}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Target Degree</span>
                <span className="detail-value">{profile.intended_degree}</span>
              </div>
              {/* <div className="profile-completeness">
                <span className="completeness-label">Profile Completeness</span>
                <div className="completeness-bar">
                  <div 
                    className="completeness-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="completeness-percent">{progress}%</span>
              </div> */}
            </div>
          </div>

          {/* Profile Strength Card
          <div className="dashboard-card strength-card fade-in delay-1">
            <div className="card-header">
              <div className="card-icon">💪</div>
              <h3 className="card-title">Profile Strength</h3>
            </div>
            <div className="strength-content">
              {profile_strength ? (
                <>
                  <div className="strength-meter">
                    <div className="strength-fill" style={{
                      width: profile_strength === 'strong' ? '90%' : 
                             profile_strength === 'moderate' ? '65%' : '40%'
                    }}></div>
                  </div>
                  <div className="strength-label">
                    <span className="strength-text capitalize">
                      {profile_strength}
                    </span>
                    <span className="strength-emoji">
                      {profile_strength === 'strong' ? '🚀' : 
                       profile_strength === 'moderate' ? '📈' : '📝'}
                    </span>
                  </div>
                  <p className="strength-tip">
                    {profile_strength === 'strong' 
                      ? 'Your profile is competitive for top universities!'
                      : profile_strength === 'moderate'
                      ? 'Good foundation, focus on strengthening test scores.'
                      : 'Complete exams & SOP to improve your profile.'}
                  </p>
                </>
              ) : (
                <div className="no-strength">
                  <div className="no-strength-icon">📊</div>
                  <p className="no-strength-text">
                    Complete exams & SOP to calculate strength.
                  </p>
                </div>
              )}
            </div>
          </div> */}

          {/* Locked University Card */}
          {locked_university && (
            <div className="dashboard-card locked-university-card fade-in delay-2">
              <div className="locked-header">
                <div className="locked-icon">🔒</div>
                <h3 className="locked-title">Final Decision Locked</h3>
              </div>
              <div className="university-info">
                <div className="university-badge">🎓</div>
                <div className="university-details">
                  <h4 className="university-name">{locked_university}</h4>
                  <p className="university-status">
                    Application decision has been confirmed
                  </p>
                </div>
              </div>
              <div className="lock-timestamp">
                <span className="timestamp-label">Locked on:</span>
                <span className="timestamp-value">Just now</span>
              </div>
            </div>
          )}

          {/* AI Counsellor Card */}
          <div className="dashboard-card ai-card fade-in delay-3">
            <div className="card-header">
              <div className="card-icon">🤖</div>
              <h3 className="card-title">AI Counsellor</h3>
            </div>
            <AIExplanationPanel />
          </div>

          {/* Progress Card */}
          <div className="dashboard-card progress-card fade-in delay-4">
            <div className="card-header">
              <div className="card-icon">📈</div>
              <h3 className="card-title">Application Progress</h3>
            </div>
            <div className="progress-content">
              <ProgressBar value={progress} />
              <div className="progress-stats">
                <div className="stat-item">
                  <span className="stat-label">Completed</span>
                  <span className="stat-value">{progress}%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Remaining</span>
                  <span className="stat-value">{100 - progress}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* To-Do List Card */}
          <div className="dashboard-card todo-card fade-in delay-5">
            <div className="card-header">
              <div className="card-icon">✅</div>
              <div className="todo-header-content">
                <h3 className="card-title">AI To-Do List</h3>
                <span className="todo-count">{tasks.filter(t => !t.is_completed).length} pending</span>
              </div>
            </div>
            <div className="todo-content">
              {tasks.length > 0 ? (
                <ul className="todo-list">
                  {tasks.map((task, index) => (
                    <li
                      key={task.id}
                      className={`todo-item ${task.is_completed ? 'completed' : ''} slide-in`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <label className="todo-label">
                        <input
                          type="checkbox"
                          checked={task.is_completed}
                          onChange={() => toggleTask(task.id)}
                          className="todo-checkbox"
                        />
                        <span className="custom-checkbox"></span>
                        <span className="todo-text">{task.title}</span>
                      </label>
                      {!task.is_completed && (
                        <span className="todo-priority">
                          {task.priority === 'high' ? '🔥' : 
                           task.priority === 'medium' ? '⚠️' : '📋'}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="no-tasks">
                  <div className="no-tasks-icon">📝</div>
                  <p className="no-tasks-text">
                    Tasks will appear after you lock a university.
                  </p>
                  <button className="explore-btn">
                    Explore Universities →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <style jsx>{`
          .dashboard-container {
            padding: 24px;
            min-height: 100vh;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          }
          
          /* Animations */
          .fade-in {
            opacity: 0;
            animation: fadeIn 0.5s ease forwards;
          }
          
          .fade-in.delay-1 {
            animation-delay: 0.1s;
          }
          
          .fade-in.delay-2 {
            animation-delay: 0.2s;
          }
          
          .fade-in.delay-3 {
            animation-delay: 0.3s;
          }
          
          .fade-in.delay-4 {
            animation-delay: 0.4s;
          }
          
          .fade-in.delay-5 {
            animation-delay: 0.5s;
          }
          
          .slide-in {
            opacity: 0;
            transform: translateX(-20px);
            animation: slideIn 0.3s ease forwards;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .dashboard-header {
           margin-top: 28px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 32px;
            padding: 24px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            animation: fadeIn 0.5s ease;
          }
          
          .dashboard-title {
            font-size: 32px;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 8px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .dashboard-subtitle {
            color: #718096;
            font-size: 16px;
          }
          
          .stage-indicator-wrapper {
            margin-bottom: 32px;
            animation: fadeIn 0.5s ease;
          }
          
          .refresh-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            background: #edf2f7;
            border: none;
            border-radius: 8px;
            color: #4a5568;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
          }
          
          .refresh-btn:hover:not(:disabled) {
            background: #e2e8f0;
            transform: translateY(-2px);
          }
          
          .refresh-btn.refreshing {
            opacity: 0.7;
            cursor: not-allowed;
          }
          
          .refresh-icon {
            font-size: 18px;
          }
          
          .refresh-spinner {
            width: 16px;
            height: 16px;
            border: 2px solid rgba(74, 85, 104, 0.3);
            border-radius: 50%;
            border-top-color: #4a5568;
            animation: spin 1s linear infinite;
          }
          
          .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 24px;
          }
          
          .dashboard-card {
            background: white;
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            transition: transform 0.3s, box-shadow 0.3s;
          }
          
          .dashboard-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          }
          
          .card-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
          }
          
          .card-icon {
            font-size: 24px;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 12px;
          }
          
          .card-title {
            font-size: 20px;
            font-weight: 600;
            color: #2d3748;
          }
          
          .profile-details {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          
          .detail-item {
            display: flex;
            justify-content: space-between;
            padding-bottom: 12px;
            border-bottom: 1px solid #edf2f7;
          }
          
          .detail-item:last-child {
            border-bottom: none;
          }
          
          .detail-label {
            color: #718096;
            font-size: 14px;
            font-weight: 500;
          }
          
          .detail-value {
            color: #2d3748;
            font-weight: 600;
          }
          
          .budget-highlight {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .profile-completeness {
            margin-top: 16px;
            padding: 16px;
            background: #f7fafc;
            border-radius: 12px;
          }
          
          .completeness-label {
            display: block;
            color: #718096;
            font-size: 14px;
            margin-bottom: 8px;
          }
          
          .completeness-bar {
            height: 8px;
            background: #e2e8f0;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 8px;
          }
          
          .completeness-fill {
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 4px;
            transition: width 0.5s ease;
          }
          
          .completeness-percent {
            float: right;
            color: #2d3748;
            font-weight: 600;
            font-size: 14px;
          }
          
          .strength-content {
            padding: 16px 0;
          }
          
          .strength-meter {
            height: 12px;
            background: #e2e8f0;
            border-radius: 6px;
            overflow: hidden;
            margin-bottom: 16px;
          }
          
          .strength-fill {
            height: 100%;
            background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
            border-radius: 6px;
            transition: width 0.5s ease;
          }
          
          .strength-label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 12px;
          }
          
          .strength-text {
            font-size: 24px;
            font-weight: 700;
            text-transform: capitalize;
          }
          
          .strength-emoji {
            font-size: 28px;
          }
          
          .strength-tip {
            color: #718096;
            font-size: 14px;
            line-height: 1.5;
            padding: 12px;
            background: #f7fafc;
            border-radius: 8px;
            border-left: 4px solid #667eea;
          }
          
          .no-strength {
            text-align: center;
            padding: 32px 16px;
          }
          
          .no-strength-icon {
            font-size: 48px;
            margin-bottom: 16px;
            opacity: 0.5;
          }
          
          .no-strength-text {
            color: #a0aec0;
            font-size: 16px;
          }
          
          .locked-university-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }
          
          .locked-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
          }
          
          .locked-icon {
            font-size: 24px;
            background: rgba(255, 255, 255, 0.2);
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
          }
          
          .locked-title {
            color: white;
            font-size: 20px;
            font-weight: 600;
          }
          
          .university-info {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 20px;
          }
          
          .university-badge {
            font-size: 48px;
            background: rgba(255, 255, 255, 0.1);
            width: 80px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 16px;
          }
          
          .university-details {
            flex: 1;
          }
          
          .university-name {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 4px;
          }
          
          .university-status {
            opacity: 0.9;
            font-size: 14px;
          }
          
          .lock-timestamp {
            display: flex;
            justify-content: space-between;
            padding-top: 16px;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .timestamp-label {
            opacity: 0.8;
            font-size: 14px;
          }
          
          .timestamp-value {
            font-weight: 600;
            font-size: 14px;
          }
          
          .progress-content {
            padding: 16px 0;
          }
          
          .progress-stats {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
          }
          
          .stat-item {
            text-align: center;
            flex: 1;
          }
          
          .stat-label {
            display: block;
            color: #718096;
            font-size: 14px;
            margin-bottom: 4px;
          }
          
          .stat-value {
            display: block;
            color: #2d3748;
            font-size: 24px;
            font-weight: 700;
          }
          
          .todo-header-content {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .todo-count {
            background: #fed7d7;
            color: #9b2c2c;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
          }
          
          .todo-list {
            list-style: none;
            padding: 0;
          }
          
          .todo-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;
            margin-bottom: 8px;
            background: #f7fafc;
            border-radius: 8px;
            transition: all 0.3s;
          }
          
          .todo-item:hover {
            background: #edf2f7;
            transform: translateX(4px);
          }
          
          .todo-item.completed {
            opacity: 0.7;
            background: #f0fff4;
          }
          
          .todo-label {
            display: flex;
            align-items: center;
            gap: 12px;
            cursor: pointer;
            flex: 1;
          }
          
          .todo-checkbox {
            display: none;
  }
          
          .custom-checkbox {
            width: 20px;
            height: 20px;
            border: 2px solid #cbd5e0;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
          }
          
          .todo-checkbox:checked + .custom-checkbox {
            background: #48bb78;
            border-color: #48bb78;
          }
          
          .todo-checkbox:checked + .custom-checkbox::after {
            content: '✓';
            color: white;
            font-size: 14px;
            font-weight: bold;
          }
          
          .todo-text {
            flex: 1;
            font-size: 14px;
            color: #2d3748;
          }
          
          .todo-item.completed .todo-text {
            text-decoration: line-through;
            color: #a0aec0;
          }
          
          .todo-priority {
            font-size: 16px;
            opacity: 0.7;
          }
          
          .no-tasks {
            text-align: center;
            padding: 40px 20px;
          }
          
          .no-tasks-icon {
            font-size: 48px;
            margin-bottom: 16px;
            opacity: 0.3;
          }
          
          .no-tasks-text {
            color: #a0aec0;
            font-size: 16px;
            margin-bottom: 20px;
          }
          
          .explore-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.3s;
          }
          
          .explore-btn:hover {
            transform: translateY(-2px);
          }
          
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          
          @media (max-width: 768px) {
            .dashboard-container {
              padding: 16px;
            }
            
            .dashboard-header {
              flex-direction: column;
              gap: 16px;
              text-align: center;
            }
            
            .dashboard-grid {
              grid-template-columns: 1fr;
            }
            
            .card-title {
              font-size: 18px;
            }
          }
        `}</style>
      </div>
    </AppLayout>
  );
}