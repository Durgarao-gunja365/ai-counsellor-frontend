import { useEffect, useState } from "react";
import api from "../api/client";
export default function AIExplanationPanel() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/counsellor/reason")
      .then(res => setText(res.data.reasoning))
      .catch(() => setText("AI counsellor is currently unavailable."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse text-gray-500">
        🤖 Analysing your profile...
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-gradient-to-br from-indigo-50 to-white p-5 shadow-sm">
      <h3 className="font-semibold text-indigo-700 mb-3 flex items-center gap-2">
        🤖 AI Counsellor Insight
      </h3>
      <pre className="text-sm whitespace-pre-wrap text-gray-800">
        {text}
      </pre>
    </div>
  );
}
