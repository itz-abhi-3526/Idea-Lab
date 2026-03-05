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
  const currentIndex = STEPS.findIndex((s) => s.key === status)

  /* ── TERMINAL STATES ── */
  if (status === "cancelled") {
    return (
      <div className="mt-4 inline-flex items-center gap-3 rounded-lg bg-white/[0.03] border border-white/10 px-4 py-2 text-[10px] font-mono tracking-widest text-neutral-500">
        <div className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
        STATUS_TERMINATED: USER_ACTION_CANCELLED
      </div>
    )
  }

  if (status === "rejected") {
    return (
      <div className="mt-4 inline-flex items-center gap-3 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2 text-[10px] font-mono tracking-widest text-red-400">
        <div className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
        STATUS_DENIED: ADMINISTRATIVE_REJECTION
      </div>
    )
  }

  return (
    <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-y-6 sm:gap-x-0">
      {STEPS.map((step, index) => {
        const isCompleted = index <= currentIndex
        const isLast = index === STEPS.length - 1

        return (
          <div 
            key={step.key} 
            className={`flex items-center flex-1 relative ${isLast ? "flex-none" : "w-full"}`}
          >
            {/* NODE */}
            <div className="flex items-center gap-3 z-10 bg-black pr-4">
              <div
                className={`h-3 w-3 rounded-full transition-all duration-700 ${
                  isCompleted
                    ? "bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.6)]"
                    : "bg-white/5 border border-white/10"
                }`}
              />
              <span
                className={`text-[10px] uppercase font-bold tracking-[0.25em] transition-colors duration-500 ${
                  isCompleted ? "text-white" : "text-neutral-600"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* CONNECTORS */}
            {!isLast && (
              <>
                {/* Horizontal (Desktop) */}
                <div className="hidden sm:block flex-1 h-[1px] bg-neutral-900 overflow-hidden mr-4">
                  <div 
                    className="h-full bg-orange-500/40 transition-all duration-1000 ease-in-out"
                    style={{ width: isCompleted ? "100%" : "0%" }}
                  />
                </div>
                
                {/* Vertical (Mobile) */}
                <div className="sm:hidden absolute left-[5.5px] top-[12px] w-[1px] h-[26px] bg-neutral-900">
                  <div 
                    className="w-full bg-orange-500/40 transition-all duration-1000 ease-in-out"
                    style={{ height: isCompleted ? "100%" : "0%" }}
                  />
                </div>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}