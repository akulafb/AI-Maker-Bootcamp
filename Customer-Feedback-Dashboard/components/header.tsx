export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Customer Feedback</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Manage and track customer feedback in real-time
            </p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg" />
        </div>
      </div>
    </header>
  )
}
