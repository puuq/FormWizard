'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
})

type FormValues = z.infer<typeof schema>

export default function Step1_Name({ onNext }: { onNext: (data: FormValues) => void }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "" },
  })

  const onSubmit = (data: FormValues) => {
    console.log("✅ Name submitted:", data)
    onNext(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Next</Button>
      </form>
    </Form>
  )
}
