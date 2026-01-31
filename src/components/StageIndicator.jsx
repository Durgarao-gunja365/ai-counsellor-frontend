const stages = [
  { key: "onboarding", label: "Building Profile" },
  { key: "discovery", label: "Discovering Universities" },
  { key: "shortlisting", label: "Finalizing Universities" },
  { key: "application", label: "Preparing Applications" },
];

export default function StageIndicator({ current }) {
  return (
    <div className="flex justify-between mb-6">
      {stages.map((stage) => (
        <div
          key={stage.key}
          className={`text-sm px-3 py-1 rounded-full
            ${stage.key === current
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-500"}`}
        >
          {stage.label}
        </div>
      ))}
    </div>
  );
}
