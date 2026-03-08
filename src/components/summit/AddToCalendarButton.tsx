interface AddToCalendarButtonProps {
  calendarUrl: string | null
}

export default function AddToCalendarButton({ calendarUrl }: AddToCalendarButtonProps) {
  if (!calendarUrl) return null

  return (
    <a
      href={calendarUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-6 py-2 bg-(--color-sidecar) text-(--color-bronzetone) font-bold rounded-full text-sm hover:bg-(--color-roti) hover:text-white transition-colors"
    >
      + Add to Calendar
    </a>
  )
}
