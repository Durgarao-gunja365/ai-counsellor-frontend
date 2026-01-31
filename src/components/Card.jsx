export default function Card({ title, children }) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
}
