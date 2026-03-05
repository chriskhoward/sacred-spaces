import Link from 'next/link'

interface AllAccessButtonProps {
  basePath: string
  label?: string
}

export default function AllAccessButton({ basePath, label = 'Get All Access Pass' }: AllAccessButtonProps) {
  return (
    <Link
      href={`${basePath}/all-access`}
      className="inline-block px-8 py-3 bg-(--color-roti) text-white rounded-full font-bold uppercase tracking-wide hover:opacity-90 transition-opacity shadow-md"
    >
      {label}
    </Link>
  )
}
