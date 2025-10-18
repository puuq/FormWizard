'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { useState } from "react"

const schema = z.object({
  bio: z.string().min(10, "Bio must be at least 10 characters"),
})

type FormValues = z.infer<typeof schema>

export default function Step2_Bio({
  onNext,
  onBack,
}: {
  onNext: (data: FormValues) => void
  onBack: () => void
}) {
  const [loading, setLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { bio: "" },
  })

  const generateAI = async () => {
    setLoading(true)

    // Simulate AI response — replace with OpenAI call if needed
    await new Promise((res) => setTimeout(res, 1000))
    const aiGenerated = "Hi, I'm an AI-generated enthusiastic frontend dev who loves React and TypeScript!"

    form.setValue("bio", aiGenerated)
    form.trigger("bio")
    setLoading(false)
  }

  const onSubmit = (data: FormValues) => {
    console.log("✅ Bio submitted:", data)
    onNext(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us about yourself..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="button" variant="secondary" onClick={onBack}>
            Back
          </Button>
          <Button type="button" onClick={generateAI} disabled={loading}>
            {loading ? "Generating..." : "Generate with AI"}
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  )
}
