export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div>
        <h1 className="text-2xl font-semibold">Access Denied</h1>
        <p className="mt-2 text-muted-foreground">
          You are not authorized to access this page.
        </p>
      </div>
    </div>
  )
}
