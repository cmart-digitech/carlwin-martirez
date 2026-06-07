interface Props {
  title?: string
  className?: string
  aspectRatio?: string
}

export default function ImagePlaceholder({ title, className = '', aspectRatio = '4/3' }: Props) {
  return (
    <div
      className={`img-placeholder ${className}`}
      style={{ aspectRatio }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="opacity-40">
        <rect width="40" height="40" rx="4" fill="currentColor" fillOpacity="0.15" />
        <path
          d="M8 28l8-8 5 5 5-7 6 10H8z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="26" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  )
}
