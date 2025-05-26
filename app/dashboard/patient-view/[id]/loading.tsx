export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-8 w-20 bg-gray-200 rounded"></div>
          <div>
            <div className="h-8 w-64 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-96 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-6 w-16 bg-gray-200 rounded"></div>
          <div className="h-9 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Patient info card skeleton */}
      <div className="border rounded-lg p-6">
        <div className="flex items-start gap-6">
          <div className="h-24 w-24 bg-gray-200 rounded-full"></div>
          <div className="flex-1 grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="space-y-4">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-9 w-24 bg-gray-200 rounded"></div>
          ))}
        </div>

        {/* Content skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-1"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
