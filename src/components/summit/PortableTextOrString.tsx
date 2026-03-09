import { PortableText } from '@portabletext/react'

interface PortableTextOrStringProps {
  value: any
  className?: string
}

export default function PortableTextOrString({
  value,
  className = 'prose prose-lg max-w-none',
}: PortableTextOrStringProps) {
  if (!value) return null

  if (typeof value === 'string') {
    return <p className={className}>{value}</p>
  }

  if (Array.isArray(value) && value.length > 0) {
    return (
      <div className={className}>
        <PortableText value={value} />
      </div>
    )
  }

  return null
}
