'use client'

import { useState } from "react"
import Step1_Name from "./steps/Step1_Name"
import Step2_Bio from "./steps/Step2_Bio"
import Step3_Preferences from "./steps/Step3_Preferences"

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
        <Step2_Bio
            onBack={prevStep}
            onNext={(data) => {
            console.log("From FormWizard (Bio):", data)
            nextStep()
            }}
        />
        )}

        {step === 2 && (
        <Step3_Preferences
            onBack={prevStep}
            onNext={(data) => {
            console.log("From FormWizard (Preferences):", data)
            // Maybe show summary or modal here
            }}
        />
        )}

      </div>
    </div>
  )
}
