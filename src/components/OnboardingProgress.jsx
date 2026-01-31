const steps = [
  "Academic",
  "Study Goal",
  "Budget",
  "Exams"
];

export default function OnboardingProgress({ currentStep }) {
  return (
    <div className="flex items-center mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center w-full">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm
              ${index <= currentStep
                ? "bg-black text-white"
                : "border text-gray-400"}`}
          >
            {index + 1}
          </div>

          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 mx-2
                ${index < currentStep ? "bg-black" : "bg-gray-200"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
