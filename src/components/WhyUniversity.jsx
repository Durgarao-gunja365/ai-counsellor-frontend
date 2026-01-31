// import api from "../api/client";
// import { useState } from "react";

// export default function WhyUniversity({ universityName }) {
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function explain() {
//     setLoading(true);
//     const res = await api.get(
//       `/universities/why?university_name=${encodeURIComponent(universityName)}`
//     );
//     setText(res.data.explanation);
//     setLoading(false);
//   }

//   return (
//     <div>
//       <button
//         onClick={explain}
//         className="text-sm underline"
//       >
//         Why this university?
//       </button>

//       {loading && <p className="text-sm">Analysing...</p>}

//       {text && (
//         <p className="mt-2 text-sm bg-gray-50 p-2 rounded whitespace-pre-line">
//           {text}
//         </p>
//       )}
//     </div>
//   );
// }


import api from "../api/client";
import { useState } from "react";

export default function WhyUniversity({ universityName }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  async function explain() {
    if (loading) return;
    
    setLoading(true);
    setError(null);
    setExpanded(true);
    
    try {
      const res = await api.get(
        `/universities/why?university_name=${encodeURIComponent(universityName)}`
      );
      setText(res.data.explanation);
    } catch (err) {
      console.error("Failed to fetch explanation:", err);
      setError("Failed to analyze university. Please try again.");
      setText("");
    } finally {
      setLoading(false);
    }
  }

  function toggleExpanded() {
    setExpanded(!expanded);
    if (!expanded && !text && !loading) {
      explain();
    }
  }

  return (
    <div className="why-university-container">
      {/* Trigger Button */}
      <button
        onClick={toggleExpanded}
        className="why-btn"
        disabled={loading}
      >
        <span className="btn-icon">🎓</span>
        <span className="btn-text">
          {loading ? "Analyzing..." : "Why this university?"}
        </span>
        <span className={`arrow ${expanded ? 'expanded' : ''}`}>
          ▼
        </span>
      </button>

      {/* Loading State */}
      {loading && (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <div className="loading-text">
            <span className="loading-title">Analyzing University Fit</span>
            <span className="loading-subtitle">
              Our AI is evaluating how {universityName} matches your profile...
            </span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <div className="error-content">
            <span className="error-title">Analysis Failed</span>
            <span className="error-message">{error}</span>
            <button
              className="retry-btn"
              onClick={explain}
              disabled={loading}
            >
              <span className="retry-icon">↻</span>
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Explanation Text */}
      {text && expanded && (
        <div className="explanation-card">
          <div className="explanation-header">
            <div className="university-badge">
              <span className="badge-icon">🏛️</span>
              <span className="university-name">{universityName}</span>
            </div>
            <button
              className="close-btn"
              onClick={() => setExpanded(false)}
            >
              ✕
            </button>
          </div>
          
          <div className="explanation-content">
            <div className="explanation-icon">💡</div>
            <div className="explanation-text">
              {text.split('\n').map((line, index) => (
                <p key={index} className="explanation-paragraph">
                  {line}
                </p>
              ))}
            </div>
          </div>
          
          <div className="explanation-footer">
            <div className="ai-tag">
              <span className="ai-icon">🤖</span>
              <span className="ai-text">AI Analysis</span>
            </div>
            <button
              className="copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(text);
                // You could add a toast notification here
              }}
            >
              Copy Analysis
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .why-university-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }
        
        .why-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          width: 100%;
          justify-content: center;
        }
        
        .why-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
        }
        
        .why-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .btn-icon {
          font-size: 16px;
        }
        
        .btn-text {
          flex: 1;
          text-align: left;
        }
        
        .arrow {
          font-size: 10px;
          transition: transform 0.3s;
        }
        
        .arrow.expanded {
          transform: rotate(180deg);
        }
        
        .loading-state {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-radius: 12px;
          margin-top: 12px;
          animation: fadeIn 0.3s ease;
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(102, 126, 234, 0.1);
          border-radius: 50%;
          border-top-color: #667eea;
          animation: spin 1s linear infinite;
          flex-shrink: 0;
        }
        
        .loading-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .loading-title {
          font-size: 16px;
          font-weight: 600;
          color: #2d3748;
        }
        
        .loading-subtitle {
          font-size: 14px;
          color: #718096;
        }
        
        .error-state {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          background: #fed7d7;
          border-radius: 12px;
          margin-top: 12px;
          border-left: 4px solid #fc8181;
          animation: fadeIn 0.3s ease;
        }
        
        .error-icon {
          font-size: 24px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        
        .error-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }
        
        .error-title {
          font-size: 14px;
          font-weight: 600;
          color: #9b2c2c;
        }
        
        .error-message {
          font-size: 14px;
          color: #9b2c2c;
        }
        
        .retry-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: #9b2c2c;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          width: fit-content;
        }
        
        .retry-btn:hover:not(:disabled) {
          background: #c53030;
          transform: translateY(-1px);
        }
        
        .retry-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .retry-icon {
          font-size: 12px;
        }
        
        .explanation-card {
          background: white;
          border-radius: 12px;
          margin-top: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
          overflow: hidden;
          animation: slideDown 0.3s ease;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .explanation-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .university-badge {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .badge-icon {
          font-size: 20px;
        }
        
        .university-name {
          font-size: 16px;
          font-weight: 600;
        }
        
        .close-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s;
        }
        
        .close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        
        .explanation-content {
          display: flex;
          gap: 16px;
          padding: 20px;
        }
        
        .explanation-icon {
          font-size: 24px;
          flex-shrink: 0;
          margin-top: 4px;
        }
        
        .explanation-text {
          flex: 1;
        }
        
        .explanation-paragraph {
          font-size: 14px;
          line-height: 1.6;
          color: #4a5568;
          margin-bottom: 12px;
        }
        
        .explanation-paragraph:last-child {
          margin-bottom: 0;
        }
        
        .explanation-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          background: #f7fafc;
          border-top: 1px solid #e2e8f0;
        }
        
        .ai-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #ebf8ff;
          padding: 4px 10px;
          border-radius: 20px;
        }
        
        .ai-icon {
          font-size: 14px;
        }
        
        .ai-text {
          font-size: 12px;
          font-weight: 600;
          color: #2c5282;
        }
        
        .copy-btn {
          padding: 6px 12px;
          background: #edf2f7;
          color: #4a5568;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .copy-btn:hover {
          background: #e2e8f0;
          transform: translateY(-1px);
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @media (max-width: 640px) {
          .why-btn {
            padding: 12px;
          }
          
          .loading-state {
            padding: 16px;
          }
          
          .explanation-content {
            padding: 16px;
            flex-direction: column;
            gap: 12px;
          }
          
          .explanation-footer {
            flex-direction: column;
            gap: 12px;
            align-items: stretch;
          }
          
          .copy-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}