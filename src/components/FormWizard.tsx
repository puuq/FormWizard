'use client'

import { useState } from "react"
import Step1_Name from "@/components/steps/Step1_Name"
import Step2_Bio from "@/components/steps/Step2_Bio"
import Step3_Preferences from "@/components/steps/Step3_Preferences"

type WizardData = {
  name?: string
  bio?: string
  preference?: "frontend" | "backend" | "fullstack"
}

export default function FormWizard() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<WizardData>({})

  const totalSteps = 3

  const nextStep = () => setStep((s) => s + 1)
  const prevStep = () => setStep((s) => Math.max(0, s - 1))

  const updateData = (data: Partial<WizardData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
    nextStep()
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-semibold">
        Step {Math.min(step + 1, totalSteps)} of {totalSteps}
      </h2>

      {step === 0 && (
        <Step1_Name
          onNext={(data) => updateData(data)}
        />
      )}

      {step === 1 && (
        <Step2_Bio
          onBack={prevStep}
          onNext={(data) => updateData(data)}
        />
      )}

      {step === 2 && (
        <Step3_Preferences
          onBack={prevStep}
          onNext={(data) => {
            updateData(data)
            console.log("🧾 Final Form Data:", {
              ...formData,
              ...data,
            })
            // 🔜 You can show a review screen or send to API here
          }}
        />
      )}
    </div>
  )
}
