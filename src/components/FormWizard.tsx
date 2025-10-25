'use client'

import { useState } from "react"
import Step1_Name from "@/components/steps/Step1_Name"
import Step2_Bio from "@/components/steps/Step2_Bio"
import Step3_Preferences from "@/components/steps/Step3_Preferences"
import { Progress } from "@/components/ui/progress"

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

  const progressValue = Math.min((step / totalSteps) * 100, 100)

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow space-y-6">
      {/* Progress Bar */}
      <Progress value={progressValue} className="h-2" />

      {/* Step Title */}
      {step < totalSteps ? (
        <h2 className="text-2xl font-semibold">
          Step {step + 1} of {totalSteps}
        </h2>
      ) : (
        <h2 className="text-2xl font-semibold text-green-600">✅ Completed</h2>
      )}

      {/* Step 1: Name */}
      {step === 0 && (
        <Step1_Name onNext={(data) => updateData(data)} />
      )}

      {/* Step 2: Bio */}
      {step === 1 && (
        <Step2_Bio
          onBack={prevStep}
          onNext={(data) => updateData(data)}
        />
      )}

      {/* Step 3: Preferences */}
      {step === 2 && (
        <Step3_Preferences
          onBack={prevStep}
          onNext={(data) => {
            updateData(data)
          }}
        />
      )}

      {/* Step 4: Confirmation */}
      {step === totalSteps && (
        <div className="space-y-4 text-center">
          <h3 className="text-xl font-semibold">🎉 All steps completed!</h3>
          <p className="text-gray-600">Here’s what you submitted:</p>

          <pre className="bg-gray-100 text-left text-sm p-4 rounded border overflow-x-auto">
            {JSON.stringify(formData, null, 2)}
          </pre>

          <p className="text-gray-500 text-sm">
            You can now send this data to an API or display a success screen.
          </p>
          <button
            onClick={async () => {
              try {
                const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(formData),
                })

                const result = await res.json()
                console.log("✅ API response:", result)
                alert("Form successfully submitted to mock API!")
              } catch (error) {
                console.error("❌ API submission failed:", error)
                alert("Something went wrong. Please try again.")
              }
            }}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit to API
          </button>
        </div>
      )}
    </div>
  )
}
