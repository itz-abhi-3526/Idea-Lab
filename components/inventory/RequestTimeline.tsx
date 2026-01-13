"use client"

type Status =
  | "submitted"
  | "approved"
  | "rejected"
  | "completed"
  | "cancelled"

const STEPS: { key: Status; label: string }[] = [
  { key: "submitted", label: "Submitted" },
  { key: "approved", label: "Approved" },
  { key: "completed", label: "Completed" },
]

export default function RequestTimeline({
  status,
}: {
  status: Status
}) {
  const currentIndex = STEPS.findIndex(
    (s) => s.key === status
  )

  return (
    <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4 text-xs sm:text-sm">
      {STEPS.map((step, index) => {
        const isCompleted =
          status !== "rejected" &&
          status !== "cancelled" &&
          index <= currentIndex

        const isRejected = status === "rejected"
        const isCancelled = status === "cancelled"

        return (
          <div key={step.key} className="flex items-center gap-3">
            {/* DOT */}
            <div
              className={`h-2.5 w-2.5 rounded-full transition ${
                isCompleted
                  ? "bg-accent"
                  : isRejected
                  ? "bg-red-500"
                  : isCancelled
                  ? "bg-muted"
                  : "bg-muted"
              }`}
            />

            {/* LABEL */}
            <span
              className={`whitespace-nowrap font-medium ${
                isCompleted
                  ? "text-foreground"
                  : isRejected
                  ? "text-red-400"
                  : isCancelled
                  ? "text-muted-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {step.label}
            </span>

            {/* CONNECTOR */}
            {index < STEPS.length - 1 && (
              <div className="hidden sm:block h-px w-10 bg-border" />
            )}
          </div>
        )
      })}
    </div>
  )
}
