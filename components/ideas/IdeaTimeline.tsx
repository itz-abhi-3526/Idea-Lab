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

export default function IdeaTimeline({
  status,
}: IdeaTimelineProps) {
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

  const currentIndex = steps.findIndex(
    (s) => s.key === status
  )

  return (
    <div className="mt-4 flex items-center gap-4">
      {steps.map((step, idx) => {
        const isCompleted = idx <= currentIndex

        return (
          <div
            key={step.key}
            className="flex items-center gap-2"
          >
            <div
              className={`h-2 w-2 rounded-full ${
                isCompleted
                  ? "bg-accent"
                  : "bg-muted"
              }`}
            />

            <span
              className={`text-xs ${
                isCompleted
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {step.label}
            </span>

            {idx < steps.length - 1 && (
              <div className="mx-2 h-px w-6 bg-border" />
            )}
          </div>
        )
      })}
    </div>
  )
}
