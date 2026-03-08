import { redirect } from 'next/navigation'

type PageProps = {
  params: Promise<{ year: string }>
}

export default async function ArchiveSummitRootPage({ params }: PageProps) {
  const { year } = await params
  redirect(`/summit/${year}/start-here`)
}
