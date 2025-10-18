'use client'

import { useState } from "react"
import Step1_Name from "./steps/Step1_Name"

export default function FormWizard() {
  const [step, setStep] = useState(0)

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => Math.max(0, prev - 1))

  const totalSteps = 3 // Adjust as more steps are added

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-semibold">Step {step + 1} of {totalSteps}</h2>

      {/* Render the current step here */}
      <div>
        {step === 0 && (
        <Step1_Name
            onNext={(data) => {
            console.log("From FormWizard:", data)
            nextStep()
            }}
        />
        )}

        {step === 1 && (
          <div>
            <p className="text-gray-500 mb-2">Step 2: Write a short bio</p>
            <div className="flex gap-4">
              <button
                onClick={prevStep}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <p className="text-gray-500 mb-2">Step 3: Preferences</p>
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
