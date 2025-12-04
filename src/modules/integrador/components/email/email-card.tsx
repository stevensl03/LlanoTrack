"use client"

interface EmailCardProps {
  email: {
    id: string
    from: string
    subject: string
    body: string
    receivedAt: string
    entity: string
    attachments: number
    urgency: "high" | "medium" | "low"
    hasAttachment: boolean
  }
  onView: () => void
  onClassify: () => void
}

export function EmailCard({ email, onView, onClassify }: EmailCardProps) {
  const formatTime = (date: string) => {
    const now = new Date()
    const emailDate = new Date(date)
    const diffHours = Math.floor((now.getTime() - emailDate.getTime()) / (1000 * 60 * 60))

    if (diffHours < 1) return "Hace poco"
    if (diffHours < 24) return `Hace ${diffHours}h`
    return emailDate.toLocaleDateString("es-CO")
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors overflow-hidden">
      <div className="p-4 flex items-start gap-4">

        {/* Ícono Mail */}
        <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l8 8 8-8" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{email.from}</p>
              <h3 className="text-base font-bold text-white truncate mt-1">{email.subject}</h3>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {email.urgency === "high" && (
                <span className="px-2 py-1 text-xs rounded-md bg-red-600/20 text-red-400 border border-red-600/40 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M5 19h14L12 5 5 19z" />
                  </svg>
                  Urgente
                </span>
              )}

              {email.urgency === "medium" && (
                <span className="px-2 py-1 text-xs rounded-md bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
                  Medio
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-slate-400 line-clamp-2">{email.body}</p>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-4 text-xs text-slate-500">

              {/* Entity */}
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l8 8 8-8" />
                </svg>
                <span>{email.entity}</span>
              </div>

              {/* Attachments */}
              {email.hasAttachment && (
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 4v16" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 4h7v16H6z" />
                  </svg>
                  <span>
                    {email.attachments} archivo{email.attachments !== 1 ? "s" : ""}
                  </span>
                </div>
              )}

              {/* Time */}
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span>{formatTime(email.receivedAt)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">

              {/* Button Ver */}
              <button
                onClick={onView}
                className="text-slate-400 hover:text-white hover:bg-slate-800 px-3 py-1 rounded-md text-sm transition"
              >
                Ver
              </button>

              {/* Button Clasificar */}
              <button
                onClick={onClassify}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition"
              >
                Clasificar
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
