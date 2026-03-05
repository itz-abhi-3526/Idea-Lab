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
  /* Terminal States               */
  /* ----------------------------- */

  if (status === "cancelled") {
    return (
      <div className="mt-4 rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-3 text-xs font-mono tracking-wider text-rose-400 flex items-center gap-3">
        <div className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
        PROTOCOL_TERMINATED: USER_CANCELLED
      </div>
    )
  }

  if (status === "rejected") {
    return (
      <div className="mt-4 rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-3 text-xs font-mono tracking-wider text-amber-400 flex items-center gap-3">
        <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        REVIEW_COMPLETE: ACCESS_DENIED
      </div>
    )
  }

  /* ----------------------------- */
  /* Progress Logic                */
  /* ----------------------------- */

  const currentIndex = steps.findIndex((s) => s.key === status)

  return (
    <div className="mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-y-6 sm:gap-x-0">
        {steps.map((step, idx) => {
          const isCompleted = idx <= currentIndex
          const isLast = idx === steps.length - 1

          return (
            <div
              key={step.key}
              className={`flex items-center flex-1 relative ${
                isLast ? "flex-none" : "w-full"
              }`}
            >
              {/* Step Node */}
              <div className="flex items-center gap-3 z-10 bg-black">
                <div
                  className={`h-3 w-3 rounded-full transition-all duration-500 ${
                    isCompleted 
                      ? "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" 
                      : "bg-white/10 border border-white/5"
                  }`}
                />
                <span
                  className={`text-[10px] uppercase font-bold tracking-[0.2em] transition-colors duration-500 ${
                    isCompleted ? "text-white" : "text-neutral-600"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Progress Connector */}
              {!isLast && (
                <>
                  {/* Desktop Horizontal Line */}
                  <div className="hidden sm:block flex-1 mx-4 h-[1px] bg-neutral-900 overflow-hidden">
                    <div 
                      className={`h-full bg-orange-500/30 transition-all duration-1000 ease-in-out`}
                      style={{ width: isCompleted ? '100%' : '0%' }}
                    />
                  </div>
                  
                  {/* Mobile Vertical Line */}
                  <div className="sm:hidden absolute left-[5px] top-[12px] w-[1px] h-[26px] bg-neutral-900">
                    <div 
                      className={`w-full bg-orange-500/30 transition-all duration-1000 ease-in-out`}
                      style={{ height: isCompleted ? '100%' : '0%' }}
                    />
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}