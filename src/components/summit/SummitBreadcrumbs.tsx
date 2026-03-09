import Link from 'next/link'

interface Crumb {
  label: string
  href: string
}

interface SummitBreadcrumbsProps {
  summitTitle: string
  basePath: string
  current: string
}

export default function SummitBreadcrumbs({ summitTitle, basePath, current }: SummitBreadcrumbsProps) {
  const crumbs: Crumb[] = [
    { label: summitTitle, href: `${basePath}/start-here` },
  ]

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm">
      <ol className="flex items-center gap-1.5 flex-wrap">
        {crumbs.map((crumb) => (
          <li key={crumb.href} className="flex items-center gap-1.5">
            <Link
              href={crumb.href}
              className="text-(--color-roti) hover:opacity-80 font-medium"
            >
              {crumb.label}
            </Link>
            <span className="text-(--color-primary)/30">/</span>
          </li>
        ))}
        <li className="text-(--color-primary)/70">{current}</li>
      </ol>
    </nav>
  )
}
