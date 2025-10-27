import { platforms } from "@/utils/platforms"
import { gameStatus } from "@/utils/status"
import { z } from "zod"

export const gameFormSchema = z
  .object({
    platform: z.enum(
      platforms.map((p) => p.id),
      {
        error: "Please select a plataform.",
      },
    ),

    rating: z
      .number()
      .min(0, "Rating cannot be negative")
      .max(5, "Rating cannot exceed 5")
      .transform((val) => Math.round(val)),

    platinum: z.boolean().default(false),

    status: z.enum(gameStatus, {
      error: "Please select a status.",
    }),

    completedDate: z.date().optional(),
  })
  .refine(
    (data) => {
      if (data.status === "Completed" && !data.completedDate) {
        return false
      }
      return true
    },
    {
      message: "Completion date is required when game is completed",
      path: ["completedDate"],
    },
  )

export const completeGameFormSchema = z.object({
  rating: z
    .number()
    .min(0, "Rating cannot be negative")
    .max(5, "Rating cannot exceed 5")
    .transform((val) => Math.round(val)),

  platinum: z.boolean().default(false),
})

export type GameFormData = z.infer<typeof gameFormSchema>
export type CompleteGameFormData = z.infer<typeof completeGameFormSchema>
