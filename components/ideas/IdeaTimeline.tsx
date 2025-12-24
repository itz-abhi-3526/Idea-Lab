type IdeaStatus = "submitted" | "approved" | "rejected" | "completed"

const steps: IdeaStatus[] = ["submitted", "approved", "completed"]

export default function IdeaTimeline({
  status,
}: {
  status: IdeaStatus
}) {
  return (
    <div className="mt-4 flex items-center gap-3 text-xs">
      {steps.map((step, idx) => {
        const isActive =
          steps.indexOf(status) >= idx || status === "rejected"

        const isRejectedStep =
          status === "rejected" && step === "approved"

        return (
          <div key={step} className="flex items-center gap-3">
            {/* dot */}
            <div
              className={`h-2 w-2 rounded-full ${
                isRejectedStep
                  ? "bg-red-500"
                  : isActive
                  ? "bg-accent"
                  : "bg-muted"
              }`}
            />

            {/* label */}
            <span
              className={`capitalize ${
                isRejectedStep
                  ? "text-red-500"
                  : isActive
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {step}
            </span>

            {/* connector */}
            {idx < steps.length - 1 && (
              <div className="h-px w-6 bg-border" />
            )}
          </div>
        )
      })}

      {status === "rejected" && (
        <span className="ml-2 rounded-full bg-red-500/10 px-2 py-0.5 text-xs text-red-500">
          Rejected
        </span>
      )}
    </div>
  )
}
