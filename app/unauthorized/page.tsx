export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-center">
      <div className="max-w-md space-y-3">
        <h1 className="text-xl sm:text-2xl font-semibold">
          Access Denied
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          You are not authorized to access this page.
        </p>
      </div>
    </div>
  )
}
