export interface FudgeEvent {
  start: string // ISO date
  end?: string
  name: string
  venue: string
  city: string
  state: string
  featured?: boolean
}

// Sample 2026 season. The Ragles travel Northern California, Southern Oregon
// & Northern Nevada — replace with their confirmed booking calendar.
export const EVENTS: FudgeEvent[] = [
  {
    start: '2026-06-20',
    end: '2026-06-21',
    name: 'Dunsmuir Railroad Days',
    venue: 'Downtown Dunsmuir',
    city: 'Dunsmuir',
    state: 'CA',
    featured: true,
  },
  {
    start: '2026-07-22',
    end: '2026-07-26',
    name: 'Jackson County Fair',
    venue: 'The Expo',
    city: 'Central Point',
    state: 'OR',
  },
  {
    start: '2026-08-05',
    end: '2026-08-09',
    name: 'Siskiyou Golden Fair',
    venue: 'Siskiyou Golden Fairgrounds',
    city: 'Yreka',
    state: 'CA',
    featured: true,
  },
  {
    start: '2026-09-12',
    name: 'Mount Shasta Fall Artisan Market',
    venue: 'Mt. Shasta City Park',
    city: 'Mount Shasta',
    state: 'CA',
  },
  {
    start: '2026-09-24',
    end: '2026-09-27',
    name: 'Tehama District Fair',
    venue: 'Tehama District Fairground',
    city: 'Red Bluff',
    state: 'CA',
  },
  {
    start: '2026-12-05',
    end: '2026-12-06',
    name: 'Holiday Marketplace At The Civic',
    venue: 'Redding Civic Auditorium',
    city: 'Redding',
    state: 'CA',
    featured: true,
  },
]
