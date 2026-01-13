"use client"

/* ----------------------------- */
/* Types                         */
/* ----------------------------- */

type IdeaStatus =
  | "submitted"
  | "approved"
  | "rejected"
  | "completed"
  | "cancelled"

interface IdeaTimelineProps {
  status: IdeaStatus
}

/* ----------------------------- */
/* Component                     */
/* ----------------------------- */

export default function IdeaTimeline({ status }: IdeaTimelineProps) {
  const steps = [
    { key: "submitted", label: "Submitted" },
    { key: "approved", label: "Approved" },
    { key: "completed", label: "Completed" },
  ] as const

  /* ----------------------------- */
  /* Cancelled State               */
  /* ----------------------------- */

  if (status === "cancelled") {
    return (
      <div className="mt-4 rounded-xl bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
        Idea cancelled by you
      </div>
    )
  }

  /* ----------------------------- */
  /* Rejected State                */
  /* ----------------------------- */

  if (status === "rejected") {
    return (
      <div className="mt-4 rounded-xl bg-amber-500/10 px-4 py-3 text-sm text-amber-400">
        Idea was rejected
      </div>
    )
  }

  /* ----------------------------- */
  /* Normal Timeline               */
  /* ----------------------------- */

  const currentIndex = steps.findIndex((s) => s.key === status)

  return (
    <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
      {steps.map((step, idx) => {
        const isCompleted = idx <= currentIndex

        return (
          <div
            key={step.key}
            className="flex items-center gap-3 sm:gap-2"
          >
            <div
              className={`h-2.5 w-2.5 rounded-full ${
                isCompleted ? "bg-accent" : "bg-muted"
              }`}
            />

            <span
              className={`text-xs sm:text-sm font-medium ${
                isCompleted
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {step.label}
            </span>

            {idx < steps.length - 1 && (
              <div className="hidden sm:block mx-3 h-px w-8 bg-border" />
            )}
          </div>
        )
      })}
    </div>
  )
}
