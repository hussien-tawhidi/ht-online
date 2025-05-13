import { FiCheckCircle } from "react-icons/fi";

interface StepProps {
  stepNumber: number;
  currentStep: number;
  title: string;
}

const Step = ({ stepNumber, currentStep, title }: StepProps) => {
  const isActive = stepNumber <= currentStep;

  return (
    <div className='flex flex-col items-center'>
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isActive ? "bg-tusi text-white" : "bg-darker/10 text-darker/50"
        }`}>
        {isActive ? <FiCheckCircle size={20} /> : <span>{stepNumber}</span>}
      </div>
      <span
        className={`text-sm mt-2 ${
          isActive ? "text-tusi font-medium" : "text-darker/50"
        }`}>
        {title}
      </span>
    </div>
  );
};

export default function CheckoutProgress({
  currentStep,
}: {
  currentStep: number;
}) {
  return (
    <div className='flex items-center justify-between mb-10 relative'>
      {/* Step 1 */}
      <Step stepNumber={1} currentStep={currentStep} title='سبد خرید' />

      <div className='h-1 flex-1 mx-2 relative'>
        <div
          className={`absolute top-0 left-0 h-full ${
            currentStep >= 1 ? "bg-tusi" : "bg-darker/20"
          }`}
          style={{ width: "50%" }}></div>
      </div>

      {/* Step 2 */}
      <Step stepNumber={2} currentStep={currentStep} title='پرداخت' />

      <div className='h-1 flex-1 mx-2 bg-darker/10'></div>

      {/* Step 3 */}
      <Step stepNumber={3} currentStep={currentStep} title='تکمیل سفارش' />
    </div>
  );
}
