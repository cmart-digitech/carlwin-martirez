export function EditorSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-stone-200 rounded-lg p-6 mb-6">
      <h2 className="text-sm font-medium text-stone-900 mb-5 pb-4 border-b border-stone-100">{title}</h2>
      {children}
    </div>
  )
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-stone-600 mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-xs text-stone-400 mt-1">{hint}</p>}
    </div>
  )
}

export const inputCls =
  'w-full border border-stone-300 bg-white text-stone-900 text-sm px-3 py-2 focus:outline-none focus:border-stone-600 transition-colors rounded'

export const textareaCls =
  'w-full border border-stone-300 bg-white text-stone-900 text-sm px-3 py-2 focus:outline-none focus:border-stone-600 transition-colors rounded resize-y min-h-[80px]'

export const selectCls =
  'w-full border border-stone-300 bg-white text-stone-900 text-sm px-3 py-2 focus:outline-none focus:border-stone-600 transition-colors rounded'

export function BtnPrimary({
  onClick,
  children,
  type = 'button',
}: {
  onClick?: () => void
  children: React.ReactNode
  type?: 'button' | 'submit'
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-stone-900 text-stone-50 text-xs px-4 py-2 hover:bg-stone-700 transition-colors rounded"
    >
      {children}
    </button>
  )
}

export function BtnSecondary({
  onClick,
  children,
}: {
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border border-stone-300 text-stone-600 text-xs px-4 py-2 hover:bg-stone-50 transition-colors rounded"
    >
      {children}
    </button>
  )
}

export function BtnDanger({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-xs text-red-400 hover:text-red-600 transition-colors"
    >
      {children}
    </button>
  )
}
