export default function ProgressBar({ value }) {
  return (
    <div className="w-full bg-gray-200 rounded h-3">
      <div
        className="bg-green-500 h-3 rounded transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
